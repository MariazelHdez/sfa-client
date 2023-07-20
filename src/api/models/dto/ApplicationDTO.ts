export interface ApplicationDTO {
    aboriginal_status_id?: number;
    academic_percent?: number;
    academic_year_id?: number;
    applied_other_funding?: boolean;
    attendance_id?: number;
    books_supplies_cost?: number;
    category_id?: number;
    citizenship_status?: number;
    class_hours_per_week?: number;
    classes_end_date?: Date;
    classes_start_date?: Date;
    coop_end_month?: number;
    coop_end_year?: number;
    coop_start_month?: number;
    coop_start_year?: number;
    courses_per_week?: number;
    credit_chk_app_comp?: boolean;
    credit_chk_app_comp_date?: Date;
    credit_chk_appeal_date?: Date;
    credit_chk_comp_date?: Date;
    credit_chk_fax_sent_date?: Date;
    credit_chk_passed?: boolean;
    credit_chk_passed_date?: Date;
    credit_chk_reqd_date?: Date;
    csl_classification?: number;
    csl_clearance_date?: Date;
    csl_previous_province_id?: number;
    csl_restriction_comment?: string;
    csl_restriction_reason_id?: number;
    csl_restriction_warn_id?: number;
    disability_start_date?: Date;
    disabled_equipment?: string;
    exclude_from_count?: boolean;
    first_nation_id?: number;
    has_consent_to_share_data?: boolean;
    id?: number;
    in_progress_page?: number;
    institution_campus_id?: number;
    is_cheques_to_institution?: boolean;
    is_coop_paid?: boolean;
    is_correspondence?: boolean;
    is_disabled?: boolean;
    is_minority?: boolean;
    is_moving?: boolean;
    is_part_of_ft?: boolean;
    is_perm_disabled?: boolean;
    is_persist_disabled?: boolean;
    is_previous_cslft?: boolean;
    is_previous_cslpt?: boolean;
    is_spouse_study_bus?: boolean;
    is_spouse_study_csl?: boolean;
    is_two_residence?: boolean;
    last_checked_on?: Date;
    last_jurisdiction_id?: number;
    marital_status_id?: number;
    online_start_date?: Date;
    online_submit_date?: Date;
    other_jurisdiction?: string;
    outstanding_cslpt_amount?: number;
    parent1_id?: number;
    parent1_income?: number;
    parent1_net_income?: number;
    parent1_relationship_id?: number;
    parent1_tax_paid?: number;
    parent2_id?: number;
    parent2_income?: number;
    parent2_net_income?: number;
    parent2_relationship_id?: number;
    parent2_tax_paid?: number;
    parent_residence_comment?: string;
    percent_of_full_time?: number;
    permanent_disability?: boolean;
    pers_or_prolong_disability?: boolean;
    persist_disabled_start_date?: Date;
    prestudy_accom_code?: number;
    prestudy_board_amount?: number;
    prestudy_bus?: boolean;
    prestudy_city_id?: number;
    prestudy_csl_classification?: number;
    prestudy_distance?: number;
    prestudy_employ_status_id?: number;
    prestudy_employed_from_date?: Date;
    prestudy_employed_to_date?: Date;
    prestudy_employer_city_id?: number;
    prestudy_employer_name?: string;
    prestudy_employer_province_id?: number;
    prestudy_end_date?: Date;
    prestudy_living_w_spouse?: boolean;
    prestudy_own_home?: boolean;
    prestudy_province_id?: number;
    prestudy_start_date?: Date;
    previous_csg_disability_amount?: number;
    previous_csg_fem_doc_amount?: number;
    previous_csg_pt_amount?: number;
    primary_address_id?: number;
    program_division?: number;
    program_division_explanation?: string;
    program_id?: number;
    program_year?: number;
    program_year_total?: number;
    rem_transition_grant_years?: number;
    requires_credit_check?: boolean;
    school_email?: string;
    school_telephone?: string;
    seen?: boolean;
    spouse_hs_end_month?: number;
    spouse_hs_end_year?: number;
    spouse_id?: number;
    spouse_last_jurisdiction_id?: number;
    spouse_ln150_income?: number;
    spouse_other_jurisdiction?: string;
    spouse_prestudy_emp_status_id?: number;
    spouse_pstudy_income_comment?: string;
    spouse_pstudy_school_from?: Date;
    spouse_pstudy_school_to?: Date;
    spouse_study_distance?: number;
    spouse_study_emp_status_id?: number;
    spouse_study_income_comment?: string;
    spouse_study_school_from?: Date;
    spouse_study_school_to?: Date;
    stat_info_comment?: string;
    student_id?: number;
    student_ln150_income?: number;
    student_number?: string;
    study_accom_code?: number;
    study_area_id?: number;
    study_board_amount?: number;
    study_bus?: boolean;
    study_city_id?: number;
    study_distance?: number;
    study_living_w_spouse?: boolean;
    study_own_home?: boolean;
    study_province_id?: number;
    study_weeks_count?: number;
    taxes1_filed_province_id?: number;
    taxes1_filed_year?: number;
    taxes1_not_filed?: boolean;
    taxes1_verified?: boolean;
    taxes2_filed_province_id?: number;
    taxes2_filed_year?: number;
    taxes2_not_filed?: boolean;
    taxes2_verified?: boolean;
    tuition_estimate_amount?: number;
    updated_at?: Date;
    valid_driver_license?: boolean;
    valid_driver_license_comment?: string;
    valid_yhcip?: boolean;
    valid_yhcip_comment?: string;
    yea_tot_receipt_amount?: number;    
}