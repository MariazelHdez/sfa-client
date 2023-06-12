export interface Application {
  id: number;
  student_id: number;
  academic_year_id: number;
  institution_campus_id?: number;
  study_area_id?: number;
  program_id?: number;
  aboriginal_status_id?: number;
  marital_status_id?: number;
  category_id?: number;
  first_nation_id?: number;
  spouse_id?: number;
  parent1_id?: number;
  parent2_id?: number;
  parent1_income?: number;
  parent1_net_income?: number;
  parent1_tax_paid?: number;
  parent2_income?: number;
  parent2_net_income?: number;
  parent2_tax_paid?: number;
  school_email?: string;
  school_telephone?: string;
  spouse_hs_end_year?: number;
  spouse_hs_end_month?: number;
  spouse_prestudy_emp_status_id?: number;
  spouse_pstudy_school_from?: Date;
  spouse_pstudy_school_to?: Date;
  spouse_pstudy_income_comment?: string;
  spouse_study_emp_status_id?: number;
  spouse_study_school_from?: Date;
  spouse_study_school_to?: Date;
  is_spouse_study_csl?: boolean;
  is_spouse_study_bus?: boolean;
  spouse_study_distance?: number;
  spouse_study_income_comment?: string;
  classes_start_date?: Date;
  classes_end_date?: Date;
  is_correspondence?: boolean;
  is_coop_paid?: boolean;
  citizenship_status?: number;
  is_disabled?: boolean;
  is_minority?: boolean;
  student_number?: string;
  program_year_total?: number;
  program_year?: number;
  is_two_residence?: boolean;
  is_moving?: boolean;
  csl_classification?: number;
  csl_previous_province_id?: number;
  program_division_explanation?: string;
  prestudy_accom_code?: number;
  prestudy_own_home?: boolean;
  prestudy_board_amount?: number;
  prestudy_city_id?: number;
  prestudy_province_id?: number;
  prestudy_bus?: boolean;
  prestudy_distance?: number;
  prestudy_employ_status_id?: number;
  study_accom_code?: number;
  study_own_home?: boolean;
  study_board_amount?: number;
  study_city_id?: number;
  study_province_id?: number;
  study_bus?: boolean;
  study_distance?: number;
  stat_info_comment?: string;
  books_supplies_cost?: number;
  outstanding_cslpt_amount?: number;
  previous_csg_pt_amount?: number;
  percent_of_full_time?: number;
  is_part_of_ft?: boolean;
  study_weeks_count?: number;
  class_hours_per_week?: number;
  parent_residence_comment?: string;
  study_living_w_spouse?: boolean;
  tuition_estimate_amount?: number;
  program_division?: number;
  is_previous_cslft?: boolean;
  is_previous_cslpt?: boolean;
  coop_start_year?: number;
  coop_start_month?: number;
  coop_end_year?: number;
  coop_end_month?: number;
  exclude_from_count?: boolean;
  is_perm_disabled?: boolean;
  disabled_equipment?: string;
  previous_csg_disability_amount?: number;
  previous_csg_fem_doc_amount?: number;
  credit_chk_reqd_date?: Date;
  credit_chk_fax_sent_date?: Date;
  credit_chk_passed_date?: Date;
  credit_chk_passed?: boolean;
  credit_chk_appeal_date?: Date;
  credit_chk_app_comp_date?: Date;
  credit_chk_app_comp?: boolean;
  credit_chk_comp_date?: Date;
  csl_clearance_date?: Date;
  prestudy_csl_classification?: number;
  yea_tot_receipt_amount?: number;
  academic_percent?: number;
  csl_restriction_comment?: string;
  in_progress_page?: number;
  online_start_date?: Date;
  online_submit_date?: Date;
  rem_transition_grant_years?: number;
  student_ln150_income?: number;
  spouse_ln150_income?: number;
  taxes1_filed_year?: number;
  taxes2_filed_year?: number;
  taxes1_filed_province_id?: number;
  taxes2_filed_province_id?: number;
  taxes1_not_filed?: boolean;
  taxes2_not_filed?: boolean;
  applied_other_funding?: boolean;
  csl_restriction_warn_id?: number;
  csl_restriction_reason_id?: number;
  courses_per_week?: number;
  prestudy_start_date?: Date;
  prestudy_end_date?: Date;
}

export function ApplicationFromDraft(draft: any): Application {
  let app = {
    student_id: draft.student_id,
    academic_year_id: draft.academic_year_id,

    category_id: draft.personal_details.category,

    institution_campus_id: draft.program_details.institution_id,
    classes_start_date: draft.program_details.start_date_of_classes,
    classes_end_date: draft.program_details.end_date_of_classes,
    //student_number: undefined,
    program_year_total: draft.program_details.duration_of_program,
    program_year: draft.program_details.year_entering,
    study_area_id: draft.program_details.study_area,
    program_id: draft.program_details.program,
    //program_division: undefined,
    //program_division_explanation: undefined,

    first_nation_id: draft.statistical.first_nation,
    aboriginal_status_id: draft.statistical.aboriginal_status,
    marital_status_id: draft.statistical.marital_status,
    citizenship_status: draft.statistical.citizenship,

    //parent1_id: undefined, added in next step
    //parent2_id: undefined, added in next step

    //school_email: undefined,
    //school_telephone: undefined,

    online_start_date: draft.create_date,
    online_submit_date: new Date(),

    //applied_other_funding: undefined,

    //prestudy_start_date: undefined,
    //prestudy_end_date: undefined,
  } as Application;

  if (draft.csfa_accomodation && draft.csfa_accomodation.accomodations && draft.csfa_accomodation.length > 0) {
    app.prestudy_accom_code = draft.csfa_accomodation.accomodations[0].living;
    app.prestudy_own_home = draft.csfa_accomodation.accomodations[0].own_home;
    app.prestudy_board_amount = draft.csfa_accomodation.accomodations[0].rent_to_parents;
    app.prestudy_city_id = draft.csfa_accomodation.accomodations[0].city;
    app.prestudy_province_id = draft.csfa_accomodation.accomodations[0].province;
    app.prestudy_bus = draft.csfa_accomodation.accomodations[0].bus_service;
    app.prestudy_distance = draft.csfa_accomodation.accomodations[0].distinct_from_school;
    //app.prestudy_employ_status_id: undefined,
  }

  if (draft.csfa_accomodation && draft.csfa_accomodation.accomodations && draft.csfa_accomodation.length > 1) {
    app.study_accom_code = draft.csfa_accomodation.accomodations[1].living;
    app.study_own_home = draft.csfa_accomodation.accomodations[1].own_home;
    app.study_board_amount = draft.csfa_accomodation.accomodations[1].rent_to_parents;
    app.study_city_id = draft.csfa_accomodation.accomodations[1].city;
    app.study_province_id = draft.csfa_accomodation.accomodations[1].province;
    app.study_bus = draft.csfa_accomodation.accomodations[1].bus_service;
    app.study_distance = draft.csfa_accomodation.accomodations[1].distinct_from_school;
    //app.prestudy_employ_status_id: undefined,
  }

  return app;
}

export function ParentsFromDraft(draft: any): any[] {
  let parents = new Array<any>();

  if (
    draft.personal_details.category == 1 &&
    draft.parents &&
    draft.parents.parents &&
    draft.parents.parents.length > 0
  ) {
    for (let p of draft.parents.parents) {
      let parent = {
        first_name: p.first_name,
        last_name: p.last_name,
        relationship: p.relationship,
        sin: p.sin,
      };

      if (parent.first_name && parent.relationship) parents.push(parent);
    }
  }
  return parents;
}

export function AddressesFromDraft(draft: any): any[] {
  let addresses = new Array<any>();

  if (draft.addresses.home_address1_id == -1) {
    addresses.push({
      address_type_id: 1,
      address1: draft.addresses.home_address1.first,
      address2: draft.addresses.home_address1.second,
      city_id: draft.addresses.home_address1.city,
      province_id: draft.addresses.home_address1.region,
      country_id: 1,
      postal_code: draft.addresses.home_address1.postal,
    });
  }

  if (
    draft.addresses.home_address2_id == -1 &&
    draft.addresses.home_address2 &&
    draft.addresses.home_address2.city_id
  ) {
    addresses.push({
      address_type_id: 3,
      address1: draft.addresses.home_address2.first,
      address2: draft.addresses.home_address2.second,
      city_id: draft.addresses.home_address2.city,
      province_id: draft.addresses.home_address2.region,
      country_id: 1,
      postal_code: draft.addresses.home_address2.postal,
    });
  }

  return addresses;
}

export function PersonFromDraft(draft: any): any {
  let sex_id = -1;

  if (draft.statistical.gender == "Female") sex_id = 2;
  else if (draft.statistical.gender == "Male") sex_id = 1;
  else if (draft.statistical.gender == "Unspecified") sex_id = 0;

  return {
    language_id: draft.statistical.language == "English" ? 1 : 2,
    sex_id,
    telephone: draft.personal_details.home_phone,
    email: draft.personal_details.home_email,
    citizenship_code: draft.statistical.citizenship,
  };
}

export function ConsentFromDraft(draft: any): any[] {
  let consents = new Array<any>();

  if (draft.consent && draft.consent.consents) {
    for (let consent of draft.consent.consents) {
      consents.push({
        start_academic_year_id: draft.academic_year_id,
        consent_person: consent.person,
        consent_sfa: true,
        consent_csl: true,
      });
    }
  }

  return consents;
}

export function FundingFromDraft(draft: any): any[] {
  let funding = new Array<any>();

  if (draft.funding_sources && draft.funding_sources.sources) {
    for (let source of draft.funding_sources.sources) {
      let application_type_id = 1;
      let csfa_amounts = draft.funding_sources.csfa_amounts;
      let loan_amount = draft.funding_sources.csfa_loan_amount;

      if (source == "Canada Student Financial Assistance (Full-Time)") application_type_id = 2;
      else if (source == "Canada Student Financial Assistance (Part-Time)") application_type_id = 3;

      let request_type_id = -1;

      switch (source) {
        case "Yukon Grant":
          request_type_id = 2;
          break;
        case "Student Training Allowance":
          request_type_id = 1;
          break;
        case "Yukon Excellence Awards":
          request_type_id = 3;
          break;
        case "Canada Student Financial Assistance (Full-Time)":
          request_type_id = 4;
          break;
        case "Canada Student Financial Assistance (Part-Time)":
          request_type_id = 5;
          break;
        case "Canadian Army Scholarship":
          request_type_id = 7;
          break;
        case "Yukon Huskys CB Radio Club Scholarship":
          request_type_id = 11;
          break;
        case "Nicholas John Harach Scholarship":
          request_type_id = 9;
          break;
      }

      if (request_type_id != -1)
        funding.push({
          //application_type_id,
          request_type_id,
          status_id: 1,
          received_date: new Date(),
          status_date: new Date(),
          entering_first_year: draft.program_details.year_entering == 1,
          student_is_in_ft_study: draft.program_details.attendance == "Full Time",
          csl_request_amount: application_type_id == 2 ? loan_amount : 0,
          is_csl_full_amount: application_type_id == 2 && csfa_amounts == "Full amount loans and grants",
        });
    }
  }

  return funding;
}

export function ResidenceFromDraft(draft: any): any[] {
  let residences = new Array<any>();

  if (draft.residency && draft.residency.residency_history) {
    let is_in_progress = true;
    for (let residence of draft.residency.residency_history) {
      residences.push({
        city_id: residence.city,
        province_id: residence.province,
        country_id: residence.country,
        from_year: residence.start.split("/")[0],
        from_month: residence.start.split("/")[1],
        to_year: residence.end.split("/")[0],
        to_month: residence.end.split("/")[1],
        in_school: residence.in_school,
        is_in_progress,
      });

      is_in_progress = false;
    }
  }

  return residences;
}

export function StudentFromDraft(draft: any): any {
  let educations = draft.education.education_history;
  let studentUpdate = {} as any;

  if (educations) {
    studentUpdate.high_school_id = educations[0].school;
    studentUpdate.high_school_left_year = educations[0].left_high_school.split("/")[0];
    studentUpdate.high_school_left_month = educations[0].left_high_school.split("/")[1];
  }

  return studentUpdate;
}

export function OtherFundingFromDraft(draft: any): any[] {
  let fundings = new Array<any>();

  if (draft.other_funding && draft.other_funding.has_funding && draft.other_funding.other_fundings) {
    let is_in_progress = true;

    for (let funding of draft.other_funding.other_fundings) {
      fundings.push({
        agency_id: funding.agency,
        amount: funding.amount,
        is_tuition: funding.purposes.includes("Tuition"),
        is_living_expenses: funding.purposes.includes("Living Expenses"),
        is_books: funding.purposes.includes("Books"),
        is_transportation: funding.purposes.includes("Transportation"),
        other_purpose: funding.other,
        agency_comment: funding.comments,
      });

      is_in_progress = false;
    }
  }

  return fundings;
}

export function IncomeFromDraft(draft: any): any[] {
  let incomes = new Array<any>();

  if (draft.csfa_income && draft.csfa_income.has_income && draft.csfa_income.incomes) {
    for (let income of draft.csfa_income.incomes) {
      incomes.push({
        income_type_id: income.type,
        comment: income.comments,
        amount: income.amount,
      });
    }
  }

  return incomes;
}

export function ExpensesFromDraft(draft: any): any[] {
  let expenses = new Array<any>();

  if (draft.csfa_expenses && draft.csfa_expenses.expenses) {
    for (let income of draft.csfa_expenses.expenses) {
      expenses.push({
        income_type_id: income.type,
        comment: income.comments,
        amount: income.amount,
      });
    }
  }

  return expenses;
}