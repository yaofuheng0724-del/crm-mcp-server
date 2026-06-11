import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { handler as projectQueryHandler } from "./tools/project-query.js";
import { handler as projectMutateHandler } from "./tools/project-mutate.js";
import { handler as companyHandler } from "./tools/company.js";
import { handler as channelHandler } from "./tools/channel.js";
import { handler as contractFinanceHandler } from "./tools/contract-finance.js";
import { handler as followupHandler } from "./tools/followup.js";
import { handler as deliveryHandler } from "./tools/delivery.js";
import { handler as miscHandler } from "./tools/misc.js";

const server = new McpServer({
  name: "crm-mcp-server",
  version: "1.0.0",
});

// Helper: wrap handler to return MCP content format
function wrapHandler(
  handler: (args: Record<string, unknown>) => Promise<string>,
) {
  return async (args: Record<string, unknown>) => {
    const result = await handler(args);
    return { content: [{ type: "text" as const, text: result }] };
  };
}

// crm_query_project
server.tool(
  "crm_query_project",
  `查询CRM项目信息。支持以下action：

- **list**: 项目列表查询，支持按名称/阶段/负责人/客户等条件筛选和分页
- **detail**: 项目详情查询，根据项目ID获取完整信息（含客户、联系人、合同、要素卡点、跟进记录）
- **statistics**: 项目统计查询，按条件统计项目数量和金额
- **cost**: 项目成本信息查询

常用枚举值：
- stage: leads(销售线索), confirmed(商机阶段1：需求挖掘), tech_pre_research(商机阶段2：技术预研), plan_discuss(商机阶段3：方案论证), project_approval(商机阶段4：立项审批), start_purchase(商机阶段5：启动采购), business_tender(商机阶段6：商务招标), recognized(商机阶段7：签单冲刺), deal(合同签署), invalid(失效), lost_order(丢单)
- level: ordinary(普通), significant(重点项目)
- type: framework(框架), normal(普通)
- contract_sign_type: direct(直签), non_direct(非直签)`,
  {
    action: z.enum(["list", "detail", "statistics", "cost"]).describe("查询操作类型"),
    search: z.record(z.unknown()).optional().describe("[list] 搜索条件，支持name(项目名关键词),stage(阶段数组),claim_by(负责人ID数组),company(客户名),claim_by_group(销售组ID),deal_date/sign_date/created_at({from,to}),amount({from,to}),project_type,contract_sign_type"),
    pagination: z.record(z.unknown()).optional().describe("[list] 分页参数 {skip,limit}，默认skip:0,limit:20"),
    sort_by: z.record(z.unknown()).optional().describe("[list] 排序 {by,order}，by:deal_date/updatedAt，order:1升序/-1降序"),
    id: z.string().optional().describe("[detail/cost] 项目ID"),
    statistics_search: z.record(z.unknown()).optional().describe("[statistics] 统计搜索条件，与search格式相同"),
  },
  wrapHandler(projectQueryHandler),
);

// crm_mutate_project
server.tool(
  "crm_mutate_project",
  `变更CRM项目数据。支持以下action：

- **create**: 创建项目（需提供name,company_id,type,level,stage,deal_date,sign_date,stage_info,project_promise,extra）
- **update_basic**: 更新项目名称和级别（需id,name,level）
- **update_stage**: 更新项目阶段（核心操作，需project_id,stage,deal_logic,stage_info,win_rate,deal_date,sign_date）
- **update_detail**: 更新项目明细-结算方式/产品/合同签署类型等（需project_id,calc_type,contract_sign_type,property）
- **update_labels**: 更新项目标签（需id,labels）
- **update_battle_label**: 更新项目战役标签（需id,battle_label_id）
- **transfer_claim**: 转移项目负责人（需project_id,user_id）
- **update_member**: 更新项目团队成员（需project_id,members）
- **update_performance**: 更新项目业绩分配（需project_id,performances）
- **remove**: 删除项目（需id）
- **update_element**: 更新项目要素（需project_id,element_id,is_finished,stuck_point_note等）
- **create_detail_change_apply**: 创建项目明细变更申请
- **approve_detail_change_apply**: 审批项目明细变更申请
- **update_cost_detail**: 更新项目成本信息
- **update_detail_coefficient**: 更新项目明细系数

常用枚举值：
- stage: leads,confirmed,tech_pre_research,plan_discuss,project_approval,start_purchase,business_tender,recognized,deal,invalid,lost_order
- deal_logic: system(系统判断),artificial(人工判断)
- level: ordinary,significant
- type: framework,normal
- contract_sign_type: direct,non_direct
- delivery_type: self,ecology_service_center,chaitin
- project_promise: must_sign(必签),focus_strive_for(重点争取),strive_for(争取),take_part_in(参与)`,
  {
    action: z.enum(["create", "update_basic", "update_stage", "update_detail", "update_labels", "update_battle_label", "transfer_claim", "update_member", "update_performance", "remove", "update_element", "create_detail_change_apply", "approve_detail_change_apply", "update_cost_detail", "update_detail_coefficient"]).describe("变更操作类型"),
    params: z.record(z.unknown()).describe("操作参数，不同action需要不同参数。参考description中的说明。"),
  },
  wrapHandler(projectMutateHandler),
);

// crm_query_company
server.tool(
  "crm_query_company",
  `查询CRM客户信息。支持以下action：

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
  {
    action: z.enum(["list", "all", "detail", "high_seas"]).describe("查询操作类型"),
    search: z.record(z.unknown()).optional().describe("[list/all] 搜索条件，支持name(客户名关键词数组),rank(客户等级)等"),
    pagination: z.record(z.unknown()).optional().describe("[list/all] 分页 {skip,limit}，默认skip:0,limit:20"),
    id: z.string().optional().describe("[detail/high_seas] 客户ID"),
  },
  wrapHandler(companyHandler),
);

// crm_query_channel
server.tool(
  "crm_query_channel",
  `查询CRM伙伴信息。支持以下action：

- **list**: 伙伴列表查询，支持按名称/状态/类型等条件筛选
- **detail**: 伙伴详情查询

伙伴归属关键字段：
- sale_claim_by: 伙伴销售负责人
- sale_claim_by_group: 伙伴记录所属组
- sale_claim_by_group.parent: 伙伴记录所属一级战队
- sale_claim_by_first_group: 伙伴记录所属一级战队兜底
- channel_sale_claim_by: 伙伴运营负责人

注意：伙伴"记录归属"（sale_claim_by_group）和"负责人当前组织"（sale_claim_by.usergroup）不是同一口径，不能混用。`,
  {
    action: z.enum(["list", "detail"]).describe("查询操作类型"),
    search: z.record(z.unknown()).optional().describe("[list] 搜索条件，支持name(伙伴名关键词数组),status,type等"),
    pagination: z.record(z.unknown()).optional().describe("[list] 分页 {skip,limit}，默认skip:0,limit:20"),
    with_perm: z.boolean().optional().describe("[list] 是否检查权限，默认false"),
    id: z.string().optional().describe("[detail] 伙伴ID"),
  },
  wrapHandler(channelHandler),
);

// crm_contract_finance
server.tool(
  "crm_contract_finance",
  `操作CRM合同、回款、确认收入和应收计划。按domain分组：

**contract (合同)**
- list: 合同列表查询 | detail: 合同详情 | create: 创建合同 | update: 更新合同 | frame_info: 框架合同信息 | update_frame_info: 更新框架合同信息

**revenue (回款)**
- list: 回款列表 | update_plan: 修改回款计划 | add_plan: 新增回款计划 | remove_plan: 删除回款计划 | associate: 回款匹配项目 | change_state: 修改回款状态 | split: 拆分回款

**confirm_revenue (确认收入)**
- list: 确认收入列表 | statistics: 确认收入统计 | create: 发起确认收入 | update_deliver: 交付确认收入 | update_financial: 财务确认收入 | remove: 删除确认收入

**income_plan (应收计划)**
- query: 查询项目应收计划 | create: 创建应收计划`,
  {
    domain: z.enum(["contract", "revenue", "confirm_revenue", "income_plan"]).describe("业务域"),
    action: z.string().describe("操作类型，各domain支持不同的action（见description）"),
    params: z.record(z.unknown()).optional().describe("操作参数"),
  },
  wrapHandler(contractFinanceHandler),
);

// crm_followup
server.tool(
  "crm_followup",
  `管理CRM跟进记录和评论。支持以下action：

- **create_info**: 创建跟进记录（需project_id,type,info,follow_type等。type常见值:project_follow_record(项目跟进),company_background(客户背景)）
- **update_info**: 更新跟进记录（需id,info）
- **delete_info**: 删除跟进记录（需id）
- **create_comment**: 创建评论（需project_id,content,type等）
- **delete_comment**: 删除评论（需id）`,
  {
    action: z.enum(["create_info", "update_info", "delete_info", "create_comment", "delete_comment"]).describe("操作类型"),
    params: z.record(z.unknown()).describe("操作参数。create_info需project_id/type/info; update_info需id/info; delete_info需id; create_comment需project_id/content; delete_comment需id"),
  },
  wrapHandler(followupHandler),
);

// crm_delivery
server.tool(
  "crm_delivery",
  `操作CRM交付与库存相关功能。按domain分组：

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
  {
    domain: z.enum(["product_delivery", "service_delivery", "stock", "hardware", "shipping", "cost"]).describe("业务域"),
    action: z.string().describe("操作类型（见description中各domain支持的action）"),
    params: z.record(z.unknown()).optional().describe("操作参数"),
  },
  wrapHandler(deliveryHandler),
);

// crm_misc
server.tool(
  "crm_misc",
  `其他CRM业务操作。按domain分组：

- **leads**: 线索管理 (list/detail/create/update/update_valid/claim/create_project)
- **company_apply**: 客户申请与审核 (create/review/transfer_claim/update_valid/update_lock/claim/distribute/batch_distribute/update_labels/remove)
- **channel_apply**: 伙伴申请与审核 (create/review/update/transfer_claim/batch_transfer_claim/update_cooperate_status)
- **price**: 价格审批 (list/create/approve/revert)
- **business_chance**: 商机报备 (list/create/review)
- **solution**: 解决方案 (list/create/review)
- **scenario**: 机会场景 (list/create)
- **special_deals**: 特价回溯与验收 (list/create/submit_acceptance)
- **report**: 日报周报 (list/create/update)
- **goal**: 销售目标与提成 (query/commission/update/create_commission_config)
- **user**: 用户与权限 (me/list/create_group/update_group_member/update_permission)
- **product**: 产品配置 (list/create/add_form/add_version/add_draft)
- **config**: 系统配置 (query/update_delivery_approver/update_service_approver)
- **announcement**: 公告 (create)
- **todo**: 待办 (create/finish)
- **export**: 统计与导出 (project/payment/presale/ranking)`,
  {
    domain: z.enum(["leads", "company_apply", "channel_apply", "price", "business_chance", "solution", "scenario", "special_deals", "report", "goal", "user", "product", "config", "announcement", "todo", "export"]).describe("业务域"),
    action: z.string().describe("操作类型（见description中各domain支持的action）"),
    params: z.record(z.unknown()).optional().describe("操作参数"),
  },
  wrapHandler(miscHandler),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("CRM MCP Server failed to start:", err);
  process.exit(1);
});
