import { crmQuery } from "../graphql-client.js";
import * as ops from "../templates/graphql-operations.js";
export const tool = {
    name: "crm_delivery",
    description: `操作CRM交付与库存相关功能。按domain分组：

**product_delivery (产品交付)**
- list: 查询项目已交付设备 | create: 创建产品交付 | review: 审批产品交付 | update_time: 更新预计交付/验收时间 | designate_person: 指定交付负责人

**service_delivery (安服交付)**
- init: 发起安服交付 | review: 审批安服交付 | finish: 结束安服交付 | finish_early: 终止提前实施 | punish: 安服交付惩罚

**stock (库存)**
- list: 整机库存列表 | update: 修改整机库存基本信息

**hardware (硬件售后)**
- create: 创建硬件设备售后

**shipping (发货)**
- create: 创建发货单

**cost (安服成本)**
- evaluate: 评估安服成本`,
    inputSchema: {
        type: "object",
        properties: {
            domain: {
                type: "string",
                enum: ["product_delivery", "service_delivery", "stock", "hardware", "shipping", "cost"],
                description: "业务域",
            },
            action: {
                type: "string",
                description: "操作类型（见description中各domain支持的action）",
            },
            params: {
                type: "object",
                description: "操作参数",
            },
        },
        required: ["domain", "action"],
    },
};
const domainActions = {
    product_delivery: {
        list: { query: ops.list_project_delivery_stock.query, vars: (p) => ({ project_id: p.project_id }) },
        create: { query: ops.create_product_delivery.query, vars: (p) => ({ input: p }) },
        review: { query: ops.review_product_delivery.query, vars: (p) => p },
        update_time: { query: ops.update_product_delivery_time_info.query, vars: (p) => p },
        designate_person: { query: ops.designation_product_delivery_person_in_charge.query, vars: (p) => p },
    },
    service_delivery: {
        init: { query: ops.init_service_delivery.query, vars: (p) => p },
        review: { query: ops.review_service_delivery.query, vars: (p) => p },
        finish: { query: ops.finish_service_delivery.query, vars: (p) => p },
        finish_early: { query: ops.finish_early_service_delivery.query, vars: (p) => p },
        punish: { query: ops.punish_service_delivery.query, vars: (p) => p },
    },
    stock: {
        list: { query: ops.listMachineStock.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
        update: { query: ops.updateMachineStockBasic.query, vars: (p) => p },
    },
    hardware: {
        create: { query: ops.create_hardware_after_sale.query, vars: (p) => ({ input: p }) },
    },
    shipping: {
        create: { query: ops.create_shipping_order.query, vars: (p) => ({ input: p }) },
    },
    cost: {
        evaluate: { query: ops.add_service_cost_detail.query, vars: (p) => p },
    },
};
export async function handler(args) {
    const domain = args.domain;
    const action = args.action;
    const params = (args.params ?? {});
    const actions = domainActions[domain];
    if (!actions)
        return `Unknown domain: ${domain}. Available: ${Object.keys(domainActions).join(", ")}`;
    const op = actions[action];
    if (!op)
        return `Unknown action '${action}' for domain '${domain}'. Available: ${Object.keys(actions).join(", ")}`;
    const data = await crmQuery(op.query, op.vars(params));
    return JSON.stringify(data, null, 2);
}
//# sourceMappingURL=delivery.js.map