import { crmQuery } from "../graphql-client.js";
import { listCompany, companyInfo, list_all_company, find_company_or_high_seas_company_by_id, } from "../templates/graphql-operations.js";
export const tool = {
    name: "crm_query_company",
    description: `查询CRM客户信息。支持以下action：

- **list**: 客户列表查询（受权限范围影响，可能返回0条）
- **all**: 客户归属查询（开放查询，不受权限范围限制，优先用于查归属）
- **detail**: 客户详情查询
- **high_seas**: 查询客户或公海客户

客户归属关键字段：
- claim_by: 客户负责人
- claim_by_group: 客户所属组
- claim_by_group.parent: 客户所属业务单元
- first_group_name: 客户所属业务单元兜底
- region: 客户所属区域（name: 城市, group: 省份）
- rank: 客户等级

注意：list和all不是同一口径。list受权限范围影响可能返回0条，优先用all查归属。`,
    inputSchema: {
        type: "object",
        properties: {
            action: {
                type: "string",
                enum: ["list", "all", "detail", "high_seas"],
                description: "查询操作类型",
            },
            search: {
                type: "object",
                description: "[list/all] 搜索条件，支持name(客户名关键词数组),rank(客户等级)等",
            },
            pagination: {
                type: "object",
                description: "[list/all] 分页 {skip,limit}，默认skip:0,limit:20",
            },
            id: {
                type: "string",
                description: "[detail/high_seas] 客户ID",
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
            const data = await crmQuery(listCompany.query, { search: [search], pagination });
            return formatCompanyList(data, "listCompany");
        }
        case "all": {
            const search = args.search ?? { name: [] };
            const pagination = args.pagination ?? { skip: 0, limit: 20 };
            const data = await crmQuery(list_all_company.query, { search, pagination });
            return formatCompanyList(data, "list_all_company");
        }
        case "detail": {
            if (!args.id)
                return "Error: id is required for detail action";
            const data = await crmQuery(companyInfo.query, { id: args.id });
            return JSON.stringify(data, null, 2);
        }
        case "high_seas": {
            if (!args.id)
                return "Error: id is required for high_seas action";
            const data = await crmQuery(find_company_or_high_seas_company_by_id.query, { id: args.id });
            return JSON.stringify(data, null, 2);
        }
        default:
            return `Unknown action: ${action}. Supported: list, all, detail, high_seas`;
    }
}
function formatCompanyList(data, key) {
    const result = data;
    const conn = result[key];
    if (!conn)
        return JSON.stringify(data, null, 2);
    const { total, data: companies } = conn;
    let output = `共 ${total} 个客户\n\n`;
    for (const c of companies) {
        const region = c.region;
        const claimBy = c.claim_by;
        const claimByGroup = c.claim_by_group;
        output += `- ${c.name} (ID: ${c.id})\n`;
        output += `  简称: ${c.common_name ?? "-"} | 等级: ${c.rank ?? "-"}\n`;
        output += `  区域: ${region?.name ?? "-"} (${region?.group ?? "-"})\n`;
        output += `  负责人: ${claimBy?.name ?? "-"} | 所属组: ${claimByGroup?.name ?? "-"} | 业务单元: ${claimByGroup?.parent?.name ?? c.first_group_name ?? "-"}\n\n`;
    }
    return output;
}
//# sourceMappingURL=company.js.map