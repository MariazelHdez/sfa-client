import * as config from "./config";

export const LOGIN_URL = `${config.apiBaseUrl}/auth/login`;
export const AUTH_CHECK_URL = `${config.apiBaseUrl}/api/auth/isAuthenticated`;
export const LOGOUT_URL = `${config.apiBaseUrl}/api/auth/logout`;
export const PROFILE_URL = `${config.apiBaseUrl}/api/user`;

export const STATIC_URL = `${config.apiBaseUrl}/api/v1/data`;
export const LANGUAGE_URL = `${STATIC_URL}/languages`;
export const ABORIGINAL_STATUS_URL = `${STATIC_URL}/aboriginalstatus`;
export const FIRST_NATIONS_URL = `${STATIC_URL}/firstnations`;
export const MARITAL_URL = `${STATIC_URL}/maritalstatus`;
export const HIGH_SCHOOOL_URL = `${STATIC_URL}/highschools`;
export const EDUCATION_LEVEL_URL = `${STATIC_URL}/educationlevel`;
export const RELATIONSHIP_URL = `${STATIC_URL}/relationships`;
export const REQUIREMENT_TYPE_URL = `${STATIC_URL}/requirementtypes`;
export const FUNDING_TYPE_URL = `${STATIC_URL}/requesttypes`;
export const FUNDING_STATUS_URL = `${STATIC_URL}/status`;
export const FUNDING_REASON_URL = `${STATIC_URL}/statusreasons`;
export const CATEGORY_URL = `${STATIC_URL}/studentcategory`;
export const AGENCY_URL = `${STATIC_URL}/agency`;
export const PROGRAM_AREA_URL = `${STATIC_URL}/studyareas`;
export const PROGRAM_TYPE_URL = `${STATIC_URL}/programs`;
export const PROGRAM_DIVISION_URL = `${STATIC_URL}/programdivisions`;

export const REFERENCE_BASE_URL = `${config.apiBaseUrl}/api/v2/reference`;
export const CITY_URL = `${REFERENCE_BASE_URL}/city`;
export const PROVINCE_URL = `${REFERENCE_BASE_URL}/province`;
export const COUNTRY_URL = `${REFERENCE_BASE_URL}/country`;
export const INSTITUTION_LEVEL_URL = `${REFERENCE_BASE_URL}/institution_level`;

export const APPLICATION_URL = `${config.apiBaseUrl}/api/v2/admin/application`;
export const STUDENT_URL = `${config.apiBaseUrl}/api/v2/admin/student`;
export const STUDENT_SEARCH_URL = `${config.apiBaseUrl}/api/v2/admin/student/search`;
export const INSTITUTION_URL = `${config.apiBaseUrl}/api/v2/admin/institution`;
export const APPLICATION_TYPE = `${config.apiBaseUrl}/api/v2/admin/application-type`;
export const ACADEMIC_YEAR_URL=`${config.apiBaseUrl}/api/v2/admin/academic-year`;
export const PROVINCE=`${config.apiBaseUrl}/api/v2/admin/province`;
export const COUNTRIES=`${config.apiBaseUrl}/api/v2/admin/countries`;
export const CITIES=`${config.apiBaseUrl}/api/v2/admin/cities`;
export const CSL_CODES = `${config.apiBaseUrl}/api/v2/admin/csl-codes`;
export const CSL_CERTIFICATE_EXPORT = `${config.apiBaseUrl}/api/v2/admin/csl-certificate-export`;
export const CSL_MSFAA_RECEIVE = `${config.apiBaseUrl}/api/v2/admin/csl-msfaa-receive`;
export const CSL_ENTITLEMENT_FEEDBACK = `${config.apiBaseUrl}/api/v2/admin/csl-entitlement-feedback`
export const CSL_LOOKUP = `${config.apiBaseUrl}/api/v2/admin/csl-lookup`;
export const CSL_REASON = `${config.apiBaseUrl}/api/v2/admin/csl-reason`;
export const COMMUNICATION_TYPES = `${config.apiBaseUrl}/api/v2/admin/communication-types`;
export const IN_SCHOOL_STATUS = `${config.apiBaseUrl}/api/v2/admin/in-school-status`;
export const REQUEST_TYPES = `${config.apiBaseUrl}/api/v2/admin/request-types`;
export const REQUIREMENT_TYPE = `${config.apiBaseUrl}/api/v2/admin/requirement-type`;
export const ADDRESS_TYPE=`${config.apiBaseUrl}/api/v2/admin/address-type`;
export const INDIGENOUS_LERNER=`${config.apiBaseUrl}/api/v2/admin/indigenous-learner`;
export const LANGUAGE=`${config.apiBaseUrl}/api/v2/admin/language`;
export const MARITAL_STATUS=`${config.apiBaseUrl}/api/v2/admin/marital-status`;
export const STUDY_FIELD =`${config.apiBaseUrl}/api/v2/admin/study-field`;
export const PARENTAL_RELATIONSHIP =`${config.apiBaseUrl}/api/v2/admin/parental-relationship`;
export const FIRST_NATION =`${config.apiBaseUrl}/api/v2/admin/first-nation`;
export const PORTAL_STATUS =`${config.apiBaseUrl}/api/v2/admin/portal-status`;
export const SEX =`${config.apiBaseUrl}/api/v2/admin/sex`;
export const STUDENT_CATEGORY =`${config.apiBaseUrl}/api/v2/admin/student-category`;
export const INSTITUTION_LEVEL =`${config.apiBaseUrl}/api/v2/admin/institution-level`;
export const AGE_DISTRIBUTION =`${config.apiBaseUrl}/api/v2/admin/age-distribution`;
export const HIGH_SCHOOL =`${config.apiBaseUrl}/api/v2/admin/high-school`;
export const ASSESSMENT_TYPE =`${config.apiBaseUrl}/api/v2/admin/assessment-type`;
export const BATCH_GROUP =`${config.apiBaseUrl}/api/v2/admin/batch-group`;
export const EDUCATION_LEVEL =`${config.apiBaseUrl}/api/v2/admin/education-level`;
export const REASONS_FOR_CHANGE =`${config.apiBaseUrl}/api/v2/admin/reasons-for-change`;
export const DISBURSEMENT_TYPE =`${config.apiBaseUrl}/api/v2/admin/disbursement-type`;
export const STATUS =`${config.apiBaseUrl}/api/v2/admin/status`;
export const STATUS_REASON =`${config.apiBaseUrl}/api/v2/admin/status-reason`;
export const YUKON_GRANT_ELIGIBILITY =`${config.apiBaseUrl}/api/v2/admin/yukon-grant-eligibility`;
export const FUNDING_GROUP =`${config.apiBaseUrl}/api/v2/admin/funding-group`;
export const DISABILITY_TYPE =`${config.apiBaseUrl}/api/v2/admin/disability-type`;
export const ABORIGINAL_STATUS =`${config.apiBaseUrl}/api/v2/admin/aboriginal-status`;
export const DISABILITY_SERVICE =`${config.apiBaseUrl}/api/v2/admin/disability-service`;
export const STUDY_AREA =`${config.apiBaseUrl}/api/v2/admin/study-area`;
export const RELATIONSHIP =`${config.apiBaseUrl}/api/v2/admin/relationship`;
export const PROGRAM =`${config.apiBaseUrl}/api/v2/admin/program`;
export const CSL_CLASSIFICATION =`${config.apiBaseUrl}/api/v2/admin/csl-classification`;
export const CITIZENSHIP =`${config.apiBaseUrl}/api/v2/admin/citizenship`;
export const PRESTUDY_EMPLOYMENT_STATUS =`${config.apiBaseUrl}/api/v2/admin/prestudy-employment-status`;
export const AGENCY =`${config.apiBaseUrl}/api/v2/admin/agency`;
export const INSTRUCTION_TYPE =`${config.apiBaseUrl}/api/v2/admin/instruction-type`;
export const ATTENDANCE =`${config.apiBaseUrl}/api/v2/admin/attendance`;
export const PROGRAM_DIVISION =`${config.apiBaseUrl}/api/v2/admin/program-division`;
export const DOCUMENT_STATUS =`${config.apiBaseUrl}/api/v2/admin/document-status`;
export const INCOME_TYPE =`${config.apiBaseUrl}/api/v2/admin/income-type`;
export const EXPENSE_CATEGORY =`${config.apiBaseUrl}/api/v2/admin/expense-category`;
export const EQUIPMENT_CATEGORY =`${config.apiBaseUrl}/api/v2/admin/equipment-category`;
export const CHANGE_REASON =`${config.apiBaseUrl}/api/v2/admin/change-reason`;
export const ACCOMMODATION_TYPE =`${config.apiBaseUrl}/api/v2/admin/accommodation-type`;
export const DISBURSEMENT =`${config.apiBaseUrl}/api/v2/admin/disbursement`;
export const ASSESSMENT = `${config.apiBaseUrl}/api/v2/admin/assessment`;
export const CERTIFICATE_AUDIT_REPORT = `${config.apiBaseUrl}/api/v2/admin/csl-certificate-audit-report`;
export const CHEQUE_REQ_LIST = `${config.apiBaseUrl}/api/v2/admin/cheque-req-list`;
export const CSL_MSFAA_SEND = `${config.apiBaseUrl}/api/v2/admin/csl-msfaa-send`;
export const CSL_RESTRICTED_DATA = `${config.apiBaseUrl}/api/v2/admin/csl-restricted-data`;

export const FUNDING_REQUESTS_URL = `${config.apiBaseUrl}/api/v2/admin/funding-requests`;

// Modules
export const CSLFT = `${ASSESSMENT}/cslft`;
export const CSLFT_ASSESS_INFO = `${CSLFT}/assess-info`;

export const CSGFT = `${ASSESSMENT}/csgft`;
export const CSGFT_NEW_INSTANCE = `${CSGFT}/new-instance`;

export const CSG_THRESHOLD_URL = `${config.apiBaseUrl}/api/v2/admin/csg-threshold`;
export const ADMIN_REPORT_URL = `${config.apiBaseUrl}/api/v2/admin/reporting`;

export const USERS_URL = `${config.apiBaseUrl}/api/v2/admin/users`;
