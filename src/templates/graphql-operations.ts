// Auto-generated from crm_graphql_templates_all.md
// Each operation: { name, description, query, variableDefaults }

export const listProject = {
  name: "listProject",
  description: "项目列表查询",
  query: `query ListProject($search: ProjectSearchParam!, $pagination: PaginationParam, $sort_by: SortBy!) {
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
      actual_amount
      win_rate
      calc_type
      contract_sign_type
      delivery_type
      property
      performance_calc_status
      shipping_status
      project_element_status
      company { id name common_name }
      claimBy { id user { name } }
      created_at
      updated_at
    }
  }
}`,
  variableDefaults: {"search": {"name": ["银行"], "stage": ["tech_pre_research", "plan_discuss"], "claim_by": ["user_001"], "deal_date": {"from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00"}}, "pagination": {"skip": 0, "limit": 20}, "sort_by": {"by": "updatedAt", "order": -1}},
};

export const projectInfo = {
  name: "projectInfo",
  description: "项目详情查询",
  query: `query ProjectInfo($id: ID!) {
  projectInfo(id: $id) {
    id
    name
    stage
    level
    type
    deal_date
    estimated_deal_date
    sign_date
    estimated_sign_date
    deal_amount
    actual_amount
    amount
    perform_amount
    sign_performance_amount { amount type }
    win_rate
    calc_type
    contract_sign_type
    delivery_type
    property
    deal_logic
    project_promise
    performance_calc_status
    first_revenue_ratio
    already_paid
    residue_paid
    total_payments
    payment_all_finished
    payment_coefficient
    other_coefficient
    coefficient_desc
    confirm_revenue_state
    confirm_revenue_due_at
    has_income_plan
    shipping_status
    project_element_status
    deliveries_all_finished
    plan_confirm_income_complete_date
    artificial_reason
    main_reason
    invalid_reason
    income_forecast_caliber
    seller_caliber
    labels
    battle_label_list { id name group }
    source
    presale_stage
    products { id product { id name } }
    company { id name }
    claimBy { id user { name } }
    clients { id name phone email position }
    contracts { id name contractState { name } }
    created_at
    updated_at
  }
}`,
  variableDefaults: {"id": "proj_123"},
};

export const createProject = {
  name: "createProject",
  description: "创建项目",
  query: `mutation CreateProject($input: InputProject!) {
  createProject(input: $input) {
    id
    name
    stage
    level
    deal_date
    sign_date
    created_at
  }
}`,
  variableDefaults: {"input": {"name": "XX银行安全防护项目", "company_id": "comp_456", "type": "normal", "level": "significant", "deal_date": "2026-08-01T00:00:00+08:00", "sign_date": "2026-09-01T00:00:00+08:00", "stage": "leads", "stage_info": {"info": "新建项目", "attachments": [], "todos": []}, "leads_convert_condition": [], "project_promise": "delivery_standard", "extra": {"source": "线索转化"}}},
};

export const updateProjectBasicInfo = {
  name: "updateProjectBasicInfo",
  description: "更新项目基本信息",
  query: `mutation UpdateProjectBasicInfo($id: ID!, $name: String!, $level: ProjectLevel!) {
  updateProjectBasicInfo(id: $id, name: $name, level: $level) {
    id
    name
    level
    updated_at
  }
}`,
  variableDefaults: {"id": "proj_123", "name": "XX银行安全防护项目（更新）", "level": "ordinary"},
};

export const updateProjectStage = {
  name: "updateProjectStage",
  description: "更新项目阶段",
  query: `mutation UpdateProjectStage(
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
}`,
  variableDefaults: {"project_id": "proj_123", "stage": "tech_pre_research", "deal_logic": "system", "artificial_reason": null, "stage_info": {"info": "进入技术预研阶段", "attachments": [], "todos": []}, "project_promise": "delivery_standard", "main_reason": "客户发起技术交流", "minor_reason": [], "invalid_reason": null, "win_rate": "60%", "deal_date": "2026-06-30T00:00:00+08:00", "sign_date": "2026-07-15T00:00:00+08:00", "contract_sign_type": "direct", "delivery_type": "standard", "partners": []},
};

export const updateProjectDetail = {
  name: "updateProjectDetail",
  description: "更新项目明细",
  query: `mutation UpdateProjectDetail(
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
}`,
  variableDefaults: {"project_id": "proj_123", "calc_type": "standard", "products": [{"product_id": "prod_001", "quantity": 2, "price": 150000}], "contract_sign_type": "direct", "property": "new", "delivery_type": "self", "partners": [], "solution_ids": []},
};

export const updateProjectLabels = {
  name: "updateProjectLabels",
  description: "更新项目标签",
  query: `mutation UpdateProjectLabels($id: ID!, $labels: [String!]) {
  updateProjectLabels(id: $id, labels: $labels) {
    id
    labels { id name }
  }
}`,
  variableDefaults: {"id": "proj_123", "labels": ["label_001", "label_002"]},
};

export const update_project_battle_label = {
  name: "update_project_battle_label",
  description: "更新项目战役标签",
  query: `mutation UpdateProjectBattleLabel($id: ID!, $battle_label_ids: [String!]!) {
  update_project_battle_label(id: $id, battle_label_ids: $battle_label_ids)
}`,
  variableDefaults: {"id": "proj_123", "battle_label_ids": ["battle_001"]},
};

export const transferProjectClaim = {
  name: "transferProjectClaim",
  description: "转移项目负责人",
  query: `mutation TransferProjectClaim($id: ID!, $now: ID!) {
  transferProjectClaim(id: $id, now: $now)
}`,
  variableDefaults: {"id": "proj_123", "now": "user_456"},
};

export const updateProjectMember = {
  name: "updateProjectMember",
  description: "更新项目团队成员",
  query: `mutation UpdateProjectMember($id: ID!, $member_ids: [ID!]) {
  updateProjectMember(id: $id, member_ids: $member_ids)
}`,
  variableDefaults: {"id": "proj_123", "member_ids": ["user_002", "user_003"]},
};

export const updateProjectPerformanceDistribution = {
  name: "updateProjectPerformanceDistribution",
  description: "更新项目业绩分配",
  query: `mutation UpdateProjectPerformanceDistribution($id: ID!, $input: [InputUserPerformancePercent!]!) {
  updateProjectPerformanceDistribution(id: $id, input: $input)
}`,
  variableDefaults: {"id": "proj_123", "input": [{"user_id": "user_001", "percent": 60}, {"user_id": "user_002", "percent": 40}]},
};

export const removeProject = {
  name: "removeProject",
  description: "删除项目",
  query: `mutation RemoveProject($id: ID!) {
  removeProject(id: $id)
}`,
  variableDefaults: {"id": "proj_123"},
};

export const projectCostInfo = {
  name: "projectCostInfo",
  description: "项目成本信息查询",
  query: `query ProjectCostInfo($id: ID!) {
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
}`,
  variableDefaults: {"id": "proj_123"},
};

export const update_project_cost_detail = {
  name: "update_project_cost_detail",
  description: "更新项目成本信息",
  query: `mutation UpdateProjectCostDetail($project_id: ID!, $details: [InputProjectProductCostDetail!]!) {
  update_project_cost_detail(project_id: $project_id, details: $details)
}`,
  variableDefaults: {"project_id": "proj_123", "details": [{"product_id": "prod_001", "form_id": "form_001", "cost": 50000}]},
};

export const update_project_detail_coefficient = {
  name: "update_project_detail_coefficient",
  description: "更新项目明细系数",
  query: `mutation UpdateProjectDetailCoefficient(
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
}`,
  variableDefaults: {"project_id": "proj_123", "payment_coefficient": 1.0, "other_coefficient": 1.0, "coefficient_desc": "标准系数"},
};

export const create_project_detail_change_apply = {
  name: "create_project_detail_change_apply",
  description: "创建项目明细变更申请",
  query: `mutation CreateProjectDetailChangeApply($input: InputProjectDetailChangeApply!) {
  create_project_detail_change_apply(input: $input)
}`,
  variableDefaults: {"input": {"project_id": "proj_123", "change_scene": ["product_change"], "scene_info": "更换产品型号", "change_reason": ["customer_requirement_change"], "change_reason_info": "客户需求变更", "assessment_increment": 0, "assessment_reason": ""}},
};

export const approve_project_detail_change_apply = {
  name: "approve_project_detail_change_apply",
  description: "审批项目明细变更申请",
  query: `mutation ApproveProjectDetailChangeApply($apply_id: String!, $result: Boolean!, $note: String!) {
  approve_project_detail_change_apply(apply_id: $apply_id, result: $result, note: $note)
}`,
  variableDefaults: {"apply_id": "apply_456", "result": true, "note": "同意变更"},
};

export const update_project_element = {
  name: "update_project_element",
  description: "更新项目要素",
  query: `mutation UpdateProjectElement(
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
}`,
  variableDefaults: {"project_id": "proj_123", "input_project_element": [], "input_project_direction": [], "calc_project_promise": false},
};

export const list_project_delivery_stock = {
  name: "list_project_delivery_stock",
  description: "查询项目已交付设备",
  query: `query ListProjectDeliveryStock($project_id: String!) {
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
}`,
  variableDefaults: {"project_id": "proj_123"},
};

export const create_product_delivery = {
  name: "create_product_delivery",
  description: "创建产品交付",
  query: `mutation CreateProductDelivery(
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
}`,
  variableDefaults: {"project_id": "proj_123", "assigner": "user_delivery_001", "product_list": [{"product_id": "prod_001", "form_id": "form_001"}], "license_validity": "1年", "after_sale_validity": "3年", "implement_note": null, "is_early_note": null, "estimate_deal_time": null, "delivery_note": "标准交付", "project_check": "已通过", "project_other_note": "无", "attachments": []},
};

export const review_product_delivery = {
  name: "review_product_delivery",
  description: "审批产品交付",
  query: `mutation ReviewProductDelivery($id: String!, $status: Boolean!, $reason: String!, $sign_stage: DeliverySignStage) {
  review_product_delivery(id: $id, status: $status, reason: $reason, sign_stage: $sign_stage)
}`,
  variableDefaults: {"id": "delivery_456", "status": true, "reason": "审批通过", "sign_stage": "contractAwardedProject"},
};

export const update_product_delivery_time_info = {
  name: "update_product_delivery_time_info",
  description: "更新产品预计交付/验收时间",
  query: `mutation UpdateProductDeliveryTimeInfo($info: InputProductDeliveryTimeInfo!) {
  update_product_delivery_time_info(info: $info)
}`,
  variableDefaults: {"info": {"project_id": "proj_123", "product_id": "prod_001", "form_id": "form_001", "estimate_delivery_time": "2026-06-01T00:00:00+08:00", "estimate_acceptance_time": "2026-06-15T00:00:00+08:00"}},
};

export const designation_product_delivery_person_in_charge = {
  name: "designation_product_delivery_person_in_charge",
  description: "指定产品交付负责人",
  query: `mutation DesignationProductDeliveryPersonInCharge($id: String!, $person_in_charge: String!) {
  designation_product_delivery_person_in_charge(id: $id, person_in_charge: $person_in_charge)
}`,
  variableDefaults: {"id": "delivery_456", "person_in_charge": "user_789"},
};

export const create_product_after_sale = {
  name: "create_product_after_sale",
  description: "创建产品售后",
  query: `mutation CreateProductAfterSale($input: InputProductAfterSale!) {
  create_product_after_sale(input: $input)
}`,
  variableDefaults: {"input": {"project_id": "proj_123", "product_id": "prod_001", "form_id": "form_001", "type": "repair", "reason": "硬件故障", "note": "需要更换主板"}},
};

export const init_service_delivery = {
  name: "init_service_delivery",
  description: "发起安服交付",
  query: `mutation InitServiceDelivery($delivery_id: ID!, $reason: String, $file: [ID!], $estimate_deal_time: Time) {
  init_service_delivery(delivery_id: $delivery_id, reason: $reason, file: $file, estimate_deal_time: $estimate_deal_time)
}`,
  variableDefaults: {"delivery_id": "delivery_789", "reason": "客户要求启动安服交付", "file": [], "estimate_deal_time": "2026-07-01T00:00:00+08:00"},
};

export const review_service_delivery = {
  name: "review_service_delivery",
  description: "审批安服交付",
  query: `mutation ReviewServiceDelivery($delivery_id: ID!, $status: Boolean!, $reason: String!, $sign_stage: DeliverySignStage) {
  review_service_delivery(delivery_id: $delivery_id, status: $status, reason: $reason, sign_stage: $sign_stage)
}`,
  variableDefaults: {"delivery_id": "delivery_789", "status": true, "reason": "审批通过", "sign_stage": "contractAwardedProject"},
};

export const finish_service_delivery = {
  name: "finish_service_delivery",
  description: "结束安服交付",
  query: `mutation FinishServiceDelivery($delivery_id: ID!) {
  finish_service_delivery(delivery_id: $delivery_id)
}`,
  variableDefaults: {"delivery_id": "delivery_789"},
};

export const finish_early_service_delivery = {
  name: "finish_early_service_delivery",
  description: "终止提前实施",
  query: `mutation FinishEarlyServiceDelivery($delivery_id: ID!, $reason: String!) {
  finish_early_service_delivery(delivery_id: $delivery_id, reason: $reason)
}`,
  variableDefaults: {"delivery_id": "delivery_789", "reason": "客户要求延期"},
};

export const punish_service_delivery = {
  name: "punish_service_delivery",
  description: "安服交付惩罚",
  query: `mutation PunishServiceDelivery(
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
}`,
  variableDefaults: {"delivery_id": "delivery_789", "is_punish": true, "reason": "逾期交付", "amount": "5000", "attachments": []},
};

export const listCompany = {
  name: "listCompany",
  description: "客户列表查询",
  query: `query ListCompany($search: [CompanySearchParam!], $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": [{"name": ["科技"], "rank": ["A", "KA"], "valid": true, "region": ["reg_beijing"]}], "pagination": {"skip": 0, "limit": 20}},
};

export const companyInfo = {
  name: "companyInfo",
  description: "客户详情查询",
  query: `query CompanyInfo($id: ID!) {
  companyInfo(id: $id) {
    id
    name
    common_name
    address
    zip_code
    phone
    rank
    industry { id name }
    region { id name }
    country { id name }
    claim_by { id name }
    claim_by_group { id name parent { id name } }
    first_group_name
    contacts { id name position phone email }
    projects { id name stage deal_amount }
    source
    labels { id name }
    valid
    lock
    enter_high_seas_at
    claim_at
    amount_detail { amount { value currency } project_count }
    roam_status
    budget_config { year edit_time_from edit_time_to display }
    created_at
    updated_at
  }
}`,
  variableDefaults: {"id": "comp_456"},
};

export const list_all_company = {
  name: "list_all_company",
  description: "客户归属查询（开放查询，不受权限范围限制）",
  query: `query ListAllCompany($search: CompanySearchParam!, $pagination: PaginationParam!) {
  list_all_company(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      name
      common_name
      region { id name group country_id }
      country { id name }
      claim_by { id name username }
      claim_by_group { id name parent { id name } }
      first_group_name
      rank
      created_at
      updated_at
    }
  }
}`,
  variableDefaults: {"search": {"name": ["客户名"]}, "pagination": {"skip": 0, "limit": 20}},
};

export const find_company_or_high_seas_company_by_id = {
  name: "find_company_or_high_seas_company_by_id",
  description: "查询客户或公海客户",
  query: `query FindCompanyOrHighSeasCompanyById($id: ID!) {
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
}`,
  variableDefaults: {"id": "comp_456"},
};

export const createCompanyApplyByCreate = {
  name: "createCompanyApplyByCreate",
  description: "创建客户申请",
  query: `mutation CreateCompanyApplyByCreate(
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
}`,
  variableDefaults: {"input": {"credit_code": "91110000123456789X", "name": "北京XX科技有限公司", "common_name": "XX科技", "country": "CN", "industry": "ind_tech", "region": "reg_beijing", "zip_code": "100000", "phone": "010-12345678", "claim_by": "user_001", "claim_by_group": "group_sales_north", "parent": "", "info": "专注于金融科技领域的安全解决方案提供商", "rank": "A", "attachments": [], "leads_id": null}, "contact_name": "张三", "contact_position": "信息安全总监", "contact_phone": "13800138000", "note": "通过行业展会接触，有明确的安全产品采购需求", "budget": {"amount": 500000, "currency": "CNY"}},
};

export const reviewCompanyApply = {
  name: "reviewCompanyApply",
  description: "审核客户申请",
  query: `mutation ReviewCompanyApply($apply_id: ID!, $status: Boolean!, $result: String!) {
  reviewCompanyApply(apply_id: $apply_id, status: $status, result: $result)
}`,
  variableDefaults: {"apply_id": "apply_789", "status": true, "result": "信息完整，同意创建"},
};

export const transferCompanyClaim = {
  name: "transferCompanyClaim",
  description: "转移客户负责人",
  query: `mutation TransferCompanyClaim($id: ID!, $claim_by: ID!) {
  transferCompanyClaim(id: $id, claim_by: $claim_by)
}`,
  variableDefaults: {"id": "comp_456", "claim_by": "user_789"},
};

export const update_company_valid = {
  name: "update_company_valid",
  description: "修改客户有效性",
  query: `mutation UpdateCompanyValid($company_id: String!, $valid: Boolean!, $reason: String) {
  update_company_valid(company_id: $company_id, valid: $valid, reason: $reason)
}`,
  variableDefaults: {"company_id": "comp_456", "valid": false, "reason": "客户已倒闭"},
};

export const update_company_lock = {
  name: "update_company_lock",
  description: "修改客户锁定状态",
  query: `mutation UpdateCompanyLock($company_id: String!, $lock: Boolean!) {
  update_company_lock(company_id: $company_id, lock: $lock)
}`,
  variableDefaults: {"company_id": "comp_456", "lock": true},
};

export const claim_company = {
  name: "claim_company",
  description: "认领客户",
  query: `mutation ClaimCompany($company_id: String!) {
  claim_company(company_id: $company_id)
}`,
  variableDefaults: {"company_id": "comp_456"},
};

export const distribute_company = {
  name: "distribute_company",
  description: "分配客户",
  query: `mutation DistributeCompany($company_id: String!, $claim_id: String!) {
  distribute_company(company_id: $company_id, claim_id: $claim_id)
}`,
  variableDefaults: {"company_id": "comp_456", "claim_id": "user_789"},
};

export const batch_distribute_company = {
  name: "batch_distribute_company",
  description: "批量分配客户",
  query: `mutation BatchDistributeCompany($company_ids: [String!]!, $claim_id: String!) {
  batch_distribute_company(company_ids: $company_ids, claim_id: $claim_id)
}`,
  variableDefaults: {"company_ids": ["comp_001", "comp_002"], "claim_id": "user_789"},
};

export const updateCompanyLabels = {
  name: "updateCompanyLabels",
  description: "修改客户标签",
  query: `mutation UpdateCompanyLabels($company_id: ID!, $labels: [String!]!) {
  updateCompanyLabels(company_id: $company_id, labels: $labels)
}`,
  variableDefaults: {"company_id": "comp_456", "labels": ["label_001", "label_002"]},
};

export const removeCompany = {
  name: "removeCompany",
  description: "删除客户",
  query: `mutation RemoveCompany($id: ID!) {
  removeCompany(id: $id)
}`,
  variableDefaults: {"id": "comp_456"},
};

export const listChannel = {
  name: "listChannel",
  description: "伙伴列表查询",
  query: `query ListChannel($search: ChannelSearchParam!, $pagination: PaginationParam, $with_perm: Boolean!) {
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
}`,
  variableDefaults: {"search": {"name": ["长亭"], "channel_status": ["certified"], "grade": ["v1", "v2"]}, "pagination": {"skip": 0, "limit": 20}, "with_perm": false},
};

export const channel = {
  name: "channel",
  description: "伙伴详情查询",
  query: `query Channel($id: ID!) {
  channel(id: $id) {
    id
    name
    common_name
    type
    status
    grade
    region { id name }
    sale_claim_by { id name }
    sale_claim_by_group { id name parent { id name } }
    sale_claim_by_first_group { id name }
    channel_sale_claim_by { id name }
    cooperate_contact { id name phone }
    sign_info_list { id sign_expire_date }
    cooperate_status
    partner_type
    primary_industry { id name }
    primary_area { id name }
    latest_certified_expire_date
    first_revenue_ratio
    valid
    created_at
    updated_at
  }
}`,
  variableDefaults: {"id": "chan_123"},
};

export const createChannelApply = {
  name: "createChannelApply",
  description: "创建伙伴审核",
  query: `mutation CreateChannelApply(
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
}`,
  variableDefaults: {"input_channel": {"credit_code": "91110000123456789X", "name": "XX安全科技", "common_name": "XX安全", "type": ["solution"], "industry_list": ["ind_tech"], "country": "CN", "region": "reg_beijing", "address": "北京市海淀区", "status": "normal", "sale_claim_by": "user_001", "channel_sale_claim_by": "user_002", "info": "安全解决方案伙伴", "grade": "v1", "partner_type": [" reseller"], "primary_industry": ["ind_tech"], "primary_area": ["reg_beijing"]}, "cooperate_contact": [{"type": "master", "name": "王五", "position": "总监", "area_code": "+86", "phone": "13800138000", "email": "wangwu@example.com"}], "department_contact": [], "other_contact": []},
};

export const reviewChannelApply = {
  name: "reviewChannelApply",
  description: "审批伙伴审核",
  query: `mutation ReviewChannelApply($id: ID!, $status: Boolean!, $result: String!) {
  reviewChannelApply(id: $id, status: $status, result: $result)
}`,
  variableDefaults: {"id": "apply_789", "status": true, "result": "资质符合要求，同意入驻"},
};

export const updateChannel = {
  name: "updateChannel",
  description: "更新伙伴基本信息",
  query: `mutation UpdateChannel($id: ID!, $input_channel: InputChannel!) {
  updateChannel(id: $id, input_channel: $input_channel)
}`,
  variableDefaults: {"id": "chan_123", "input_channel": {"credit_code": "91110000123456789X", "name": "XX安全科技（更新）", "common_name": "XX安全", "type": ["solution"], "industry_list": ["ind_tech"], "country": "CN", "region": "reg_beijing", "address": "北京市朝阳区", "status": "certified", "sale_claim_by": "user_001", "channel_sale_claim_by": "user_002", "info": "更新后的伙伴信息", "grade": "v2", "partner_type": ["reseller"], "primary_industry": ["ind_tech"], "primary_area": ["reg_beijing"]}},
};

export const transferChannelClaim = {
  name: "transferChannelClaim",
  description: "转移伙伴销售负责人",
  query: `mutation TransferChannelClaim($id: ID!, $claim_by: ID!) {
  transferChannelClaim(id: $id, claim_by: $claim_by)
}`,
  variableDefaults: {"id": "chan_123", "claim_by": "user_789"},
};

export const batchTransferChannelClaim = {
  name: "batchTransferChannelClaim",
  description: "批量转移伙伴销售负责人",
  query: `mutation BatchTransferChannelClaim($id_list: [ID!]!, $claim_by: ID!) {
  batchTransferChannelClaim(id_list: $id_list, claim_by: $claim_by)
}`,
  variableDefaults: {"id_list": ["chan_001", "chan_002"], "claim_by": "user_789"},
};

export const update_channel_cooperate_status = {
  name: "update_channel_cooperate_status",
  description: "更新伙伴合作状态",
  query: `mutation UpdateChannelCooperateStatus($id: ID!, $status: ChannelCooperateStatus!) {
  update_channel_cooperate_status(id: $id, status: $status)
}`,
  variableDefaults: {"id": "chan_123", "status": "over"},
};

export const listContract = {
  name: "listContract",
  description: "合同列表查询",
  query: `query ListContract($search: [ContractSearchParam!], $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": [{"name": ["采购"], "file_type": "contract", "sign_date": {"from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00"}}], "pagination": {"skip": 0, "limit": 20}},
};

export const contract = {
  name: "contract",
  description: "合同详情查询",
  query: `query Contract($id: String!) {
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
    stamp_type
    is_foreign
    integrity_clause
    export_control_clause
    cyber_security_review_clause
    confidential
    note
    contract_code
    file { id filename }
    createdAt
    updatedAt
  }
}`,
  variableDefaults: {"id": "contract_123"},
};

export const createContract = {
  name: "createContract",
  description: "创建合同",
  query: `mutation CreateContract($contract: InputContract!) {
  createContract(contract: $contract) {
    id
    name
    amount
    createdAt
  }
}`,
  variableDefaults: {"contract": {"name": "XX银行安全防护产品采购合同", "company": "chaitin", "project": "proj_123", "peerLegal": "comp_456", "currency": "CNY", "amount": "300000", "payOrPaid": "get_paid", "file_type": "contract", "signDate": "2026-07-15T00:00:00+08:00", "stampDate": "2026-07-20T00:00:00+08:00", "dueDate": "2027-07-14"}},
};

export const updateContract = {
  name: "updateContract",
  description: "更新合同",
  query: `mutation UpdateContract($id: ID!, $contract: InputContract!) {
  updateContract(id: $id, contract: $contract)
}`,
  variableDefaults: {"id": "contract_123", "contract": {"name": "XX银行安全防护产品采购合同（修订）", "company": "chaitin", "project": "proj_123", "peerLegal": "comp_456", "currency": "CNY", "amount": "350000", "payOrPaid": "get_paid", "file_type": "contract", "signDate": "2026-07-15T00:00:00+08:00", "stampDate": "2026-07-20T00:00:00+08:00", "dueDate": "2027-07-14"}},
};

export const frame_contract_info = {
  name: "frame_contract_info",
  description: "框架合同信息查询",
  query: `query FrameContractInfo($project_id: String!) {
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
}`,
  variableDefaults: {"project_id": "proj_framework_001"},
};

export const update_frame_contract_info = {
  name: "update_frame_contract_info",
  description: "更新框架合同信息",
  query: `mutation UpdateFrameContractInfo($input: InputFrameContractInfo!) {
  update_frame_contract_info(input: $input)
}`,
  variableDefaults: {"input": {"project_id": "proj_framework_001", "start_type": "contract_effective", "start_at": "2026-01-01T00:00:00+08:00", "days": 365, "end_at": "2026-12-31T23:59:59+08:00", "auto_compute": true, "auto_renew": false, "multi_body": false, "body_ids": [], "body_info": "", "order": "order_service", "order_info": "", "set_template": false, "template_file_ids": [], "no_template_info": "", "set_top_amount": false, "top_amount": "0", "note": ""}},
};

export const listRevenue = {
  name: "listRevenue",
  description: "回款列表查询",
  query: `query ListRevenue($search: RevenueSearchParam!, $pagination: PaginationParam) {
  listRevenue(search: $search, pagination: $pagination) {
    total
    skip
    limit
    data {
      id
      amount
      is_split
      payment_at
      abstract
      other_party_name
      bank_account
      is_residue
      remarks
      match_type
      fail_cause
      state
      project { id name }
      creator { name }
      created_at
      updated_at
    }
  }
}`,
  variableDefaults: {"search": {"project_id": ["proj_123"], "state": ["matched"], "created_at": {"from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00"}}, "pagination": {"skip": 0, "limit": 20}},
};

export const updatePaymentPlan = {
  name: "updatePaymentPlan",
  description: "修改回款计划",
  query: `mutation UpdatePaymentPlan($project_id: ID!, $payment_id: ID!, $due_at: Time, $money: String) {
  updatePaymentPlan(project_id: $project_id, payment_id: $payment_id, due_at: $due_at, money: $money) {
    id
    due_at
    money
  }
}`,
  variableDefaults: {"project_id": "proj_123", "payment_id": "pay_456", "due_at": "2026-08-01T00:00:00+08:00", "money": "150000"},
};

export const addPaymentPlan = {
  name: "addPaymentPlan",
  description: "新增回款计划",
  query: `mutation AddPaymentPlan($project_id: ID!, $due_at: Time!, $money: String!) {
  addPaymentPlan(project_id: $project_id, due_at: $due_at, money: $money) {
    id
    due_at
    money
  }
}`,
  variableDefaults: {"project_id": "proj_123", "due_at": "2026-09-01T00:00:00+08:00", "money": "150000"},
};

export const removePaymentPlan = {
  name: "removePaymentPlan",
  description: "删除回款计划",
  query: `mutation RemovePaymentPlan($project_id: ID!, $payment_id: ID!) {
  removePaymentPlan(project_id: $project_id, payment_id: $payment_id)
}`,
  variableDefaults: {"project_id": "proj_123", "payment_id": "pay_456"},
};

export const revenueAssociation = {
  name: "revenueAssociation",
  description: "回款匹配项目",
  query: `mutation RevenueAssociation($rev_id: ID!, $project_id: ID!, $income_plan_id: ID) {
  revenueAssociation(rev_id: $rev_id, project_id: $project_id, income_plan_id: $income_plan_id)
}`,
  variableDefaults: {"rev_id": "rev_789", "project_id": "proj_123", "income_plan_id": "ip_001"},
};

export const revenueChangeState = {
  name: "revenueChangeState",
  description: "修改回款状态",
  query: `mutation RevenueChangeState($rev_id: ID!, $state: RevenueState!) {
  revenueChangeState(rev_id: $rev_id, state: $state)
}`,
  variableDefaults: {"rev_id": "rev_789", "state": "matched"},
};

export const revenue_split = {
  name: "revenue_split",
  description: "拆分回款",
  query: `mutation RevenueSplit($rev_id: ID!, $split: Boolean!, $child_revenue_list: [InputSplitRevenue!]) {
  revenue_split(rev_id: $rev_id, split: $split, child_revenue_list: $child_revenue_list)
}`,
  variableDefaults: {"rev_id": "rev_789", "split": true, "child_revenue_list": [{"money": "100000", "project_id": "proj_001"}, {"money": "50000", "project_id": "proj_002"}]},
};

export const listConfirmRevenue = {
  name: "listConfirmRevenue",
  description: "确认收入列表查询",
  query: `query ListConfirmRevenue($search: ConfirmRevenueSearchParam!, $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": {"claim_by": ["user_001"], "confirmed_state": ["unconfirmed"], "created_at": {"from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00"}}, "pagination": {"skip": 0, "limit": 20}},
};

export const confirmRevenueStatistics = {
  name: "confirmRevenueStatistics",
  description: "确认收入统计查询",
  query: `query ConfirmRevenueStatistics($search: ConfirmRevenueStatisticSearchParam!) {
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
}`,
  variableDefaults: {"search": {"claim_by": ["user_001"], "project_deal_date": {"from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00"}}},
};

export const createConfirmRevenue = {
  name: "createConfirmRevenue",
  description: "发起确认收入",
  query: `mutation CreateConfirmRevenue($project: ID!) {
  createConfirmRevenue(project: $project)
}`,
  variableDefaults: {"project": "proj_123"},
};

export const updateConfirmRevenueForDeliver = {
  name: "updateConfirmRevenueForDeliver",
  description: "交付确认收入",
  query: `mutation UpdateConfirmRevenueForDeliver($id: ID!, $dinput: [ConfirmRevenueInputForDeliverer!]!) {
  updateConfirmRevenueForDeliver(id: $id, dinput: $dinput)
}`,
  variableDefaults: {"id": "cr_789", "dinput": [{"id": "item_001", "product_price": "150000", "currency": "CNY", "attachment": [], "attachment_type": "seal", "customer_docker": "客户对接人张三", "progress": 100, "dnote": "已完成现场部署", "acceptance_time": "2026-05-01T00:00:00+08:00"}]},
};

export const updateConfirmRevenueForFanancial = {
  name: "updateConfirmRevenueForFanancial",
  description: "财务确认收入",
  query: `mutation UpdateConfirmRevenueForFanancial(
  $id: ID!
  $finput: [ConfirmRevenueInputForFanatical!]!
  $allfinished: Boolean
) {
  updateConfirmRevenueForFanancial(id: $id, finput: $finput, allfinished: $allfinished)
}`,
  variableDefaults: {"id": "cr_789", "finput": [{"id": "item_001", "product_price": "150000", "out_source_amount": "0", "due_at": "2026-05-01T00:00:00+08:00", "attachment": [], "attachment_type": "seal", "customer_docker": "张三", "progress": 100, "dnote": "已交付", "confirmed_state": "confirmed", "amount": "132743.36", "tax": "17256.64", "all_amount": "150000", "all_tax": "19500", "tax_rate": 13, "currency": "CNY", "fnote": "确认收入", "confirmed_progress": 100, "start_time": "2026-01-01T00:00:00+08:00", "end_time": "2026-05-01T00:00:00+08:00", "acceptance_time": "2026-05-01T00:00:00+08:00"}], "allfinished": false},
};

export const removeConfirmRevenue = {
  name: "removeConfirmRevenue",
  description: "删除确认收入",
  query: `mutation RemoveConfirmRevenue($id: ID!) {
  removeConfirmRevenue(id: $id)
}`,
  variableDefaults: {"id": "cr_789"},
};

export const list_leads = {
  name: "list_leads",
  description: "线索列表查询",
  query: `query ListLeads($search: LeadsSearchParam, $pagination: PaginationParam, $sort_by: SortBy) {
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
}`,
  variableDefaults: {"search": {"list_type": "my", "type": ["direct"], "client_name": "银行", "valid": true, "convert": false}, "pagination": {"skip": 0, "limit": 20}, "sort_by": {"by": "created_at", "order": -1}},
};

export const leads_info = {
  name: "leads_info",
  description: "线索详情查询",
  query: `query LeadsInfo($id: ID!) {
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
}`,
  variableDefaults: {"id": "leads_123"},
};

export const create_leads = {
  name: "create_leads",
  description: "创建线索",
  query: `mutation CreateLeads($param: LeadsParam!) {
  create_leads(param: $param)
}`,
  variableDefaults: {"param": {"type": "direct", "source": "官网咨询", "source_product": "WAF", "client_name": "ZZ电子商务有限公司", "client_contact_name": "王五", "client_contact_position": "运维经理", "client_contact_phone": "13700137000", "client_contact_email": "wangwu@example.com", "client_contact_time": "2026-05-02T10:30:00+08:00", "communication_intention": "了解Web应用防火墙产品功能和报价", "note": "客户有明确的等保合规需求", "region": "reg_shanghai", "attachments": []}},
};

export const update_leads = {
  name: "update_leads",
  description: "更新线索",
  query: `mutation UpdateLeads($id: ID!, $param: LeadsParam!) {
  update_leads(id: $id, param: $param)
}`,
  variableDefaults: {"id": "leads_123", "param": {"type": "direct", "source": "展会", "source_product": "Scanner", "client_name": "ZZ电子商务有限公司（更新）", "client_contact_name": "王五", "client_contact_position": "安全经理", "client_contact_phone": "13700137000", "note": "已联系，安排产品演示", "region": "reg_shanghai", "attachments": []}},
};

export const update_leads_valid = {
  name: "update_leads_valid",
  description: "更新线索有效性",
  query: `mutation UpdateLeadsValid(
  $id: ID!
  $valid: Boolean!
  $invalid_reason: String
  $first_reason: LeadsInvalidFirstReason
  $second_reason: LeadsInvalidSecondReason
) {
  update_leads_valid(id: $id, valid: $valid, invalid_reason: $invalid_reason, first_reason: $first_reason, second_reason: $second_reason)
}`,
  variableDefaults: {"id": "leads_123", "valid": false, "invalid_reason": "客户无预算", "first_reason": "no_budget", "second_reason": null},
};

export const claim_leads = {
  name: "claim_leads",
  description: "认领线索",
  query: `mutation ClaimLeads($leads_id: ID!) {
  claim_leads(leads_id: $leads_id)
}`,
  variableDefaults: {"leads_id": "leads_123"},
};

export const create_project_by_leads = {
  name: "create_project_by_leads",
  description: "通过线索创建项目",
  query: `mutation CreateProjectByLeads($input: InputProject!) {
  create_project_by_leads(input: $input)
}`,
  variableDefaults: {"input": {"name": "ZZ电商安全防护项目", "company_id": "comp_new_001", "type": "normal", "level": "ordinary", "deal_date": "2026-08-01T00:00:00+08:00", "sign_date": "2026-09-01T00:00:00+08:00", "stage": "leads", "stage_info": {"info": "由线索转化", "attachments": [], "todos": []}, "leads_convert_condition": [], "project_promise": "delivery_standard", "extra": {"source": "线索转化"}}},
};

export const createProjectInfo = {
  name: "createProjectInfo",
  description: "创建跟进记录",
  query: `mutation CreateProjectInfo(
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
}`,
  variableDefaults: {"project_id": "proj_123", "company_id": null, "channel_id": null, "leads_id": null, "type": "project_follow_record", "info": "今日与客户进行了产品演示，反馈良好，下周安排技术交流。", "attachments": [], "todos": [{"name": "准备技术交流PPT", "deadline": "2026-05-10T18:00:00+08:00", "processor": ["user_001"]}]},
};

export const updateProjectInfo = {
  name: "updateProjectInfo",
  description: "更新跟进记录",
  query: `mutation UpdateProjectInfo($id: ID!, $info: String!, $attachments: [String!]) {
  updateProjectInfo(id: $id, info: $info, attachments: $attachments)
}`,
  variableDefaults: {"id": "pinfo_456", "info": "今日与客户进行了产品演示，反馈非常积极，已确定下周三进行技术交流。", "attachments": []},
};

export const deleteProjectInfo = {
  name: "deleteProjectInfo",
  description: "删除跟进记录",
  query: `mutation DeleteProjectInfo($id: ID!) {
  deleteProjectInfo(id: $id)
}`,
  variableDefaults: {"id": "pinfo_456"},
};

export const createComment = {
  name: "createComment",
  description: "创建评论",
  query: `mutation CreateComment(
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
}`,
  variableDefaults: {"related_type": "project", "related_id": "proj_123", "content": "项目进度符合预期，建议下周安排客户现场POC测试。", "attachments": [], "todos": [{"name": "协调POC环境", "deadline": "2026-05-08T18:00:00+08:00", "processor": ["user_002"]}]},
};

export const deleteComment = {
  name: "deleteComment",
  description: "删除评论",
  query: `mutation DeleteComment($id: ID!) {
  deleteComment(id: $id)
}`,
  variableDefaults: {"id": "comment_789"},
};

export const listReport = {
  name: "listReport",
  description: "日报/周报列表查询",
  query: `query ListReport($search: [ReportSearchParam!], $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": [{"creator": ["user_001"], "type": ["daily"], "target": {"from": "2026-05-01T00:00:00+08:00", "to": "2026-05-31T23:59:59+08:00"}}], "pagination": {"skip": 0, "limit": 20}},
};

export const createReport = {
  name: "createReport",
  description: "创建日报/周报",
  query: `mutation CreateReport(
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
}`,
  variableDefaults: {"content": "今日工作：\n1. 拜访XX银行客户，完成产品演示\n2. 跟进YY证券POC进度\n3. 准备下周技术交流材料", "type": "daily", "target": "2026-05-02T00:00:00+08:00", "to": ["user_manager_001"], "attachments": [], "project_infos": [{"project_id": "proj_123", "info": "完成产品演示，客户意向积极"}], "immediately_sign_projects": []},
};

export const updateReport = {
  name: "updateReport",
  description: "更新日报/周报",
  query: `mutation UpdateReport(
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
}`,
  variableDefaults: {"id": "report_123", "content": "更新后的日报内容...", "to": ["user_manager_001"], "attachments": [], "project_infos": [], "immediately_sign_projects": []},
};

export const saleGoal = {
  name: "saleGoal",
  description: "销售目标查询",
  query: `query SaleGoal($group: ID, $fiscal_year: Int!) {
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
}`,
  variableDefaults: {"group": null, "fiscal_year": 2026},
};

export const saleCommission = {
  name: "saleCommission",
  description: "销售提成查询",
  query: `query SaleCommission($group: ID, $fiscal_year: Int!) {
  saleCommission(group: $group, fiscal_year: $fiscal_year) {
    user_commission {
      target
      finished
      commission
      user { id name }
    }
    user_group { id name }
  }
}`,
  variableDefaults: {"group": null, "fiscal_year": 2026},
};

export const updateSaleGoal = {
  name: "updateSaleGoal",
  description: "更新销售目标",
  query: `mutation UpdateSaleGoal($user_id: String, $group_id: String, $goal: [InputGoalV2!]) {
  updateSaleGoal(user_id: $user_id, group_id: $group_id, goal: $goal)
}`,
  variableDefaults: {"user_id": "user_001", "group_id": null, "goal": [{"typeArg": "回款", "year": 2026, "quarter": 1, "target": 500000}, {"typeArg": "合同", "year": 2026, "quarter": 1, "target": 600000}]},
};

export const createCommissionConfig = {
  name: "createCommissionConfig",
  description: "创建任务阶梯",
  query: `mutation CreateCommissionConfig(
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
}`,
  variableDefaults: {"fiscal_year": 2026, "start": "0", "end": "1000000", "commission_percent": [{"start": "0", "end": "500000", "percent": 5}, {"start": "500000", "end": "1000000", "percent": 8}]},
};

export const me = {
  name: "me",
  description: "当前用户信息查询",
  query: `query Me {
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
}`,
  variableDefaults: {},
};

export const listUser = {
  name: "listUser",
  description: "用户列表查询",
  query: `query ListUser($search: UserSearchParam!, $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": {"name": ["张"], "enabled": true}, "pagination": {"skip": 0, "limit": 20}},
};

export const createUserGroup = {
  name: "createUserGroup",
  description: "创建用户组",
  query: `mutation CreateUserGroup(
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
}`,
  variableDefaults: {"name": "华北销售一组", "type": "sale", "role_type": "saler", "sale_group_type": "first_team", "parent": "group_parent_001"},
};

export const updateUserGroupMember = {
  name: "updateUserGroupMember",
  description: "更新用户组成员",
  query: `mutation UpdateUserGroupMember($id: ID!, $member: [ID!], $leader: [ID!]) {
  updateUserGroupMember(id: $id, member: $member, leader: $leader)
}`,
  variableDefaults: {"id": "group_001", "member": ["user_001", "user_002", "user_003"], "leader": ["user_001"]},
};

export const updatePermission = {
  name: "updatePermission",
  description: "更新权限",
  query: `mutation UpdatePermission(
  $group: ID!
  $type: PermGroupType!
  $perm: [Perm!]!
  $related: InputPermRelated!
) {
  updatePermission(group: $group, type: $type, perm: $perm, related: $related)
}`,
  variableDefaults: {"group": "group_001", "type": "project", "perm": ["view", "edit"], "related": {"scope": "all"}},
};

export const listProduct = {
  name: "listProduct",
  description: "产品列表查询",
  query: `query ListProduct {
  listProduct {
    id
    name
    group { id name }
    forms { id name }
    offline
    created_at
  }
}`,
  variableDefaults: {},
};

export const create_product = {
  name: "create_product",
  description: "创建新产品",
  query: `mutation CreateProduct($input: InputProductConfig!) {
  create_product(input: $input)
}`,
  variableDefaults: {"input": {"id": "prod_new_001", "name": "智能WAF Pro", "group": "security_product", "forms": ["hardware", "software"], "offline": false}},
};

export const add_product_form = {
  name: "add_product_form",
  description: "增加产品类别",
  query: `mutation AddProductForm($product_id: String!, $form_id: ProductFormID!, $tax: Float!, $contract_name: String!, $soft_name: String!) {
  add_product_form(product_id: $product_id, form_id: $form_id, tax: $tax, contract_name: $contract_name, soft_name: $soft_name)
}`,
  variableDefaults: {"product_id": "prod_001", "form_id": "saas", "tax": 13, "contract_name": "SaaS服务", "soft_name": "智能检测引擎"},
};

export const addProductVersion = {
  name: "addProductVersion",
  description: "发布产品新版本",
  query: `mutation AddProductVersion($product_id: ID!, $form_id: ID!, $versions: [InputProductVersionConfig!]!, $note: String!) {
  addProductVersion(product_id: $product_id, form_id: $form_id, versions: $versions, note: $note)
}`,
  variableDefaults: {"product_id": "prod_001", "form_id": "form_001", "versions": [{"name": "标准版", "price": 50000, "config": {}}], "note": "2026年Q2定价更新"},
};

export const addProductDraft = {
  name: "addProductDraft",
  description: "保存产品草稿",
  query: `mutation AddProductDraft(
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
}`,
  variableDefaults: {"product_id": "prod_001", "form_id": "form_001", "version_num": 3, "versions": [], "note": "草稿版本", "push_review": false},
};

export const listPriceApproval = {
  name: "listPriceApproval",
  description: "价格审批列表查询",
  query: `query ListPriceApproval($search: PriceApprovalSearchParam!, $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": {"project_id": ["proj_123"], "status": ["pending"]}, "pagination": {"skip": 0, "limit": 20}},
};

export const createProjectPriceApproval = {
  name: "createProjectPriceApproval",
  description: "发起价格审批",
  query: `mutation CreateProjectPriceApproval(
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
}`,
  variableDefaults: {"project_id": "proj_123", "type": "product", "special_reason": null, "input_product": {"discount": 85, "reason": "战略客户折扣"}, "input_service": null, "input_frame_product": null, "input_frame_service": null},
};

export const approveProjectPriceApproval = {
  name: "approveProjectPriceApproval",
  description: "处理价格审批",
  query: `mutation ApproveProjectPriceApproval($id: ID!, $result: Boolean!, $note: String!, $source: String) {
  approveProjectPriceApproval(id: $id, result: $result, note: $note, source: $source)
}`,
  variableDefaults: {"id": "pa_456", "result": true, "note": "同意特价申请", "source": "web"},
};

export const revertProjectPriceApproval = {
  name: "revertProjectPriceApproval",
  description: "撤回价格审批",
  query: `mutation RevertProjectPriceApproval($id: ID!) {
  revertProjectPriceApproval(id: $id)
}`,
  variableDefaults: {"id": "pa_456"},
};

export const add_service_cost_detail = {
  name: "add_service_cost_detail",
  description: "评估安服成本",
  query: `mutation AddServiceCostDetail(
  $id: ID!
  $details: [InputServiceCostDetail!]!
  $desc: InputServiceCostDesc!
) {
  add_service_cost_detail(id: $id, details: $details, desc: $desc)
}`,
  variableDefaults: {"id": "proj_123", "details": [{"service_type": "penetration_test", "work_day": 10, "unit_price": 3000, "total_price": 30000}], "desc": {"note": "渗透测试服务成本评估", "total": 30000}},
};

export const listMachineStock = {
  name: "listMachineStock",
  description: "整机库存列表查询",
  query: `query ListMachineStock($search: [MachineStockSearchParam!], $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": [{"serial_like": ["CT"], "product_model": "WAF-2000"}], "pagination": {"skip": 0, "limit": 20}},
};

export const updateMachineStockBasic = {
  name: "updateMachineStockBasic",
  description: "修改整机库存基本信息",
  query: `mutation UpdateMachineStockBasic($update: [MachineStockInput!]) {
  updateMachineStockBasic(update: $update)
}`,
  variableDefaults: {"update": [{"serial": "CT2026001", "product_type": "WAF", "product_model": "WAF-2000", "stock_company": "北京"}]},
};

export const create_hardware_after_sale = {
  name: "create_hardware_after_sale",
  description: "创建硬件设备售后",
  query: `mutation CreateHardwareAfterSale($input: InputHardwareAfterSale!) {
  create_hardware_after_sale(input: $input)
}`,
  variableDefaults: {"input": {"project_id": "proj_123", "type": "repair", "problem_product": [{"product_id": "prod_001", "form_id": "form_001", "machines": [{"machine": "CT2026001", "component": []}]}], "need_backup_machine": true, "operation_time": "2026-05-10T10:00:00+08:00", "reason": "电源模块故障", "way": "express", "note": "需要尽快处理"}},
};

export const project_income_plan = {
  name: "project_income_plan",
  description: "查询项目应收计划",
  query: `query ProjectIncomePlan($project_id: ID!) {
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
}`,
  variableDefaults: {"project_id": "proj_123"},
};

export const create_income_plan = {
  name: "create_income_plan",
  description: "创建应收计划",
  query: `mutation CreateIncomePlan($project_id: ID!, $param: IncomePlanParam!) {
  create_income_plan(project_id: $project_id, param: $param)
}`,
  variableDefaults: {"project_id": "proj_123", "param": {"income_milestone": "product_final_acceptance", "income_type": "acceptance_payment", "contract_condition": "产品终验后30天内付款", "income_way": "wire_transfer", "income_rate": 0.6, "income_period": 30, "acceptance_period": 0, "income_period_basis": "contract_date", "money": "180000", "income_at": "2026-08-01T00:00:00+08:00", "auto_compute": true, "note": "验收款", "grace_period": 30, "assessment_date": "2026-09-01T00:00:00+08:00"}},
};

export const create_shipping_order = {
  name: "create_shipping_order",
  description: "创建发货单",
  query: `mutation CreateShippingOrder($project_id: String!, $input: InputShippingOrder!) {
  create_shipping_order(project_id: $project_id, input: $input)
}`,
  variableDefaults: {"project_id": "proj_123", "input": {"order_date": "2026-05-10T00:00:00+08:00", "shipping_address_id": "addr_001", "products": [{"product_id": "prod_001", "form_id": "form_001", "quantity": 2}], "note": "标准发货"}},
};

export const config = {
  name: "config",
  description: "系统配置查询",
  query: `query Config {
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
}`,
  variableDefaults: {},
};

export const updateConfigProductDeliveryApprover = {
  name: "updateConfigProductDeliveryApprover",
  description: "修改产品交付审批人",
  query: `mutation UpdateConfigProductDeliveryApprover($id: String!) {
  updateConfigProductDeliveryApprover(id: $id)
}`,
  variableDefaults: {"id": "user_001"},
};

export const updateConfigServiceDeliveryApprover = {
  name: "updateConfigServiceDeliveryApprover",
  description: "修改安服交付审批人",
  query: `mutation UpdateConfigServiceDeliveryApprover($id: String!) {
  updateConfigServiceDeliveryApprover(id: $id)
}`,
  variableDefaults: {"id": "user_002"},
};

export const list_business_chance = {
  name: "list_business_chance",
  description: "商机报备列表查询",
  query: `query ListBusinessChance($search: BusinessChanceSearchParam, $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": {"project_name": "银行", "apply_status": ["waiting"], "status": "valid"}, "pagination": {"skip": 0, "limit": 20}},
};

export const createBusinessChance = {
  name: "createBusinessChance",
  description: "创建商机报备",
  query: `mutation CreateBusinessChance(
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
}`,
  variableDefaults: {"channel_id": "chan_001", "channel_contact": "李四", "contact_information": "13900139000", "company_id": "comp_456", "project_name": "XX银行安全加固", "product_list": [{"product_id": "prod_001", "form_id": "form_001", "price": 200000}], "due_at": "2026-08-01T00:00:00+08:00", "claim_by": "user_001", "project_contact": "张三", "project_address": "北京市海淀区", "department_used": "信息技术部", "delivery_type": "self", "info": "客户有明确采购意向", "attachments": []},
};

export const reviewBusinessChance = {
  name: "reviewBusinessChance",
  description: "审批商机报备",
  query: `mutation ReviewBusinessChance(
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
}`,
  variableDefaults: {"id": "bc_789", "status": true, "channel_claim_by": "user_001", "reject_type": null, "reject_chance_id": "", "reject_project_id": "", "note": "同意报备", "desc": ""},
};

export const list_solution = {
  name: "list_solution",
  description: "解决方案列表查询",
  query: `query ListSolution($search: SolutionSearchParam, $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": {"name": "金融", "status": ["published"]}, "pagination": {"skip": 0, "limit": 20}},
};

export const create_solution = {
  name: "create_solution",
  description: "新建解决方案",
  query: `mutation CreateSolution($input: InputSolutionVersion!, $push_review: Boolean!) {
  create_solution(input: $input, push_review: $push_review)
}`,
  variableDefaults: {"input": {"name": "金融行业Web安全解决方案", "industry_ids": ["ind_finance"], "product_ids": ["prod_001"], "content": "方案详情...", "attachments": []}, "push_review": true},
};

export const review_solution = {
  name: "review_solution",
  description: "审核解决方案",
  query: `mutation ReviewSolution($solution_version_id: String!, $status: Boolean!, $reason: String!) {
  review_solution(solution_version_id: $solution_version_id, status: $status, reason: $reason)
}`,
  variableDefaults: {"solution_version_id": "sv_456", "status": true, "reason": "内容完整，同意发布"},
};

export const list_opportunity_scenario = {
  name: "list_opportunity_scenario",
  description: "机会场景列表查询",
  query: `query ListOpportunityScenario($search: OpportunityScenarioSearchParam!, $pagination: PaginationParam, $sort_by: SortBy) {
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
}`,
  variableDefaults: {"search": {"name": "等保", "type": ["industry"]}, "pagination": {"skip": 0, "limit": 20}, "sort_by": {"by": "updated_at", "order": -1}},
};

export const create_opportunity_scenario = {
  name: "create_opportunity_scenario",
  description: "创建机会场景",
  query: `mutation CreateOpportunityScenario($input: InputOpportunityScenario!) {
  create_opportunity_scenario(input: $input)
}`,
  variableDefaults: {"input": {"type": "industry", "industry_ids": ["ind_finance"], "group_ids": [], "name": "金融行业等保2.0合规", "description": "针对金融客户的等保合规需求", "customer_persona": "信息安全总监", "budget": "50万-100万", "time_window": "2026年Q2-Q3", "closed_loop_time": 90, "product": [{"product_id": "prod_001", "form_id": "form_001"}], "claim_by_ids": ["user_001"], "has_solution": true, "solution_link": "https://wiki.example.com", "solution_material": "", "sale_guide": "", "training_video": "", "solution_material_list": [], "sale_guide_list": [], "training_video_list": [], "success_company_ids": []}},
};

export const list_special_deals_trace_back_await_project = {
  name: "list_special_deals_trace_back_await_project",
  description: "特价回溯待回溯项目查询",
  query: `query ListSpecialDealsTraceBackAwaitProject($search: SpecialDealsTraceBackAwaitProjectSearchParam, $pagination: PaginationParam) {
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
}`,
  variableDefaults: {"search": {"claim_by": ["user_001"]}, "pagination": {"skip": 0, "limit": 20}},
};

export const create_special_deals_trace_backs = {
  name: "create_special_deals_trace_backs",
  description: "发起特价回溯",
  query: `mutation CreateSpecialDealsTraceBacks(
  $search: SpecialDealsTraceBackAwaitProjectSearchParam
  $random_inspection_type: SpecialDealsTraceBackRandomInspectionType!
  $random_inspection_number: Int
) {
  create_special_deals_trace_backs(
    search: $search
    random_inspection_type: $random_inspection_type
    random_inspection_number: $random_inspection_number
  )
}`,
  variableDefaults: {"search": null, "random_inspection_type": "all", "random_inspection_number": null},
};

export const submit_paper_acceptance_form = {
  name: "submit_paper_acceptance_form",
  description: "纸质验收单提交",
  query: `mutation SubmitPaperAcceptanceForm(
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
}`,
  variableDefaults: {"id": "paf_001", "type": "mail", "archive_location": "beijing_office", "tracking_number": "SF123456789", "deprecated_reason": ""},
};

export const create_announcement = {
  name: "create_announcement",
  description: "创建公告",
  query: `mutation CreateAnnouncement($title: String!, $content: String!, $notice_group_ids: [String!]!) {
  create_announcement(title: $title, content: $content, notice_group_ids: $notice_group_ids)
}`,
  variableDefaults: {"title": "五一放假通知", "content": "2026年五一假期安排如下...", "notice_group_ids": ["group_all"]},
};

export const create_todo_list = {
  name: "create_todo_list",
  description: "创建待办事项",
  query: `mutation CreateTodoList(
  $name: String!
  $type: TodoType!
  $relation: String!
  $deadline: Time!
  $processor: [ID!]!
) {
  create_todo_list(name: $name, type: $type, relation: $relation, deadline: $deadline, processor: $processor)
}`,
  variableDefaults: {"name": "准备合同文本", "type": "contract", "relation": "proj_123", "deadline": "2026-05-10T18:00:00+08:00", "processor": ["user_001", "user_002"]},
};

export const finished_todo_list = {
  name: "finished_todo_list",
  description: "完成待办事项",
  query: `mutation FinishedTodoList($id: ID!, $is_finished: Boolean!, $completionNote: String!) {
  finished_todo_list(id: $id, is_finished: $is_finished, completionNote: $completionNote)
}`,
  variableDefaults: {"id": "todo_456", "is_finished": true, "completionNote": "已完成合同准备"},
};

export const projectStatistics = {
  name: "projectStatistics",
  description: "项目统计查询",
  query: `query ProjectStatistics($search: ProjectSearchParam!, $pagination: PaginationParam, $sort_by: SortBy) {
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
}`,
  variableDefaults: {"search": {"stage": ["deal"], "deal_date": {"from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00"}}, "pagination": {"skip": 0, "limit": 20}, "sort_by": {"by": "deal_date", "order": -1}},
};

export const paymentStatistics = {
  name: "paymentStatistics",
  description: "回款统计查询",
  query: `query PaymentStatistics($search: ProjectSearchParam!, $pagination: PaginationParam, $sort_by: SortBy) {
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
}`,
  variableDefaults: {"search": {"claim_by": ["user_001"]}, "pagination": {"skip": 0, "limit": 20}, "sort_by": {"by": "updatedAt", "order": -1}},
};

export const presaleStatistics = {
  name: "presaleStatistics",
  description: "售前数据统计",
  query: `query PresaleStatistics($search: ProjectSearchParam!) {
  presaleStatistics(search: $search) {
    statistics {
      domain
      project_count
      total_amount
    }
  }
}`,
  variableDefaults: {"search": {"stage": ["tech_pre_research", "plan_discuss"]}},
};

export const exportExcelFile = {
  name: "exportExcelFile",
  description: "导出项目统计Excel",
  query: `query ExportExcelFile(
  $search: ProjectSearchParam!
  $sort_by: [SortBy!]
  $deal_revenue_type: [ExportDealRevenueType!]
  $type: ExportType
) {
  exportExcelFile(search: $search, sort_by: $sort_by, deal_revenue_type: $deal_revenue_type, type: $type) {
    url
    msg
  }
}`,
  variableDefaults: {"search": {"stage": ["deal"], "deal_date": {"from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00"}}, "sort_by": [{"by": "deal_date", "order": -1}], "deal_revenue_type": ["deal_amount", "revenue_amount"], "type": "statistic"},
};

export const deal_revenue_perf_ranking = {
  name: "deal_revenue_perf_ranking",
  description: "销售排行榜查询",
  query: `query DealRevenuePerfRanking(
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
}`,
  variableDefaults: {"search": {"stage": ["deal"], "deal_date": {"from": "2026-01-01T00:00:00+08:00", "to": "2026-12-31T23:59:59+08:00"}}, "fiscal_year": 2026, "deal_weight": 0.6, "revenue_weight": 0.4},
};


// Tool groupings
export const projectQueryOperations = [
  listProject,
  projectInfo,
  projectCostInfo,
  projectStatistics,
];

export const projectMutateOperations = [
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
  update_project_cost_detail,
  update_project_detail_coefficient,
  create_project_detail_change_apply,
  approve_project_detail_change_apply,
  update_project_element,
];

export const companyOperations = [
  listCompany,
  companyInfo,
  list_all_company,
  find_company_or_high_seas_company_by_id,
];

export const channelOperations = [
  listChannel,
  channel,
];

export const contractFinanceOperations = [
  listContract,
  contract,
  createContract,
  updateContract,
  frame_contract_info,
  update_frame_contract_info,
  listRevenue,
  updatePaymentPlan,
  addPaymentPlan,
  removePaymentPlan,
  revenueAssociation,
  revenueChangeState,
  revenue_split,
  listConfirmRevenue,
  confirmRevenueStatistics,
  createConfirmRevenue,
  updateConfirmRevenueForDeliver,
  updateConfirmRevenueForFanancial,
  removeConfirmRevenue,
  project_income_plan,
  create_income_plan,
];

export const followupOperations = [
  createProjectInfo,
  updateProjectInfo,
  deleteProjectInfo,
  createComment,
  deleteComment,
];

export const deliveryOperations = [
  list_project_delivery_stock,
  create_product_delivery,
  review_product_delivery,
  update_product_delivery_time_info,
  designation_product_delivery_person_in_charge,
  create_product_after_sale,
  init_service_delivery,
  review_service_delivery,
  finish_service_delivery,
  finish_early_service_delivery,
  punish_service_delivery,
  add_service_cost_detail,
  listMachineStock,
  updateMachineStockBasic,
  create_hardware_after_sale,
  create_shipping_order,
];

export const miscOperations = [
  createCompanyApplyByCreate,
  reviewCompanyApply,
  transferCompanyClaim,
  update_company_valid,
  update_company_lock,
  claim_company,
  distribute_company,
  batch_distribute_company,
  updateCompanyLabels,
  removeCompany,
  createChannelApply,
  reviewChannelApply,
  updateChannel,
  transferChannelClaim,
  batchTransferChannelClaim,
  update_channel_cooperate_status,
  list_leads,
  leads_info,
  create_leads,
  update_leads,
  update_leads_valid,
  claim_leads,
  create_project_by_leads,
  listReport,
  createReport,
  updateReport,
  saleGoal,
  saleCommission,
  updateSaleGoal,
  createCommissionConfig,
  me,
  listUser,
  createUserGroup,
  updateUserGroupMember,
  updatePermission,
  listProduct,
  create_product,
  add_product_form,
  addProductVersion,
  addProductDraft,
  listPriceApproval,
  createProjectPriceApproval,
  approveProjectPriceApproval,
  revertProjectPriceApproval,
  config,
  updateConfigProductDeliveryApprover,
  updateConfigServiceDeliveryApprover,
  list_business_chance,
  createBusinessChance,
  reviewBusinessChance,
  list_solution,
  create_solution,
  review_solution,
  list_opportunity_scenario,
  create_opportunity_scenario,
  list_special_deals_trace_back_await_project,
  create_special_deals_trace_backs,
  submit_paper_acceptance_form,
  create_announcement,
  create_todo_list,
  finished_todo_list,
  paymentStatistics,
  presaleStatistics,
  exportExcelFile,
  deal_revenue_perf_ranking,
];

