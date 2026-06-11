export declare const listProject: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
            stage: string[];
            claim_by: string[];
            deal_date: {
                from: string;
                to: string;
            };
        };
        pagination: {
            skip: number;
            limit: number;
        };
        sort_by: {
            by: string;
            order: number;
        };
    };
};
export declare const projectInfo: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const createProject: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            name: string;
            company_id: string;
            type: string;
            level: string;
            deal_date: string;
            sign_date: string;
            stage: string;
            stage_info: {
                info: string;
                attachments: never[];
                todos: never[];
            };
            leads_convert_condition: never[];
            project_promise: string;
            extra: {
                source: string;
            };
        };
    };
};
export declare const updateProjectBasicInfo: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        name: string;
        level: string;
    };
};
export declare const updateProjectStage: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        stage: string;
        deal_logic: string;
        artificial_reason: null;
        stage_info: {
            info: string;
            attachments: never[];
            todos: never[];
        };
        project_promise: string;
        main_reason: string;
        minor_reason: never[];
        invalid_reason: null;
        win_rate: string;
        deal_date: string;
        sign_date: string;
        contract_sign_type: string;
        delivery_type: string;
        partners: never[];
    };
};
export declare const updateProjectDetail: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        calc_type: string;
        products: {
            product_id: string;
            quantity: number;
            price: number;
        }[];
        contract_sign_type: string;
        property: string;
        delivery_type: string;
        partners: never[];
        solution_ids: never[];
    };
};
export declare const updateProjectLabels: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        labels: string[];
    };
};
export declare const update_project_battle_label: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        battle_label_ids: string[];
    };
};
export declare const transferProjectClaim: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        now: string;
    };
};
export declare const updateProjectMember: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        member_ids: string[];
    };
};
export declare const updateProjectPerformanceDistribution: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        input: {
            user_id: string;
            percent: number;
        }[];
    };
};
export declare const removeProject: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const projectCostInfo: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const update_project_cost_detail: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        details: {
            product_id: string;
            form_id: string;
            cost: number;
        }[];
    };
};
export declare const update_project_detail_coefficient: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        payment_coefficient: number;
        other_coefficient: number;
        coefficient_desc: string;
    };
};
export declare const create_project_detail_change_apply: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            project_id: string;
            change_scene: string[];
            scene_info: string;
            change_reason: string[];
            change_reason_info: string;
            assessment_increment: number;
            assessment_reason: string;
        };
    };
};
export declare const approve_project_detail_change_apply: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        apply_id: string;
        result: boolean;
        note: string;
    };
};
export declare const update_project_element: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        input_project_element: never[];
        input_project_direction: never[];
        calc_project_promise: boolean;
    };
};
export declare const list_project_delivery_stock: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
    };
};
export declare const create_product_delivery: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        assigner: string;
        product_list: {
            product_id: string;
            form_id: string;
        }[];
        license_validity: string;
        after_sale_validity: string;
        implement_note: null;
        is_early_note: null;
        estimate_deal_time: null;
        delivery_note: string;
        project_check: string;
        project_other_note: string;
        attachments: never[];
    };
};
export declare const review_product_delivery: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        status: boolean;
        reason: string;
        sign_stage: string;
    };
};
export declare const update_product_delivery_time_info: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        info: {
            project_id: string;
            product_id: string;
            form_id: string;
            estimate_delivery_time: string;
            estimate_acceptance_time: string;
        };
    };
};
export declare const designation_product_delivery_person_in_charge: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        person_in_charge: string;
    };
};
export declare const create_product_after_sale: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            project_id: string;
            product_id: string;
            form_id: string;
            type: string;
            reason: string;
            note: string;
        };
    };
};
export declare const init_service_delivery: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        delivery_id: string;
        reason: string;
        file: never[];
        estimate_deal_time: string;
    };
};
export declare const review_service_delivery: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        delivery_id: string;
        status: boolean;
        reason: string;
        sign_stage: string;
    };
};
export declare const finish_service_delivery: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        delivery_id: string;
    };
};
export declare const finish_early_service_delivery: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        delivery_id: string;
        reason: string;
    };
};
export declare const punish_service_delivery: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        delivery_id: string;
        is_punish: boolean;
        reason: string;
        amount: string;
        attachments: never[];
    };
};
export declare const listCompany: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
            rank: string[];
            valid: boolean;
            region: string[];
        }[];
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const companyInfo: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const list_all_company: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const find_company_or_high_seas_company_by_id: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const createCompanyApplyByCreate: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            credit_code: string;
            name: string;
            common_name: string;
            country: string;
            industry: string;
            region: string;
            zip_code: string;
            phone: string;
            claim_by: string;
            claim_by_group: string;
            parent: string;
            info: string;
            rank: string;
            attachments: never[];
            leads_id: null;
        };
        contact_name: string;
        contact_position: string;
        contact_phone: string;
        note: string;
        budget: {
            amount: number;
            currency: string;
        };
    };
};
export declare const reviewCompanyApply: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        apply_id: string;
        status: boolean;
        result: string;
    };
};
export declare const transferCompanyClaim: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        claim_by: string;
    };
};
export declare const update_company_valid: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        company_id: string;
        valid: boolean;
        reason: string;
    };
};
export declare const update_company_lock: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        company_id: string;
        lock: boolean;
    };
};
export declare const claim_company: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        company_id: string;
    };
};
export declare const distribute_company: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        company_id: string;
        claim_id: string;
    };
};
export declare const batch_distribute_company: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        company_ids: string[];
        claim_id: string;
    };
};
export declare const updateCompanyLabels: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        company_id: string;
        labels: string[];
    };
};
export declare const removeCompany: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const listChannel: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
            channel_status: string[];
            grade: string[];
        };
        pagination: {
            skip: number;
            limit: number;
        };
        with_perm: boolean;
    };
};
export declare const channel: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const createChannelApply: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input_channel: {
            credit_code: string;
            name: string;
            common_name: string;
            type: string[];
            industry_list: string[];
            country: string;
            region: string;
            address: string;
            status: string;
            sale_claim_by: string;
            channel_sale_claim_by: string;
            info: string;
            grade: string;
            partner_type: string[];
            primary_industry: string[];
            primary_area: string[];
        };
        cooperate_contact: {
            type: string;
            name: string;
            position: string;
            area_code: string;
            phone: string;
            email: string;
        }[];
        department_contact: never[];
        other_contact: never[];
    };
};
export declare const reviewChannelApply: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        status: boolean;
        result: string;
    };
};
export declare const updateChannel: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        input_channel: {
            credit_code: string;
            name: string;
            common_name: string;
            type: string[];
            industry_list: string[];
            country: string;
            region: string;
            address: string;
            status: string;
            sale_claim_by: string;
            channel_sale_claim_by: string;
            info: string;
            grade: string;
            partner_type: string[];
            primary_industry: string[];
            primary_area: string[];
        };
    };
};
export declare const transferChannelClaim: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        claim_by: string;
    };
};
export declare const batchTransferChannelClaim: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id_list: string[];
        claim_by: string;
    };
};
export declare const update_channel_cooperate_status: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        status: string;
    };
};
export declare const listContract: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
            file_type: string;
            sign_date: {
                from: string;
                to: string;
            };
        }[];
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const contract: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const createContract: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        contract: {
            name: string;
            company: string;
            project: string;
            peerLegal: string;
            currency: string;
            amount: string;
            payOrPaid: string;
            file_type: string;
            signDate: string;
            stampDate: string;
            dueDate: string;
        };
    };
};
export declare const updateContract: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        contract: {
            name: string;
            company: string;
            project: string;
            peerLegal: string;
            currency: string;
            amount: string;
            payOrPaid: string;
            file_type: string;
            signDate: string;
            stampDate: string;
            dueDate: string;
        };
    };
};
export declare const frame_contract_info: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
    };
};
export declare const update_frame_contract_info: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            project_id: string;
            start_type: string;
            start_at: string;
            days: number;
            end_at: string;
            auto_compute: boolean;
            auto_renew: boolean;
            multi_body: boolean;
            body_ids: never[];
            body_info: string;
            order: string;
            order_info: string;
            set_template: boolean;
            template_file_ids: never[];
            no_template_info: string;
            set_top_amount: boolean;
            top_amount: string;
            note: string;
        };
    };
};
export declare const listRevenue: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            project_id: string[];
            state: string[];
            created_at: {
                from: string;
                to: string;
            };
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const updatePaymentPlan: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        payment_id: string;
        due_at: string;
        money: string;
    };
};
export declare const addPaymentPlan: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        due_at: string;
        money: string;
    };
};
export declare const removePaymentPlan: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        payment_id: string;
    };
};
export declare const revenueAssociation: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        rev_id: string;
        project_id: string;
        income_plan_id: string;
    };
};
export declare const revenueChangeState: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        rev_id: string;
        state: string;
    };
};
export declare const revenue_split: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        rev_id: string;
        split: boolean;
        child_revenue_list: {
            money: string;
            project_id: string;
        }[];
    };
};
export declare const listConfirmRevenue: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            claim_by: string[];
            confirmed_state: string[];
            created_at: {
                from: string;
                to: string;
            };
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const confirmRevenueStatistics: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            claim_by: string[];
            project_deal_date: {
                from: string;
                to: string;
            };
        };
    };
};
export declare const createConfirmRevenue: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project: string;
    };
};
export declare const updateConfirmRevenueForDeliver: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        dinput: {
            id: string;
            product_price: string;
            currency: string;
            attachment: never[];
            attachment_type: string;
            customer_docker: string;
            progress: number;
            dnote: string;
            acceptance_time: string;
        }[];
    };
};
export declare const updateConfirmRevenueForFanancial: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        finput: {
            id: string;
            product_price: string;
            out_source_amount: string;
            due_at: string;
            attachment: never[];
            attachment_type: string;
            customer_docker: string;
            progress: number;
            dnote: string;
            confirmed_state: string;
            amount: string;
            tax: string;
            all_amount: string;
            all_tax: string;
            tax_rate: number;
            currency: string;
            fnote: string;
            confirmed_progress: number;
            start_time: string;
            end_time: string;
            acceptance_time: string;
        }[];
        allfinished: boolean;
    };
};
export declare const removeConfirmRevenue: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const list_leads: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            list_type: string;
            type: string[];
            client_name: string;
            valid: boolean;
            convert: boolean;
        };
        pagination: {
            skip: number;
            limit: number;
        };
        sort_by: {
            by: string;
            order: number;
        };
    };
};
export declare const leads_info: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const create_leads: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        param: {
            type: string;
            source: string;
            source_product: string;
            client_name: string;
            client_contact_name: string;
            client_contact_position: string;
            client_contact_phone: string;
            client_contact_email: string;
            client_contact_time: string;
            communication_intention: string;
            note: string;
            region: string;
            attachments: never[];
        };
    };
};
export declare const update_leads: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        param: {
            type: string;
            source: string;
            source_product: string;
            client_name: string;
            client_contact_name: string;
            client_contact_position: string;
            client_contact_phone: string;
            note: string;
            region: string;
            attachments: never[];
        };
    };
};
export declare const update_leads_valid: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        valid: boolean;
        invalid_reason: string;
        first_reason: string;
        second_reason: null;
    };
};
export declare const claim_leads: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        leads_id: string;
    };
};
export declare const create_project_by_leads: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            name: string;
            company_id: string;
            type: string;
            level: string;
            deal_date: string;
            sign_date: string;
            stage: string;
            stage_info: {
                info: string;
                attachments: never[];
                todos: never[];
            };
            leads_convert_condition: never[];
            project_promise: string;
            extra: {
                source: string;
            };
        };
    };
};
export declare const createProjectInfo: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        company_id: null;
        channel_id: null;
        leads_id: null;
        type: string;
        info: string;
        attachments: never[];
        todos: {
            name: string;
            deadline: string;
            processor: string[];
        }[];
    };
};
export declare const updateProjectInfo: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        info: string;
        attachments: never[];
    };
};
export declare const deleteProjectInfo: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const createComment: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        related_type: string;
        related_id: string;
        content: string;
        attachments: never[];
        todos: {
            name: string;
            deadline: string;
            processor: string[];
        }[];
    };
};
export declare const deleteComment: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const listReport: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            creator: string[];
            type: string[];
            target: {
                from: string;
                to: string;
            };
        }[];
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const createReport: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        content: string;
        type: string;
        target: string;
        to: string[];
        attachments: never[];
        project_infos: {
            project_id: string;
            info: string;
        }[];
        immediately_sign_projects: never[];
    };
};
export declare const updateReport: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        content: string;
        to: string[];
        attachments: never[];
        project_infos: never[];
        immediately_sign_projects: never[];
    };
};
export declare const saleGoal: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        group: null;
        fiscal_year: number;
    };
};
export declare const saleCommission: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        group: null;
        fiscal_year: number;
    };
};
export declare const updateSaleGoal: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        user_id: string;
        group_id: null;
        goal: {
            typeArg: string;
            year: number;
            quarter: number;
            target: number;
        }[];
    };
};
export declare const createCommissionConfig: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        fiscal_year: number;
        start: string;
        end: string;
        commission_percent: {
            start: string;
            end: string;
            percent: number;
        }[];
    };
};
export declare const me: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {};
};
export declare const listUser: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
            enabled: boolean;
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const createUserGroup: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        name: string;
        type: string;
        role_type: string;
        sale_group_type: string;
        parent: string;
    };
};
export declare const updateUserGroupMember: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        member: string[];
        leader: string[];
    };
};
export declare const updatePermission: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        group: string;
        type: string;
        perm: string[];
        related: {
            scope: string;
        };
    };
};
export declare const listProduct: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {};
};
export declare const create_product: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            id: string;
            name: string;
            group: string;
            forms: string[];
            offline: boolean;
        };
    };
};
export declare const add_product_form: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        product_id: string;
        form_id: string;
        tax: number;
        contract_name: string;
        soft_name: string;
    };
};
export declare const addProductVersion: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        product_id: string;
        form_id: string;
        versions: {
            name: string;
            price: number;
            config: {};
        }[];
        note: string;
    };
};
export declare const addProductDraft: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        product_id: string;
        form_id: string;
        version_num: number;
        versions: never[];
        note: string;
        push_review: boolean;
    };
};
export declare const listPriceApproval: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            project_id: string[];
            status: string[];
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const createProjectPriceApproval: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        type: string;
        special_reason: null;
        input_product: {
            discount: number;
            reason: string;
        };
        input_service: null;
        input_frame_product: null;
        input_frame_service: null;
    };
};
export declare const approveProjectPriceApproval: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        result: boolean;
        note: string;
        source: string;
    };
};
export declare const revertProjectPriceApproval: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const add_service_cost_detail: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        details: {
            service_type: string;
            work_day: number;
            unit_price: number;
            total_price: number;
        }[];
        desc: {
            note: string;
            total: number;
        };
    };
};
export declare const listMachineStock: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            serial_like: string[];
            product_model: string;
        }[];
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const updateMachineStockBasic: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        update: {
            serial: string;
            product_type: string;
            product_model: string;
            stock_company: string;
        }[];
    };
};
export declare const create_hardware_after_sale: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            project_id: string;
            type: string;
            problem_product: {
                product_id: string;
                form_id: string;
                machines: {
                    machine: string;
                    component: never[];
                }[];
            }[];
            need_backup_machine: boolean;
            operation_time: string;
            reason: string;
            way: string;
            note: string;
        };
    };
};
export declare const project_income_plan: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
    };
};
export declare const create_income_plan: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        param: {
            income_milestone: string;
            income_type: string;
            contract_condition: string;
            income_way: string;
            income_rate: number;
            income_period: number;
            acceptance_period: number;
            income_period_basis: string;
            money: string;
            income_at: string;
            auto_compute: boolean;
            note: string;
            grace_period: number;
            assessment_date: string;
        };
    };
};
export declare const create_shipping_order: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        input: {
            order_date: string;
            shipping_address_id: string;
            products: {
                product_id: string;
                form_id: string;
                quantity: number;
            }[];
            note: string;
        };
    };
};
export declare const config: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {};
};
export declare const updateConfigProductDeliveryApprover: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const updateConfigServiceDeliveryApprover: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
};
export declare const list_business_chance: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            project_name: string;
            apply_status: string[];
            status: string;
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const createBusinessChance: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        channel_id: string;
        channel_contact: string;
        contact_information: string;
        company_id: string;
        project_name: string;
        product_list: {
            product_id: string;
            form_id: string;
            price: number;
        }[];
        due_at: string;
        claim_by: string;
        project_contact: string;
        project_address: string;
        department_used: string;
        delivery_type: string;
        info: string;
        attachments: never[];
    };
};
export declare const reviewBusinessChance: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        status: boolean;
        channel_claim_by: string;
        reject_type: null;
        reject_chance_id: string;
        reject_project_id: string;
        note: string;
        desc: string;
    };
};
export declare const list_solution: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string;
            status: string[];
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const create_solution: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            name: string;
            industry_ids: string[];
            product_ids: string[];
            content: string;
            attachments: never[];
        };
        push_review: boolean;
    };
};
export declare const review_solution: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        solution_version_id: string;
        status: boolean;
        reason: string;
    };
};
export declare const list_opportunity_scenario: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string;
            type: string[];
        };
        pagination: {
            skip: number;
            limit: number;
        };
        sort_by: {
            by: string;
            order: number;
        };
    };
};
export declare const create_opportunity_scenario: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            type: string;
            industry_ids: string[];
            group_ids: never[];
            name: string;
            description: string;
            customer_persona: string;
            budget: string;
            time_window: string;
            closed_loop_time: number;
            product: {
                product_id: string;
                form_id: string;
            }[];
            claim_by_ids: string[];
            has_solution: boolean;
            solution_link: string;
            solution_material: string;
            sale_guide: string;
            training_video: string;
            solution_material_list: never[];
            sale_guide_list: never[];
            training_video_list: never[];
            success_company_ids: never[];
        };
    };
};
export declare const list_special_deals_trace_back_await_project: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            claim_by: string[];
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
};
export declare const create_special_deals_trace_backs: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: null;
        random_inspection_type: string;
        random_inspection_number: null;
    };
};
export declare const submit_paper_acceptance_form: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        type: string;
        archive_location: string;
        tracking_number: string;
        deprecated_reason: string;
    };
};
export declare const create_announcement: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        title: string;
        content: string;
        notice_group_ids: string[];
    };
};
export declare const create_todo_list: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        name: string;
        type: string;
        relation: string;
        deadline: string;
        processor: string[];
    };
};
export declare const finished_todo_list: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        is_finished: boolean;
        completionNote: string;
    };
};
export declare const projectStatistics: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            stage: string[];
            deal_date: {
                from: string;
                to: string;
            };
        };
        pagination: {
            skip: number;
            limit: number;
        };
        sort_by: {
            by: string;
            order: number;
        };
    };
};
export declare const paymentStatistics: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            claim_by: string[];
        };
        pagination: {
            skip: number;
            limit: number;
        };
        sort_by: {
            by: string;
            order: number;
        };
    };
};
export declare const presaleStatistics: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            stage: string[];
        };
    };
};
export declare const exportExcelFile: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            stage: string[];
            deal_date: {
                from: string;
                to: string;
            };
        };
        sort_by: {
            by: string;
            order: number;
        }[];
        deal_revenue_type: string[];
        type: string;
    };
};
export declare const deal_revenue_perf_ranking: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            stage: string[];
            deal_date: {
                from: string;
                to: string;
            };
        };
        fiscal_year: number;
        deal_weight: number;
        revenue_weight: number;
    };
};
export declare const projectQueryOperations: ({
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            stage: string[];
            deal_date: {
                from: string;
                to: string;
            };
        };
        pagination: {
            skip: number;
            limit: number;
        };
        sort_by: {
            by: string;
            order: number;
        };
    };
})[];
export declare const projectMutateOperations: ({
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            name: string;
            company_id: string;
            type: string;
            level: string;
            deal_date: string;
            sign_date: string;
            stage: string;
            stage_info: {
                info: string;
                attachments: never[];
                todos: never[];
            };
            leads_convert_condition: never[];
            project_promise: string;
            extra: {
                source: string;
            };
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        stage: string;
        deal_logic: string;
        artificial_reason: null;
        stage_info: {
            info: string;
            attachments: never[];
            todos: never[];
        };
        project_promise: string;
        main_reason: string;
        minor_reason: never[];
        invalid_reason: null;
        win_rate: string;
        deal_date: string;
        sign_date: string;
        contract_sign_type: string;
        delivery_type: string;
        partners: never[];
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        calc_type: string;
        products: {
            product_id: string;
            quantity: number;
            price: number;
        }[];
        contract_sign_type: string;
        property: string;
        delivery_type: string;
        partners: never[];
        solution_ids: never[];
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        details: {
            product_id: string;
            form_id: string;
            cost: number;
        }[];
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        payment_coefficient: number;
        other_coefficient: number;
        coefficient_desc: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            project_id: string;
            change_scene: string[];
            scene_info: string;
            change_reason: string[];
            change_reason_info: string;
            assessment_increment: number;
            assessment_reason: string;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        apply_id: string;
        result: boolean;
        note: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        input_project_element: never[];
        input_project_direction: never[];
        calc_project_promise: boolean;
    };
})[];
export declare const companyOperations: ({
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
            rank: string[];
            valid: boolean;
            region: string[];
        }[];
        pagination: {
            skip: number;
            limit: number;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
})[];
export declare const channelOperations: ({
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
            channel_status: string[];
            grade: string[];
        };
        pagination: {
            skip: number;
            limit: number;
        };
        with_perm: boolean;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
})[];
export declare const contractFinanceOperations: ({
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            name: string[];
            file_type: string;
            sign_date: {
                from: string;
                to: string;
            };
        }[];
        pagination: {
            skip: number;
            limit: number;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        contract: {
            name: string;
            company: string;
            project: string;
            peerLegal: string;
            currency: string;
            amount: string;
            payOrPaid: string;
            file_type: string;
            signDate: string;
            stampDate: string;
            dueDate: string;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            project_id: string;
            start_type: string;
            start_at: string;
            days: number;
            end_at: string;
            auto_compute: boolean;
            auto_renew: boolean;
            multi_body: boolean;
            body_ids: never[];
            body_info: string;
            order: string;
            order_info: string;
            set_template: boolean;
            template_file_ids: never[];
            no_template_info: string;
            set_top_amount: boolean;
            top_amount: string;
            note: string;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            project_id: string[];
            state: string[];
            created_at: {
                from: string;
                to: string;
            };
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        rev_id: string;
        state: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        rev_id: string;
        split: boolean;
        child_revenue_list: {
            money: string;
            project_id: string;
        }[];
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            claim_by: string[];
            confirmed_state: string[];
            created_at: {
                from: string;
                to: string;
            };
        };
        pagination: {
            skip: number;
            limit: number;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            claim_by: string[];
            project_deal_date: {
                from: string;
                to: string;
            };
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project: string;
    };
})[];
export declare const followupOperations: ({
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
        company_id: null;
        channel_id: null;
        leads_id: null;
        type: string;
        info: string;
        attachments: never[];
        todos: {
            name: string;
            deadline: string;
            processor: string[];
        }[];
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        related_type: string;
        related_id: string;
        content: string;
        attachments: never[];
        todos: {
            name: string;
            deadline: string;
            processor: string[];
        }[];
    };
})[];
export declare const deliveryOperations: ({
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        project_id: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        status: boolean;
        reason: string;
        sign_stage: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        info: {
            project_id: string;
            product_id: string;
            form_id: string;
            estimate_delivery_time: string;
            estimate_acceptance_time: string;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        person_in_charge: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            project_id: string;
            product_id: string;
            form_id: string;
            type: string;
            reason: string;
            note: string;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        delivery_id: string;
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        id: string;
        details: {
            service_type: string;
            work_day: number;
            unit_price: number;
            total_price: number;
        }[];
        desc: {
            note: string;
            total: number;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        search: {
            serial_like: string[];
            product_model: string;
        }[];
        pagination: {
            skip: number;
            limit: number;
        };
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        update: {
            serial: string;
            product_type: string;
            product_model: string;
            stock_company: string;
        }[];
    };
} | {
    name: string;
    description: string;
    query: string;
    variableDefaults: {
        input: {
            project_id: string;
            type: string;
            problem_product: {
                product_id: string;
                form_id: string;
                machines: {
                    machine: string;
                    component: never[];
                }[];
            }[];
            need_backup_machine: boolean;
            operation_time: string;
            reason: string;
            way: string;
            note: string;
        };
    };
})[];
export declare const miscOperations: {
    name: string;
    description: string;
    query: string;
    variableDefaults: {};
}[];
