# CRM MCP Server

长亭 CRM 系统的 MCP (Model Context Protocol) Server，通过 GraphQL API 桥接 CRM 数据，供 Claude Code / Hermes 等 AI 工具调用。

## 功能概览

| 工具 | 说明 |
|------|------|
| `crm_query_project` | 项目查询（列表/详情/统计/成本） |
| `crm_mutate_project` | 项目变更（创建/阶段更新/标签/成员/业绩等） |
| `crm_query_company` | 客户查询（列表/归属/详情/公海） |
| `crm_query_channel` | 伙伴查询（列表/详情） |
| `crm_contract_finance` | 合同/回款/确认收入/应收计划 |
| `crm_followup` | 跟进记录与评论 |
| `crm_delivery` | 产品交付/安服交付/库存/发货/硬件售后 |
| `crm_misc` | 线索/客户申请/伙伴申请/价格审批/商机报备/解决方案/日报周报/销售目标/用户权限等 |

## 环境要求

- macOS
- Node.js 18+（项目使用 ES2022 和原生 fetch）

## 安装

```bash
git clone <仓库地址>
cd crm-mcp-server
npm install
npm run build
```

构建产物输出到 `dist/` 目录。

## 获取 CRM Token

1. 登录长亭 CRM 系统
2. 打开浏览器开发者工具（F12）→ Application → Cookies
3. 找到 CRM 相关的认证 Token（通常为 `pt_` 开头的字符串）

> 如果无法找到，请联系 CRM 管理员获取 API Token。

## 配置

Claude Code 和 Hermes 使用相同的 MCP 配置方式，有两种配置位置：

### 方式一：全局配置（推荐）

编辑 `~/.claude.json`，在 `mcpServers` 字段中添加：

```json
{
  "mcpServers": {
    "crm": {
      "type": "stdio",
      "command": "node",
      "args": ["/Users/你的用户名/路径/crm-mcp-server/dist/index.js"],
      "env": {
        "CRM_TOKEN": "你的CRM Token",
        "CRM_API_URL": "http://api.in.chaitin.net/crm/query"
      }
    }
  }
}
```

配置后对所有项目生效。

### 方式二：项目级配置

在你的项目根目录创建 `.mcp.json`：

```json
{
  "mcpServers": {
    "crm": {
      "type": "stdio",
      "command": "node",
      "args": ["/Users/你的用户名/路径/crm-mcp-server/dist/index.js"],
      "env": {
        "CRM_TOKEN": "你的CRM Token",
        "CRM_API_URL": "http://api.in.chaitin.net/crm/query"
      }
    }
  }
}
```

仅在该项目目录下生效。

> **注意：** `CRM_API_URL` 为可选项，默认值为 `http://api.in.chaitin.net/crm/query`。内网环境通常无需修改。`CRM_TOKEN` 为必填项。

## 验证

1. 重启 Claude Code 或 Hermes
2. 输入涉及 CRM 的问题，例如："帮我查询我负责的进行中项目"
3. 如果 AI 调用了 `crm_query_project` 等工具并返回数据，说明配置成功

## 项目结构

```
src/
├── index.ts                    # 入口：注册 MCP 工具并启动 Server
├── graphql-client.ts           # CRM GraphQL API 客户端
├── templates/
│   └── graphql-operations.ts   # GraphQL 查询与变更模板
└── tools/
    ├── project-query.ts        # 项目查询
    ├── project-mutate.ts       # 项目变更
    ├── company.ts              # 客户查询
    ├── channel.ts              # 伙伴查询
    ├── contract-finance.ts     # 合同与财务
    ├── followup.ts             # 跟进记录
    ├── delivery.ts             # 交付与库存
    └── misc.ts                 # 其他业务操作
```

## 开发

```bash
npm run build    # 编译 TypeScript
npm run start    # 运行 Server（需配置环境变量）
```
