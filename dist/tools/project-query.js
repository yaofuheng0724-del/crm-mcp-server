import { crmQuery } from "../graphql-client.js";
import { listProject, projectInfo, projectStatistics, projectCostInfo, } from "../templates/graphql-operations.js";
export const tool = {
    name: "crm_query_project",
    description: `查询CRM项目信息。支持以下action：

- **list**: 项目列表查询，支持按名称/阶段/负责人/客户等条件筛选和分页
- **detail**: 项目详情查询，根据项目ID获取完整信息（含客户、联系人、合同、要素卡点、跟进记录）
- **statistics**: 项目统计查询，按条件统计项目数量和金额
- **cost**: 项目成本信息查询

常用枚举值：
- stage: leads(销售线索), confirmed(商机阶段1：需求挖掘), tech_pre_research(商机阶段2：技术预研), plan_discuss(商机阶段3：方案论证), project_approval(商机阶段4：立项审批), start_purchase(商机阶段5：启动采购), business_tender(商机阶段6：商务招标), recognized(商机阶段7：签单冲刺), deal(合同签署), invalid(失效), lost_order(丢单)
- level: ordinary(普通), significant(重点项目)
- type: framework(框架), normal(普通)
- contract_sign_type: direct(直签), non_direct(非直签)`,
    inputSchema: {
        type: "object",
        properties: {
            action: {
                type: "string",
                enum: ["list", "detail", "statistics", "cost"],
                description: "查询操作类型",
            },
            // list action params
            search: {
                type: "object",
                description: "[list] 搜索条件，支持name(项目名关键词),stage(阶段数组),claim_by(负责人ID数组),company(客户名),claim_by_group(销售组ID),deal_date/sign_date/created_at({from,to}),amount({from,to}),project_type,contract_sign_type",
            },
            pagination: {
                type: "object",
                description: "[list] 分页参数 {skip,limit}，默认skip:0,limit:20",
            },
            sort_by: {
                type: "object",
                description: "[list] 排序 {by,order}，by:deal_date/updatedAt，order:1升序/-1降序",
            },
            // detail/cost action params
            id: {
                type: "string",
                description: "[detail/cost] 项目ID",
            },
            // statistics action params
            statistics_search: {
                type: "object",
                description: "[statistics] 统计搜索条件，与search格式相同",
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
            const sort_by = args.sort_by ?? { by: "updatedAt", order: -1 };
            const data = await crmQuery(listProject.query, { search, pagination, sort_by });
            return formatProjectList(data);
        }
        case "detail": {
            if (!args.id)
                return "Error: id is required for detail action";
            const data = await crmQuery(projectInfo.query, { id: args.id });
            return JSON.stringify(data, null, 2);
        }
        case "statistics": {
            const search = args.statistics_search ?? {};
            const data = await crmQuery(projectStatistics.query, { search });
            return JSON.stringify(data, null, 2);
        }
        case "cost": {
            if (!args.id)
                return "Error: id is required for cost action";
            const data = await crmQuery(projectCostInfo.query, { id: args.id });
            return JSON.stringify(data, null, 2);
        }
        default:
            return `Unknown action: ${action}. Supported: list, detail, statistics, cost`;
    }
}
function formatProjectList(data) {
    const result = data;
    if (!result.listProject)
        return JSON.stringify(data, null, 2);
    const { total, data: projects } = result.listProject;
    const stageMap = {
        leads: "销售线索", confirmed: "需求挖掘", tech_pre_research: "技术预研",
        plan_discuss: "方案论证", project_approval: "立项审批", start_purchase: "启动采购",
        business_tender: "商务招标", recognized: "签单冲刺", deal: "合同签署",
        invalid: "失效", lost_order: "丢单",
    };
    let output = `共 ${total} 个项目\n\n`;
    for (const p of projects) {
        const company = p.company;
        const claimBy = p.claimBy;
        const dealAmount = p.deal_amount;
        const actualAmount = p.actual_amount;
        output += `- ${p.name} (ID: ${p.id})\n`;
        output += `  客户: ${company?.name ?? "-"} | 阶段: ${stageMap[String(p.stage)] ?? String(p.stage)} | 赢单率: ${p.win_rate ?? "-"}\n`;
        output += `  负责人: ${claimBy?.user?.name ?? "-"} | 预估签约: ${p.sign_date ?? "-"}\n`;
        if (dealAmount?.value)
            output += `  预估金额: ${dealAmount.value} ${dealAmount.currency ?? ""}`;
        if (actualAmount?.value && actualAmount.value !== "0.00")
            output += ` | 实际金额: ${actualAmount.value} ${actualAmount.currency ?? ""}`;
        if (dealAmount?.value || actualAmount?.value)
            output += "\n";
        output += "\n";
    }
    return output;
}
//# sourceMappingURL=project-query.js.map