# CRM GraphQL 操作模板大全

> 本文档基于 CRM GraphQL Schema 生成，涵盖项目、客户、伙伴、合同、回款、确认收入、线索、交付、报告、销售目标、用户权限、产品配置、价格审批、库存、系统配置、商机报备、解决方案、机会场景、特价回溯、公告待办、统计导出等全部核心业务模块。每个操作均包含 GraphQL 语句、示例变量、参数说明（必填/可选）、可选值枚举及预期结果。

---

## 一、项目核心操作

### 1. listProject (项目列表查询)

**用途**：按条件搜索项目列表，支持分页与排序。

```graphql
query ListProject($search: ProjectSearchParam!, $pagination: PaginationParam, $sort_by: SortBy!) {
  listProject(search: $search, pagination: $pagination, sort_by: $sort_by) {
    total
    skip
    limit
    data {
      id
      name
      stage
      level
      type
      deal_date
      sign_date
      deal_amount
      win_rate
      company { id name common_name }
      claimBy { id user { name } }
      created_at
      updated_at
    }
  }
}
```

```json
{
  "search": {
    "name": ["银行"],
    "stage": ["tech_pre_research", "plan_discuss"],
    "claim_by": ["user_001"],
    "deal_date": { "from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00" }
  },
  "pagination": { "skip": 0, "limit": 20 },
  "sort_by": { "by": "updatedAt", "order": -1 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | ProjectSearchParam | 是 | 搜索条件对象 |
| `search.name` | [String!] | 否 | 项目名称关键词（模糊） |
| `search.stage` | [String!] | 否 | 项目阶段筛选 |
| `search.claim_by` | [String!] | 否 | 负责人用户ID |
| `search.claim_by_group` | [String!] | 否 | 销售组ID |
| `search.company` | [String!] | 否 | 客户名称 |
| `search.deal_date` | TimeFromTo | 否 | 成交日期范围 {from, to} |
| `search.sign_date` | TimeFromTo | 否 | 签约日期范围 |
| `search.created_at` | TimeFromTo | 否 | 创建日期范围 |
| `search.amount` | DecimalFromTo | 否 | 金额范围 |
| `search.project_type` | [ProjectType!] | 否 | 项目类型 |
| `search.contract_sign_type` | [ContractSignType!] | 否 | 合同签署类型 |
| `pagination` | PaginationParam | 否 | 分页 {skip, limit} |
| `sort_by` | SortBy! | 是 | 排序 {by, order}，order: 1升序, -1降序 |

**可选值参考**
- `stage`：`leads`, `confirmed`, `tech_pre_research`, `plan_discuss`, `project_approval`, `start_purchase`, `business_tender`, `recognized`, `deal`, `invalid`, `lost_order`, `signed_terminated`
- `level`：`ordinary`, `significant`
- `type`：`framework`, `normal`
- `contract_sign_type`：`direct`, `non_direct`
- `sort_by.by`：`deal_date`, `updatedAt`

**预期结果**：返回 `ProjectConnection`，包含 total（总数）、skip、limit、data（项目数组）。

---

### 2. projectInfo (项目详情查询)

**用途**：根据ID获取单个项目的完整详情。

```graphql
query ProjectInfo($id: ID!) {
  projectInfo(id: $id) {
    id
    name
    stage
    level
    type
    deal_date
    sign_date
    deal_amount
    win_rate
    calc_type
    contract_sign_type
    delivery_type
    property
    deal_logic
    company { id name }
    claimBy { id user { name } }
    clients { id name phone email position }
    contracts { id name contractState { name } }
    created_at
    updated_at
  }
}
```

```json
{ "id": "proj_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目唯一标识 |

**预期结果**：返回 `Project` 完整对象，若项目不存在则返回 null 或报错。

---

### 3. createProject (创建项目)

**用途**：新建一个项目（普通或框架）。

```graphql
mutation CreateProject($input: InputProject!) {
  createProject(input: $input) {
    id
    name
    stage
    level
    deal_date
    sign_date
    created_at
  }
}
```

```json
{
  "input": {
    "name": "XX银行安全防护项目",
    "company_id": "comp_456",
    "type": "normal",
    "level": "significant",
    "deal_date": "2026-08-01T00:00:00+08:00",
    "sign_date": "2026-09-01T00:00:00+08:00",
    "stage": "leads",
    "stage_info": {
      "info": "新建项目",
      "attachments": [],
      "todos": []
    },
    "leads_convert_condition": [],
    "project_promise": "delivery_standard",
    "extra": { "source": "线索转化" }
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input.name` | String! | 是 | 项目名称 |
| `input.company_id` | String! | 是 | 关联客户ID |
| `input.type` | ProjectType! | 是 | 项目类型 |
| `input.level` | ProjectLevel! | 是 | 项目级别 |
| `input.deal_date` | Time! | 是 | 成交日期（ISO 8601） |
| `input.sign_date` | Time! | 是 | 签约日期 |
| `input.stage` | ProjectStage! | 是 | 初始阶段 |
| `input.stage_info` | InputProjectStageInfo! | 是 | 阶段详情 {info, attachments, todos} |
| `input.project_promise` | ProjectStageInfoProjectPromise! | 是 | 项目承诺 |
| `input.leads_convert_condition` | [InputLeadsConvertConditionWithContent!]! | 否 | 线索转化条件，默认 [] |
| `input.extra` | InputProjectExtra! | 是 | 额外信息 |

**可选值参考**
- `type`：`framework`（框架）, `normal`（普通）
- `level`：`ordinary`, `significant`
- `stage`：见 listProject 可选值
- `project_promise`：需根据系统配置，常见如 `delivery_standard`

**预期结果**：返回创建的 `Project` 对象，含自动生成 id。

---

### 4. updateProjectBasicInfo (更新项目基本信息)

**用途**：修改项目名称和级别。

```graphql
mutation UpdateProjectBasicInfo($id: ID!, $name: String!, $level: ProjectLevel!) {
  updateProjectBasicInfo(id: $id, name: $name, level: $level) {
    id
    name
    level
    updated_at
  }
}
```

```json
{
  "id": "proj_123",
  "name": "XX银行安全防护项目（更新）",
  "level": "ordinary"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目ID |
| `name` | String! | 是 | 新项目名称 |
| `level` | ProjectLevel! | 是 | 项目级别 |

**可选值参考**
- `level`：`ordinary`, `significant`

**预期结果**：返回更新后的 `Project` 对象。

---

### 5. updateProjectStage (更新项目阶段)

**用途**：推进或回退项目阶段，是项目生命周期中最核心的操作。

```graphql
mutation UpdateProjectStage(
  $project_id: String!
  $stage: ProjectStage!
  $deal_logic: DealLogic!
  $artificial_reason: String
  $stage_info: InputProjectStageInfo!
  $project_promise: ProjectStageInfoProjectPromise
  $main_reason: String
  $minor_reason: [String!]
  $invalid_reason: String
  $win_rate: String!
  $deal_date: Time!
  $sign_date: Time!
  $contract_sign_type: ContractSignType
  $delivery_type: DeliveryType
  $partners: [InputPartner!]
) {
  updateProjectStage(
    project_id: $project_id
    stage: $stage
    deal_logic: $deal_logic
    artificial_reason: $artificial_reason
    stage_info: $stage_info
    project_promise: $project_promise
    main_reason: $main_reason
    minor_reason: $minor_reason
    invalid_reason: $invalid_reason
    win_rate: $win_rate
    deal_date: $deal_date
    sign_date: $sign_date
    contract_sign_type: $contract_sign_type
    delivery_type: $delivery_type
    partners: $partners
  )
}
```

```json
{
  "project_id": "proj_123",
  "stage": "tech_pre_research",
  "deal_logic": "system",
  "artificial_reason": null,
  "stage_info": {
    "info": "进入技术预研阶段",
    "attachments": [],
    "todos": []
  },
  "project_promise": "delivery_standard",
  "main_reason": "客户发起技术交流",
  "minor_reason": [],
  "invalid_reason": null,
  "win_rate": "60%",
  "deal_date": "2026-06-30T00:00:00+08:00",
  "sign_date": "2026-07-15T00:00:00+08:00",
  "contract_sign_type": "direct",
  "delivery_type": "standard",
  "partners": []
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | String! | 是 | 项目ID |
| `stage` | ProjectStage! | 是 | 目标阶段 |
| `deal_logic` | DealLogic! | 是 | 成交逻辑：system(系统判断) / artificial(人工判断) |
| `artificial_reason` | String | 否 | 人工判定理由，`deal_logic=artificial` 时必填 |
| `stage_info` | InputProjectStageInfo! | 是 | 阶段信息 {info, attachments, todos} |
| `project_promise` | ProjectStageInfoProjectPromise | 否 | 项目承诺 |
| `main_reason` | String | 否 | 阶段变更主要原因 |
| `minor_reason` | [String!] | 否 | 次要原因数组 |
| `invalid_reason` | String | 否 | 失效原因，stage 变为 `invalid` 时必填 |
| `win_rate` | String! | 是 | 赢率，如 "80%" |
| `deal_date` | Time! | 是 | 成交日期 |
| `sign_date` | Time! | 是 | 签约日期 |
| `contract_sign_type` | ContractSignType | 否 | 直签/非直签 |
| `delivery_type` | DeliveryType | 否 | 交付类型 |
| `partners` | [InputPartner!] | 否 | 合作伙伴列表 |

**可选值参考**
- `stage`：`leads`, `confirmed`, `tech_pre_research`, `plan_discuss`, `project_approval`, `start_purchase`, `business_tender`, `recognized`, `deal`, `invalid`, `lost_order`, `signed_terminated`
- `deal_logic`：`system`, `artificial`
- `contract_sign_type`：`direct`, `non_direct`
- `delivery_type`：`self`, `ecology_service_center`, `chaitin`

**预期结果**：返回 `Boolean`，true 表示阶段更新成功。

---

### 6. updateProjectDetail (更新项目明细)

**用途**：更新项目的结算方式、产品清单、合同签署类型、项目属性、交付类型等核心商务信息。

```graphql
mutation UpdateProjectDetail(
  $project_id: ID!
  $calc_type: ProjectCalcType!
  $products: [InputProduct!]
  $contract_sign_type: ContractSignType!
  $property: ProjectProperty!
  $delivery_type: DeliveryType
  $partners: [InputPartner!]
  $solution_ids: [String!]
) {
  updateProjectDetail(
    project_id: $project_id
    calc_type: $calc_type
    products: $products
    contract_sign_type: $contract_sign_type
    property: $property
    delivery_type: $delivery_type
    partners: $partners
    solution_ids: $solution_ids
  )
}
```

```json
{
  "project_id": "proj_123",
  "calc_type": "standard",
  "products": [
    { "product_id": "prod_001", "quantity": 2, "price": 150000 }
  ],
  "contract_sign_type": "direct",
  "property": "new",
  "delivery_type": "self",
  "partners": [],
  "solution_ids": []
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | ID! | 是 | 项目ID |
| `calc_type` | ProjectCalcType! | 是 | 结算方式 |
| `products` | [InputProduct!] | 否 | 产品列表，每项含 product_id, quantity, price |
| `contract_sign_type` | ContractSignType! | 是 | 合同签署类型 |
| `property` | ProjectProperty! | 是 | 项目属性 |
| `delivery_type` | DeliveryType | 否 | 交付类型 |
| `partners` | [InputPartner!] | 否 | 合作伙伴 |
| `solution_ids` | [String!] | 否 | 解决方案ID列表 |

**可选值参考**
- `contract_sign_type`：`direct`, `non_direct`
- `delivery_type`：`self`, `ecology_service_center`, `chaitin`
- `property`：常见 `new`, `continuous`（需以系统实际配置为准）

**预期结果**：返回 `Boolean`，true 表示更新成功。

---

### 7. updateProjectLabels (更新项目标签)

**用途**：为项目设置标签。

```graphql
mutation UpdateProjectLabels($id: ID!, $labels: [String!]) {
  updateProjectLabels(id: $id, labels: $labels) {
    id
    labels { id name }
  }
}
```

```json
{
  "id": "proj_123",
  "labels": ["label_001", "label_002"]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目ID |
| `labels` | [String!] | 否 | 标签ID列表，传空数组可清空 |

**预期结果**：返回更新后的 `Project`，含 labels 数组。

---

### 8. update_project_battle_label (更新项目战役标签)

**用途**：设置项目关联的战役标签。

```graphql
mutation UpdateProjectBattleLabel($id: ID!, $battle_label_ids: [String!]!) {
  update_project_battle_label(id: $id, battle_label_ids: $battle_label_ids)
}
```

```json
{
  "id": "proj_123",
  "battle_label_ids": ["battle_001"]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目ID |
| `battle_label_ids` | [String!]! | 是 | 战役标签ID数组 |

**预期结果**：返回 `Boolean`。

---

### 9. transferProjectClaim (转移项目负责人)

**用途**：将项目的销售负责人转移给其他用户。

```graphql
mutation TransferProjectClaim($id: ID!, $now: ID!) {
  transferProjectClaim(id: $id, now: $now)
}
```

```json
{
  "id": "proj_123",
  "now": "user_456"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目ID |
| `now` | ID! | 是 | 新负责人用户ID |

**预期结果**：返回 `Boolean`。

---

### 10. updateProjectMember (更新项目团队成员)

**用途**：设置项目团队成员（非负责人）。

```graphql
mutation UpdateProjectMember($id: ID!, $member_ids: [ID!]) {
  updateProjectMember(id: $id, member_ids: $member_ids)
}
```

```json
{
  "id": "proj_123",
  "member_ids": ["user_002", "user_003"]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目ID |
| `member_ids` | [ID!] | 否 | 成员用户ID列表，空数组清空 |

**预期结果**：返回 `Boolean`。

---

### 11. updateProjectPerformanceDistribution (更新项目业绩分配)

**用途**：分配项目的签单业绩、确收业绩、利润业绩比例。

```graphql
mutation UpdateProjectPerformanceDistribution($id: ID!, $input: [InputUserPerformancePercent!]!) {
  updateProjectPerformanceDistribution(id: $id, input: $input)
}
```

```json
{
  "id": "proj_123",
  "input": [
    { "user_id": "user_001", "percent": 60 },
    { "user_id": "user_002", "percent": 40 }
  ]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目ID |
| `input` | [InputUserPerformancePercent!]! | 是 | 分配数组，每项含 user_id 和 percent（百分比数字） |

**预期结果**：返回 `Boolean`。

---

### 12. removeProject (删除项目)

**用途**：删除项目（通常仅管理员可用）。

```graphql
mutation RemoveProject($id: ID!) {
  removeProject(id: $id)
}
```

```json
{ "id": "proj_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目ID |

**预期结果**：返回 `Boolean`。

---

## 二、项目成本与明细变更

### 13. projectCostInfo (项目成本信息查询)

**用途**：查询项目的成本明细与毛利率信息。

```graphql
query ProjectCostInfo($id: ID!) {
  projectCostInfo(id: $id) {
    id
    product_cost
    service_cost
    third_cost
    other_cost
    gross_margin
    gross_margin_rate
    created_at
    updated_at
  }
}
```

```json
{ "id": "proj_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目ID |

**预期结果**：返回 `ProjectCostInfo` 对象，含各类成本与毛利率字段。

---

### 14. update_project_cost_detail (更新项目成本信息)

**用途**：更新项目的商品明细成本，用于重新计算毛利率。

```graphql
mutation UpdateProjectCostDetail($project_id: ID!, $details: [InputProjectProductCostDetail!]!) {
  update_project_cost_detail(project_id: $project_id, details: $details)
}
```

```json
{
  "project_id": "proj_123",
  "details": [
    { "product_id": "prod_001", "form_id": "form_001", "cost": 50000 }
  ]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | ID! | 是 | 项目ID |
| `details` | [InputProjectProductCostDetail!]! | 是 | 成本明细数组 |

**预期结果**：返回 `Boolean`。

---

### 15. update_project_detail_coefficient (更新项目明细系数)

**用途**：修改项目的付款系数与其他系数。

```graphql
mutation UpdateProjectDetailCoefficient(
  $project_id: ID!
  $payment_coefficient: Float!
  $other_coefficient: Float!
  $coefficient_desc: String!
) {
  update_project_detail_coefficient(
    project_id: $project_id
    payment_coefficient: $payment_coefficient
    other_coefficient: $other_coefficient
    coefficient_desc: $coefficient_desc
  )
}
```

```json
{
  "project_id": "proj_123",
  "payment_coefficient": 1.0,
  "other_coefficient": 1.0,
  "coefficient_desc": "标准系数"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | ID! | 是 | 项目ID |
| `payment_coefficient` | Float! | 是 | 付款系数 |
| `other_coefficient` | Float! | 是 | 其他系数 |
| `coefficient_desc` | String! | 是 | 系数说明 |

**预期结果**：返回 `Boolean`。

---

### 16. create_project_detail_change_apply (创建项目明细变更申请)

**用途**：签约后申请变更项目明细（产品、价格等），需走审批流程。

```graphql
mutation CreateProjectDetailChangeApply($input: InputProjectDetailChangeApply!) {
  create_project_detail_change_apply(input: $input)
}
```

```json
{
  "input": {
    "project_id": "proj_123",
    "change_scene": ["product_change"],
    "scene_info": "更换产品型号",
    "change_reason": ["customer_requirement_change"],
    "change_reason_info": "客户需求变更",
    "assessment_increment": 0,
    "assessment_reason": ""
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input.project_id` | String! | 是 | 项目ID |
| `input.change_scene` | [ProjectDetailChangeApplyChangeScene!]! | 是 | 变更场景数组 |
| `input.scene_info` | String! | 否 | 场景补充说明（默认空字符串） |
| `input.change_reason` | [ProjectDetailChangeApplyChangeReason!]! | 是 | 变更原因数组 |
| `input.change_reason_info` | String! | 是 | 原因详情 |
| `input.assessment_increment` | Float! | 否 | 评估增量金额（默认0） |
| `input.assessment_reason` | String! | 否 | 评估说明（默认空字符串） |

**预期结果**：返回 `Boolean`，true 表示申请创建成功。

---

### 17. approve_project_detail_change_apply (审批项目明细变更申请)

**用途**：审批通过或驳回项目明细变更申请。

```graphql
mutation ApproveProjectDetailChangeApply($apply_id: String!, $result: Boolean!, $note: String!) {
  approve_project_detail_change_apply(apply_id: $apply_id, result: $result, note: $note)
}
```

```json
{
  "apply_id": "apply_456",
  "result": true,
  "note": "同意变更"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `apply_id` | String! | 是 | 申请ID |
| `result` | Boolean! | 是 | true 通过，false 驳回 |
| `note` | String! | 是 | 审批意见 |

**预期结果**：返回 `Boolean`。

---

### 18. update_project_element (更新项目要素)

**用途**：更新项目的销售要素、方向及是否重新计算承诺。

```graphql
mutation UpdateProjectElement(
  $project_id: String!
  $input_project_element: [InputProjectElement!]!
  $input_project_direction: [InputProjectDirection!]!
  $calc_project_promise: Boolean!
) {
  update_project_element(
    project_id: $project_id
    input_project_element: $input_project_element
    input_project_direction: $input_project_direction
    calc_project_promise: $calc_project_promise
  )
}
```

```json
{
  "project_id": "proj_123",
  "input_project_element": [],
  "input_project_direction": [],
  "calc_project_promise": false
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | String! | 是 | 项目ID |
| `input_project_element` | [InputProjectElement!]! | 是 | 项目要素数组 |
| `input_project_direction` | [InputProjectDirection!]! | 是 | 项目方向数组 |
| `calc_project_promise` | Boolean! | 是 | 是否重新计算项目承诺 |

**预期结果**：返回 `Boolean`。

---

## 三、产品交付与售后

### 19. list_project_delivery_stock (查询项目已交付设备)

**用途**：查询某项目下所有已交付的硬件设备。

```graphql
query ListProjectDeliveryStock($project_id: String!) {
  list_project_delivery_stock(project_id: $project_id) {
    id
    serial
    product_type
    product_model
    in_stock_time
    last_out_stock_time
    saler { name }
    tech_support { name }
  }
}
```

```json
{ "project_id": "proj_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | String! | 是 | 项目ID |

**预期结果**：返回 `[HardwareAfterSaleProduct!]!` 数组。

---

### 20. create_product_delivery (创建产品交付)

**用途**：为项目发起产品交付流程。

```graphql
mutation CreateProductDelivery(
  $project_id: String!
  $assigner: String!
  $product_list: [InputProductWithForm!]!
  $license_validity: String!
  $after_sale_validity: String!
  $implement_note: String
  $is_early_note: String
  $estimate_deal_time: Time
  $delivery_note: String
  $project_check: String
  $project_other_note: String!
  $attachments: [String!]
) {
  create_product_delivery(
    project_id: $project_id
    assigner: $assigner
    product_list: $product_list
    license_validity: $license_validity
    after_sale_validity: $after_sale_validity
    implement_note: $implement_note
    is_early_note: $is_early_note
    estimate_deal_time: $estimate_deal_time
    delivery_note: $delivery_note
    project_check: $project_check
    project_other_note: $project_other_note
    attachments: $attachments
  )
}
```

```json
{
  "project_id": "proj_123",
  "assigner": "user_delivery_001",
  "product_list": [{ "product_id": "prod_001", "form_id": "form_001" }],
  "license_validity": "1年",
  "after_sale_validity": "3年",
  "implement_note": null,
  "is_early_note": null,
  "estimate_deal_time": null,
  "delivery_note": "标准交付",
  "project_check": "已通过",
  "project_other_note": "无",
  "attachments": []
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | String! | 是 | 项目ID |
| `assigner` | String! | 是 | 交付分配人用户ID |
| `product_list` | [InputProductWithForm!]! | 是 | 交付产品列表 |
| `license_validity` | String! | 是 | 许可有效期 |
| `after_sale_validity` | String! | 是 | 售后有效期 |
| `project_other_note` | String! | 是 | 其他备注 |
| `implement_note` | String | 否 | 提前实施备注 |
| `is_early_note` | String | 否 | 是否提前实施说明 |
| `estimate_deal_time` | Time | 否 | 预计成交时间 |
| `delivery_note` | String | 否 | 交付备注 |
| `project_check` | String | 否 | 项目检查说明 |
| `attachments` | [String!] | 否 | 附件ID列表 |

**预期结果**：返回 `Boolean`。

---

### 21. review_product_delivery (审批产品交付)

**用途**：审批产品交付申请。

```graphql
mutation ReviewProductDelivery($id: String!, $status: Boolean!, $reason: String!, $sign_stage: DeliverySignStage) {
  review_product_delivery(id: $id, status: $status, reason: $reason, sign_stage: $sign_stage)
}
```

```json
{
  "id": "delivery_456",
  "status": true,
  "reason": "审批通过",
  "sign_stage": "contractAwardedProject"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | String! | 是 | 交付ID |
| `status` | Boolean! | 是 | true 通过，false 驳回 |
| `reason` | String! | 是 | 审批理由 |
| `sign_stage` | DeliverySignStage | 否 | 交付签约阶段 |

**可选值参考**
- `sign_stage`：`contractAwardedProject`, `unContractAwardedProject`, `serviceBeforeSettlementProject`

**预期结果**：返回 `Boolean`。

---

### 22. update_product_delivery_time_info (更新产品预计交付/验收时间)

**用途**：设置产品交付的预计交付时间和验收时间。

```graphql
mutation UpdateProductDeliveryTimeInfo($info: InputProductDeliveryTimeInfo!) {
  update_product_delivery_time_info(info: $info)
}
```

```json
{
  "info": {
    "project_id": "proj_123",
    "product_id": "prod_001",
    "form_id": "form_001",
    "estimate_delivery_time": "2026-06-01T00:00:00+08:00",
    "estimate_acceptance_time": "2026-06-15T00:00:00+08:00"
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `info` | InputProductDeliveryTimeInfo! | 是 | 时间信息对象 |
| `info.project_id` | String! | 是 | 项目ID |
| `info.product_id` | String! | 是 | 产品ID |
| `info.form_id` | String! | 是 | 产品形态ID |
| `info.estimate_delivery_time` | Time | 否 | 预计交付时间 |
| `info.estimate_acceptance_time` | Time | 否 | 预计验收时间 |

**预期结果**：返回 `Boolean`。

---

### 23. designation_product_delivery_person_in_charge (指定产品交付负责人)

**用途**：为产品交付指定具体负责人。

```graphql
mutation DesignationProductDeliveryPersonInCharge($id: String!, $person_in_charge: String!) {
  designation_product_delivery_person_in_charge(id: $id, person_in_charge: $person_in_charge)
}
```

```json
{
  "id": "delivery_456",
  "person_in_charge": "user_789"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | String! | 是 | 交付ID |
| `person_in_charge` | String! | 是 | 负责人用户ID |

**预期结果**：返回 `Boolean`。

---

### 24. create_product_after_sale (创建产品售后)

**用途**：为已交付产品创建售后服务记录。

```graphql
mutation CreateProductAfterSale($input: InputProductAfterSale!) {
  create_product_after_sale(input: $input)
}
```

```json
{
  "input": {
    "project_id": "proj_123",
    "product_id": "prod_001",
    "form_id": "form_001",
    "type": "repair",
    "reason": "硬件故障",
    "note": "需要更换主板"
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input` | InputProductAfterSale! | 是 | 售后信息对象 |
| `input.project_id` | String! | 是 | 项目ID |
| `input.product_id` | String! | 是 | 产品ID |
| `input.form_id` | String! | 是 | 产品形态ID |
| `input.type` | String! | 是 | 售后类型 |
| `input.reason` | String! | 是 | 售后原因 |
| `input.note` | String! | 是 | 备注 |

**预期结果**：返回 `Boolean`。

---

## 四、安服交付

### 25. init_service_delivery (发起安服交付)

**用途**：为安服项目发起交付流程。

```graphql
mutation InitServiceDelivery($delivery_id: ID!, $reason: String, $file: [ID!], $estimate_deal_time: Time) {
  init_service_delivery(delivery_id: $delivery_id, reason: $reason, file: $file, estimate_deal_time: $estimate_deal_time)
}
```

```json
{
  "delivery_id": "delivery_789",
  "reason": "客户要求启动安服交付",
  "file": [],
  "estimate_deal_time": "2026-07-01T00:00:00+08:00"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `delivery_id` | ID! | 是 | 交付ID |
| `reason` | String | 否 | 发起原因 |
| `file` | [ID!] | 否 | 附件ID列表 |
| `estimate_deal_time` | Time | 否 | 预计成交/交付时间 |

**预期结果**：返回 `Boolean`。

---

### 26. review_service_delivery (审批安服交付)

**用途**：审批安服交付申请。

```graphql
mutation ReviewServiceDelivery($delivery_id: ID!, $status: Boolean!, $reason: String!, $sign_stage: DeliverySignStage) {
  review_service_delivery(delivery_id: $delivery_id, status: $status, reason: $reason, sign_stage: $sign_stage)
}
```

```json
{
  "delivery_id": "delivery_789",
  "status": true,
  "reason": "审批通过",
  "sign_stage": "contractAwardedProject"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `delivery_id` | ID! | 是 | 交付ID |
| `status` | Boolean! | 是 | true 通过，false 驳回 |
| `reason` | String! | 是 | 审批理由 |
| `sign_stage` | DeliverySignStage | 否 | 签约阶段 |

**预期结果**：返回 `Boolean`。

---

### 27. finish_service_delivery (结束安服交付)

**用途**：标记安服交付完成。

```graphql
mutation FinishServiceDelivery($delivery_id: ID!) {
  finish_service_delivery(delivery_id: $delivery_id)
}
```

```json
{ "delivery_id": "delivery_789" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `delivery_id` | ID! | 是 | 交付ID |

**预期结果**：返回 `Boolean`。

---

### 28. finish_early_service_delivery (终止提前实施)

**用途**：终止安服项目的提前实施状态。

```graphql
mutation FinishEarlyServiceDelivery($delivery_id: ID!, $reason: String!) {
  finish_early_service_delivery(delivery_id: $delivery_id, reason: $reason)
}
```

```json
{
  "delivery_id": "delivery_789",
  "reason": "客户要求延期"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `delivery_id` | ID! | 是 | 交付ID |
| `reason` | String! | 是 | 终止原因 |

**预期结果**：返回 `Boolean`。

---

### 29. punish_service_delivery (安服交付惩罚)

**用途**：对安服交付进行惩罚或取消惩罚。

```graphql
mutation PunishServiceDelivery(
  $delivery_id: ID!
  $is_punish: Boolean!
  $reason: String!
  $amount: String!
  $attachments: [ID!]!
) {
  punish_service_delivery(
    delivery_id: $delivery_id
    is_punish: $is_punish
    reason: $reason
    amount: $amount
    attachments: $attachments
  )
}
```

```json
{
  "delivery_id": "delivery_789",
  "is_punish": true,
  "reason": "逾期交付",
  "amount": "5000",
  "attachments": []
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `delivery_id` | ID! | 是 | 交付ID |
| `is_punish` | Boolean! | 是 | true 惩罚，false 取消惩罚 |
| `reason` | String! | 是 | 原因 |
| `amount` | String! | 是 | 惩罚金额（元） |
| `attachments` | [ID!]! | 否 | 附件ID，默认 [] |

**预期结果**：返回 `Boolean`。

---

## 五、客户管理

### 30. listCompany (客户列表查询)

**用途**：查询客户列表，支持我的客户/全部客户。

```graphql
query ListCompany($search: [CompanySearchParam!], $pagination: PaginationParam) {
  listCompany(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      name
      common_name
      rank
      industry { id name }
      region { id name }
      claim_by { id name }
      claim_by_group { id name }
      valid
      lock
      created_at
      updated_at
    }
  }
}
```

```json
{
  "search": [
    {
      "name": ["科技"],
      "rank": ["A", "KA"],
      "valid": true,
      "region": ["reg_beijing"]
    }
  ],
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | [CompanySearchParam!] | 否 | 搜索条件数组 |
| `search.name` | [String!] | 否 | 客户名称关键词 |
| `search.rank` | [CompanyRank!] | 否 | 客户等级 |
| `search.claim_by` | [ID!] | 否 | 负责人ID |
| `search.claim_by_group` | [String!] | 否 | 销售组 |
| `search.industry` | [ID!] | 否 | 行业ID |
| `search.region` | [ID!] | 否 | 区域ID |
| `search.valid` | Boolean | 否 | 是否有效 |
| `search.lock` | Boolean | 否 | 是否锁定 |
| `search.created_at` | TimeFromTo | 否 | 创建时间范围 |
| `pagination` | PaginationParam | 否 | 分页 {skip, limit} |

**可选值参考**
- `rank`：`KA`, `A`, `B`, `C`
- `valid`：true(有效), false(失效)
- `lock`：true(锁定), false(未锁定)

**预期结果**：返回 `CompanyConnection`，含 total/skip/limit/data。

---

### 31. companyInfo (客户详情查询)

**用途**：根据ID查询客户详情。

```graphql
query CompanyInfo($id: ID!) {
  companyInfo(id: $id) {
    id
    name
    common_name
    zip_code
    rank
    industry { id name }
    region { id name }
    country { id name }
    claim_by { id name }
    claim_by_group { id name }
    contacts { id name position phone email }
    projects { id name stage deal_amount }
    valid
    lock
    created_at
    updated_at
  }
}
```

```json
{ "id": "comp_456" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 客户ID |

**预期结果**：返回 `Company` 完整对象。

---

### 32. find_company_or_high_seas_company_by_id (查询客户或公海客户)

**用途**：根据ID查询我的客户或公海客户详情。

```graphql
query FindCompanyOrHighSeasCompanyById($id: ID!) {
  find_company_or_high_seas_company_by_id(id: $id) {
    id
    name
    common_name
    rank
    claim_by { id name }
    valid
    lock
    enter_high_seas_at
  }
}
```

```json
{ "id": "comp_456" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 客户ID |

**预期结果**：返回 `Company` 或 `null`（无权限或不存在）。

---

### 33. createCompanyApplyByCreate (创建客户申请)

**用途**：提交新客户创建申请，需审批通过后正式创建。

```graphql
mutation CreateCompanyApplyByCreate(
  $input: InputCompany!
  $contact_name: String!
  $contact_position: String!
  $contact_phone: String!
  $note: String!
  $budget: InputCompanyBudget
) {
  createCompanyApplyByCreate(
    input: $input
    contact_name: $contact_name
    contact_position: $contact_position
    contact_phone: $contact_phone
    note: $note
    budget: $budget
  ) {
    id
    status
    created_at
  }
}
```

```json
{
  "input": {
    "credit_code": "91110000123456789X",
    "name": "北京XX科技有限公司",
    "common_name": "XX科技",
    "country": "CN",
    "industry": "ind_tech",
    "region": "reg_beijing",
    "zip_code": "100000",
    "phone": "010-12345678",
    "claim_by": "user_001",
    "claim_by_group": "group_sales_north",
    "parent": "",
    "info": "专注于金融科技领域的安全解决方案提供商",
    "rank": "A",
    "attachments": [],
    "leads_id": null
  },
  "contact_name": "张三",
  "contact_position": "信息安全总监",
  "contact_phone": "13800138000",
  "note": "通过行业展会接触，有明确的安全产品采购需求",
  "budget": {
    "amount": 500000,
    "currency": "CNY"
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input` | InputCompany! | 是 | 客户信息对象 |
| `input.credit_code` | String! | 是 | 统一社会信用代码 |
| `input.name` | String! | 是 | 客户全称 |
| `input.common_name` | String! | 是 | 客户简称 |
| `input.country` | ID! | 是 | 国家ID |
| `input.industry` | ID! | 是 | 行业ID |
| `input.region` | ID! | 是 | 区域ID |
| `input.zip_code` | String! | 是 | 邮编 |
| `input.phone` | String! | 是 | 电话 |
| `input.parent` | String! | 是 | 父公司ID（无则空字符串） |
| `input.info` | String! | 是 | 客户信息描述 |
| `input.rank` | CompanyRank! | 是 | 客户等级 |
| `input.claim_by` | String! | 否 | 负责人ID（默认空） |
| `input.claim_by_group` | String! | 否 | 负责组ID（默认空） |
| `input.attachments` | [ID!] | 否 | 附件ID列表 |
| `input.leads_id` | ID | 否 | 关联线索ID |
| `contact_name` | String! | 是 | 联系人姓名 |
| `contact_position` | String! | 是 | 联系人职位 |
| `contact_phone` | String! | 是 | 联系人电话 |
| `note` | String! | 是 | 备注 |
| `budget` | InputCompanyBudget | 否 | 预算信息 |

**可选值参考**
- `rank`：`KA`, `A`, `B`, `C`

**预期结果**：返回 `CompanyApply` 对象，含 id 和审批状态。

---

### 34. reviewCompanyApply (审核客户申请)

**用途**：审批客户创建或变更申请。

```graphql
mutation ReviewCompanyApply($apply_id: ID!, $status: Boolean!, $result: String!) {
  reviewCompanyApply(apply_id: $apply_id, status: $status, result: $result)
}
```

```json
{
  "apply_id": "apply_789",
  "status": true,
  "result": "信息完整，同意创建"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `apply_id` | ID! | 是 | 申请ID |
| `status` | Boolean! | 是 | true 通过，false 驳回 |
| `result` | String! | 是 | 审批意见 |

**预期结果**：返回 `Boolean`。

---

### 35. transferCompanyClaim (转移客户负责人)

**用途**：将客户转移给新的销售负责人。

```graphql
mutation TransferCompanyClaim($id: ID!, $claim_by: ID!) {
  transferCompanyClaim(id: $id, claim_by: $claim_by)
}
```

```json
{
  "id": "comp_456",
  "claim_by": "user_789"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 客户ID |
| `claim_by` | ID! | 是 | 新负责人用户ID |

**预期结果**：返回 `Boolean`。

---

### 36. update_company_valid (修改客户有效性)

**用途**：将客户设为有效或失效。

```graphql
mutation UpdateCompanyValid($company_id: String!, $valid: Boolean!, $reason: String) {
  update_company_valid(company_id: $company_id, valid: $valid, reason: $reason)
}
```

```json
{
  "company_id": "comp_456",
  "valid": false,
  "reason": "客户已倒闭"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `company_id` | String! | 是 | 客户ID |
| `valid` | Boolean! | 是 | true 有效，false 失效 |
| `reason` | String | 否 | 失效原因，失效时建议填写 |

**预期结果**：返回 `Boolean`。

---

### 37. update_company_lock (修改客户锁定状态)

**用途**：锁定或解锁客户，锁定后其他人无法转移。

```graphql
mutation UpdateCompanyLock($company_id: String!, $lock: Boolean!) {
  update_company_lock(company_id: $company_id, lock: $lock)
}
```

```json
{
  "company_id": "comp_456",
  "lock": true
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `company_id` | String! | 是 | 客户ID |
| `lock` | Boolean! | 是 | true 锁定，false 解锁 |

**预期结果**：返回 `Boolean`。

---

### 38. claim_company (认领客户)

**用途**：从公海或待认领池认领客户到自己名下。

```graphql
mutation ClaimCompany($company_id: String!) {
  claim_company(company_id: $company_id)
}
```

```json
{ "company_id": "comp_456" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `company_id` | String! | 是 | 客户ID |

**预期结果**：返回 `Boolean`。

---

### 39. distribute_company (分配客户)

**用途**：将客户分配给指定销售。

```graphql
mutation DistributeCompany($company_id: String!, $claim_id: String!) {
  distribute_company(company_id: $company_id, claim_id: $claim_id)
}
```

```json
{
  "company_id": "comp_456",
  "claim_id": "user_789"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `company_id` | String! | 是 | 客户ID |
| `claim_id` | String! | 是 | 被分配人用户ID |

**预期结果**：返回 `Boolean`。

---

### 40. batch_distribute_company (批量分配客户)

**用途**：一次性将多个客户分配给同一人。

```graphql
mutation BatchDistributeCompany($company_ids: [String!]!, $claim_id: String!) {
  batch_distribute_company(company_ids: $company_ids, claim_id: $claim_id)
}
```

```json
{
  "company_ids": ["comp_001", "comp_002"],
  "claim_id": "user_789"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `company_ids` | [String!]! | 是 | 客户ID数组 |
| `claim_id` | String! | 是 | 被分配人用户ID |

**预期结果**：返回 `Boolean`。

---

### 41. updateCompanyLabels (修改客户标签)

**用途**：设置客户关联的标签。

```graphql
mutation UpdateCompanyLabels($company_id: ID!, $labels: [String!]!) {
  updateCompanyLabels(company_id: $company_id, labels: $labels)
}
```

```json
{
  "company_id": "comp_456",
  "labels": ["label_001", "label_002"]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `company_id` | ID! | 是 | 客户ID |
| `labels` | [String!]! | 是 | 标签ID数组 |

**预期结果**：返回 `Boolean`。

---

### 42. removeCompany (删除客户)

**用途**：删除客户（通常管理员权限）。

```graphql
mutation RemoveCompany($id: ID!) {
  removeCompany(id: $id)
}
```

```json
{ "id": "comp_456" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 客户ID |

**预期结果**：返回 `Boolean`。

---

## 六、伙伴与渠道

### 43. listChannel (伙伴列表查询)

**用途**：查询合作伙伴列表。

```graphql
query ListChannel($search: ChannelSearchParam!, $pagination: PaginationParam, $with_perm: Boolean!) {
  listChannel(search: $search, pagination: $pagination, with_perm: $with_perm) {
    total
    skip
    limit
    data {
      id
      name
      common_name
      type
      status
      grade
      region { id name }
      sale_claim_by { id name }
      valid
      created_at
    }
  }
}
```

```json
{
  "search": {
    "name": ["长亭"],
    "channel_status": ["certified"],
    "grade": ["v1", "v2"]
  },
  "pagination": { "skip": 0, "limit": 20 },
  "with_perm": false
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | ChannelSearchParam! | 是 | 搜索条件 |
| `search.name` | [String!] | 否 | 伙伴名称 |
| `search.channel_status` | [ChannelStatus!] | 否 | 伙伴状态 |
| `search.grade` | [ChannelGrade!] | 否 | 伙伴评级 |
| `search.region` | [ID!] | 否 | 区域ID |
| `search.sale_claim_by` | [ID!] | 否 | 销售负责人 |
| `pagination` | PaginationParam | 否 | 分页 |
| `with_perm` | Boolean! | 是 | 是否带权限过滤 |

**可选值参考**
- `channel_status`：`normal`, `register`, `chase_sun`, `hold_moon`, `town_star`, `certified`
- `grade`：`v1`, `v2`, `v3`
- `type`：`resources`, `product`, `solution`, `service_provider`, `software_development`

**预期结果**：返回 `ChannelConnection`。

---

### 44. channel (伙伴详情查询)

**用途**：查询单个伙伴详情。

```graphql
query Channel($id: ID!) {
  channel(id: $id) {
    id
    name
    common_name
    type
    status
    grade
    region { id name }
    sale_claim_by { id name }
    channel_sale_claim_by { id name }
    cooperate_contact { id name phone }
    sign_info_list { id sign_expire_date }
    valid
    created_at
  }
}
```

```json
{ "id": "chan_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 伙伴ID |

**预期结果**：返回 `Channel` 对象。

---

### 45. createChannelApply (创建伙伴审核)

**用途**：提交新伙伴创建申请。

```graphql
mutation CreateChannelApply(
  $input_channel: InputChannel!
  $cooperate_contact: [InputChannelContact!]
  $department_contact: [InputChannelContact!]
  $other_contact: [InputChannelContact!]
) {
  createChannelApply(
    input_channel: $input_channel
    cooperate_contact: $cooperate_contact
    department_contact: $department_contact
    other_contact: $other_contact
  ) {
    id
    stage
    created_at
  }
}
```

```json
{
  "input_channel": {
    "credit_code": "91110000123456789X",
    "name": "XX安全科技",
    "common_name": "XX安全",
    "type": ["solution"],
    "industry_list": ["ind_tech"],
    "country": "CN",
    "region": "reg_beijing",
    "address": "北京市海淀区",
    "status": "normal",
    "sale_claim_by": "user_001",
    "channel_sale_claim_by": "user_002",
    "info": "安全解决方案伙伴",
    "grade": "v1",
    "partner_type": [" reseller"],
    "primary_industry": ["ind_tech"],
    "primary_area": ["reg_beijing"]
  },
  "cooperate_contact": [
    { "type": "master", "name": "王五", "position": "总监", "area_code": "+86", "phone": "13800138000", "email": "wangwu@example.com" }
  ],
  "department_contact": [],
  "other_contact": []
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input_channel` | InputChannel! | 是 | 伙伴基础信息 |
| `input_channel.credit_code` | String! | 是 | 统一社会信用代码 |
| `input_channel.name` | String! | 是 | 伙伴全称 |
| `input_channel.type` | [ChannelType!]! | 是 | 伙伴类型数组 |
| `input_channel.status` | ChannelStatus! | 是 | 伙伴状态 |
| `input_channel.sale_claim_by` | ID! | 是 | 销售负责人 |
| `input_channel.channel_sale_claim_by` | ID! | 是 | 渠道负责人 |
| `cooperate_contact` | [InputChannelContact!] | 否 | 合作联系人 |
| `department_contact` | [InputChannelContact!] | 否 | 部门联系人 |
| `other_contact` | [InputChannelContact!] | 否 | 其他联系人 |

**预期结果**：返回 `ChannelApply` 对象。

---

### 46. reviewChannelApply (审批伙伴审核)

**用途**：审批伙伴创建或变更申请。

```graphql
mutation ReviewChannelApply($id: ID!, $status: Boolean!, $result: String!) {
  reviewChannelApply(id: $id, status: $status, result: $result)
}
```

```json
{
  "id": "apply_789",
  "status": true,
  "result": "资质符合要求，同意入驻"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 申请ID |
| `status` | Boolean! | 是 | true 通过，false 驳回 |
| `result` | String! | 是 | 审批意见 |

**预期结果**：返回 `Boolean`。

---

### 47. updateChannel (更新伙伴基本信息)

**用途**：修改已通过审核的伙伴基础信息。

```graphql
mutation UpdateChannel($id: ID!, $input_channel: InputChannel!) {
  updateChannel(id: $id, input_channel: $input_channel)
}
```

```json
{
  "id": "chan_123",
  "input_channel": {
    "credit_code": "91110000123456789X",
    "name": "XX安全科技（更新）",
    "common_name": "XX安全",
    "type": ["solution"],
    "industry_list": ["ind_tech"],
    "country": "CN",
    "region": "reg_beijing",
    "address": "北京市朝阳区",
    "status": "certified",
    "sale_claim_by": "user_001",
    "channel_sale_claim_by": "user_002",
    "info": "更新后的伙伴信息",
    "grade": "v2",
    "partner_type": ["reseller"],
    "primary_industry": ["ind_tech"],
    "primary_area": ["reg_beijing"]
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 伙伴ID |
| `input_channel` | InputChannel! | 是 | 更新的伙伴信息 |

**预期结果**：返回 `Boolean`。

---

### 48. transferChannelClaim (转移伙伴销售负责人)

**用途**：将伙伴的销售负责人转移给其他用户。

```graphql
mutation TransferChannelClaim($id: ID!, $claim_by: ID!) {
  transferChannelClaim(id: $id, claim_by: $claim_by)
}
```

```json
{
  "id": "chan_123",
  "claim_by": "user_789"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 伙伴ID |
| `claim_by` | ID! | 是 | 新负责人用户ID |

**预期结果**：返回 `Boolean`。

---

### 49. batchTransferChannelClaim (批量转移伙伴销售负责人)

**用途**：批量转移多个伙伴的销售负责人。

```graphql
mutation BatchTransferChannelClaim($id_list: [ID!]!, $claim_by: ID!) {
  batchTransferChannelClaim(id_list: $id_list, claim_by: $claim_by)
}
```

```json
{
  "id_list": ["chan_001", "chan_002"],
  "claim_by": "user_789"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id_list` | [ID!]! | 是 | 伙伴ID数组 |
| `claim_by` | ID! | 是 | 新负责人用户ID |

**预期结果**：返回 `Boolean`。

---

### 50. update_channel_cooperate_status (更新伙伴合作状态)

**用途**：修改伙伴的合作存续状态。

```graphql
mutation UpdateChannelCooperateStatus($id: ID!, $status: ChannelCooperateStatus!) {
  update_channel_cooperate_status(id: $id, status: $status)
}
```

```json
{
  "id": "chan_123",
  "status": "over"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 伙伴ID |
| `status` | ChannelCooperateStatus! | 是 | 合作状态 |

**可选值参考**
- `status`：`keep`（合作存续）, `over`（合作终止）, `wait`（待合作）

**预期结果**：返回 `Boolean`。

---

## 七、合同与财务

### 51. listContract (合同列表查询)

**用途**：查询合同列表，支持多种筛选条件。

```graphql
query ListContract($search: [ContractSearchParam!], $pagination: PaginationParam) {
  listContract(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      name
      amount
      currency
      signDate
      stampDate
      company { name value }
      peerLegal { name }
      payOrPaid { name value }
      file_type
      contractState { name value }
      personInCharge { name }
      createdAt
    }
  }
}
```

```json
{
  "search": [
    {
      "name": ["采购"],
      "file_type": "contract",
      "sign_date": { "from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00" }
    }
  ],
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | [ContractSearchParam!] | 否 | 搜索条件数组 |
| `search.name` | [String!] | 否 | 合同名称关键词 |
| `search.file_type` | ContractFileType | 否 | 文件类型 |
| `search.sign_date` | TimeFromTo | 否 | 签署日期范围 |
| `search.amount` | DecimalFromTo | 否 | 金额范围 |
| `search.company` | [BranchCompanyID!] | 否 | 我方公司 |
| `pagination` | PaginationParam | 否 | 分页 |

**可选值参考**
- `file_type`：`contract`（合同）, `proof`（证明材料）
- `payOrPaid`：`pay`（付款）, `get_paid`（收款）, `no_money`（无金额）

**预期结果**：返回 `ContractConnection`。

---

### 52. contract (合同详情查询)

**用途**：查询单个合同详情。

```graphql
query Contract($id: String!) {
  contract(id: $id) {
    id
    name
    company { name value }
    project { id name }
    peerLegal { name tax_number }
    amount
    currency
    payOrPaid { name value }
    file_type
    signDate
    stampDate
    dueDate
    personInCharge { name }
    contractState { name value }
    file { id filename }
    createdAt
  }
}
```

```json
{ "id": "contract_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | String! | 是 | 合同ID |

**预期结果**：返回 `Contract` 对象。

---

### 53. createContract (创建合同)

**用途**：为项目创建新合同。

```graphql
mutation CreateContract($contract: InputContract!) {
  createContract(contract: $contract) {
    id
    name
    amount
    createdAt
  }
}
```

```json
{
  "contract": {
    "name": "XX银行安全防护产品采购合同",
    "company": "chaitin",
    "project": "proj_123",
    "peerLegal": "comp_456",
    "currency": "CNY",
    "amount": "300000",
    "payOrPaid": "get_paid",
    "file_type": "contract",
    "signDate": "2026-07-15T00:00:00+08:00",
    "stampDate": "2026-07-20T00:00:00+08:00",
    "dueDate": "2027-07-14"
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `contract.name` | String! | 是 | 合同名称 |
| `contract.company` | BranchCompanyID! | 是 | 我方签约主体 |
| `contract.project` | String! | 是 | 关联项目ID |
| `contract.peerLegal` | ID! | 是 | 签署对象ID（客户/伙伴） |
| `contract.amount` | String! | 是 | 合同金额（元） |
| `contract.payOrPaid` | ContractPayOrPaidID! | 是 | 收付款类型 |
| `contract.file_type` | ContractFileType! | 是 | 文件类型 |
| `contract.currency` | Currency | 否 | 币种 |
| `contract.signDate` | Time | 否 | 合同签署日期 |
| `contract.stampDate` | Time | 否 | 我方盖章日期 |
| `contract.dueDate` | String | 否 | 合同结束日期 |

**可选值参考**
- `company`（BranchCompanyID）：`chaitin`, `pulsar`, `chaitin_shanghai`, `chaitin_shenzhen`, `chaitin_nanjing`, `chaitin_hangzhou`, `chaitin_wuhan`, `waigudao`, `laishi`, `fangcao_tianya`, `data_intelligence`, `personal`, `other`
- `payOrPaid`：`pay`, `get_paid`, `no_money`
- `file_type`：`contract`, `proof`
- `currency`：`CNY`, `USD`, `OTHERS`

**预期结果**：返回创建的 `Contract` 对象。

---

### 54. updateContract (更新合同)

**用途**：修改已有合同的信息。

```graphql
mutation UpdateContract($id: ID!, $contract: InputContract!) {
  updateContract(id: $id, contract: $contract)
}
```

```json
{
  "id": "contract_123",
  "contract": {
    "name": "XX银行安全防护产品采购合同（修订）",
    "company": "chaitin",
    "project": "proj_123",
    "peerLegal": "comp_456",
    "currency": "CNY",
    "amount": "350000",
    "payOrPaid": "get_paid",
    "file_type": "contract",
    "signDate": "2026-07-15T00:00:00+08:00",
    "stampDate": "2026-07-20T00:00:00+08:00",
    "dueDate": "2027-07-14"
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 合同ID |
| `contract` | InputContract! | 是 | 更新后的合同信息，字段同 createContract |

**预期结果**：返回 `Boolean`。

---

### 55. frame_contract_info (框架合同信息查询)

**用途**：查询框架项目的框架合同信息。

```graphql
query FrameContractInfo($project_id: String!) {
  frame_contract_info(project_id: $project_id) {
    id
    start_type
    start_at
    days
    end_at
    auto_compute
    auto_renew
    multi_body
    body_list { id name }
    order
    set_template
    template_list { id filename }
    set_top_amount
    top_amount
    signed_amount
    note
    created_at
  }
}
```

```json
{ "project_id": "proj_framework_001" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | String! | 是 | 框架项目ID |

**可选值参考**
- `start_type`：`contract_effective`, `contract_date`, `other`
- `order`：`order_service`, `service_pay`, `order_service_pay`, `no`

**预期结果**：返回 `FrameContractInfo` 对象；非框架项目可能返回 null。

---

### 56. update_frame_contract_info (更新框架合同信息)

**用途**：修改框架合同的起止时间、自动续约、主体等配置。

```graphql
mutation UpdateFrameContractInfo($input: InputFrameContractInfo!) {
  update_frame_contract_info(input: $input)
}
```

```json
{
  "input": {
    "project_id": "proj_framework_001",
    "start_type": "contract_effective",
    "start_at": "2026-01-01T00:00:00+08:00",
    "days": 365,
    "end_at": "2026-12-31T23:59:59+08:00",
    "auto_compute": true,
    "auto_renew": false,
    "multi_body": false,
    "body_ids": [],
    "body_info": "",
    "order": "order_service",
    "order_info": "",
    "set_template": false,
    "template_file_ids": [],
    "no_template_info": "",
    "set_top_amount": false,
    "top_amount": "0",
    "note": ""
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input.project_id` | String! | 是 | 框架项目ID |
| `input.start_type` | FrameContractInfoStartType! | 是 | 起始类型 |
| `input.start_at` | Time | 否 | 开始时间 |
| `input.days` | Int | 否 | 持续天数 |
| `input.end_at` | Time | 否 | 结束时间 |
| `input.auto_compute` | Boolean! | 是 | 是否自动计算 |
| `input.auto_renew` | Boolean! | 是 | 是否自动续约 |
| `input.multi_body` | Boolean! | 是 | 是否多主体 |
| `input.body_ids` | [String!] | 否 | 主体ID列表 |
| `input.order` | FrameContractInfoOrder! | 是 | 下单/服务顺序 |
| `input.set_template` | Boolean! | 是 | 是否设置模板 |
| `input.set_top_amount` | Boolean! | 是 | 是否设置金额上限 |
| `input.top_amount` | String | 否 | 上限金额 |
| `input.note` | String | 否 | 备注 |

**预期结果**：返回 `Boolean`。

---

---

## 八、回款与财务

### 57. listRevenue (回款列表查询)

**用途**：查询回款记录列表。

```graphql
query ListRevenue($search: RevenueSearchParam!, $pagination: PaginationParam) {
  listRevenue(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      amount
      state
      project { id name }
      created_at
      creator { name }
    }
  }
}
```

```json
{
  "search": {
    "project_id": ["proj_123"],
    "state": ["matched"],
    "created_at": { "from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00" }
  },
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | RevenueSearchParam! | 是 | 搜索条件 |
| `search.project_id` | [String!] | 否 | 项目ID |
| `search.state` | [RevenueState!] | 否 | 回款状态 |
| `search.created_at` | TimeFromTo | 否 | 创建时间范围 |
| `pagination` | PaginationParam | 否 | 分页 |

**可选值参考**
- `state`：`matched`（已匹配）, `unmatched`（未匹配）, `split`（已拆分）

**预期结果**：返回 `RevenueConnection`。

---

### 58. updatePaymentPlan (修改回款计划)

**用途**：修改项目中已有的回款计划。

```graphql
mutation UpdatePaymentPlan($project_id: ID!, $payment_id: ID!, $due_at: Time, $money: String) {
  updatePaymentPlan(project_id: $project_id, payment_id: $payment_id, due_at: $due_at, money: $money) {
    id
    due_at
    money
  }
}
```

```json
{
  "project_id": "proj_123",
  "payment_id": "pay_456",
  "due_at": "2026-08-01T00:00:00+08:00",
  "money": "150000"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | ID! | 是 | 项目ID |
| `payment_id` | ID! | 是 | 回款计划ID |
| `due_at` | Time | 否 | 新预计回款日期 |
| `money` | String | 否 | 新金额（元） |

**预期结果**：返回更新后的 `Payment` 对象。

---

### 59. addPaymentPlan (新增回款计划)

**用途**：为项目添加新的回款计划。

```graphql
mutation AddPaymentPlan($project_id: ID!, $due_at: Time!, $money: String!) {
  addPaymentPlan(project_id: $project_id, due_at: $due_at, money: $money) {
    id
    due_at
    money
  }
}
```

```json
{
  "project_id": "proj_123",
  "due_at": "2026-09-01T00:00:00+08:00",
  "money": "150000"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | ID! | 是 | 项目ID |
| `due_at` | Time! | 是 | 预计回款日期 |
| `money` | String! | 是 | 金额（元） |

**预期结果**：返回新创建的 `Payment` 对象。

---

### 60. removePaymentPlan (删除回款计划)

**用途**：删除项目中的回款计划。

```graphql
mutation RemovePaymentPlan($project_id: ID!, $payment_id: ID!) {
  removePaymentPlan(project_id: $project_id, payment_id: $payment_id)
}
```

```json
{
  "project_id": "proj_123",
  "payment_id": "pay_456"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | ID! | 是 | 项目ID |
| `payment_id` | ID! | 是 | 回款计划ID |

**预期结果**：返回 `Boolean`。

---

### 61. revenueAssociation (回款匹配项目)

**用途**：将未匹配的回款关联到具体项目及应收计划。

```graphql
mutation RevenueAssociation($rev_id: ID!, $project_id: ID!, $income_plan_id: ID) {
  revenueAssociation(rev_id: $rev_id, project_id: $project_id, income_plan_id: $income_plan_id)
}
```

```json
{
  "rev_id": "rev_789",
  "project_id": "proj_123",
  "income_plan_id": "ip_001"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `rev_id` | ID! | 是 | 回款记录ID |
| `project_id` | ID! | 是 | 匹配的项目ID |
| `income_plan_id` | ID | 否 | 关联的应收计划ID |

**预期结果**：返回 `Boolean!`。

---

### 62. revenueChangeState (修改回款状态)

**用途**：手动修改回款的状态（如匹配、未匹配）。

```graphql
mutation RevenueChangeState($rev_id: ID!, $state: RevenueState!) {
  revenueChangeState(rev_id: $rev_id, state: $state)
}
```

```json
{
  "rev_id": "rev_789",
  "state": "matched"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `rev_id` | ID! | 是 | 回款记录ID |
| `state` | RevenueState! | 是 | 目标状态 |

**可选值参考**
- `state`：`matched`, `unmatched`, `split`

**预期结果**：返回 `Boolean!`。

---

### 63. revenue_split (拆分回款)

**用途**：将一笔回款拆分为多笔子回款。

```graphql
mutation RevenueSplit($rev_id: ID!, $split: Boolean!, $child_revenue_list: [InputSplitRevenue!]) {
  revenue_split(rev_id: $rev_id, split: $split, child_revenue_list: $child_revenue_list)
}
```

```json
{
  "rev_id": "rev_789",
  "split": true,
  "child_revenue_list": [
    { "money": "100000", "project_id": "proj_001" },
    { "money": "50000", "project_id": "proj_002" }
  ]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `rev_id` | ID! | 是 | 原回款ID |
| `split` | Boolean! | 是 | true 拆分，false 取消拆分 |
| `child_revenue_list` | [InputSplitRevenue!] | 否 | 子回款列表，split=true 时必填 |

**预期结果**：返回 `Boolean`。

---

## 九、确认收入

### 64. listConfirmRevenue (确认收入列表查询)

**用途**：查询确认收入任务列表。

```graphql
query ListConfirmRevenue($search: ConfirmRevenueSearchParam!, $pagination: PaginationParam) {
  listConfirmRevenue(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      project { id name }
      state
      items { id product { product { name } } amount confirmed_state progress }
      created_at
    }
  }
}
```

```json
{
  "search": {
    "claim_by": ["user_001"],
    "confirmed_state": ["unconfirmed"],
    "created_at": { "from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00" }
  },
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | ConfirmRevenueSearchParam! | 是 | 搜索条件 |
| `search.claim_by` | [String!] | 否 | 销售负责人 |
| `search.confirmed_state` | [ConfirmRevenueItemState!] | 否 | 财务确认状态 |
| `search.due_at` | TimeFromTo | 否 | 交付时间范围 |
| `search.created_at` | TimeFromTo | 否 | 创建时间范围 |
| `pagination` | PaginationParam | 否 | 分页 |

**可选值参考**
- `confirmed_state`：`unconfirmed`（未审核）, `partconfirmed`（已部分审核）, `confirmed`（已最终审核）, `invalid`（已失效）, `reject`（审核不通过）
- `state`：`pending_review`（待审核）, `pending`（待处理）, `audited`（已审核）

**预期结果**：返回 `ConfirmRevenueConnection`。

---

### 65. confirmRevenueStatistics (确认收入统计查询)

**用途**：按维度统计确认收入情况。

```graphql
query ConfirmRevenueStatistics($search: ConfirmRevenueStatisticSearchParam!) {
  confirmRevenueStatistics(search: $search) {
    statistics {
      domain
      currency
      actual_amount
      all_actual_amount
      performance_amount
      project_count
    }
    company_num
    project_num
  }
}
```

```json
{
  "search": {
    "claim_by": ["user_001"],
    "project_deal_date": { "from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00" }
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | ConfirmRevenueStatisticSearchParam! | 是 | 统计搜索条件 |
| `search.claim_by` | [String!] | 否 | 负责人 |
| `search.project_deal_date` | TimeFromTo | 否 | 项目成交日期范围 |
| `search.due_at` | TimeFromTo | 否 | 确认时间范围 |
| `search.company_name` | [String!] | 否 | 客户名称 |

**预期结果**：返回 `ConfirmRevenueStatistics`，含各维度统计数据。

---

### 66. createConfirmRevenue (发起确认收入)

**用途**：为项目发起一次确认收入任务。

```graphql
mutation CreateConfirmRevenue($project: ID!) {
  createConfirmRevenue(project: $project)
}
```

```json
{ "project": "proj_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project` | ID! | 是 | 项目ID |

**预期结果**：返回 `Boolean`。

---

### 67. updateConfirmRevenueForDeliver (交付确认收入)

**用途**：交付人员提交确认收入的交付信息。

```graphql
mutation UpdateConfirmRevenueForDeliver($id: ID!, $dinput: [ConfirmRevenueInputForDeliverer!]!) {
  updateConfirmRevenueForDeliver(id: $id, dinput: $dinput)
}
```

```json
{
  "id": "cr_789",
  "dinput": [
    {
      "id": "item_001",
      "product_price": "150000",
      "currency": "CNY",
      "attachment": [],
      "attachment_type": "seal",
      "customer_docker": "客户对接人张三",
      "progress": 100,
      "dnote": "已完成现场部署",
      "acceptance_time": "2026-05-01T00:00:00+08:00"
    }
  ]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 确认收入任务ID |
| `dinput` | [ConfirmRevenueInputForDeliverer!]! | 是 | 交付输入数组 |
| `dinput.id` | ID! | 是 | 确认收入子项ID |
| `dinput.progress` | Float! | 是 | 进度 0-100 |
| `dinput.acceptance_time` | Time! | 是 | 验收时间 |
| `dinput.attachment_type` | ConfirmRevenueAttachmentType! | 是 | 验收单类型 |
| `dinput.product_price` | String | 否 | 商品金额 |
| `dinput.attachment` | [String!] | 否 | 验收扫描件附件ID |
| `dinput.customer_docker` | String | 否 | 客户对接人信息 |
| `dinput.dnote` | String | 否 | 交付备注 |

**可选值参考**
- `attachment_type`：`seal`（盖章）, `sign`（签字）, `mail`（邮件）, `other`（其他电子版）, `renew_and_resident`（维保续保及未终验驻场）

**预期结果**：返回 `Boolean!`。

---

### 68. updateConfirmRevenueForFanancial (财务确认收入)

**用途**：财务人员审核并确认收入金额。

```graphql
mutation UpdateConfirmRevenueForFanancial(
  $id: ID!
  $finput: [ConfirmRevenueInputForFanatical!]!
  $allfinished: Boolean
) {
  updateConfirmRevenueForFanancial(id: $id, finput: $finput, allfinished: $allfinished)
}
```

```json
{
  "id": "cr_789",
  "finput": [
    {
      "id": "item_001",
      "product_price": "150000",
      "out_source_amount": "0",
      "due_at": "2026-05-01T00:00:00+08:00",
      "attachment": [],
      "attachment_type": "seal",
      "customer_docker": "张三",
      "progress": 100,
      "dnote": "已交付",
      "confirmed_state": "confirmed",
      "amount": "132743.36",
      "tax": "17256.64",
      "all_amount": "150000",
      "all_tax": "19500",
      "tax_rate": 13,
      "currency": "CNY",
      "fnote": "确认收入",
      "confirmed_progress": 100,
      "start_time": "2026-01-01T00:00:00+08:00",
      "end_time": "2026-05-01T00:00:00+08:00",
      "acceptance_time": "2026-05-01T00:00:00+08:00"
    }
  ],
  "allfinished": false
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 确认收入任务ID |
| `finput` | [ConfirmRevenueInputForFanatical!]! | 是 | 财务输入数组 |
| `finput.id` | ID! | 是 | 子项ID |
| `finput.amount` | String! | 是 | 确认金额净额 |
| `finput.tax` | String! | 是 | 税额净额 |
| `finput.all_amount` | String! | 是 | 确认金额全额 |
| `finput.all_tax` | String! | 是 | 税额全额 |
| `finput.tax_rate` | Int! | 是 | 税率 |
| `finput.currency` | Currency! | 是 | 币种 |
| `finput.confirmed_state` | ConfirmRevenueItemState! | 是 | 确认状态 |
| `finput.confirmed_progress` | Float! | 是 | 确认进度 |
| `finput.due_at` | Time! | 是 | 确认时间 |
| `finput.acceptance_time` | Time! | 是 | 验收时间 |
| `allfinished` | Boolean | 否 | 是否全部完成，默认 false |

**预期结果**：返回 `Boolean!`。

---

### 69. removeConfirmRevenue (删除确认收入)

**用途**：删除确认收入任务（通常管理员权限）。

```graphql
mutation RemoveConfirmRevenue($id: ID!) {
  removeConfirmRevenue(id: $id)
}
```

```json
{ "id": "cr_789" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 确认收入任务ID |

**预期结果**：返回 `Boolean!`。

---

## 十、线索管理

### 70. list_leads (线索列表查询)

**用途**：查询线索列表，支持我的/组/全部。

```graphql
query ListLeads($search: LeadsSearchParam, $pagination: PaginationParam, $sort_by: SortBy) {
  list_leads(search: $search, pagination: $pagination, sort_by: $sort_by) {
    total
    skip
    limit
    data {
      id
      type
      source
      client_name
      client_contact_name
      client_contact_phone
      valid
      convert
      region { id name }
      claim_by { id name }
      created_at
    }
  }
}
```

```json
{
  "search": {
    "list_type": "my",
    "type": ["direct"],
    "client_name": "银行",
    "valid": true,
    "convert": false
  },
  "pagination": { "skip": 0, "limit": 20 },
  "sort_by": { "by": "created_at", "order": -1 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | LeadsSearchParam | 否 | 搜索条件 |
| `search.list_type` | LeadsListType! | 是 | 列表类型 |
| `search.type` | [LeadsType!] | 否 | 线索类型 |
| `search.client_name` | String | 否 | 客户名称 |
| `search.valid` | Boolean | 否 | 是否有效 |
| `search.convert` | Boolean | 否 | 是否已转化 |
| `pagination` | PaginationParam | 否 | 分页 |
| `sort_by` | SortBy | 否 | 排序 |

**可选值参考**
- `list_type`：`my`（我的）, `group`（我的组）, `all`（全部）
- `type`：常见 `direct`（直销）, `channel`（渠道）等

**预期结果**：返回 `LeadsConnection`。

---

### 71. leads_info (线索详情查询)

**用途**：查询单个线索详情。

```graphql
query LeadsInfo($id: ID!) {
  leads_info(id: $id) {
    id
    type
    source
    source_product
    client_name
    client_contact_name
    client_contact_position
    client_contact_phone
    client_contact_email
    valid
    convert
    region { id name }
    claim_by { id name }
    created_at
  }
}
```

```json
{ "id": "leads_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 线索ID |

**预期结果**：返回 `Leads` 对象。

---

### 72. create_leads (创建线索)

**用途**：新建一条线索。

```graphql
mutation CreateLeads($param: LeadsParam!) {
  create_leads(param: $param)
}
```

```json
{
  "param": {
    "type": "direct",
    "source": "官网咨询",
    "source_product": "WAF",
    "client_name": "ZZ电子商务有限公司",
    "client_contact_name": "王五",
    "client_contact_position": "运维经理",
    "client_contact_phone": "13700137000",
    "client_contact_email": "wangwu@example.com",
    "client_contact_time": "2026-05-02T10:30:00+08:00",
    "communication_intention": "了解Web应用防火墙产品功能和报价",
    "note": "客户有明确的等保合规需求",
    "region": "reg_shanghai",
    "attachments": []
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `param.type` | LeadsType! | 是 | 线索类型 |
| `param.source` | String! | 是 | 来源 |
| `param.source_product` | String! | 是 | 来源产品 |
| `param.client_name` | String! | 是 | 客户名称 |
| `param.client_contact_name` | String! | 是 | 联系人姓名 |
| `param.client_contact_position` | String | 否 | 联系人职位 |
| `param.client_contact_phone` | String | 否 | 联系人电话 |
| `param.client_contact_email` | String | 否 | 联系人邮箱 |
| `param.client_contact_time` | Time | 否 | 联系时间 |
| `param.communication_intention` | String | 否 | 沟通意向 |
| `param.note` | String | 否 | 备注 |
| `param.region` | ID | 否 | 区域ID |
| `param.attachments` | [ID!] | 否 | 附件 |

**预期结果**：返回 `ID!`，即新线索的ID。

---

### 73. update_leads (更新线索)

**用途**：修改线索信息。

```graphql
mutation UpdateLeads($id: ID!, $param: LeadsParam!) {
  update_leads(id: $id, param: $param)
}
```

```json
{
  "id": "leads_123",
  "param": {
    "type": "direct",
    "source": "展会",
    "source_product": "Scanner",
    "client_name": "ZZ电子商务有限公司（更新）",
    "client_contact_name": "王五",
    "client_contact_position": "安全经理",
    "client_contact_phone": "13700137000",
    "note": "已联系，安排产品演示",
    "region": "reg_shanghai",
    "attachments": []
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 线索ID |
| `param` | LeadsParam! | 是 | 更新的线索信息，字段同 create_leads |

**预期结果**：返回 `Boolean`。

---

### 74. update_leads_valid (更新线索有效性)

**用途**：将线索设为有效或无效。

```graphql
mutation UpdateLeadsValid(
  $id: ID!
  $valid: Boolean!
  $invalid_reason: String
  $first_reason: LeadsInvalidFirstReason
  $second_reason: LeadsInvalidSecondReason
) {
  update_leads_valid(id: $id, valid: $valid, invalid_reason: $invalid_reason, first_reason: $first_reason, second_reason: $second_reason)
}
```

```json
{
  "id": "leads_123",
  "valid": false,
  "invalid_reason": "客户无预算",
  "first_reason": "no_budget",
  "second_reason": null
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 线索ID |
| `valid` | Boolean! | 是 | true 有效，false 无效 |
| `invalid_reason` | String | 否 | 无效原因描述 |
| `first_reason` | LeadsInvalidFirstReason | 否 | 无效一级原因 |
| `second_reason` | LeadsInvalidSecondReason | 否 | 无效二级原因 |

**预期结果**：返回 `Boolean`。

---

### 75. claim_leads (认领线索)

**用途**：销售认领线索到自己名下。

```graphql
mutation ClaimLeads($leads_id: ID!) {
  claim_leads(leads_id: $leads_id)
}
```

```json
{ "leads_id": "leads_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `leads_id` | ID! | 是 | 线索ID |

**预期结果**：返回 `Boolean`。

---

### 76. create_project_by_leads (通过线索创建项目)

**用途**：将有效线索直接转化为项目。

```graphql
mutation CreateProjectByLeads($input: InputProject!) {
  create_project_by_leads(input: $input)
}
```

```json
{
  "input": {
    "name": "ZZ电商安全防护项目",
    "company_id": "comp_new_001",
    "type": "normal",
    "level": "ordinary",
    "deal_date": "2026-08-01T00:00:00+08:00",
    "sign_date": "2026-09-01T00:00:00+08:00",
    "stage": "leads",
    "stage_info": { "info": "由线索转化", "attachments": [], "todos": [] },
    "leads_convert_condition": [],
    "project_promise": "delivery_standard",
    "extra": { "source": "线索转化" }
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input` | InputProject! | 是 | 项目信息，字段同 createProject |

**预期结果**：返回 `ID!`，即新项目的ID。

---

## 十一、跟进记录与评论

### 77. createProjectInfo (创建跟进记录)

**用途**：为项目、客户、渠道或线索创建跟进/拜访记录。

```graphql
mutation CreateProjectInfo(
  $project_id: String
  $company_id: String
  $channel_id: String
  $leads_id: String
  $type: ProjectInfoType
  $info: String!
  $attachments: [String!]
  $todos: [InputTodoList!]
) {
  createProjectInfo(
    project_id: $project_id
    company_id: $company_id
    channel_id: $channel_id
    leads_id: $leads_id
    type: $type
    info: $info
    attachments: $attachments
    todos: $todos
  ) {
    id
    info
    type
    created_at
  }
}
```

```json
{
  "project_id": "proj_123",
  "company_id": null,
  "channel_id": null,
  "leads_id": null,
  "type": "project_follow_record",
  "info": "今日与客户进行了产品演示，反馈良好，下周安排技术交流。",
  "attachments": [],
  "todos": [
    {
      "name": "准备技术交流PPT",
      "deadline": "2026-05-10T18:00:00+08:00",
      "processor": ["user_001"]
    }
  ]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | String | 否 | 关联项目ID（与company_id/channel_id/leads_id互斥） |
| `company_id` | String | 否 | 关联客户ID |
| `channel_id` | String | 否 | 关联渠道ID |
| `leads_id` | String | 否 | 关联线索ID |
| `type` | ProjectInfoType | 否 | 记录类型，默认 `project_follow_record` |
| `info` | String! | 是 | 跟进内容 |
| `attachments` | [String!] | 否 | 附件ID列表 |
| `todos` | [InputTodoList!] | 否 | 关联待办 |

**可选值参考**
- `type`：`project_follow_record`（项目跟进记录）, `project_progress`（项目进展）, `visit_record`（拜访记录）等

**预期结果**：返回 `ProjectInfo` 对象。

---

### 78. updateProjectInfo (更新跟进记录)

**用途**：修改已有的跟进记录内容。

```graphql
mutation UpdateProjectInfo($id: ID!, $info: String!, $attachments: [String!]) {
  updateProjectInfo(id: $id, info: $info, attachments: $attachments)
}
```

```json
{
  "id": "pinfo_456",
  "info": "今日与客户进行了产品演示，反馈非常积极，已确定下周三进行技术交流。",
  "attachments": []
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 跟进记录ID |
| `info` | String! | 是 | 更新后的内容 |
| `attachments` | [String!] | 否 | 附件ID列表 |

**预期结果**：返回 `Boolean!`。

---

### 79. deleteProjectInfo (删除跟进记录)

**用途**：删除跟进记录。

```graphql
mutation DeleteProjectInfo($id: ID!) {
  deleteProjectInfo(id: $id)
}
```

```json
{ "id": "pinfo_456" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 跟进记录ID |

**预期结果**：返回 `Boolean!`。

---

### 80. createComment (创建评论)

**用途**：在项目、客户、线索、合同等对象下发表评论。

```graphql
mutation CreateComment(
  $related_type: CommentRelatedType!
  $related_id: ID!
  $content: String!
  $attachments: [ID!]
  $todos: [InputTodoList!]
) {
  createComment(
    related_type: $related_type
    related_id: $related_id
    content: $content
    attachments: $attachments
    todos: $todos
  )
}
```

```json
{
  "related_type": "project",
  "related_id": "proj_123",
  "content": "项目进度符合预期，建议下周安排客户现场POC测试。",
  "attachments": [],
  "todos": [
    {
      "name": "协调POC环境",
      "deadline": "2026-05-08T18:00:00+08:00",
      "processor": ["user_002"]
    }
  ]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `related_type` | CommentRelatedType! | 是 | 评论关联类型 |
| `related_id` | ID! | 是 | 关联对象ID |
| `content` | String! | 是 | 评论内容 |
| `attachments` | [ID!] | 否 | 附件ID列表 |
| `todos` | [InputTodoList!] | 否 | 关联待办 |

**可选值参考**
- `related_type`：`project`, `company`, `leads`, `contract`, `report`, `todo_list`, `business_chance`, `price_approval`, `product_delivery`, `service_delivery`, `company_apply`, `channel_apply`, `performance_distribution_approval`, `special_deals_trace_back`, `pre_sale_performance_distribution_approval`

**预期结果**：返回 `Boolean`。

---

### 81. deleteComment (删除评论)

**用途**：删除自己或他人的评论（需权限）。

```graphql
mutation DeleteComment($id: ID!) {
  deleteComment(id: $id)
}
```

```json
{ "id": "comment_789" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 评论ID |

**预期结果**：返回 `Boolean`。

---

## 十二、报告与日报

### 82. listReport (日报/周报列表查询)

**用途**：查询日/周报列表。

```graphql
query ListReport($search: [ReportSearchParam!], $pagination: PaginationParam) {
  listReport(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      content
      type
      target
      creator { id name }
      created_at
    }
  }
}
```

```json
{
  "search": [
    {
      "creator": ["user_001"],
      "type": ["daily"],
      "target": { "from": "2026-05-01T00:00:00+08:00", "to": "2026-05-31T23:59:59+08:00" }
    }
  ],
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | [ReportSearchParam!] | 否 | 搜索条件数组 |
| `search.creator` | [ID!] | 否 | 创建人ID |
| `search.type` | [ReportType!] | 否 | 报告类型 |
| `search.target` | TimeFromTo | 否 | 报告日期范围 |
| `pagination` | PaginationParam | 否 | 分页 |

**可选值参考**
- `type`：`daily`（日报）, `weekly`（周报）

**预期结果**：返回 `ReportConnection`。

---

### 83. createReport (创建日报/周报)

**用途**：创建新的日报或周报。

```graphql
mutation CreateReport(
  $content: String!
  $type: ReportType!
  $target: Time!
  $to: [ID!]
  $attachments: [ID!]
  $project_infos: [InputProjectInfo!]
  $immediately_sign_projects: [InputCreateImmediatelySignProject!]
) {
  createReport(
    content: $content
    type: $type
    target: $target
    to: $to
    attachments: $attachments
    project_infos: $project_infos
    immediately_sign_projects: $immediately_sign_projects
  ) {
    id
    content
    type
    target
    created_at
  }
}
```

```json
{
  "content": "今日工作：\n1. 拜访XX银行客户，完成产品演示\n2. 跟进YY证券POC进度\n3. 准备下周技术交流材料",
  "type": "daily",
  "target": "2026-05-02T00:00:00+08:00",
  "to": ["user_manager_001"],
  "attachments": [],
  "project_infos": [
    {
      "project_id": "proj_123",
      "info": "完成产品演示，客户意向积极"
    }
  ],
  "immediately_sign_projects": []
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `content` | String! | 是 | 报告内容 |
| `type` | ReportType! | 是 | 报告类型 |
| `target` | Time! | 是 | 报告日期 |
| `to` | [ID!] | 否 | 发送目标用户ID列表 |
| `attachments` | [ID!] | 否 | 附件ID列表 |
| `project_infos` | [InputProjectInfo!] | 否 | 关联项目信息 |
| `immediately_sign_projects` | [InputCreateImmediatelySignProject!] | 否 | 待签项目 |

**可选值参考**
- `type`：`daily`, `weekly`

**预期结果**：返回 `Report` 对象。

---

### 84. updateReport (更新日报/周报)

**用途**：修改已提交的日报或周报。

```graphql
mutation UpdateReport(
  $id: ID!
  $content: String!
  $to: [ID!]
  $attachments: [ID!]
  $project_infos: [InputProjectInfo!]
  $immediately_sign_projects: [InputUpdateImmediatelySignProject!]
) {
  updateReport(
    id: $id
    content: $content
    to: $to
    attachments: $attachments
    project_infos: $project_infos
    immediately_sign_projects: $immediately_sign_projects
  ) {
    id
    content
    updated_at
  }
}
```

```json
{
  "id": "report_123",
  "content": "更新后的日报内容...",
  "to": ["user_manager_001"],
  "attachments": [],
  "project_infos": [],
  "immediately_sign_projects": []
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 报告ID |
| `content` | String! | 是 | 更新后的内容 |
| `to` | [ID!] | 否 | 发送目标 |
| `attachments` | [ID!] | 否 | 附件 |
| `project_infos` | [InputProjectInfo!] | 否 | 关联项目信息 |
| `immediately_sign_projects` | [InputUpdateImmediatelySignProject!] | 否 | 待签项目 |

**预期结果**：返回 `Report!` 对象。

---

## 十三、销售目标与提成

### 85. saleGoal (销售目标查询)

**用途**：查询销售人员的季度/年度目标及完成情况。

```graphql
query SaleGoal($group: ID, $fiscal_year: Int!) {
  saleGoal(group: $group, fiscal_year: $fiscal_year) {
    period
    fiscal_year
    is_latest
    goal {
      type
      target
      finished
      fiscal_quarter
      income
    }
  }
}
```

```json
{
  "group": null,
  "fiscal_year": 2026
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `group` | ID | 否 | 用户组ID，查组目标时传入 |
| `fiscal_year` | Int! | 是 | 财年 |

**预期结果**：返回 `GoalResult`，含各季度回款/合同目标及完成值。

---

### 86. saleCommission (销售提成查询)

**用途**：查询销售提成列表。

```graphql
query SaleCommission($group: ID, $fiscal_year: Int!) {
  saleCommission(group: $group, fiscal_year: $fiscal_year) {
    user_commission {
      target
      finished
      commission
      user { id name }
    }
    user_group { id name }
  }
}
```

```json
{
  "group": null,
  "fiscal_year": 2026
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `group` | ID | 否 | 用户组ID |
| `fiscal_year` | Int! | 是 | 财年 |

**预期结果**：返回 `SaleCommission!`，含提成明细。

---

### 87. updateSaleGoal (更新销售目标)

**用途**：设置销售或销售组的季度目标。

```graphql
mutation UpdateSaleGoal($user_id: String, $group_id: String, $goal: [InputGoalV2!]) {
  updateSaleGoal(user_id: $user_id, group_id: $group_id, goal: $goal)
}
```

```json
{
  "user_id": "user_001",
  "group_id": null,
  "goal": [
    { "typeArg": "回款", "year": 2026, "quarter": 1, "target": 500000 },
    { "typeArg": "合同", "year": 2026, "quarter": 1, "target": 600000 }
  ]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `user_id` | String | 否 | 用户ID（与group_id二选一） |
| `group_id` | String | 否 | 组ID（与user_id二选一） |
| `goal` | [InputGoalV2!] | 否 | 目标数组 |
| `goal.typeArg` | String! | 是 | 目标类型："回款" / "合同" / "确认收入" / "伙伴合同" |
| `goal.year` | Int! | 是 | 财年 |
| `goal.quarter` | Int! | 是 | 季度 1-4 |
| `goal.target` | Float! | 是 | 目标金额 |

**预期结果**：返回 `Boolean`。

---

### 88. createCommissionConfig (创建任务阶梯)

**用途**：配置销售提成的阶梯规则。

```graphql
mutation CreateCommissionConfig(
  $fiscal_year: Int!
  $start: String!
  $end: String!
  $commission_percent: [InputCommissionPercent!]!
) {
  createCommissionConfig(
    fiscal_year: $fiscal_year
    start: $start
    end: $end
    commission_percent: $commission_percent
  )
}
```

```json
{
  "fiscal_year": 2026,
  "start": "0",
  "end": "1000000",
  "commission_percent": [
    { "start": "0", "end": "500000", "percent": 5 },
    { "start": "500000", "end": "1000000", "percent": 8 }
  ]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `fiscal_year` | Int! | 是 | 财年 |
| `start` | String! | 是 | 阶梯起始金额 |
| `end` | String! | 是 | 阶梯结束金额 |
| `commission_percent` | [InputCommissionPercent!]! | 是 | 提成比例数组 |
| `commission_percent.start` | String! | 是 | 该档起始金额 |
| `commission_percent.end` | String! | 是 | 该档结束金额 |
| `commission_percent.percent` | Float! | 是 | 提成百分比 |

**预期结果**：返回 `Boolean`。

---

## 十四、用户与权限

### 89. me (当前用户信息查询)

**用途**：获取当前登录用户的基本信息。

```graphql
query Me {
  me {
    id
    name
    username
    email
    phone
    role
    enabled
    department { id name }
    groups { id name }
  }
}
```

**使用帮助**

无参数。

**预期结果**：返回 `User` 对象；未登录时返回 null。

---

### 90. listUser (用户列表查询)

**用途**：查询系统用户列表。

```graphql
query ListUser($search: UserSearchParam!, $pagination: PaginationParam) {
  listUser(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      name
      username
      email
      phone
      enabled
      department { id name }
      created_at
    }
  }
}
```

```json
{
  "search": {
    "name": ["张"],
    "enabled": true
  },
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | UserSearchParam! | 是 | 搜索条件 |
| `search.name` | [String!] | 否 | 用户名关键词 |
| `search.enabled` | Boolean | 否 | 是否启用 |
| `pagination` | PaginationParam | 否 | 分页 |

**预期结果**：返回 `UserConnection!`。

---

### 91. createUserGroup (创建用户组)

**用途**：创建销售组、部门或其他用户组。

```graphql
mutation CreateUserGroup(
  $name: String!
  $type: UserGroupType!
  $role_type: UserGroupRoleType
  $sale_group_type: SaleGroupType
  $parent: ID
) {
  createUserGroup(name: $name, type: $type, role_type: $role_type, sale_group_type: $sale_group_type, parent: $parent) {
    id
    name
    type
    created_at
  }
}
```

```json
{
  "name": "华北销售一组",
  "type": "sale",
  "role_type": "saler",
  "sale_group_type": "first_team",
  "parent": "group_parent_001"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `name` | String! | 是 | 组名称 |
| `type` | UserGroupType! | 是 | 组类型 |
| `role_type` | UserGroupRoleType | 否 | 角色类型 |
| `sale_group_type` | SaleGroupType | 否 | 销售组类型 |
| `parent` | ID | 否 | 父组ID |

**预期结果**：返回 `UserGroup` 对象。

---

### 92. updateUserGroupMember (更新用户组成员)

**用途**：设置组的成员和组长。

```graphql
mutation UpdateUserGroupMember($id: ID!, $member: [ID!], $leader: [ID!]) {
  updateUserGroupMember(id: $id, member: $member, leader: $leader)
}
```

```json
{
  "id": "group_001",
  "member": ["user_001", "user_002", "user_003"],
  "leader": ["user_001"]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 用户组ID |
| `member` | [ID!] | 否 | 成员用户ID列表 |
| `leader` | [ID!] | 否 | 组长用户ID列表 |

**预期结果**：返回 `Boolean`。

---

### 93. updatePermission (更新权限)

**用途**：为指定用户组配置功能权限。

```graphql
mutation UpdatePermission(
  $group: ID!
  $type: PermGroupType!
  $perm: [Perm!]!
  $related: InputPermRelated!
) {
  updatePermission(group: $group, type: $type, perm: $perm, related: $related)
}
```

```json
{
  "group": "group_001",
  "type": "project",
  "perm": ["view", "edit"],
  "related": {
    "scope": "all"
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `group` | ID! | 是 | 用户组ID |
| `type` | PermGroupType! | 是 | 权限分组类型 |
| `perm` | [Perm!]! | 是 | 权限标识数组 |
| `related` | InputPermRelated! | 是 | 权限关联范围 |

**预期结果**：返回 `Boolean`。

---

## 十五、产品配置

### 94. listProduct (产品列表查询)

**用途**：获取 CRM 中全部产品列表。

```graphql
query ListProduct {
  listProduct {
    id
    name
    group { id name }
    forms { id name }
    offline
    created_at
  }
}
```

**使用帮助**

无参数。

**预期结果**：返回 `[Product!]!` 数组。

---

### 95. create_product (创建新产品)

**用途**：在系统中注册新产品。

```graphql
mutation CreateProduct($input: InputProductConfig!) {
  create_product(input: $input)
}
```

```json
{
  "input": {
    "id": "prod_new_001",
    "name": "智能WAF Pro",
    "group": "security_product",
    "forms": ["hardware", "software"],
    "offline": false
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input` | InputProductConfig! | 是 | 产品配置 |
| `input.id` | String! | 是 | 产品唯一标识 |
| `input.name` | String! | 是 | 产品名称 |
| `input.group` | String! | 是 | 产品分组 |
| `input.forms` | [String!]! | 是 | 产品形态列表 |
| `input.offline` | Boolean! | 是 | 是否下架 |

**预期结果**：返回 `Boolean`。

---

### 96. add_product_form (增加产品类别)

**用途**：为已有产品增加新的产品形态/类别。

```graphql
mutation AddProductForm($product_id: String!, $form_id: ProductFormID!, $tax: Float!, $contract_name: String!, $soft_name: String!) {
  add_product_form(product_id: $product_id, form_id: $form_id, tax: $tax, contract_name: $contract_name, soft_name: $soft_name)
}
```

```json
{
  "product_id": "prod_001",
  "form_id": "saas",
  "tax": 13,
  "contract_name": "SaaS服务",
  "soft_name": "智能检测引擎"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `product_id` | String! | 是 | 产品ID |
| `form_id` | ProductFormID! | 是 | 产品形态ID |
| `tax` | Float! | 是 | 税率 |
| `contract_name` | String! | 是 | 合同名称 |
| `soft_name` | String! | 是 | 软件名称 |

**预期结果**：返回 `Boolean`。

---

### 97. addProductVersion (发布产品新版本)

**用途**：发布产品的配置新版本。

```graphql
mutation AddProductVersion($product_id: ID!, $form_id: ID!, $versions: [InputProductVersionConfig!]!, $note: String!) {
  addProductVersion(product_id: $product_id, form_id: $form_id, versions: $versions, note: $note)
}
```

```json
{
  "product_id": "prod_001",
  "form_id": "form_001",
  "versions": [
    {
      "name": "标准版",
      "price": 50000,
      "config": {}
    }
  ],
  "note": "2026年Q2定价更新"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `product_id` | ID! | 是 | 产品ID |
| `form_id` | ID! | 是 | 产品形态ID |
| `versions` | [InputProductVersionConfig!]! | 是 | 版本配置数组 |
| `note` | String! | 是 | 版本说明 |

**预期结果**：返回 `Boolean`。

---

### 98. addProductDraft (保存产品草稿)

**用途**：保存产品配置的草稿，不直接发布。

```graphql
mutation AddProductDraft(
  $product_id: ID!
  $form_id: ID!
  $version_num: Int!
  $versions: [InputProductVersionConfig!]!
  $note: String!
  $push_review: Boolean!
) {
  addProductDraft(
    product_id: $product_id
    form_id: $form_id
    version_num: $version_num
    versions: $versions
    note: $note
    push_review: $push_review
  )
}
```

```json
{
  "product_id": "prod_001",
  "form_id": "form_001",
  "version_num": 3,
  "versions": [],
  "note": "草稿版本",
  "push_review": false
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `product_id` | ID! | 是 | 产品ID |
| `form_id` | ID! | 是 | 产品形态ID |
| `version_num` | Int! | 是 | 版本号 |
| `versions` | [InputProductVersionConfig!]! | 是 | 版本配置 |
| `note` | String! | 是 | 备注 |
| `push_review` | Boolean! | 是 | 是否直接提交审核 |

**预期结果**：返回 `String`，草稿ID。

---

## 十六、价格审批与成本

### 99. listPriceApproval (价格审批列表查询)

**用途**：查询项目的价格审批记录。

```graphql
query ListPriceApproval($search: PriceApprovalSearchParam!, $pagination: PaginationParam) {
  listPriceApproval(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      project { id name }
      type
      status
      creator { name }
      created_at
    }
  }
}
```

```json
{
  "search": {
    "project_id": ["proj_123"],
    "status": ["pending"]
  },
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | PriceApprovalSearchParam! | 是 | 搜索条件 |
| `search.project_id` | [String!] | 否 | 项目ID |
| `search.status` | [String!] | 否 | 审批状态 |
| `pagination` | PaginationParam | 否 | 分页 |

**预期结果**：返回 `PriceApprovalConnection`。

---

### 100. createProjectPriceApproval (发起价格审批)

**用途**：为项目发起产品价格或服务价格审批。

```graphql
mutation CreateProjectPriceApproval(
  $project_id: ID!
  $type: PriceApprovalType!
  $special_reason: InputPriceApprovalSpecialReason
  $input_product: InputProductPriceApproval
  $input_service: InputServicePriceApproval
  $input_frame_product: InputFrameProductPriceApproval
  $input_frame_service: InputFrameServicePriceApproval
) {
  createProjectPriceApproval(
    project_id: $project_id
    type: $type
    special_reason: $special_reason
    input_product: $input_product
    input_service: $input_service
    input_frame_product: $input_frame_product
    input_frame_service: $input_frame_service
  )
}
```

```json
{
  "project_id": "proj_123",
  "type": "product",
  "special_reason": null,
  "input_product": {
    "discount": 85,
    "reason": "战略客户折扣"
  },
  "input_service": null,
  "input_frame_product": null,
  "input_frame_service": null
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | ID! | 是 | 项目ID |
| `type` | PriceApprovalType! | 是 | 审批类型 |
| `special_reason` | InputPriceApprovalSpecialReason | 否 | 特价原因 |
| `input_product` | InputProductPriceApproval | 否 | 产品审批详情 |
| `input_service` | InputServicePriceApproval | 否 | 服务审批详情 |
| `input_frame_product` | InputFrameProductPriceApproval | 否 | 框架产品审批 |
| `input_frame_service` | InputFrameServicePriceApproval | 否 | 框架服务审批 |

**预期结果**：返回 `Boolean`。

---

### 101. approveProjectPriceApproval (处理价格审批)

**用途**：审批通过或驳回价格审批申请。

```graphql
mutation ApproveProjectPriceApproval($id: ID!, $result: Boolean!, $note: String!, $source: String) {
  approveProjectPriceApproval(id: $id, result: $result, note: $note, source: $source)
}
```

```json
{
  "id": "pa_456",
  "result": true,
  "note": "同意特价申请",
  "source": "web"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 价格审批ID |
| `result` | Boolean! | 是 | true 通过，false 驳回 |
| `note` | String! | 是 | 审批意见 |
| `source` | String | 否 | 来源标识 |

**预期结果**：返回 `Boolean`。

---

### 102. revertProjectPriceApproval (撤回价格审批)

**用途**：撤回已提交的价格审批。

```graphql
mutation RevertProjectPriceApproval($id: ID!) {
  revertProjectPriceApproval(id: $id)
}
```

```json
{ "id": "pa_456" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 价格审批ID |

**预期结果**：返回 `Boolean`。

---

### 103. add_service_cost_detail (评估安服成本)

**用途**：为项目评估安服（安全服务）成本。

```graphql
mutation AddServiceCostDetail(
  $id: ID!
  $details: [InputServiceCostDetail!]!
  $desc: InputServiceCostDesc!
) {
  add_service_cost_detail(id: $id, details: $details, desc: $desc)
}
```

```json
{
  "id": "proj_123",
  "details": [
    {
      "service_type": "penetration_test",
      "work_day": 10,
      "unit_price": 3000,
      "total_price": 30000
    }
  ],
  "desc": {
    "note": "渗透测试服务成本评估",
    "total": 30000
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 项目ID |
| `details` | [InputServiceCostDetail!]! | 是 | 服务成本明细数组 |
| `desc` | InputServiceCostDesc! | 是 | 成本描述说明 |

**预期结果**：返回 `Boolean`。

---

## 十七、库存与硬件

### 104. listMachineStock (整机库存列表查询)

**用途**：查询整机设备库存。

```graphql
query ListMachineStock($search: [MachineStockSearchParam!], $pagination: PaginationParam) {
  listMachineStock(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      serial
      product_type
      product_model
      in_stock_time
      stock_company
      project { id name }
      saler { name }
      tech_support { name }
      created_at
    }
  }
}
```

```json
{
  "search": [
    {
      "serial_like": ["CT"],
      "product_model": "WAF-2000"
    }
  ],
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | [MachineStockSearchParam!] | 否 | 搜索条件 |
| `search.serial_like` | [String!] | 否 | 序列号模糊查询 |
| `search.product_model` | String | 否 | 产品型号 |
| `pagination` | PaginationParam | 否 | 分页 |

**预期结果**：返回 `MachineStockConnection`。

---

### 105. updateMachineStockBasic (修改整机库存基本信息)

**用途**：更新整机设备的基础信息。

```graphql
mutation UpdateMachineStockBasic($update: [MachineStockInput!]) {
  updateMachineStockBasic(update: $update)
}
```

```json
{
  "update": [
    {
      "serial": "CT2026001",
      "product_type": "WAF",
      "product_model": "WAF-2000",
      "stock_company": "北京"
    }
  ]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `update` | [MachineStockInput!] | 是 | 更新数组，每项含 serial 等字段 |

**预期结果**：返回 `Boolean!`。

---

### 106. create_hardware_after_sale (创建硬件设备售后)

**用途**：为硬件设备创建售后维修/更换记录。

```graphql
mutation CreateHardwareAfterSale($input: InputHardwareAfterSale!) {
  create_hardware_after_sale(input: $input)
}
```

```json
{
  "input": {
    "project_id": "proj_123",
    "type": "repair",
    "problem_product": [
      {
        "product_id": "prod_001",
        "form_id": "form_001",
        "machines": [
          { "machine": "CT2026001", "component": [] }
        ]
      }
    ],
    "need_backup_machine": true,
    "operation_time": "2026-05-10T10:00:00+08:00",
    "reason": "电源模块故障",
    "way": "express",
    "note": "需要尽快处理"
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input` | InputHardwareAfterSale! | 是 | 售后信息 |
| `input.project_id` | String! | 是 | 项目ID |
| `input.type` | HardwareAfterSaleType! | 是 | 售后类型 |
| `input.problem_product` | [InputHardwareAfterSaleProduct!]! | 是 | 问题产品列表 |
| `input.need_backup_machine` | Boolean | 否 | 是否需要备用机 |
| `input.operation_time` | Time! | 是 | 操作时间 |
| `input.reason` | String! | 是 | 售后原因 |
| `input.way` | ShippingWay! | 是 | 物流方式 |
| `input.note` | String! | 是 | 备注 |

**预期结果**：返回 `Boolean`。

---

## 十八、应收计划与发货

### 107. project_income_plan (查询项目应收计划)

**用途**：查询某项目的全部应收计划及关联回款。

```graphql
query ProjectIncomePlan($project_id: ID!) {
  project_income_plan(project_id: $project_id) {
    income_plan {
      id
      income_milestone
      income_type
      contract_condition
      income_way
      income_rate
      money
      income_at
      expected_payment_date
      grace_period
      assessment_date
    }
    revenue_with_overdue_data {
      revenue_id
      revenue_amount
      overdue_days
    }
  }
}
```

```json
{ "project_id": "proj_123" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | ID! | 是 | 项目ID |

**可选值参考**
- `income_milestone`：`contract_effective`, `contract_date`, `product_arrival_acceptance`, `product_final_acceptance`, `service_final_acceptance`, `product_installation_acceptance`, `service_staged_acceptance`, `other`
- `income_type`：`product_prepayments`, `service_prepayments`, `first_payment`, `acceptance_payment`, `warranty_money`, `other`
- `income_way`：`wire_transfer`, `trade_acceptance_draft`, `bank_acceptance_draft`, `other`

**预期结果**：返回 `[IncomePlanWithRevenue!]!` 数组。

---

### 108. create_income_plan (创建应收计划)

**用途**：为项目新增一条应收计划。

```graphql
mutation CreateIncomePlan($project_id: ID!, $param: IncomePlanParam!) {
  create_income_plan(project_id: $project_id, param: $param)
}
```

```json
{
  "project_id": "proj_123",
  "param": {
    "income_milestone": "product_final_acceptance",
    "income_type": "acceptance_payment",
    "contract_condition": "产品终验后30天内付款",
    "income_way": "wire_transfer",
    "income_rate": 0.6,
    "income_period": 30,
    "acceptance_period": 0,
    "income_period_basis": "contract_date",
    "money": "180000",
    "income_at": "2026-08-01T00:00:00+08:00",
    "auto_compute": true,
    "note": "验收款",
    "grace_period": 30,
    "assessment_date": "2026-09-01T00:00:00+08:00"
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | ID! | 是 | 项目ID |
| `param` | IncomePlanParam! | 是 | 应收计划参数 |
| `param.income_milestone` | IncomeMilestone! | 是 | 收入里程碑 |
| `param.income_type` | IncomeType! | 是 | 收入类型 |
| `param.contract_condition` | String! | 是 | 合同条件描述 |
| `param.income_way` | IncomeWay! | 是 | 回款方式 |
| `param.income_rate` | Float! | 是 | 回款比例 0-1 |
| `param.money` | String! | 是 | 金额 |
| `param.grace_period` | Int! | 是 | 宽限期天数 |

**预期结果**：返回 `Boolean!`。

---

### 109. create_shipping_order (创建发货单)

**用途**：为项目创建 U8 发货单。

```graphql
mutation CreateShippingOrder($project_id: String!, $input: InputShippingOrder!) {
  create_shipping_order(project_id: $project_id, input: $input)
}
```

```json
{
  "project_id": "proj_123",
  "input": {
    "order_date": "2026-05-10T00:00:00+08:00",
    "shipping_address_id": "addr_001",
    "products": [
      { "product_id": "prod_001", "form_id": "form_001", "quantity": 2 }
    ],
    "note": "标准发货"
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `project_id` | String! | 是 | 项目ID |
| `input` | InputShippingOrder! | 是 | 发货单信息 |
| `input.order_date` | Time! | 是 | 订单日期 |
| `input.shipping_address_id` | String! | 是 | 收货地址ID |
| `input.products` | [InputShippingOrderProduct!]! | 是 | 发货产品列表 |
| `input.note` | String | 否 | 备注 |

**预期结果**：返回 `Boolean`。

---

## 十九、系统配置

### 110. config (系统配置查询)

**用途**：查询系统全局配置，包括各类审批人、敏感词等。

```graphql
query Config {
  config {
    confirm_revenue_date
    product_approval_master { id name }
    service_approval_master { id name }
    company_apply_sale_manager { id name }
    product_delivery_approver { id name }
    service_delivery_approver { id name }
    delivery_finance_approver { id name }
    sensitive_word_list
  }
}
```

**使用帮助**

无参数。

**预期结果**：返回 `Config` 对象。

---

### 111. updateConfigProductDeliveryApprover (修改产品交付审批人)

**用途**：配置产品交付流程的审批人。

```graphql
mutation UpdateConfigProductDeliveryApprover($id: String!) {
  updateConfigProductDeliveryApprover(id: $id)
}
```

```json
{ "id": "user_001" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | String! | 是 | 审批人用户ID |

**预期结果**：返回 `Boolean`。

---

### 112. updateConfigServiceDeliveryApprover (修改安服交付审批人)

**用途**：配置安服交付流程的审批人。

```graphql
mutation UpdateConfigServiceDeliveryApprover($id: String!) {
  updateConfigServiceDeliveryApprover(id: $id)
}
```

```json
{ "id": "user_002" }
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | String! | 是 | 审批人用户ID |

**预期结果**：返回 `Boolean`。

---

## 二十、商机报备

### 113. list_business_chance (商机报备列表查询)

**用途**：查询合作伙伴的商机报备列表。

```graphql
query ListBusinessChance($search: BusinessChanceSearchParam, $pagination: PaginationParam) {
  list_business_chance(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      project_name
      company { name }
      channel { name }
      status
      apply_status
      claim_by { name }
      due_at
      created_at
    }
  }
}
```

```json
{
  "search": {
    "project_name": "银行",
    "apply_status": ["waiting"],
    "status": "valid"
  },
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | BusinessChanceSearchParam | 否 | 搜索条件 |
| `search.project_name` | String | 否 | 项目名称关键词 |
| `search.apply_status` | [BusinessChanceApplyStatus!] | 否 | 审核状态 |
| `search.status` | BusinessChanceStatus | 否 | 商机状态 |
| `pagination` | PaginationParam | 否 | 分页 |

**可选值参考**
- `apply_status`：`waiting`（待审核）, `pass`（通过）, `fail`（失败）
- `status`：`valid`（有效）, `invalid`（无效）, `void`（作废）

**预期结果**：返回 `BusinessChanceConnection`。

---

### 114. createBusinessChance (创建商机报备)

**用途**：销售或伙伴提交新的商机报备。

```graphql
mutation CreateBusinessChance(
  $channel_id: ID!
  $channel_contact: String!
  $contact_information: String!
  $company_id: String!
  $project_name: String!
  $product_list: [InputProductChance!]!
  $due_at: Time!
  $claim_by: ID!
  $project_contact: String!
  $project_address: String!
  $department_used: String!
  $delivery_type: DeliveryType!
  $info: String!
  $attachments: [ID!]
) {
  createBusinessChance(
    channel_id: $channel_id
    channel_contact: $channel_contact
    contact_information: $contact_information
    company_id: $company_id
    project_name: $project_name
    product_list: $product_list
    due_at: $due_at
    claim_by: $claim_by
    project_contact: $project_contact
    project_address: $project_address
    department_used: $department_used
    delivery_type: $delivery_type
    info: $info
    attachments: $attachments
  )
}
```

```json
{
  "channel_id": "chan_001",
  "channel_contact": "李四",
  "contact_information": "13900139000",
  "company_id": "comp_456",
  "project_name": "XX银行安全加固",
  "product_list": [{ "product_id": "prod_001", "form_id": "form_001", "price": 200000 }],
  "due_at": "2026-08-01T00:00:00+08:00",
  "claim_by": "user_001",
  "project_contact": "张三",
  "project_address": "北京市海淀区",
  "department_used": "信息技术部",
  "delivery_type": "self",
  "info": "客户有明确采购意向",
  "attachments": []
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `channel_id` | ID! | 是 | 伙伴ID |
| `channel_contact` | String! | 是 | 伙伴联系人 |
| `contact_information` | String! | 是 | 联系方式 |
| `company_id` | String! | 是 | 客户ID |
| `project_name` | String! | 是 | 项目名称 |
| `product_list` | [InputProductChance!]! | 是 | 产品机会列表 |
| `due_at` | Time! | 是 | 预估签约时间 |
| `claim_by` | ID! | 是 | 销售负责人 |
| `project_contact` | String! | 是 | 项目联系人 |
| `project_address` | String! | 是 | 项目地址 |
| `department_used` | String! | 是 | 使用部门 |
| `delivery_type` | DeliveryType! | 是 | 交付类型 |
| `info` | String! | 是 | 项目需求描述 |
| `attachments` | [ID!] | 否 | 附件 |

**预期结果**：返回 `Boolean`。

---

### 115. reviewBusinessChance (审批商机报备)

**用途**：战队负责人或指定审批人审批商机报备。

```graphql
mutation ReviewBusinessChance(
  $id: ID!
  $status: Boolean!
  $channel_claim_by: String!
  $reject_type: BusinessChanceRejectType
  $reject_chance_id: ID!
  $reject_project_id: ID!
  $note: String!
  $desc: String!
) {
  reviewBusinessChance(
    id: $id
    status: $status
    channel_claim_by: $channel_claim_by
    reject_type: $reject_type
    reject_chance_id: $reject_chance_id
    reject_project_id: $reject_project_id
    note: $note
    desc: $desc
  )
}
```

```json
{
  "id": "bc_789",
  "status": true,
  "channel_claim_by": "user_001",
  "reject_type": null,
  "reject_chance_id": "",
  "reject_project_id": "",
  "note": "同意报备",
  "desc": ""
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 商机报备ID |
| `status` | Boolean! | 是 | true 通过，false 驳回 |
| `channel_claim_by` | String! | 是 | 伙伴销售负责人ID |
| `reject_type` | BusinessChanceRejectType | 否 | 驳回类型 |
| `reject_chance_id` | ID! | 是 | 冲突商机ID（无则空字符串） |
| `reject_project_id` | ID! | 是 | 冲突项目ID（无则空字符串） |
| `note` | String! | 是 | 审批意见 |
| `desc` | String! | 是 | 补充说明（默认空字符串） |

**可选值参考**
- `reject_type`：`business_chance_conflict`（报备冲突）, `direct_project_conflict`（直签项目冲突）, `base_info_err`（基础信息错误）

**预期结果**：返回 `Boolean`。

---

## 二十一、解决方案

### 116. list_solution (解决方案列表查询)

**用途**：查询解决方案列表。

```graphql
query ListSolution($search: SolutionSearchParam, $pagination: PaginationParam) {
  list_solution(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      name
      type
      status
      creator { name }
      created_at
    }
  }
}
```

```json
{
  "search": {
    "name": "金融",
    "status": ["published"]
  },
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | SolutionSearchParam | 否 | 搜索条件 |
| `pagination` | PaginationParam | 否 | 分页 |

**预期结果**：返回 `SolutionConnection`。

---

### 117. create_solution (新建解决方案)

**用途**：创建新的解决方案并提交审核。

```graphql
mutation CreateSolution($input: InputSolutionVersion!, $push_review: Boolean!) {
  create_solution(input: $input, push_review: $push_review)
}
```

```json
{
  "input": {
    "name": "金融行业Web安全解决方案",
    "industry_ids": ["ind_finance"],
    "product_ids": ["prod_001"],
    "content": "方案详情...",
    "attachments": []
  },
  "push_review": true
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input` | InputSolutionVersion! | 是 | 解决方案内容 |
| `push_review` | Boolean! | 是 | 是否立即提交审核 |

**预期结果**：返回 `Boolean`。

---

### 118. review_solution (审核解决方案)

**用途**：审批解决方案的发布申请。

```graphql
mutation ReviewSolution($solution_version_id: String!, $status: Boolean!, $reason: String!) {
  review_solution(solution_version_id: $solution_version_id, status: $status, reason: $reason)
}
```

```json
{
  "solution_version_id": "sv_456",
  "status": true,
  "reason": "内容完整，同意发布"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `solution_version_id` | String! | 是 | 解决方案版本ID |
| `status` | Boolean! | 是 | true 通过，false 驳回 |
| `reason` | String! | 是 | 审批意见 |

**预期结果**：返回 `Boolean`。

---

## 二十二、机会场景

### 119. list_opportunity_scenario (机会场景列表查询)

**用途**：查询销售机会场景列表。

```graphql
query ListOpportunityScenario($search: OpportunityScenarioSearchParam!, $pagination: PaginationParam, $sort_by: SortBy) {
  list_opportunity_scenario(search: $search, pagination: $pagination, sort_by: $sort_by) {
    total
    skip
    limit
    data {
      id
      name
      type
      status
      creator { name }
      created_at
    }
  }
}
```

```json
{
  "search": {
    "name": "等保",
    "type": ["industry"]
  },
  "pagination": { "skip": 0, "limit": 20 },
  "sort_by": { "by": "updated_at", "order": -1 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | OpportunityScenarioSearchParam! | 是 | 搜索条件 |
| `pagination` | PaginationParam | 否 | 分页 |
| `sort_by` | SortBy | 否 | 排序 |

**预期结果**：返回 `OpportunityScenarioConnection`。

---

### 120. create_opportunity_scenario (创建机会场景)

**用途**：创建新的销售机会场景。

```graphql
mutation CreateOpportunityScenario($input: InputOpportunityScenario!) {
  create_opportunity_scenario(input: $input)
}
```

```json
{
  "input": {
    "type": "industry",
    "industry_ids": ["ind_finance"],
    "group_ids": [],
    "name": "金融行业等保2.0合规",
    "description": "针对金融客户的等保合规需求",
    "customer_persona": "信息安全总监",
    "budget": "50万-100万",
    "time_window": "2026年Q2-Q3",
    "closed_loop_time": 90,
    "product": [{ "product_id": "prod_001", "form_id": "form_001" }],
    "claim_by_ids": ["user_001"],
    "has_solution": true,
    "solution_link": "https://wiki.example.com",
    "solution_material": "",
    "sale_guide": "",
    "training_video": "",
    "solution_material_list": [],
    "sale_guide_list": [],
    "training_video_list": [],
    "success_company_ids": []
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `input` | InputOpportunityScenario! | 是 | 机会场景信息 |
| `input.type` | OpportunityScenarioType! | 是 | 场景类型 |
| `input.name` | String! | 是 | 场景名称 |
| `input.industry_ids` | [String!]! | 是 | 关联行业ID |
| `input.product` | [InputProductWithForm!]! | 是 | 关联产品 |
| `input.claim_by_ids` | [String!]! | 是 | 负责人ID |
| `input.has_solution` | Boolean! | 是 | 是否有关联方案 |

**预期结果**：返回 `Boolean`。

---

## 二十三、特价回溯与纸质验收单

### 121. list_special_deals_trace_back_await_project (特价回溯待回溯项目查询)

**用途**：查询特价回溯中待回溯的项目列表。

```graphql
query ListSpecialDealsTraceBackAwaitProject($search: SpecialDealsTraceBackAwaitProjectSearchParam, $pagination: PaginationParam) {
  list_special_deals_trace_back_await_project(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      project { id name }
      company { name }
      special_deal_amount
      created_at
    }
  }
}
```

```json
{
  "search": {
    "claim_by": ["user_001"]
  },
  "pagination": { "skip": 0, "limit": 20 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | SpecialDealsTraceBackAwaitProjectSearchParam | 否 | 搜索条件 |
| `pagination` | PaginationParam | 否 | 分页 |

**预期结果**：返回 `SpecialDealsTraceBackAwaitProjectConnection`。

---

### 122. create_special_deals_trace_backs (发起特价回溯)

**用途**：对符合条件的特价项目批量发起回溯。

```graphql
mutation CreateSpecialDealsTraceBacks(
  $search: SpecialDealsTraceBackAwaitProjectSearchParam
  $random_inspection_type: SpecialDealsTraceBackRandomInspectionType!
  $random_inspection_number: Int
) {
  create_special_deals_trace_backs(
    search: $search
    random_inspection_type: $random_inspection_type
    random_inspection_number: $random_inspection_number
  )
}
```

```json
{
  "search": null,
  "random_inspection_type": "all",
  "random_inspection_number": null
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | SpecialDealsTraceBackAwaitProjectSearchParam | 否 | 筛选条件 |
| `random_inspection_type` | SpecialDealsTraceBackRandomInspectionType! | 是 | 抽查类型 |
| `random_inspection_number` | Int | 否 | 抽查数量 |

**预期结果**：返回 `Boolean`。

---

### 123. submit_paper_acceptance_form (纸质验收单提交)

**用途**：提交纸质验收单。

```graphql
mutation SubmitPaperAcceptanceForm(
  $id: String!
  $type: PaperAcceptanceFormType!
  $archive_location: PaperAcceptanceFormArchiveLocation
  $tracking_number: String!
  $deprecated_reason: String!
) {
  submit_paper_acceptance_form(
    id: $id
    type: $type
    archive_location: $archive_location
    tracking_number: $tracking_number
    deprecated_reason: $deprecated_reason
  )
}
```

```json
{
  "id": "paf_001",
  "type": "mail",
  "archive_location": "beijing_office",
  "tracking_number": "SF123456789",
  "deprecated_reason": ""
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | String! | 是 | 验收单ID |
| `type` | PaperAcceptanceFormType! | 是 | 提交类型 |
| `archive_location` | PaperAcceptanceFormArchiveLocation | 否 | 归档地点 |
| `tracking_number` | String! | 否 | 快递单号（默认空字符串） |
| `deprecated_reason` | String! | 否 | 废弃原因（默认空字符串） |

**预期结果**：返回 `Boolean`。

---

## 二十四、公告与待办

### 124. create_announcement (创建公告)

**用途**：创建系统公告并指定可见范围。

```graphql
mutation CreateAnnouncement($title: String!, $content: String!, $notice_group_ids: [String!]!) {
  create_announcement(title: $title, content: $content, notice_group_ids: $notice_group_ids)
}
```

```json
{
  "title": "五一放假通知",
  "content": "2026年五一假期安排如下...",
  "notice_group_ids": ["group_all"]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `title` | String! | 是 | 公告标题 |
| `content` | String! | 是 | 公告内容 |
| `notice_group_ids` | [String!]! | 是 | 通知用户组ID数组，默认 [] 表示全部 |

**预期结果**：返回 `Boolean`。

---

### 125. create_todo_list (创建待办事项)

**用途**：创建待办事项并指派处理人。

```graphql
mutation CreateTodoList(
  $name: String!
  $type: TodoType!
  $relation: String!
  $deadline: Time!
  $processor: [ID!]!
) {
  create_todo_list(name: $name, type: $type, relation: $relation, deadline: $deadline, processor: $processor)
}
```

```json
{
  "name": "准备合同文本",
  "type": "contract",
  "relation": "proj_123",
  "deadline": "2026-05-10T18:00:00+08:00",
  "processor": ["user_001", "user_002"]
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `name` | String! | 是 | 待办名称 |
| `type` | TodoType! | 是 | 待办类型 |
| `relation` | String! | 是 | 关联对象ID |
| `deadline` | Time! | 是 | 截止时间 |
| `processor` | [ID!]! | 是 | 处理人ID数组 |

**预期结果**：返回 `Boolean`。

---

### 126. finished_todo_list (完成待办事项)

**用途**：标记待办为已完成或取消完成。

```graphql
mutation FinishedTodoList($id: ID!, $is_finished: Boolean!, $completionNote: String!) {
  finished_todo_list(id: $id, is_finished: $is_finished, completionNote: $completionNote)
}
```

```json
{
  "id": "todo_456",
  "is_finished": true,
  "completionNote": "已完成合同准备"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | ID! | 是 | 待办ID |
| `is_finished` | Boolean! | 是 | true 完成，false 取消完成 |
| `completionNote` | String! | 是 | 完成说明 |

**预期结果**：返回 `Boolean`。

---

## 二十五、统计与导出

### 127. projectStatistics (项目统计查询)

**用途**：按维度统计项目成交金额、合同数量等。

```graphql
query ProjectStatistics($search: ProjectSearchParam!, $pagination: PaginationParam, $sort_by: SortBy) {
  projectStatistics(search: $search, pagination: $pagination, sort_by: $sort_by) {
    projects {
      total
      skip
      limit
      data { id name stage amount company { name } }
    }
    statistics {
      total_amount
      total_actual_amount
      project_count
      contract_count
    }
    company_num
  }
}
```

```json
{
  "search": {
    "stage": ["deal"],
    "deal_date": { "from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00" }
  },
  "pagination": { "skip": 0, "limit": 20 },
  "sort_by": { "by": "deal_date", "order": -1 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | ProjectSearchParam! | 是 | 筛选条件 |
| `pagination` | PaginationParam | 否 | 分页 |
| `sort_by` | SortBy | 否 | 排序 |

**预期结果**：返回 `ProjectStatistics`，含项目列表与汇总指标。

---

### 128. paymentStatistics (回款统计查询)

**用途**：统计回款金额与计划回款金额。

```graphql
query PaymentStatistics($search: ProjectSearchParam!, $pagination: PaginationParam, $sort_by: SortBy) {
  paymentStatistics(search: $search, pagination: $pagination, sort_by: $sort_by) {
    projects {
      total
      skip
      limit
      data { id name amount company { name } }
    }
    statistics {
      total_payment
      total_plan_payment
      project_count
    }
    company_num
  }
}
```

```json
{
  "search": {
    "claim_by": ["user_001"]
  },
  "pagination": { "skip": 0, "limit": 20 },
  "sort_by": { "by": "updatedAt", "order": -1 }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | ProjectSearchParam! | 是 | 筛选条件 |
| `pagination` | PaginationParam | 否 | 分页 |
| `sort_by` | SortBy | 否 | 排序 |

**预期结果**：返回 `PaymentStatistics`，含回款汇总数据。

---

### 129. presaleStatistics (售前数据统计)

**用途**：统计售前相关数据。

```graphql
query PresaleStatistics($search: ProjectSearchParam!) {
  presaleStatistics(search: $search) {
    statistics {
      domain
      project_count
      total_amount
    }
  }
}
```

```json
{
  "search": {
    "stage": ["tech_pre_research", "plan_discuss"]
  }
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | ProjectSearchParam! | 是 | 筛选条件 |

**预期结果**：返回 `PresaleStatistics`。

---

### 130. exportExcelFile (导出项目统计Excel)

**用途**：导出项目或回款的统计Excel文件。

```graphql
query ExportExcelFile(
  $search: ProjectSearchParam!
  $sort_by: [SortBy!]
  $deal_revenue_type: [ExportDealRevenueType!]
  $type: ExportType
) {
  exportExcelFile(search: $search, sort_by: $sort_by, deal_revenue_type: $deal_revenue_type, type: $type) {
    url
    msg
  }
}
```

```json
{
  "search": {
    "stage": ["deal"],
    "deal_date": { "from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00" }
  },
  "sort_by": [{ "by": "deal_date", "order": -1 }],
  "deal_revenue_type": ["deal_amount", "revenue_amount"],
  "type": "statistic"
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | ProjectSearchParam! | 是 | 筛选条件 |
| `sort_by` | [SortBy!] | 否 | 排序规则 |
| `deal_revenue_type` | [ExportDealRevenueType!] | 否 | 导出数据类型 |
| `type` | ExportType | 否 | 导出类型，默认 `statistic` |

**可选值参考**
- `deal_revenue_type`：`deal_amount`（成交额）, `revenue_amount`（回款额）, `deal_perf_amount`（成交绩效额）, `revenue_perf_amount`（回款绩效额）
- `type`：`statistic`, `validate_invoice`, `deal_revenue`, `deal_and_not_deal`, `project_product_type_detail`, `project_invoice`

**预期结果**：返回 `ExportExcel`，含下载链接 url。

---

### 131. deal_revenue_perf_ranking (销售排行榜查询)

**用途**：查询销售的成交/回款业绩排行榜。

```graphql
query DealRevenuePerfRanking(
  $search: ProjectSearchParam!
  $fiscal_year: Int!
  $deal_weight: Float!
  $revenue_weight: Float!
) {
  deal_revenue_perf_ranking(
    search: $search
    fiscal_year: $fiscal_year
    deal_weight: $deal_weight
    revenue_weight: $revenue_weight
  ) {
    ranking {
      user { id name }
      deal_amount
      revenue_amount
      score
    }
  }
}
```

```json
{
  "search": {
    "stage": ["deal"],
    "deal_date": { "from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00" }
  },
  "fiscal_year": 2026,
  "deal_weight": 0.6,
  "revenue_weight": 0.4
}
```

**使用帮助**

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `search` | ProjectSearchParam! | 是 | 筛选条件，必须包含 stage 和 deal_date |
| `fiscal_year` | Int! | 是 | 财年 |
| `deal_weight` | Float! | 是 | 成交额权重 |
| `revenue_weight` | Float! | 是 | 回款额权重 |

**预期结果**：返回 `PerfRanking`，含排名列表。

---

## 附录：常用枚举值速查表

| 枚举名 | 可选值 |
|---|---|
| **ProjectStage** | `leads`, `confirmed`, `tech_pre_research`, `plan_discuss`, `project_approval`, `start_purchase`, `business_tender`, `recognized`, `deal`, `invalid`, `lost_order`, `signed_terminated` |
| **ProjectLevel** | `ordinary`, `significant` |
| **ProjectType** | `framework`, `normal` |
| **ContractSignType** | `direct`, `non_direct` |
| **DealLogic** | `system`, `artificial` |
| **ReportType** | `daily`, `weekly` |
| **CommentRelatedType** | `project`, `company`, `leads`, `contract`, `report`, `todo_list`, `business_chance`, `price_approval`, `product_delivery`, `service_delivery`, `company_apply`, `channel_apply`, `performance_distribution_approval`, `special_deals_trace_back`, `pre_sale_performance_distribution_approval` |
| **RevenueState** | `matched`, `unmatched`, `split` |
| **ConfirmRevenueItemState** | `unconfirmed`, `partconfirmed`, `confirmed`, `invalid`, `reject` |
| **ConfirmRevenueAttachmentType** | `seal`, `sign`, `mail`, `other`, `renew_and_resident` |
| **CompanyRank** | `KA`, `A`, `B`, `C` |
| **ChannelStatus** | `normal`, `register`, `chase_sun`, `hold_moon`, `town_star`, `certified` |
| **ChannelGrade** | `v1`, `v2`, `v3` |
| **ChannelType** | `resources`, `product`, `solution`, `service_provider`, `software_development` |
| **ChannelCooperateStatus** | `keep`, `over`, `wait` |
| **DeliveryType** | `self`, `ecology_service_center`, `chaitin` |
| **DeliverySignStage** | `contractAwardedProject`, `unContractAwardedProject`, `serviceBeforeSettlementProject` |
| **ContractFileType** | `contract`, `proof` |
| **ContractPayOrPaidID** | `pay`, `get_paid`, `no_money` |
| **Currency** | `CNY`, `USD`, `OTHERS` |
| **BranchCompanyID** | `chaitin`, `pulsar`, `chaitin_shanghai`, `chaitin_shenzhen`, `chaitin_nanjing`, `chaitin_hangzhou`, `chaitin_wuhan`, `waigudao`, `laishi`, `fangcao_tianya`, `data_intelligence`, `personal`, `other` |
| **IncomeMilestone** | `contract_effective`, `contract_date`, `product_arrival_acceptance`, `product_final_acceptance`, `service_final_acceptance`, `product_installation_acceptance`, `service_staged_acceptance`, `other` |
| **IncomeType** | `product_prepayments`, `service_prepayments`, `first_payment`, `acceptance_payment`, `warranty_money`, `other` |
| **IncomeWay** | `wire_transfer`, `trade_acceptance_draft`, `bank_acceptance_draft`, `other` |
| **BusinessChanceApplyStatus** | `waiting`, `pass`, `fail` |
| **BusinessChanceStatus** | `valid`, `invalid`, `void` |
| **AnnouncementStatus** | `publish`, `wait`, `revert` |
| **ExportType** | `statistic`, `validate_invoice`, `deal_revenue`, `deal_and_not_deal`, `project_product_type_detail`, `project_invoice` |

---

> 本文档共涵盖 **131 个** 核心 GraphQL 操作模板，覆盖查询（Query）与变更（Mutation）两大类型，涉及 CRM 全部核心业务域。实际调用时请以当前系统 schema 为准，部分枚举值与字段可能随版本迭代调整。
