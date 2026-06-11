import { crmQuery } from "../graphql-client.js";
import {
  createProject,
  updateProjectBasicInfo,
  updateProjectStage,
  updateProjectDetail,
  updateProjectLabels,
  update_project_battle_label,
  transferProjectClaim,
  updateProjectMember,
  updateProjectPerformanceDistribution,
  removeProject,
  update_project_element,
  create_project_detail_change_apply,
  approve_project_detail_change_apply,
  update_project_cost_detail,
  update_project_detail_coefficient,
} from "../templates/graphql-operations.js";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";

const ACTION_LIST = [
  "create", "update_basic", "update_stage", "update_detail", "update_labels",
  "update_battle_label", "transfer_claim", "update_member", "update_performance",
  "remove", "update_element", "create_detail_change_apply", "approve_detail_change_apply",
  "update_cost_detail", "update_detail_coefficient",
] as const;

export const tool: Tool = {
  name: "crm_mutate_project",
  description: `变更CRM项目数据。支持以下action：

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
  inputSchema: {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: ACTION_LIST,
        description: "变更操作类型",
      },
      params: {
        type: "object",
        description: "操作参数，不同action需要不同参数。参考description中的说明。",
      },
    },
    required: ["action", "params"],
  },
};

export async function handler(args: Record<string, unknown>): Promise<string> {
  const action = args.action as string;
  const params = (args.params ?? {}) as Record<string, unknown>;

  switch (action) {
    case "create":
      return await executeMutation(createProject.query, { input: params });
    case "update_basic":
      return await executeMutation(updateProjectBasicInfo.query, params);
    case "update_stage":
      return await executeMutation(updateProjectStage.query, params);
    case "update_detail":
      return await executeMutation(updateProjectDetail.query, params);
    case "update_labels":
      return await executeMutation(updateProjectLabels.query, params);
    case "update_battle_label":
      return await executeMutation(update_project_battle_label.query, params);
    case "transfer_claim":
      return await executeMutation(transferProjectClaim.query, params);
    case "update_member":
      return await executeMutation(updateProjectMember.query, params);
    case "update_performance":
      return await executeMutation(updateProjectPerformanceDistribution.query, params);
    case "remove":
      return await executeMutation(removeProject.query, params);
    case "update_element":
      return await executeMutation(update_project_element.query, params);
    case "create_detail_change_apply":
      return await executeMutation(create_project_detail_change_apply.query, params);
    case "approve_detail_change_apply":
      return await executeMutation(approve_project_detail_change_apply.query, params);
    case "update_cost_detail":
      return await executeMutation(update_project_cost_detail.query, params);
    case "update_detail_coefficient":
      return await executeMutation(update_project_detail_coefficient.query, params);
    default:
      return `Unknown action: ${action}`;
  }
}

async function executeMutation(query: string, variables: Record<string, unknown>): Promise<string> {
  const data = await crmQuery(query, variables);
  return JSON.stringify(data, null, 2);
}
