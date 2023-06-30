export interface DisbursementDTO {
    id?: number,
    disbursement_type_id?: number,
    assessment_id?: number,
    funding_request_id?: number,
    disbursed_amount?: number,
    due_date?: Date,
    tax_year?: number,
    issue_date?: number,
    paid_amount?: number,
    change_reason_id?: number,
    financial_batch_id?: number,
    financial_batch_id_year?: number,
    financial_batch_run_date?: Date,
    financial_batch_serial_no?: number,
    transaction_number?: string,
    csl_cert_seq_number?: number,
    ecert_sent_date?: Date,
    ecert_response_date?: Date,
    ecert_status?: string,
    ecert_portal_status_id?: number,
}