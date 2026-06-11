import { crmQuery } from "../graphql-client.js";
import * as ops from "../templates/graphql-operations.js";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";

type OpEntry = { query: string; vars: (p: Record<string, unknown>) => Record<string, unknown> };

const domainActions: Record<string, Record<string, OpEntry>> = {
  leads: {
    list: { query: ops.list_leads.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
    detail: { query: ops.leads_info.query, vars: (p) => ({ id: p.id }) },
    create: { query: ops.create_leads.query, vars: (p) => ({ input: p }) },
    update: { query: ops.update_leads.query, vars: (p) => p },
    update_valid: { query: ops.update_leads_valid.query, vars: (p) => p },
    claim: { query: ops.claim_leads.query, vars: (p) => ({ id: p.id }) },
    create_project: { query: ops.create_project_by_leads.query, vars: (p) => p },
  },
  company_apply: {
    create: { query: ops.createCompanyApplyByCreate.query, vars: (p) => p },
    review: { query: ops.reviewCompanyApply.query, vars: (p) => p },
    transfer_claim: { query: ops.transferCompanyClaim.query, vars: (p) => p },
    update_valid: { query: ops.update_company_valid.query, vars: (p) => p },
    update_lock: { query: ops.update_company_lock.query, vars: (p) => p },
    claim: { query: ops.claim_company.query, vars: (p) => ({ id: p.id }) },
    distribute: { query: ops.distribute_company.query, vars: (p) => p },
    batch_distribute: { query: ops.batch_distribute_company.query, vars: (p) => p },
    update_labels: { query: ops.updateCompanyLabels.query, vars: (p) => p },
    remove: { query: ops.removeCompany.query, vars: (p) => ({ id: p.id }) },
  },
  channel_apply: {
    create: { query: ops.createChannelApply.query, vars: (p) => p },
    review: { query: ops.reviewChannelApply.query, vars: (p) => p },
    update: { query: ops.updateChannel.query, vars: (p) => p },
    transfer_claim: { query: ops.transferChannelClaim.query, vars: (p) => p },
    batch_transfer_claim: { query: ops.batchTransferChannelClaim.query, vars: (p) => p },
    update_cooperate_status: { query: ops.update_channel_cooperate_status.query, vars: (p) => p },
  },
  price: {
    list: { query: ops.listPriceApproval.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
    create: { query: ops.createProjectPriceApproval.query, vars: (p) => p },
    approve: { query: ops.approveProjectPriceApproval.query, vars: (p) => p },
    revert: { query: ops.revertProjectPriceApproval.query, vars: (p) => p },
  },
  business_chance: {
    list: { query: ops.list_business_chance.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
    create: { query: ops.createBusinessChance.query, vars: (p) => p },
    review: { query: ops.reviewBusinessChance.query, vars: (p) => p },
  },
  solution: {
    list: { query: ops.list_solution.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
    create: { query: ops.create_solution.query, vars: (p) => ({ input: p }) },
    review: { query: ops.review_solution.query, vars: (p) => p },
  },
  scenario: {
    list: { query: ops.list_opportunity_scenario.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
    create: { query: ops.create_opportunity_scenario.query, vars: (p) => ({ input: p }) },
  },
  special_deals: {
    list: { query: ops.list_special_deals_trace_back_await_project.query, vars: (p) => ({ search: p.search ?? {} }) },
    create: { query: ops.create_special_deals_trace_backs.query, vars: (p) => p },
    submit_acceptance: { query: ops.submit_paper_acceptance_form.query, vars: (p) => p },
  },
  report: {
    list: { query: ops.listReport.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
    create: { query: ops.createReport.query, vars: (p) => ({ input: p }) },
    update: { query: ops.updateReport.query, vars: (p) => p },
  },
  goal: {
    query: { query: ops.saleGoal.query, vars: (p) => p },
    commission: { query: ops.saleCommission.query, vars: (p) => p },
    update: { query: ops.updateSaleGoal.query, vars: (p) => p },
    create_commission_config: { query: ops.createCommissionConfig.query, vars: (p) => p },
  },
  user: {
    me: { query: ops.me.query, vars: () => ({}) },
    list: { query: ops.listUser.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
    create_group: { query: ops.createUserGroup.query, vars: (p) => ({ input: p }) },
    update_group_member: { query: ops.updateUserGroupMember.query, vars: (p) => p },
    update_permission: { query: ops.updatePermission.query, vars: (p) => p },
  },
  product: {
    list: { query: ops.listProduct.query, vars: (p) => ({ search: p.search ?? {} }) },
    create: { query: ops.create_product.query, vars: (p) => ({ input: p }) },
    add_form: { query: ops.add_product_form.query, vars: (p) => p },
    add_version: { query: ops.addProductVersion.query, vars: (p) => ({ input: p }) },
    add_draft: { query: ops.addProductDraft.query, vars: (p) => ({ input: p }) },
  },
  config: {
    query: { query: ops.config.query, vars: (p) => ({ key: p.key }) },
    update_delivery_approver: { query: ops.updateConfigProductDeliveryApprover.query, vars: (p) => p },
    update_service_approver: { query: ops.updateConfigServiceDeliveryApprover.query, vars: (p) => p },
  },
  announcement: {
    create: { query: ops.create_announcement.query, vars: (p) => p },
  },
  todo: {
    create: { query: ops.create_todo_list.query, vars: (p) => p },
    finish: { query: ops.finished_todo_list.query, vars: (p) => ({ id: p.id }) },
  },
  export: {
    project: { query: ops.exportExcelFile.query, vars: (p) => p },
    payment: { query: ops.paymentStatistics.query, vars: (p) => ({ search: p.search ?? {} }) },
    presale: { query: ops.presaleStatistics.query, vars: (p) => p },
    ranking: { query: ops.deal_revenue_perf_ranking.query, vars: (p) => ({ search: p.search ?? {}, pagination: p.pagination ?? { skip: 0, limit: 20 } }) },
  },
};

const domainDescriptions: Record<string, string> = {
  leads: "线索管理 (list/detail/create/update/update_valid/claim/create_project)",
  company_apply: "客户申请与审核 (create/review/transfer_claim/update_valid/update_lock/claim/distribute/batch_distribute/update_labels/remove)",
  channel_apply: "伙伴申请与审核 (create/review/update/transfer_claim/batch_transfer_claim/update_cooperate_status)",
  price: "价格审批 (list/create/approve/revert)",
  business_chance: "商机报备 (list/create/review)",
  solution: "解决方案 (list/create/review)",
  scenario: "机会场景 (list/create)",
  special_deals: "特价回溯与验收 (list/create/submit_acceptance)",
  report: "日报周报 (list/create/update)",
  goal: "销售目标与提成 (query/commission/update/create_commission_config)",
  user: "用户与权限 (me/list/create_group/update_group_member/update_permission)",
  product: "产品配置 (list/create/add_form/add_version/add_draft)",
  config: "系统配置 (query/update_delivery_approver/update_service_approver)",
  announcement: "公告 (create)",
  todo: "待办 (create/finish)",
  export: "统计与导出 (project/payment/presale/ranking)",
};

export const tool: Tool = {
  name: "crm_misc",
  description: `其他CRM业务操作。按domain分组，各domain支持的action如下：

${Object.entries(domainDescriptions).map(([k, v]) => `- **${k}**: ${v}`).join("\n")}`,
  inputSchema: {
    type: "object",
    properties: {
      domain: {
        type: "string",
        enum: Object.keys(domainActions),
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

export async function handler(args: Record<string, unknown>): Promise<string> {
  const domain = args.domain as string;
  const action = args.action as string;
  const params = (args.params ?? {}) as Record<string, unknown>;

  const actions = domainActions[domain];
  if (!actions) return `Unknown domain: ${domain}. Available: ${Object.keys(domainActions).join(", ")}`;

  const op = actions[action];
  if (!op) return `Unknown action '${action}' for domain '${domain}'. Available: ${Object.keys(actions).join(", ")}`;

  const data = await crmQuery(op.query, op.vars(params));
  return JSON.stringify(data, null, 2);
}
