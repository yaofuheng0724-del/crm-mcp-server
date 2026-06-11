import { crmQuery } from "../graphql-client.js";
import {
  createProjectInfo,
  updateProjectInfo,
  deleteProjectInfo,
  createComment,
  deleteComment,
} from "../templates/graphql-operations.js";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const tool: Tool = {
  name: "crm_followup",
  description: `管理CRM跟进记录和评论。支持以下action：

- **create_info**: 创建跟进记录（需project_id,type,info,follow_type等。type常见值:project_follow_record(项目跟进),company_background(客户背景)）
- **update_info**: 更新跟进记录（需id,info）
- **delete_info**: 删除跟进记录（需id）
- **create_comment**: 创建评论（需project_id,content,type等）
- **delete_comment**: 删除评论（需id）`,
  inputSchema: {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: ["create_info", "update_info", "delete_info", "create_comment", "delete_comment"],
        description: "操作类型",
      },
      params: {
        type: "object",
        description: "操作参数。create_info需project_id/type/info; update_info需id/info; delete_info需id; create_comment需project_id/content; delete_comment需id",
      },
    },
    required: ["action", "params"],
  },
};

export async function handler(args: Record<string, unknown>): Promise<string> {
  const action = args.action as string;
  const params = (args.params ?? {}) as Record<string, unknown>;

  switch (action) {
    case "create_info": {
      const data = await crmQuery(createProjectInfo.query, params);
      return JSON.stringify(data, null, 2);
    }
    case "update_info": {
      const data = await crmQuery(updateProjectInfo.query, params);
      return JSON.stringify(data, null, 2);
    }
    case "delete_info": {
      const data = await crmQuery(deleteProjectInfo.query, { id: params.id });
      return JSON.stringify(data, null, 2);
    }
    case "create_comment": {
      const data = await crmQuery(createComment.query, params);
      return JSON.stringify(data, null, 2);
    }
    case "delete_comment": {
      const data = await crmQuery(deleteComment.query, { id: params.id });
      return JSON.stringify(data, null, 2);
    }
    default:
      return `Unknown action: ${action}`;
  }
}
