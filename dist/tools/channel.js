import { crmQuery } from "../graphql-client.js";
import { listChannel, channel, } from "../templates/graphql-operations.js";
export const tool = {
    name: "crm_query_channel",
    description: `查询CRM伙伴信息。支持以下action：

- **list**: 伙伴列表查询，支持按名称/状态/类型等条件筛选
- **detail**: 伙伴详情查询

伙伴归属关键字段：
- sale_claim_by: 伙伴销售负责人
- sale_claim_by_group: 伙伴记录所属组
- sale_claim_by_group.parent: 伙伴记录所属一级战队
- sale_claim_by_first_group: 伙伴记录所属一级战队兜底
- channel_sale_claim_by: 伙伴运营负责人

注意：伙伴"记录归属"（sale_claim_by_group）和"负责人当前组织"（sale_claim_by.usergroup）不是同一口径，不能混用。`,
    inputSchema: {
        type: "object",
        properties: {
            action: {
                type: "string",
                enum: ["list", "detail"],
                description: "查询操作类型",
            },
            search: {
                type: "object",
                description: "[list] 搜索条件，支持name(伙伴名关键词数组),status,type等",
            },
            pagination: {
                type: "object",
                description: "[list] 分页 {skip,limit}，默认skip:0,limit:20",
            },
            with_perm: {
                type: "boolean",
                description: "[list] 是否检查权限，默认false",
            },
            id: {
                type: "string",
                description: "[detail] 伙伴ID",
            },
        },
        required: ["action"],
    },
};
export async function handler(args) {
    const action = args.action;
    switch (action) {
        case "list": {
            const search = args.search ?? { name: [] };
            const pagination = args.pagination ?? { skip: 0, limit: 20 };
            const withPerm = args.with_perm ?? false;
            const data = await crmQuery(listChannel.query, { search, pagination, with_perm: withPerm });
            return formatChannelList(data);
        }
        case "detail": {
            if (!args.id)
                return "Error: id is required for detail action";
            const data = await crmQuery(channel.query, { id: args.id });
            return JSON.stringify(data, null, 2);
        }
        default:
            return `Unknown action: ${action}. Supported: list, detail`;
    }
}
function formatChannelList(data) {
    const result = data;
    if (!result.listChannel)
        return JSON.stringify(data, null, 2);
    const { total, data: channels } = result.listChannel;
    let output = `共 ${total} 个伙伴\n\n`;
    for (const ch of channels) {
        const region = ch.region;
        const saleClaimBy = ch.sale_claim_by;
        const saleClaimByGroup = ch.sale_claim_by_group;
        const chSaleClaimBy = ch.channel_sale_claim_by;
        output += `- ${ch.name} (ID: ${ch.id})\n`;
        output += `  简称: ${ch.common_name ?? "-"} | 地区: ${region?.name ?? "-"}\n`;
        output += `  销售负责人: ${saleClaimBy?.name ?? "-"} | 所属组: ${saleClaimByGroup?.name ?? "-"}\n`;
        output += `  运营负责人: ${chSaleClaimBy?.name ?? "-"}\n\n`;
    }
    return output;
}
//# sourceMappingURL=channel.js.map