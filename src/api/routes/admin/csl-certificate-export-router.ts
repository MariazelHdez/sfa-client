import express, { Request, Response } from "express";
import knex from "knex";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);

export const cslCertificateExportRouter = express.Router();


cslCertificateExportRouter.get("/:FROM_DATE_P/:TO_DATE_P/:CSL_CERT_SEQ_P/:IS_PREVIEW", 
    [   
        param("CSL_CERT_SEQ_P").isInt().notEmpty(),      
        param("FROM_DATE_P").notEmpty(), 
        param("TO_DATE_P").notEmpty(),
        param("IS_PREVIEW").notEmpty()
    ], 
    //ReturnValidationErrors, 
    async (req: Request, res: Response) => {
        const { filter = true } = req.query;
        const { CSL_CERT_SEQ_P, FROM_DATE_P, TO_DATE_P, IS_PREVIEW} = req.params;
        
        try {                     
            const results = await db.select('s.id', db.raw('CONCAT(p.last_name, \', \', p.first_name) AS name'), 
            db.raw('ISNULL(ROUND(d.disbursed_amount, 0), 0) AS csl_amount'), 
            'd.transaction_number', 
            'd.issue_date', 
            'd.due_date', 
            'r.description')
            .from('sfa.student AS s')
            .join('sfa.person AS p', 's.person_id', '=', 'p.id')
            .join('sfa.application AS hd', 's.id', '=', 'hd.student_id')
            .join('sfa.funding_request AS fr', 'hd.id', '=', 'fr.application_id')
            .join('sfa.disbursement AS d', 'fr.id', '=', 'd.funding_request_id')
            .join('sfa.request_type AS r', 'fr.request_type_id', '=', 'r.id')
            .join('sfa.msfaa AS m', 's.id', '=', 'm.student_id')            
            .where(IS_PREVIEW === '1' ? 'd.csl_cert_seq_number_prev' : 'd.csl_cert_seq_number', '=', CSL_CERT_SEQ_P)                        
            .andWhere('d.issue_date', '>=', FROM_DATE_P)
            .andWhere('d.issue_date', '<=', TO_DATE_P)  
            .andWhere('m.msfaa_status', '=', 'Received')    
            .andWhere(db.raw("((m.is_full_time = CASE d.disbursement_type_id WHEN 4 THEN 1 ELSE 0 END) OR hd.academic_year_id <= 2012) "))                        
            
            if(results) {
                const results2 = await db.raw(
                    'SELECT sfa.fn_cert_data(?, ?, ?)',
                    [CSL_CERT_SEQ_P, FROM_DATE_P, TO_DATE_P]                                        
                  );     
                                    
                  if (results2) {
                    return res.status(200).json({ success: true, data1: results, data2:results2, batch: CSL_CERT_SEQ_P});
                } else {
                    return res.status(404).send();
                }                
            }
                          
        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }        
});


cslCertificateExportRouter.put("/:FROM_DATE_P/:TO_DATE_P/:PREVIEW", 
    [        
        param("FROM_DATE_P").notEmpty(), 
        param("TO_DATE_P").notEmpty(),
        param("PREVIEW")
    ], 
    //ReturnValidationErrors, 
    async (req: Request, res: Response) => {
        const { filter = true } = req.query;
        const { FROM_DATE_P, TO_DATE_P, PREVIEW} = req.params;
                
        try {           
                        
                const results = await db 
                .select(db.raw(`sfa.fn_get_count_disbursement_ecerts('${FROM_DATE_P}', '${TO_DATE_P}') AS result`))                                                      
                if(results[0].result > 0) {
                    const nextVal = await db
                    .select(db.raw(`NEXT VALUE FOR ${PREVIEW === '1' ?  'sfa.csl_cert_seq_prev' : 'sfa.csl_cert_seq'} AS nextVal;`));
                    
                    const innerSelect = await db('sfa.funding_request as fr')
                    .select('d.id')
                    .innerJoin('sfa.disbursement as d', 'fr.id', '=', 'd.funding_request_id')
                    .innerJoin('sfa.request_type as rt', 'fr.request_type_id', '=', 'rt.id')
                    .innerJoin(
                      db.raw(
                        '(SELECT m.msfaa_status, app.academic_year_id, app.id FROM sfa.msfaa as m INNER JOIN sfa.application as app ON app.id = m.application_id WHERE app.id = m.application_id) mhd'
                      ),
                      'fr.application_id',
                      '=',
                      'mhd.id'
                    )
                    .where(function () {
                      this.where('mhd.msfaa_status', 'Received').orWhere('mhd.academic_year_id', '<=', 2012);
                    })
                    .andWhere('issue_date', '>=', FROM_DATE_P)
                    .andWhere('issue_date', '<=', TO_DATE_P)
                    .whereNotNull('d.due_date')
                    .whereNotNull('d.transaction_number')
                    .whereNull('d.csl_cert_seq_number')
                    .whereIn('disbursement_type_id', [3, 4, 5, 7, 9])
                    .whereIn('fr.request_type_id', [4, 5, 6, 15, 16, 17, 18, 19, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 35, 47])
                    .whereIn('d.transaction_number', function () {
                      this.select('d1.transaction_number')
                        .from('sfa.disbursement as d1')
                        .join('sfa.funding_request as fr1', 'd1.funding_request_id', '=', 'fr1.id')
                        .whereIn('fr1.request_type_id', [4, 5]);
                    });          
                                                                                                    
                    if(innerSelect.length > 0) {                                                                       
                        if(PREVIEW === '1') {
                            for(let element of innerSelect) {                                
                                const updateDisb = await db.raw(`UPDATE sfa.disbursement SET csl_cert_seq_number_prev = ${nextVal[0].nextVal} WHERE id = ${element.id}`)                                                                                                     
                            }
                            return res.json({flag: 1, data: nextVal[0].nextVal});    
                        } else {
                            for(let element of innerSelect) {
                                const updateDisb = await db.raw(`UPDATE sfa.disbursement SET csl_cert_seq_number = ${nextVal[0].nextVal} WHERE id = ${element.id}`)                                                                                                                                                    
                            }
                            return res.json({flag: 1, data: nextVal[0].nextVal});  
                        }                                                                 			
                    }  else {
                        return res.json({flag: 0, data: `There are no certificates with received MSFAA between ${FROM_DATE_P} and ${TO_DATE_P}`}); 
                    }                                                              
                } else {
                    return res.json({flag: 0, data: `There are no certificates with received MSFAA between ${FROM_DATE_P} and ${TO_DATE_P}`});                                                			                                            
                }                            
        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }        
});