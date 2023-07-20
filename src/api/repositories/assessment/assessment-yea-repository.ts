import { Knex } from "knex";
import moment from "moment";
import { min } from 'lodash';
import { AssessmentDTO, ApplicationDTO, DisbursementDTO, StudentDTO, FundingRequestDTO } from "models";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationRepository } from "../application";
import { StudentRepository } from "../student";
import { FundingRequestRepository } from "../funding_request";

export class AssessmentYEA extends AssessmentBaseRepository {

    private applicationRepo: ApplicationRepository;
    private studentRepo: StudentRepository;
    private fundingRepo: FundingRequestRepository;
    private application: Partial<ApplicationDTO> = {};
    private student: Partial<StudentDTO> = {};
    private fundingRequest: Partial<FundingRequestDTO> = {};

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.applicationRepo = new ApplicationRepository(maindb);
        this.studentRepo = new StudentRepository(maindb);
        this.fundingRepo = new FundingRequestRepository(maindb);
    }

    async getRefreshAssessmentData(
        assessment: AssessmentDTO,
        disburseAmountList: number[],
        student_id: number,
        application_id: number
    ): Promise<any | undefined> {

        let refreshedData: AssessmentDTO = { ...assessment };

        this.application = await this.applicationRepo.getApplicationById(application_id);
        this.student = await this.studentRepo.getStudentById(student_id);
        this.fundingRequest = await this.fundingRepo.getFundingRequestById(assessment.funding_request_id);
 
        let disbursed_amt = null;
        console.log("🚀 ~ file: assessment-yea-repository.ts:43 ~ AssessmentYEA ~ disburseAmountList:", disburseAmountList)
        if (disburseAmountList.length) {
            disbursed_amt = disburseAmountList.reduce((partialSum, a) => partialSum + a, 0);
            console.log("🚀 ~ file: assessment-yea-repository.ts:43 ~ AssessmentYEA ~ disbursed_amt:", disbursed_amt)
        }

        const yea_earned = await this.getScalarValue<number>("fn_get_yea_total", [this.student.yukon_id!]);
        const yea_used = await this.getScalarValue<number>("fn_get_system_yea_used", [student_id]);

        const yea_balance = yea_earned - yea_used;
        console.log("🚀 ~ file: assessment-yea-repository.ts:49 ~ AssessmentYEA ~ yea_balance:", yea_balance)
        const unused_receipts = min([min([this.application.yea_tot_receipt_amount, yea_balance]), this.fundingRequest.yea_request_amount])
        console.log("🚀 ~ file: assessment-yea-repository.ts:51 ~ AssessmentYEA ~ unused_receipts:", unused_receipts)
        const assessed_amount = (unused_receipts || 0) + (disbursed_amt || 0);
        console.log("🚀 ~ file: assessment-yea-repository.ts:53 ~ AssessmentYEA ~ assessed_amount:", assessed_amount)
        const yea_net_amount = assessed_amount - (disbursed_amt || 0);

        refreshedData.previous_disbursement = disbursed_amt || 0;
        refreshedData.classes_end_date = assessment.classes_end_date;
        refreshedData.classes_start_date = assessment.classes_start_date;

        return {
            ...refreshedData,
            calculatedData: {
                yea_net_amount,
                yea_earned,
                unused_receipts,
                yea_used,
                assessed_amount,
                yea_balance,
                previous_disbursement: refreshedData.previous_disbursement
            }
        };
    }
    /* If an assessment does not exists, save the assessment and then save the disburse list */
    async saveAssessmentYG(
        dataAssessment: any,
        disbursementList: DisbursementDTO[],
    ): Promise<any> {



        const assessmentToInsert: any = { ...dataAssessment };

        //removing fields that are not in sfa.assessment
        delete assessmentToInsert.read_only_data;
        delete assessmentToInsert.id;
        delete assessmentToInsert.assessment_id;
        delete assessmentToInsert.program_division;

        const insertedAssessment: any = await this.mainDb("sfa.assessment")
            .insert({ ...assessmentToInsert })
            .returning("*");

        if (insertedAssessment?.id && disbursementList.length) {
            // Insert the disbursement list
            for (const item of disbursementList) {
                const resInsert = await this.mainDb("sfa.disbursement")
                    .insert({
                        assessment_id: insertedAssessment.id,
                        funding_request_id: insertedAssessment.funding_request_id,
                        disbursement_type_id: item.disbursement_type_id,
                        disbursed_amount: item.disbursed_amount,
                        due_date: item.due_date,
                        tax_year: item.tax_year,
                        issue_date: item.issue_date,
                        transaction_number: item.transaction_number,
                        change_reason_id: item.change_reason_id,
                        financial_batch_id: item.financial_batch_id,
                    })
                    .returning("*");
            }
        }

        return insertedAssessment || null;
    }

    async updateAssessmentYG(
        dataAssessment: any,
        disbursementList: DisbursementDTO[],
        assessment_id: number,
        funding_request_id: number,
    ): Promise<any> {

        const assessmentToUpdate: any = { ...dataAssessment };

        //removing fields that are not in sfa.assessment
        delete assessmentToUpdate.read_only_data;
        delete assessmentToUpdate.assessment_id;
        delete assessmentToUpdate.id;
        delete assessmentToUpdate.funding_request_id;
        delete assessmentToUpdate.program_division;

        const updatedAssessment: any = await this.mainDb("sfa.assessment")
            .where({ id: assessment_id })
            .update({ ...assessmentToUpdate })
        if (disbursementList.length) {
            // Insert the disbursement list
            for (const item of disbursementList) {

                if (item?.id && (item?.assessment_id === assessment_id)
                    && (item?.funding_request_id === funding_request_id)) {
                    const resUpdate = await this.mainDb("sfa.disbursement")
                        .update({
                            disbursement_type_id: item.disbursement_type_id,
                            disbursed_amount: item.disbursed_amount,
                            due_date: item.due_date,
                            tax_year: item.tax_year,
                            issue_date: item.issue_date,
                            transaction_number: item.transaction_number,
                            change_reason_id: item.change_reason_id,
                            financial_batch_id: item.financial_batch_id,
                        })
                        .where({ id: item.id });
                } else {
                    const resInsert: any = await this.mainDb("sfa.disbursement")
                        .insert({
                            assessment_id: assessment_id,
                            funding_request_id: funding_request_id,
                            disbursement_type_id: item.disbursement_type_id,
                            disbursed_amount: item.disbursed_amount,
                            due_date: item.due_date,
                            tax_year: item.tax_year,
                            issue_date: item.issue_date,
                            transaction_number: item.transaction_number,
                            change_reason_id: item.change_reason_id,
                            financial_batch_id: item.financial_batch_id,
                        })
                        .returning("*");
                }
            }
        }

        return updatedAssessment || null;
    }

}