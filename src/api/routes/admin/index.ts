import express from "express";
import { acadecicYearRouter } from "./academic-year-router";
import { applicationLetterRouter } from "./application-letter-router";
import { applicationRouter } from "./application-router";
import { assessmentRouter } from "./assessment-router";
import { institutionRouter } from "./institution-router";
import { applicationTypeRouter } from "./application-type-router";
import { studentRouter } from "./student-router";
import { provinceRouter } from "./province-router";
import { countriesRouter } from "./countries-router";
import { citiesRouter } from "./cities-router";
import { addressTypeRouter } from "./address-type-router";
import { indigenousLearnerRouter } from "./indigenous-learner-router";
import { languageRouter } from "./language-router";
import { maritalStatusRouter } from "./marital-status-router";
import { studyFieldRouter } from "./study-field-router";
import { parentalRelationshipRouter } from "./parental-relationship-router";
import { firstNationRouter } from "./first-nation-router";
import { portalStatusRouter } from "./portal-status-router";
import { highSchoolRouter } from "./high-school-router";
import { sexRouter } from "./sex-router";
import { studentCategoryRouter } from "./student-category-router";
import { institutionLevelRouter } from "./institution-level-router";
import { ageDistributionRouter } from "./age-distribution-router";
import { assessmentTypeRouter } from "./assessment-type-router";
import { batchGroupRouter } from "./batch-group-router";
import { educationLevelRouter } from "./education-level-router";
import { disbursementTypeRouter } from "./disbursement-type-router";
import { statusRouter } from "./status-router";
import { statusReasonRouter } from "./status-reason-router";
import { yukonGrantEligibilityRouter } from "./yukon-grant-eligibility-router";
import { reasonsForChangeRouter } from "./reasons-for-change-router";
import { aboriginalStatusRouter } from "./aboriginal-status-router";
import { fundingGroupRouter } from "./funding-group-router";
import { disabilityTypeRouter } from "./disability-type-router";
import { disabilityServiceRouter } from "./disability-service-router";
import { studyAreaRouter } from "./study-area-router";
import { relationshipRouter } from "./relationship-router";
import { programRouter } from "./program-router";
import { cslClassificationRouter } from "./csl-classification-router";
import { accommodationTypeRouter } from "./accommodation-type-router";
import { cslCodeRouter } from "./csl-code-router";
import { communicationTypeRouter } from "./communication-type-router";
import { inSchoolStatusRouter } from "./in-school-status-router";
import { requestTypeRouter } from "./request-type-router";
import { requirementTypeRouter } from "./requirement-type-router";
import { citizenshipRouter } from "./citizenship-router";
import { prestudyEmploymentRouter } from "./prestudy-employment-status-router";
import { agencyRouter } from "./agency-router";
import { instructionTypeRouter } from "./instruction-type-router";
import { programDivisionRouter } from "./program-division-router";
import { attendanceRouter } from "./attendance-router";
import { documentStatusRouter } from "./document-status-router";
import { expenseCategoryRouter } from "./expense-category-router";
import { incomeTypeRouter } from "./income-type-router";
import { equipmentCategoryRouter } from "./equipment-category-router";
import { RequireServerAuth, RequireAdmin } from "../auth";
import { changeReasonRouter } from "./change-reason-router";
import { disbursementRouter } from "./disbursement";
import { usersRouter } from "./users-router";
import { cslLookupRouter } from "./csl-lookup-router";
import {cslReasonRouter} from "./csl-reason-router";
import { cslCertificateExportRouter } from "./csl-certificate-export-router";

export const adminRouter = express.Router();
//adminRouter.use("/", RequireServerAuth, RequireAdmin)

adminRouter.use("/institution", institutionRouter);
adminRouter.use("/academic-year", acadecicYearRouter);
adminRouter.use("/application", applicationRouter);
adminRouter.use("/application-letter", applicationLetterRouter);
adminRouter.use("/assessment", assessmentRouter);
adminRouter.use("/student", studentRouter);
adminRouter.use("/province", provinceRouter);
adminRouter.use("/countries", countriesRouter);
adminRouter.use("/cities", citiesRouter);
adminRouter.use("/address-type", addressTypeRouter);
adminRouter.use("/indigenous-learner", indigenousLearnerRouter);
adminRouter.use("/language", languageRouter);
adminRouter.use("/marital-status", maritalStatusRouter);
adminRouter.use("/study-field", studyFieldRouter);
adminRouter.use("/parental-relationship", parentalRelationshipRouter);
adminRouter.use("/first-nation", firstNationRouter);
adminRouter.use("/portal-status", portalStatusRouter);
adminRouter.use("/sex", sexRouter);
adminRouter.use("/student-category", studentCategoryRouter);
adminRouter.use("/institution-level", institutionLevelRouter);
adminRouter.use("/age-distribution", ageDistributionRouter);
adminRouter.use("/application-type", applicationTypeRouter);
adminRouter.use("/high-school", highSchoolRouter);
adminRouter.use("/assessment-type", assessmentTypeRouter);
adminRouter.use("/batch-group", batchGroupRouter);
adminRouter.use("/education-level", educationLevelRouter);
adminRouter.use("/disbursement-type", disbursementTypeRouter);
adminRouter.use("/status", statusRouter);
adminRouter.use("/status-reason", statusReasonRouter);
adminRouter.use("/yukon-grant-eligibility", yukonGrantEligibilityRouter);
adminRouter.use("/funding-group", fundingGroupRouter);
adminRouter.use("/reasons-for-change", reasonsForChangeRouter);
adminRouter.use("/disability-type", disabilityTypeRouter);
adminRouter.use("/aboriginal-status", aboriginalStatusRouter);
adminRouter.use("/disability-service", disabilityServiceRouter);
adminRouter.use("/study-area", studyAreaRouter);
adminRouter.use("/relationship", relationshipRouter);
adminRouter.use("/program", programRouter);
adminRouter.use("/csl-classification", cslClassificationRouter);
adminRouter.use("/csl-codes", cslCodeRouter);
adminRouter.use("/csl-lookup", cslLookupRouter);
adminRouter.use("/csl-reason", cslReasonRouter);
adminRouter.use("/in-school-status", inSchoolStatusRouter);
adminRouter.use("/requirement-type", requirementTypeRouter);
adminRouter.use("/citizenship", citizenshipRouter);
adminRouter.use("/prestudy-employment-status", prestudyEmploymentRouter);
adminRouter.use("/agency", agencyRouter);
adminRouter.use("/instruction-type", instructionTypeRouter);
adminRouter.use("/attendance", attendanceRouter);
adminRouter.use("/program-division", programDivisionRouter);
adminRouter.use("/document-status", documentStatusRouter);
adminRouter.use("/expense-category", expenseCategoryRouter);
adminRouter.use("/income-type", incomeTypeRouter);
adminRouter.use("/equipment-category", equipmentCategoryRouter);
adminRouter.use("/change-reason", changeReasonRouter);
adminRouter.use("/communication-types", communicationTypeRouter);
adminRouter.use("/request-types", requestTypeRouter);
adminRouter.use("/accommodation-type", accommodationTypeRouter);
adminRouter.use("/disbursement", disbursementRouter);
adminRouter.use("/users", usersRouter);
adminRouter.use("/csl-certificate-export", cslCertificateExportRouter);