import { crmQuery } from "../graphql-client.js";
import * as ops from "../templates/graphql-operations.js";
const contractOps = {
    list: ops.listContract,
    detail: ops.contract,
    create: ops.createContract,
    update: ops.updateContract,
    frame_info: ops.frame_contract_info,
    update_frame_info: ops.update_frame_contract_info,
};
const revenueOps = {
    list: ops.listRevenue,
    update_plan: ops.updatePaymentPlan,
    add_plan: ops.addPaymentPlan,
    remove_plan: ops.removePaymentPlan,
    associate: ops.revenueAssociation,
    change_state: ops.revenueChangeState,
    split: ops.revenue_split,
};
const confirmRevenueOps = {
    list: ops.listConfirmRevenue,
    statistics: ops.confirmRevenueStatistics,
    create: ops.createConfirmRevenue,
    update_deliver: ops.updateConfirmRevenueForDeliver,
    update_financial: ops.updateConfirmRevenueForFanancial,
    remove: ops.removeConfirmRevenue,
};
const incomePlanOps = {
    query: ops.project_income_plan,
    create: ops.create_income_plan,
};
export const tool = {
    name: "crm_contract_finance",
    description: `操作CRM合同、回款、确认收入和应收计划。按domain分组：

**contract (合同)**
- list: 合同列表查询 | detail: 合同详情 | create: 创建合同 | update: 更新合同 | frame_info: 框架合同信息 | update_frame_info: 更新框架合同信息

**revenue (回款)**
- list: 回款列表 | update_plan: 修改回款计划 | add_plan: 新增回款计划 | remove_plan: 删除回款计划 | associate: 回款匹配项目 | change_state: 修改回款状态 | split: 拆分回款

**confirm_revenue (确认收入)**
- list: 确认收入列表 | statistics: 确认收入统计 | create: 发起确认收入 | update_deliver: 交付确认收入 | update_financial: 财务确认收入 | remove: 删除确认收入

**income_plan (应收计划)**
- query: 查询项目应收计划 | create: 创建应收计划`,
    inputSchema: {
        type: "object",
        properties: {
            domain: {
                type: "string",
                enum: ["contract", "revenue", "confirm_revenue", "income_plan"],
                description: "业务域",
            },
            action: {
                type: "string",
                description: "操作类型，各domain支持不同的action（见description）",
            },
            params: {
                type: "object",
                description: "操作参数",
            },
        },
        required: ["domain", "action"],
    },
};
export async function handler(args) {
    const domain = args.domain;
    const action = args.action;
    const params = (args.params ?? {});
    switch (domain) {
        case "contract":
            return await handleContract(action, params);
        case "revenue":
            return await handleRevenue(action, params);
        case "confirm_revenue":
            return await handleConfirmRevenue(action, params);
        case "income_plan":
            return await handleIncomePlan(action, params);
        default:
            return `Unknown domain: ${domain}`;
    }
}
async function handleContract(action, params) {
    const opMap = {
        list: { query: contractOps.list.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 }, sort_by: p.sort_by ?? { by: "updatedAt", order: -1 } }) },
        detail: { query: contractOps.detail.query, vars: (p) => ({ id: p.id }) },
        create: { query: contractOps.create.query, vars: (p) => ({ input: p }) },
        update: { query: contractOps.update.query, vars: (p) => p },
        frame_info: { query: contractOps.frame_info.query, vars: (p) => ({ id: p.id }) },
        update_frame_info: { query: contractOps.update_frame_info.query, vars: (p) => p },
    };
    return await executeOp(opMap, action, params);
}
async function handleRevenue(action, params) {
    const opMap = {
        list: { query: revenueOps.list.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
        update_plan: { query: revenueOps.update_plan.query, vars: (p) => p },
        add_plan: { query: revenueOps.add_plan.query, vars: (p) => p },
        remove_plan: { query: revenueOps.remove_plan.query, vars: (p) => p },
        associate: { query: revenueOps.associate.query, vars: (p) => p },
        change_state: { query: revenueOps.change_state.query, vars: (p) => p },
        split: { query: revenueOps.split.query, vars: (p) => p },
    };
    return await executeOp(opMap, action, params);
}
async function handleConfirmRevenue(action, params) {
    const opMap = {
        list: { query: confirmRevenueOps.list.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
        statistics: { query: confirmRevenueOps.statistics.query, vars: (p) => ({ search: p.search ?? {} }) },
        create: { query: confirmRevenueOps.create.query, vars: (p) => p },
        update_deliver: { query: confirmRevenueOps.update_deliver.query, vars: (p) => p },
        update_financial: { query: confirmRevenueOps.update_financial.query, vars: (p) => p },
        remove: { query: confirmRevenueOps.remove.query, vars: (p) => ({ id: p.id }) },
    };
    return await executeOp(opMap, action, params);
}
async function handleIncomePlan(action, params) {
    const opMap = {
        query: { query: incomePlanOps.query.query, vars: (p) => ({ project_id: p.project_id }) },
        create: { query: incomePlanOps.create.query, vars: (p) => ({ input: p }) },
    };
    return await executeOp(opMap, action, params);
}
async function executeOp(opMap, action, params) {
    const op = opMap[action];
    if (!op)
        return `Unknown action '${action}' for this domain. Available: ${Object.keys(opMap).join(", ")}`;
    const data = await crmQuery(op.query, op.vars(params));
    return JSON.stringify(data, null, 2);
}
//# sourceMappingURL=contract-finance.js.map