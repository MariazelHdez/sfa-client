USE SFADB_DEV;
GO

-- STA Upgrading Weeks - Pre-Legislation Chg
--before get_prev_pre_leg_weeks
CREATE OR ALTER FUNCTION sfa.fn_get_pre_leg_sta_up_weeks 
(
    @student_id INT
)
RETURNS NUMERIC
AS 
BEGIN
	
	DECLARE  @v_num_weeks NUMERIC = 0;
	
    SELECT 
    @v_num_weeks = SUM(a2.weeks_allowed)
    FROM 
    sfa.application a, 
    sfa.funding_request fr,
    (
        SELECT 
        funding_request_id,
        assessment_id,
        sum(disbursed_amount) disbursed_amount
        FROM sfa.disbursement
        GROUP BY funding_request_id, assessment_id
    ) d, 
    sfa.assessment a2
    WHERE a.id = fr.application_id
    AND fr.id = d.funding_request_id
    AND d.assessment_id = a2.id
    AND a.student_id = @student_id
    AND a.academic_year_id <= 2015
    AND a.program_id = 12 -- 'Upgrading-Academic'
    AND d.disbursed_amount > 0 -- positive disbursement
    AND fr.request_type_id = 1 -- request type STA
    GROUP BY a.student_id;

    RETURN CEILING(@v_num_weeks); 
END

GO

-- STA YG Outside Travel Count - Pre-Legislation Chg
CREATE OR ALTER FUNCTION sfa.fn_get_pre_leg_outside_travel 
(
    @student_id INT
)
RETURNS NUMERIC
AS 
BEGIN
	
	DECLARE  @v_count NUMERIC = 0;
	
    SELECT 
    @v_count = SUM(a2.airfare_amount)
    FROM 
    sfa.application a, 
    sfa.funding_request fr,
    (
        SELECT 
        funding_request_id,
        assessment_id,
        sum(disbursed_amount) disbursed_amount
        FROM sfa.disbursement
        GROUP BY funding_request_id, assessment_id
    ) d, 
    sfa.assessment a2
    WHERE a.id = fr.application_id
    AND fr.id = d.funding_request_id
    AND d.assessment_id = a2.id
    AND a.student_id = @student_id
    AND a.academic_year_id <= 2015
    AND d.disbursed_amount > 0 -- positive disbursement
    AND a2.airfare_amount > 0 -- has an airfair amount
    AND fr.request_type_id = 2 -- request type YG
    GROUP BY a.student_id;

    RETURN @v_count; 
END

GO
-- This function is used to get the previous pre-legislation YG/STA weeks prior to current HD non upgrading                
CREATE OR ALTER FUNCTION sfa.fn_get_prev_pre_leg_weeks(@student_id_p INT, @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN
    DECLARE  @v_num_weeks NUMERIC = 0;

        SELECT @v_num_weeks = CEILING(SUM(CASE WHEN fr.request_type_id = 1  THEN a.weeks_allowed ELSE  a.years_funded_equivalent*34 END))
        FROM sfa.application app
        INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
            , (SELECT funding_request_id
                    , assessment_id
                    , sum(disbursed_amount) disbursed_amount
                FROM sfa.disbursement
            GROUP BY funding_request_id, assessment_id) d
        INNER JOIN sfa.assessment a ON d.assessment_id = a.id
        WHERE  fr.id = d.funding_request_id 
        AND app.id < @application_id_p 
        AND app.program_id <> (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')
        AND app.student_id = @student_id_p
        AND app.academic_year_id <=2015
        AND d.disbursed_amount > 0 -- positive disbursement
        AND fr.request_type_id in (1,2) -- request type STA
        group by app.student_id;

        RETURN CEILING(@v_num_weeks);              

END

GO

/* This function is used to get the current system total years funded
    for the particular student not counting the given history detail
    before get_funded_years_count
*/
CREATE OR ALTER FUNCTION sfa.fn_get_funded_years_used_preleg_chg( @student_id_p INT,  @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN
    DECLARE @v_funded_years_count NUMERIC = 0;
    DECLARE c_years_funded CURSOR FOR
        SELECT  COALESCE(sum(a.years_funded_equivalent), 0) AS years_funded
        FROM sfa.application app
        INNER JOIN  sfa.funding_request fr ON app.id = fr.application_id
        INNER JOIN  sfa.assessment a ON  fr.id  = a.funding_request_id
        WHERE app.student_id = @student_id_p 
        AND app.id <>  @application_id_p 
        AND a.years_funded_equivalent IS NOT NULL;

    OPEN  c_years_funded;
    FETCH NEXT FROM c_years_funded INTO @v_funded_years_count  
    CLOSE  c_years_funded;

        RETURN @v_funded_years_count;
END

GO

-- This function is used to get the post-legislation YG/STA weeks prior to current HD non upgrading 
CREATE OR ALTER FUNCTION sfa.fn_get_prev_post_leg_weeks(@student_id_p INT, @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN
    DECLARE  @v_num_weeks NUMERIC = 0;

    SELECT @v_num_weeks =  COALESCE(sum(a.weeks_allowed),0)
    FROM sfa.application app
    INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
    INNER JOIN (SELECT funding_request_id
                    , assessment_id
                    , sum(disbursed_amount) disbursed_amount
                    FROM sfa.disbursement
            GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
    INNER JOIN sfa.assessment a ON  d.assessment_id = a.id
    WHERE  app.program_id <> (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')
    AND app.student_id = @student_id_p
    AND app.id <  @application_id_p
    AND app.academic_year_id  > 2015
    AND d.disbursed_amount > 0 -- positive disbursement
    group by app.student_id;

    RETURN @v_num_weeks;        
END
GO

/* This function is used to get the pre-legislation Student Training Allowance 
   upgrading weeks weeks prior to current HD */
CREATE OR ALTER FUNCTION sfa.fn_get_prev_pre_leg_sta_up_weeks(@student_id_p INT,  @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN               
       DECLARE @v_num_weeks NUMERIC = 0;

            SELECT @v_num_weeks =  COALESCE(sum(a.weeks_allowed), 0 )
            FROM sfa.application app
            INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
            INNER JOIN (SELECT funding_request_id
                            , assessment_id
                            , sum(disbursed_amount) disbursed_amount
                        FROM sfa.disbursement
                    GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
            INNER JOIN sfa.assessment a ON  d.assessment_id = a.id
            WHERE  app.student_id = @student_id_p
            AND app.id < @application_id_p
            AND app.academic_year_id <=2015
            AND app.program_id = (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')  -- upgrading program
            AND d.disbursed_amount > 0 -- positive disbursement
            AND fr.request_type_id = 1 -- request type STA
            group by app.student_id;

            RETURN CEILING(@v_num_weeks);              

END
GO

/* This function is used to get the post-legislation Student Training Allowance upgrading weeks */
CREATE OR ALTER FUNCTION sfa.fn_get_prev_post_leg_sta_up_weeks(@student_id_p INT,  @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN                   
    DECLARE @v_num_weeks NUMERIC = 0;

                SELECT @v_num_weeks =  COALESCE(sum(a.weeks_allowed), 0 )
                FROM sfa.application app
                INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
                INNER JOIN (SELECT funding_request_id
                              , assessment_id
                              , sum(disbursed_amount) disbursed_amount
                         FROM sfa.disbursement
                      GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
                INNER JOIN sfa.assessment a ON d.assessment_id = a.id
                WHERE app.student_id = @student_id_p
                AND app.id < @application_id_p
                AND app.academic_year_id > 2015
                AND app.program_id = (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')  -- upgrading program
                AND d.disbursed_amount > 0 -- positive disbursement
                AND fr.request_type_id = 1 -- request type STA
                group by app.student_id;

                RETURN @v_num_weeks;

END
GO 

/* This function is used to get the post-legislation Student Training Allowance  
   upgrading weeks prior to current HD */
CREATE OR ALTER FUNCTION sfa.fn_get_post_leg_sta_up_weeks(@student_id_p INT)
RETURNS NUMERIC
AS 
BEGIN                   
    DECLARE @v_num_weeks NUMERIC = 0;

        SELECT @v_num_weeks = COALESCE(sum(a.weeks_allowed),0)
        FROM sfa.application app
        INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
        INNER JOIN (SELECT funding_request_id
                        , assessment_id
                        , sum(disbursed_amount) disbursed_amount
                    FROM sfa.disbursement
                GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
        INNER JOIN sfa.assessment a ON d.assessment_id = a.id
        WHERE app.student_id = @student_id_p
        AND app.academic_year_id > 2015
        AND app.program_id = (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')  -- upgrading program
        AND d.disbursed_amount > 0 -- positive disbursement
        AND fr.request_type_id = 1 -- request type STA
        group by app.student_id;

        RETURN @v_num_weeks;

END
GO

/* This function is used to get the post-legislation Yukon Grant outside travel count */      
CREATE OR ALTER FUNCTION sfa.fn_get_post_leg_outside_travel(@student_id_p INT)
RETURNS NUMERIC
AS 
BEGIN                   
    DECLARE @v_count NUMERIC = 0;
        SELECT @v_count = count(a.airfare_amount)
        FROM sfa.application app
        INNER JOIN sfa.funding_request fr ON  app.id = fr.application_id
        INNER JOIN (SELECT funding_request_id
                        , assessment_id
                        , sum(disbursed_amount) disbursed_amount
                    FROM sfa.disbursement
                GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
        INNER JOIN sfa.assessment a ON d.assessment_id = a.id
            WHERE app.student_id = @student_id_p
            AND app.academic_year_id > 2015
            AND d.disbursed_amount > 0 -- positive disbursement
            AND a.airfare_amount > 0 -- has an airfair amount
            AND fr.request_type_id = 2 -- request type YG
        GROUP BY app.student_id;

        RETURN @v_count;

END
GO

--AASSESSMENT SFA
CREATE OR ALTER FUNCTION sfa.fn_get_previous_weeks_sfa(@program_p NVARCHAR(255), @student_id_p INT,  @application_id_p INT) 
RETURNS NUMERIC
AS 
BEGIN
    DECLARE @v_pre_leg_weeks NUMERIC = 0;
    DECLARE @v_post_leg_weeks NUMERIC = 0;
    DECLARE @v_total_weeks NUMERIC = 0;
    DECLARE @v_adjusted_weeks NUMERIC = 0;

		IF @student_id_p IS NOT NULL AND @application_id_p IS NOT NULL
			BEGIN
                IF @program_p = 'Upgrade'
                    BEGIN
                        SELECT @v_post_leg_weeks =  COALESCE(sfa.fn_get_prev_post_leg_sta_up_weeks(@student_id_p,  @application_id_p),0);
        
                        SELECT @v_pre_leg_weeks =  COALESCE( sfa.fn_get_prev_pre_leg_sta_up_weeks(@student_id_p,  @application_id_p),0);
                        
                        SELECT  @v_adjusted_weeks = COALESCE(adj_sta_upgrading_weeks,0) 
                        FROM sfa.student  
                        WHERE id =  @student_id_p;
                    END
                ELSE
                    BEGIN
                        SELECT @v_post_leg_weeks = COALESCE(sfa.fn_get_prev_post_leg_weeks(@student_id_p,  @application_id_p),0);
                        SELECT @v_pre_leg_weeks = COALESCE( sfa.fn_get_prev_pre_leg_weeks(@student_id_p,  @application_id_p),0);
                        
                        SELECT @v_adjusted_weeks = COALESCE(adj_yg_funding_weeks,0) 
                        FROM sfa.student  
                        WHERE id = @student_id_p;
                    END
			    
	   	    END
		

		set @v_total_weeks = @v_pre_leg_weeks + @v_post_leg_weeks + @v_adjusted_weeks;

		RETURN @v_total_weeks;

END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_yea_total(@ytid_p NVARCHAR(25))
RETURNS NUMERIC
BEGIN
    DECLARE @v_yea_total FLOAT = 0;
    DECLARE c_yea_total CURSOR FOR 
        SELECT sum(yea_amount) 
        FROM sfa.yea
        WHERE yukon_id = @ytid_p OR yukon_id_old = @ytid_p
        AND yea_amount IS NOT NULL;
		
		OPEN c_yea_total  
		FETCH NEXT FROM c_yea_total INTO @v_yea_total  
		CLOSE c_yea_total  
    	DEALLOCATE c_yea_total   
		RETURN COALESCE(@v_yea_total, 0);
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_system_yea_used(@student_id_p INT)
RETURNS NUMERIC
BEGIN
    DECLARE @v_total_yea NUMERIC = 0;
    DECLARE @v_yea_code NUMERIC = 3;
        SELECT @v_total_yea = SUM(disbursed_amount)
        FROM sfa.disbursement
        WHERE disbursement.funding_request_id IN
            (SELECT id FROM sfa.funding_request
                                WHERE funding_request.application_id IN
                                        (SELECT application_id FROM sfa.application as app
                                                WHERE app.student_id = @student_id_p)
                        AND funding_request.request_type_id = @v_yea_code);
        RETURN COALESCE(@v_total_yea,0);
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_allowed_weeks (@start_date_p DATE, @end_date_p DATE )
RETURNS NUMERIC AS
BEGIN
	DECLARE @v_day_of_week_start NUMERIC;
	DECLARE @v_day_of_week_end NUMERIC;
	DECLARE @v_ceil_weeks NUMERIC;
	DECLARE @v_weeks NUMERIC;
	DECLARE @v_floor_weeks NUMERIC;
	DECLARE @v_return_weeks NUMERIC;

    SET @v_return_weeks = 0;
    SET @v_day_of_week_start = DATEPART(dw, CAST(@start_date_p AS DATE));
    SET @v_day_of_week_end = DATEPART(dw, CAST(@end_date_p AS DATE));
    
    SET @v_weeks =  (DATEDIFF(day, @start_date_p, @end_date_p))/7;
    SET @v_ceil_weeks =  CEILING((DATEDIFF(day, @start_date_p, @end_date_p))/7);
    SET @v_floor_weeks =  FLOOR((DATEDIFF(day, @start_date_p, @end_date_p))/7);

    IF @v_day_of_week_start > 1 and @v_day_of_week_start < 7
        BEGIN
            IF @v_day_of_week_end > 1 and @v_day_of_week_end < 7
                BEGIN
                    IF @v_weeks = @v_ceil_weeks
                        BEGIN
                            SET @v_return_weeks = @v_weeks + 1;
                        END
                    ELSE IF @v_day_of_week_start > @v_day_of_week_end
                        BEGIN
                            SET @v_return_weeks = @v_ceil_weeks + 1;
                        END
                    ELSE
                        BEGIN
                            SET @v_return_weeks = @v_ceil_weeks;
                        END
                END
            ELSE
                BEGIN
                    SET @v_return_weeks = @v_ceil_weeks;
                END
        END
    ELSE IF @v_day_of_week_start < 2 or @v_day_of_week_start > 6
        BEGIN
            IF @v_day_of_week_end < 2 or @v_day_of_week_end > 6
                BEGIN  -- rule 2
                    SET @v_return_weeks = @v_floor_weeks;
                END
            ELSE
                BEGIN  -- rule 4
                    SET @v_return_weeks = @v_ceil_weeks;
                END

        END
    ELSE
        BEGIN  -- rule 4
            SET @v_return_weeks = @v_ceil_weeks;
        END
    
    RETURN @v_return_weeks;

END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_post_leg_weeks (@student_id_p INT)
RETURNS NUMERIC AS
BEGIN
	DECLARE @v_num_weeks NUMERIC;

    SELECT 
    @v_num_weeks =
    SUM(
		    CASE WHEN fr.request_type_id = 1 THEN 
			    (
			    	CASE WHEN sfa.fn_get_allowed_weeks(a.effective_rate_date, a.classes_end_date) > 40 THEN
			    		40
			    	ELSE
			    		sfa.fn_get_allowed_weeks(a.effective_rate_date, a.classes_end_date)
			    	END
			    ) 
		    ELSE 
		    	a.weeks_allowed 
		    END
    	)
    FROM 
    sfa.application app, 
    sfa.funding_request fr,
    (
        SELECT 
        funding_request_id, 
        assessment_id,
        sum(disbursed_amount) disbursed_amount
        FROM sfa.disbursement
        GROUP BY funding_request_id, assessment_id
    ) d
    , sfa.assessment a
    WHERE app.id = fr.application_id
    AND fr.id = d.funding_request_id
    AND d.assessment_id = a.id
    AND app.student_id = @student_id_p
    AND app.program_id <> (
	    	SELECT p.id 
	    	FROM sfa.program p 
	    	WHERE p.description = 'Upgrading-Academic'
    	)
    AND app.academic_year_id > 2015
    AND d.disbursed_amount > 0 -- positive disbursement
    group by app.student_id;

    RETURN COALESCE(@v_num_weeks, 0);
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_pre_leg_weeks (@student_id_p INT)
RETURNS NUMERIC AS
BEGIN
	DECLARE @v_num_weeks NUMERIC;

    SELECT 
    @v_num_weeks = CEILING (
        SUM(
		    CASE WHEN fr.request_type_id = 1 THEN 
			    a.weeks_allowed 
		    ELSE 
		    	a.years_funded_equivalent*34
		    END
    	)
    )
    FROM 
    sfa.application app, 
    sfa.funding_request fr,
    (
        SELECT 
        funding_request_id,
        assessment_id, 
        sum(disbursed_amount) disbursed_amount
        FROM sfa.disbursement
        GROUP BY funding_request_id, assessment_id
    ) d, 
    sfa.assessment a
    --,  UPG
    WHERE app.id = fr.application_id
    AND fr.id = d.funding_request_id
    AND d.assessment_id = a.id
    AND app.program_id <> (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')
    AND app.student_id = @student_id_p
    AND app.academic_year_id <= 2015
    AND d.disbursed_amount > 0 -- positive disbursement
    AND fr.request_type_id in (1,2) -- request type STA
    group by app.student_id;

    RETURN COALESCE(@v_num_weeks, 0);
END
GO

-- STARTS FUNCTIONS TO ASSESSMENT_YG --


-- FILE : ASSESSMENT_YG  --- FUNCTION: GET_DISBURSED_AMOUNT

CREATE OR ALTER FUNCTION sfa.fn_get_disbursed_amount_fct(@funding_request_id_p INT, @assessment_id_p INT)
RETURNS NUMERIC
AS 
BEGIN
    /*
	 * This function calculates the disbursed amount for any funding requests with the same number
	 * as the request_id passed in and any assessments less than or equal to the assess_id passed in
     */
	DECLARE  @disbursed_amt NUMERIC;

    SELECT @disbursed_amt = SUM(COALESCE(disbursed_amount, 0))
    FROM sfa.disbursement
    WHERE funding_request_id = @funding_request_id_p
    AND assessment_id <= @assessment_id_p;

    RETURN @disbursed_amt;

END
GO

 -- FILE : ASSESSMENT_YG  --- FUNCTION: GET_MONTHS
CREATE OR ALTER FUNCTION sfa.fn_get_months(@application_id_p INT )
  /*
	This function calculates the months allowed based on the difference
	between the effective rate date and classes end date.  
*/
RETURNS NUMERIC AS
BEGIN
    DECLARE @mn_allowed NUMERIC;
    SELECT  @mn_allowed = DATEDIFF(month, classes_start_date, classes_end_date) 
    FROM sfa.application a 
    WHERE id = @application_id_p;

    RETURN @mn_allowed;
END
GO
 -- FILE : ASSESSMENT_YG  --- FUNCTION: GET_PERIOD_WEEKS
CREATE OR ALTER FUNCTION sfa.fn_get_period_weeks(@application_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @v_weeks NUMERIC;
    DECLARE @academic_year_id INT;
    DECLARE @program_division INT;

    SELECT @academic_year_id = academic_year_id , @program_division = program_division
    FROM sfa.application 
    WHERE id = @application_id_p;

  	IF  @program_division = 1   -- Quarters
        BEGIN
				SELECT @v_weeks = yg_quarter_weeks FROM sfa.system_parameter;
        END
	ELSE IF  @program_division = 2   -- Semesters	
        BEGIN
				SELECT  @v_weeks =  yg_semester_weeks FROM sfa.system_parameter;
		END
		RETURN COALESCE(@v_weeks,0);
END
GO

 -- FILE : ASSESSMENT_YG  --- FUNCTION: GET_NET

CREATE OR ALTER FUNCTION sfa.fn_net_amount(@funding_request_id_p INT, @assessment_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @net_amt NUMERIC;
    DECLARE @assessed_amount NUMERIC;
    DECLARE @previous_disbursement NUMERIC;
    DECLARE @over_award NUMERIC;

    /*
        This function calculates the net amount to be disbursed by subtracting the assessed amount
        from the previous disbursements
        Added subtraction of overaward YG
    */

	SELECT  @previous_disbursement = COALESCE(sfa.fn_get_disbursed_amount_fct(@funding_request_id_p, @assessment_id_p),0),  
           @assessed_amount = COALESCE(assessed_amount,0),
            @over_award = COALESCE(over_award,0)
    FROM sfa.assessment
    WHERE id = @assessment_id_p;
    
    SET @net_amt = @assessed_amount - @previous_disbursement - @over_award ;

  IF @net_amt BETWEEN -1 AND 1 
  	BEGIN
  	    SET @net_amt = 0;
    END;
  
  RETURN @net_amt;
END
GO

 -- FILE : ASSESSMENT_YG  --- FUNCTION: GET_DISBURSEMENTS_REQUIRED
CREATE OR ALTER FUNCTION sfa.fn_disbursments_required(@application_id_p INT, @assessment_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @d_required NUMERIC;
    DECLARE @pd_months NUMERIC;
    DECLARE @v_weeks NUMERIC;
    DECLARE @v_num_batched NUMERIC;
    DECLARE @academic_year_id INT;
    DECLARE @program_division INT;
    DECLARE @net_amount NUMERIC;
    DECLARE @funding_request_id INT;
    DECLARE @weeks_allowed NUMERIC;

    SELECT @academic_year_id = academic_year_id , 
           @program_division = program_division
    FROM sfa.application 
    WHERE id = @application_id_p;

    SELECT @funding_request_id = funding_request_id , 
            @weeks_allowed = weeks_allowed
    FROM sfa.assessment a 
    WHERE id = @assessment_id_p; 

        IF @academic_year_id   < 2016   -- Pre Legislation
            BEGIN
                IF @program_division = 1  -- Quarters
                    BEGIN
                        SET @pd_months = 3;
                    END
                ELSE IF @program_division = 2  -- Semesters
                    BEGIN
                        SET @pd_months = 4;
                    
                    END 
                IF @pd_months = 3 or @pd_months = 4
                    BEGIN
                        SELECT  @d_required =  sfa.fn_get_months(@application_id_p ) / @pd_months;
                    END
                ELSE
                    BEGIN
                        SET @d_required = 0;
                    END
            END
        ELSE  -- Post Legislation
            BEGIN
                SELECT @v_weeks = sfa.fn_get_period_weeks(@application_id_p);
                IF  @v_weeks = 0 
                    BEGIN
                        SET @d_required = 0;
                    END
                ELSE
                    BEGIN
                        SET @d_required = round(@weeks_allowed / @v_weeks, 0);  --PENDIENTE
            
                        /* If d_required is the same as already batched disbursements, need to add 1 to the disbursements required regardless of weeks
                        */
                        SELECT @v_num_batched = count(id) 
                        FROM sfa.disbursement 
                        WHERE assessment_id =  @assessment_id_p
                            AND financial_batch_id IS NOT NULL;
                        SELECT  @net_amount = sfa.fn_net_amount(@funding_request_id, @assessment_id_p);
                        IF COALESCE(@v_num_batched,0) >= @d_required AND @net_amount != 0 
                            BEGIN
                            SET @d_required = @v_num_batched +1;
                            END 
                    
                    END
            END
        RETURN @d_required;
	
END
GO
-- ASSESSMENT_PCK - get_assessment_count_fct
CREATE OR ALTER FUNCTION sfa.fn_get_assessment_count(@funding_request_id NUMERIC)
RETURNS NUMERIC AS
BEGIN
    DECLARE @assess_count NUMERIC;

    SELECT @assess_count = COUNT(id)
    FROM sfa.assessment
    WHERE funding_request_id = @funding_request_id;

    RETURN @assess_count;

END
GO


CREATE OR ALTER FUNCTION sfa.fn_get_previous_weeks_yg(@student_id_p INT,  @application_id_p INT) 
RETURNS NUMERIC
AS 
BEGIN
    DECLARE @v_pre_leg_weeks NUMERIC = 0;
    DECLARE @v_post_leg_weeks NUMERIC = 0;
    DECLARE @v_total_weeks NUMERIC = 0;
    DECLARE @v_adjusted_weeks NUMERIC = 0;

	IF @student_id_p IS NOT NULL AND @application_id_p IS NOT NULL
		BEGIN
            SELECT @v_post_leg_weeks =  COALESCE(sfa.fn_get_prev_post_leg_weeks(@student_id_p,  @application_id_p),0);
    
            SELECT @v_pre_leg_weeks = COALESCE(sfa.fn_get_pre_leg_weeks(@student_id_p), 0);
                    
            SELECT  @v_adjusted_weeks = COALESCE(s.adj_yg_funding_weeks, 0) 
            FROM sfa.student s
            WHERE id =  @student_id_p;   
	    END
	
	SET @v_total_weeks = @v_pre_leg_weeks + @v_post_leg_weeks + @v_adjusted_weeks;

	RETURN  COALESCE(@v_total_weeks, 0);

END
GO

-- previus_name -- transportation_pck.get_travel_allowance_fct

CREATE OR ALTER FUNCTION sfa.fn_get_travel_allowance(@home_city_id_p INT, @institution_city_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @res_v NUMERIC = 0;
    
    DECLARE transportation_cur CURSOR FOR
    SELECT COALESCE(t.travel_allowance_amount, 0) AS travel_allowance
    FROM sfa.transportation t
    WHERE t.home_city_id = @home_city_id_p
    AND t.institution_city_id = @institution_city_id_p;

    OPEN  transportation_cur;
    FETCH NEXT FROM transportation_cur INTO @res_v  
    CLOSE  transportation_cur;
    
    IF @res_v > 0
        BEGIN
        	RETURN @res_v;
        END
  	  
    RETURN 0;
END
GO
-- This function does not exist in old system
CREATE OR ALTER FUNCTION sfa.fn_get_airfare_amount(@home_city_id_p INT, @institution_city_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @res_v NUMERIC = 0;
    
    DECLARE transportation_cur CURSOR FOR
    SELECT COALESCE(t.airfare_amount, 0) AS airfare_amount
    FROM sfa.transportation t
    WHERE t.home_city_id = @home_city_id_p
    AND t.institution_city_id = @institution_city_id_p;

    OPEN  transportation_cur;
    FETCH NEXT FROM transportation_cur INTO @res_v  
    CLOSE  transportation_cur;
    
    IF @res_v > 0
        BEGIN
        	RETURN @res_v;
        END
  	  
    RETURN 0;
END
GO

-- STORE PROCEDURE - YG_COST_PCK_1 - get_yg_cost_prc NOW Function
CREATE OR ALTER FUNCTION sfa.fn_get_yg_cost (
    @program_division INT,
    @academic_year_id INT,
	@allowed_percent NUMERIC
)
RETURNS @values TABLE(
    living NUMERIC, 
    tuition NUMERIC, 
    book NUMERIC
) AS
BEGIN
    DECLARE @living NUMERIC;
    DECLARE @tuition NUMERIC; 
    DECLARE @book NUMERIC;
    DECLARE @v_living NUMERIC = 0;
    DECLARE @v_tuition NUMERIC = 0; 
    DECLARE @v_book NUMERIC = 0;

    DECLARE quarter_cur CURSOR FOR
    SELECT 
        COALESCE(quarter_tuition_amount, 0) AS tuition,
		COALESCE(quarter_living_amount, 0) AS living,
		COALESCE(quarter_book_amount, 0) AS book
    FROM sfa.yg_cost
    WHERE academic_year_id = @academic_year_id
    AND allowed_percent = @allowed_percent;

    DECLARE semester_cur CURSOR FOR
    SELECT 
        COALESCE(semester_tuition_amount, 0) AS tuition,
		COALESCE(semester_living_amount, 0) AS living,
		COALESCE(semester_book_amount, 0) AS book
    FROM sfa.yg_cost
    WHERE academic_year_id = @academic_year_id
    AND allowed_percent = @allowed_percent;
   
    IF @program_division = 1
        BEGIN
            OPEN quarter_cur;
            FETCH quarter_cur INTO @v_tuition, @v_living, @v_book;
            CLOSE quarter_cur;

            IF @v_tuition > 0
                BEGIN
                    SET @tuition = @v_tuition;
                END
            ELSE
                BEGIN
                    SET @tuition = 0;
                END
            
            IF @v_living > 0
                BEGIN
                    SET @living = @v_living;
                END
            ELSE
                BEGIN
                    SET @living = 0;
                END

            IF @v_book > 0
                BEGIN
                    SET @book = @v_book;
                END
            ELSE
                BEGIN
                    SET @book = 0;
                END
        END

    IF @program_division = 2
        BEGIN
            OPEN semester_cur;
            FETCH semester_cur INTO @v_tuition, @v_living, @v_book;
            CLOSE semester_cur;

            IF @v_tuition > 0
                BEGIN
                    SET @tuition = @v_tuition;
                END
            ELSE
                BEGIN
                    SET @tuition = 0;
                END
            
            IF @v_living > 0
                BEGIN
                    SET @living = @v_living;
                END
            ELSE
                BEGIN
                    SET @living = 0;
                END

            IF @v_book > 0
                BEGIN
                    SET @book = @v_book;
                END
            ELSE
                BEGIN
                    SET @book = 0;
                END
        END
        
	DEALLOCATE quarter_cur;
   	DEALLOCATE semester_cur;

    INSERT INTO @values (
        living, 
        tuition, 
        book
    ) VALUES (
        @living, 
        @tuition, 
        @book
    )
    RETURN;
END
GO

-- ASSESSMENT_PCK - PROCEDURE get_yg_assessment, now function
CREATE OR ALTER FUNCTION sfa.fn_get_yg_assessment(@funding_request_id INT)
RETURNS @assessment_record TABLE (
    funding_request_id INT,
    effective_rate_date  DATE, 
    classes_end_date  DATE,
    change_reason_comment TEXT,
    home_city_id INT, 
    destination_city_id INT, 
    dependent_count FLOAT,
    allowed_months FLOAT,
    weeks_allowed FLOAT, 
    allowed_tuition NUMERIC, 
    allowed_books FLOAT,
    living_costs NUMERIC, 
    travel_allowance NUMERIC, 
    airfare_amount NUMERIC,
    disbursements_required INT, 
    air_travel_disbursement_period INT,
    assessed_amount NUMERIC, 
    assessment_id INT
) AS
BEGIN

    
    INSERT INTO @assessment_record (
        funding_request_id,
        effective_rate_date , 
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        allowed_months,
        weeks_allowed, 
        allowed_tuition, 
        allowed_books,
        living_costs, 
        travel_allowance, 
        airfare_amount,
        disbursements_required, 
        air_travel_disbursement_period,
        assessed_amount,
        assessment_id
    )
    SELECT
        funding_request_id,
        effective_rate_date , 
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        allowed_months,
        weeks_allowed, 
        allowed_tuition, 
        allowed_books,
        living_costs, 
        travel_allowance, 
        airfare_amount,
        disbursements_required, 
        air_travel_disbursement_period,
        assessed_amount,
        id
    FROM sfa.assessment
    WHERE id = (
	    SELECT MAX(id) 
	    FROM sfa.assessment
	    WHERE funding_request_id = @funding_request_id
   	);

    RETURN;
END
GO

-- DISBURSEMENT_PCK - move_disbursement
CREATE OR ALTER PROCEDURE sfa.sp_move_disbursement
    @assessment_id INT, 
    @prev_assessment_id INT
AS
BEGIN
    UPDATE sfa.disbursement
    SET assessment_id = @assessment_id
    WHERE assessment_id = @prev_assessment_id;
END
GO

-- GET_TOTAL
CREATE OR ALTER FUNCTION sfa.fn_get_total(
    @disbursements_required INT, 
    @academic_year INT,
    @living_costs NUMERIC,
    @allowed_tuition NUMERIC,
    @allowed_books NUMERIC,
    @travel_allowance NUMERIC,
    @airfare_amount NUMERIC,
    @weekly_amount NUMERIC,
    @weeks_allowed INT,
    @assessment_adj_amount FLOAT
)
RETURNS NUMERIC AS
BEGIN
/*
	This function calculates the assessed amount based on the % Allowed, Living Costs, Tuition, Books,
	Travel and Airfare when start date before 2016-08-01
	Otherwise calculated based on amount per week + travel and airfare
*/
	DECLARE @v_assessed_total NUMERIC;
	
	IF @disbursements_required > 0
        BEGIN
            IF @academic_year < 2016 -- old calculation - Pre Legislation change 2016-05-17 SFA-611 Lidwien - also removed allowed_percent condition as the 2 formulas were not different between the two
                BEGIN
                    SET @v_assessed_total = ((@living_costs + @allowed_tuition + @allowed_books) * @disbursements_required ) + @travel_allowance + @airfare_amount;
                END
            ELSE  -- after hibred period  2016-05-17 SFA-611 Lidwien
                BEGIN
                    SET @v_assessed_total = (@weekly_amount * @weeks_allowed)+ @travel_allowance + @airfare_amount + COALESCE(@assessment_adj_amount, 0);
                END
        END
	ELSE
        BEGIN	
            SET @v_assessed_total = 0;
        END

 	RETURN @v_assessed_total;
END
GO

--get_old_total
CREATE OR ALTER FUNCTION sfa.fn_get_old_total(
    @disbursements_required INT, 
    @academic_year INT,
    @living_costs NUMERIC,
    @allowed_tuition NUMERIC,
    @allowed_books NUMERIC,
    @travel_allowance NUMERIC,
    @airfare_amount NUMERIC
) RETURNS NUMERIC AS
/*
	This function calculates the assessed amount based on the % Allowed, Living Costs, Tuition, Books,
	Travel and Airfare
*/
BEGIN
	
    DECLARE @v_assessed_total NUMERIC;
	
	IF @disbursements_required > 0
		BEGIN
            SET @v_assessed_total = ((@living_costs + @allowed_tuition + @allowed_books) * @disbursements_required) + @travel_allowance + @airfare_amount;
        END
	ELSE
        BEGIN
            SET @v_assessed_total = 0;
        END
		
 	RETURN @v_assessed_total;
  
END
GO
-- GET_NEW_INFO YG
CREATE OR ALTER FUNCTION sfa.fn_get_new_info (
    @application_id INT,
    @assessment_id INT,
    @funding_request_id INT,
    @student_id INT
)
RETURNS
@assessment_record TABLE (
    funding_request_id INT,
    classes_end_date DATE,
	classes_start_date DATE,
	allowed_months FLOAT,
    weeks_allowed INT,
    home_city_id INT,
    destination_city INT,
    travel_allowance NUMERIC,
    airfare_amount NUMERIC,
    weekly_amount NUMERIC,
    living_costs NUMERIC,
    allowed_tuition NUMERIC,
    allowed_books NUMERIC,
    disbursements_required INT,
    previous_disbursement NUMERIC, -- IS NOT IN ASSESSMENT, IS IN CSL_NARS_HISTORY
    assessed_amount NUMERIC,
    pre_leg_amount FLOAT
)
AS
BEGIN

    DECLARE @classes_end_date DATE;
	DECLARE @classes_start_date DATE;
	DECLARE @allowed_months FLOAT;
    DECLARE @weeks_allowed INT;
    DECLARE @home_city_id INT;
    DECLARE @destination_city INT;
    DECLARE @travel_allowance NUMERIC;
    DECLARE @airfare_amount NUMERIC;
    DECLARE @weekly_amount NUMERIC;
    DECLARE @living_costs NUMERIC;
    DECLARE @allowed_tuition NUMERIC;
    DECLARE @allowed_books NUMERIC;
    DECLARE @disbursements_required INT;
    DECLARE @previous_disbursement NUMERIC; -- IS NOT IN ASSESSMENT, IS IN CSL_NARS_HISTORY
    DECLARE @assessed_amount NUMERIC;
    DECLARE @pre_leg_amount FLOAT;

    DECLARE @disburse_required NUMERIC;
    DECLARE @disbursed_amt NUMERIC;

    DECLARE @program_division INT;
    DECLARE @academic_year_id INT;


    SELECT 
    @classes_end_date = app.classes_end_date,
    @classes_start_date = app.classes_start_date
    FROM sfa.application app 
    WHERE app.id = @application_id;

    SELECT @weeks_allowed = DATEDIFF(MONTH, @classes_start_date, @classes_end_date);

    IF COALESCE(sfa.fn_get_previous_weeks_yg(@student_id, @application_id), 0) + COALESCE(sfa.fn_get_allowed_weeks(@classes_start_date, @classes_end_date), 0) > 170
      BEGIN
        SELECT @weeks_allowed = 170 - COALESCE(sfa.fn_get_previous_weeks_yg(@student_id, @application_id), 0);		
      END
    ELSE
      BEGIN
        SELECT @weeks_allowed = COALESCE(sfa.fn_get_previous_weeks_yg(@student_id, @application_id), 0);				
      END

    SELECT 
    @home_city_id = pa.city_id
    FROM sfa.student s
    INNER JOIN sfa.person p ON p.id = s.person_id 
    INNER JOIN sfa.person_address pa ON pa.person_id = p.id
    WHERE s.id = @student_id
    AND pa.address_type_id = 1;

    SELECT 
    @destination_city = ic.address_city_id
    FROM sfa.application app
    INNER JOIN sfa.institution_campus ic ON app.institution_campus_id = ic.id
    WHERE app.id = @application_id;

    SELECT @travel_allowance = sfa.fn_get_travel_allowance(@home_city_id, @destination_city);
    SELECT @airfare_amount = sfa.fn_get_airfare_amount(@home_city_id, @destination_city);

    SELECT TOP 1 @weekly_amount = COALESCE(yc.weekly_amount, 0)
    FROM sfa.yg_cost yc
    WHERE yc.academic_year_id = (
        SELECT app.academic_year_id
        FROM sfa.application app
        WHERE app.id = @application_id
      )
    AND yc.allowed_percent = 100;

    SELECT 
    @program_division = app.program_division,
    @academic_year_id = app.academic_year_id
    FROM sfa.application app 
    WHERE app.id = @application_id;

    SELECT 
    @living_costs = living, 
    @allowed_tuition = tuition, 
    @allowed_books = book
    FROM sfa.fn_get_yg_cost (@program_division, @academic_year_id, 100);
	
	SELECT @disburse_required = sfa.fn_disbursments_required(@application_id, @assessment_id);

--f_alert.ok('New Info - ID: '||	:assessment.assessment_id||'  weekly amt: '||:assessment.weekly_amount); -- Lidwien debug

	/*
		Calculate the previous disbursement amount
	*/
	--IF @assessment_id IS NOT NULL OR @prev_assessment_id = 0 --esta de mas esta validacion
		--BEGIN 
		  --SET @prev_assessment_id = @assessment_id;
    --END
	-- ELSE
    -- BEGIN
      -- SET @prev_assessment_id = @assessment_id;
      -- assess_id := :parameter.assess_id;
    -- END

	SELECT @disbursed_amt = sfa.fn_get_disbursed_amount_fct(@funding_request_id, @assessment_id);

--f_alert.ok('New Info - disbursed: '||	disbursed_amt); -- Lidwien debug		
	IF @disbursed_amt IS NOT NULL
		BEGIN
      SET @previous_disbursement = @disbursed_amt;
      
      IF @disburse_required > 0 and @disburse_required < 1
        BEGIN
            SET @disbursements_required = 1;
        END
      ELSE
        BEGIN
            SET @disbursements_required =  FLOOR(@disburse_required);	-- round down
        END
	  END	
	ELSE
    BEGIN
      SET @previous_disbursement = 0;
		  SET @disbursements_required =  FLOOR(@disburse_required);-- round down
	  END
	/*
		Calculate the total
	*/

	SELECT @assessed_amount = sfa.fn_get_total(
    @disbursements_required, 
    @academic_year_id,
    @living_costs,
    @allowed_tuition,
    @allowed_books,
    @travel_allowance,
    @airfare_amount,
    @weekly_amount,
    @weeks_allowed,
    0
  );

	SELECT @pre_leg_amount = sfa.fn_get_old_total(
    @disbursements_required, 
    @academic_year_id,
    @living_costs,
    @allowed_tuition,
    @allowed_books,
    @travel_allowance,
    @airfare_amount
  );

	/*
		calulate the net amount due to the student
	*/	
	-- SELECT @net_amount = fn_net_amount(@funding_request_id, @assessment_id); CALCULAR DIRECTAMENTE DESDE FRONT
  insert into @assessment_record(
    funding_request_id,
    classes_end_date,
	classes_start_date,
    allowed_months,
    weeks_allowed,
    home_city_id,
    destination_city,
    travel_allowance,
    airfare_amount,
    weekly_amount,
    living_costs,
    allowed_tuition,
    allowed_books,
    disbursements_required,
    previous_disbursement,
    assessed_amount,
    pre_leg_amount
  ) VALUES(
    @funding_request_id,
    @classes_end_date,
	@classes_start_date,
    @allowed_months,
    @weeks_allowed,
    @home_city_id,
    @destination_city,
    @travel_allowance,
    @airfare_amount,
    @weekly_amount,
    @living_costs,
    @allowed_tuition,
    @allowed_books,
    @disbursements_required,
    @previous_disbursement,
    @assessed_amount,
    @pre_leg_amount
  )
  RETURN;
END
GO

-- GET_ASSESS_INFO, now FUNCTION
CREATE OR ALTER FUNCTION sfa.fn_get_assess_info ( 
    @funding_request_id INT,
    @assessment_id INT
)
RETURNS
@assessment_record TABLE (
    funding_request_id INT,
    effective_rate_date  DATE, 
    classes_end_date  DATE,
    change_reason_comment TEXT,
    home_city_id INT, 
    destination_city_id INT, 
    dependent_count FLOAT,
    allowed_months FLOAT,
    weeks_allowed FLOAT, 
    allowed_tuition NUMERIC, 
    allowed_books FLOAT,
    living_costs NUMERIC, 
    travel_allowance NUMERIC, 
    airfare_amount NUMERIC,
    disbursements_required INT, 
    air_travel_disbursement_period INT,
    assessed_amount NUMERIC, 
    assessment_id INT
)
AS
BEGIN

    DECLARE @temp TABLE (
        funding_request_id INT,
        effective_rate_date  DATE, 
        classes_end_date  DATE,
        change_reason_comment TEXT,
        home_city_id INT, 
        destination_city_id INT, 
        dependent_count FLOAT,
        allowed_months FLOAT,
        weeks_allowed FLOAT, 
        allowed_tuition NUMERIC, 
        allowed_books FLOAT,
        living_costs NUMERIC, 
        travel_allowance NUMERIC, 
        airfare_amount NUMERIC,
        disbursements_required INT, 
        air_travel_disbursement_period INT,
        assessed_amount NUMERIC, 
        assessment_id INT
    );
    
    DECLARE @assess_count NUMERIC;
    DECLARE @prev_assessment_id INT;
    
    SELECT @assess_count = COALESCE(sfa.fn_get_assessment_count(@funding_request_id), 0);

    INSERT INTO @temp (
        funding_request_id,
        effective_rate_date , 
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        allowed_months,
        weeks_allowed, 
        allowed_tuition, 
        allowed_books,
        living_costs, 
        travel_allowance, 
        airfare_amount,
        disbursements_required, 
        air_travel_disbursement_period,
        assessed_amount,
        assessment_id
    )
    SELECT
        funding_request_id,
        effective_rate_date , 
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        allowed_months,
        weeks_allowed, 
        allowed_tuition, 
        allowed_books,
        living_costs, 
        travel_allowance, 
        airfare_amount,
        disbursements_required, 
        air_travel_disbursement_period,
        assessed_amount,
        assessment_id
    FROM sfa.fn_get_yg_assessment(@funding_request_id);

    SELECT @prev_assessment_id = assessment_id FROM sfa.fn_get_yg_assessment(@funding_request_id);
            
    EXEC sfa.sp_move_disbursement @assessment_id, @prev_assessment_id;


    INSERT INTO @assessment_record (
       funding_request_id,
       effective_rate_date , 
       classes_end_date,
       change_reason_comment,
       home_city_id, 
       destination_city_id, 
       dependent_count,
       allowed_months,
       weeks_allowed, 
       allowed_tuition, 
       allowed_books,
       living_costs, 
       travel_allowance, 
       airfare_amount,
       disbursements_required, 
       air_travel_disbursement_period,
       assessed_amount,
       assessment_id
    )
    SELECT TOP 1
        @funding_request_id,
        effective_rate_date , 
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        allowed_months,
        weeks_allowed, 
        allowed_tuition, 
        allowed_books,
        living_costs, 
        travel_allowance, 
        airfare_amount,
        disbursements_required, 
        air_travel_disbursement_period,
        assessed_amount,
        assessment_id
    FROM @temp;
    RETURN;    
END
GO
-- ASSESSMENT_TG - GET_INIT_VALUE 
CREATE OR ALTER PROCEDURE sfa.sp_get_init_value
    @funding_request_id INT,
    @application_id INT,
    @student_id INT   
AS
BEGIN
    DECLARE @assessment_id INT;

    IF EXISTS (SELECT 1 FROM sfa.assessment WHERE funding_request_id = @funding_request_id)
        BEGIN
            BEGIN TRY
                BEGIN TRANSACTION

                INSERT INTO sfa.assessment(
                    student_contrib_exempt,
                    spouse_contrib_exempt,
                    student_contribution_review,
                    spouse_contribution_review,
                    parent_contribution_review
                ) VALUES (
                    'NO',
                    'NO',
                    'NO',
                    'NO',
                    'NO'
                );

                SET @assessment_id = SCOPE_IDENTITY();

                UPDATE sfa.assessment
                SET funding_request_id = t.funding_request_id,
                    effective_rate_date = t.effective_rate_date, 
                    classes_end_date = t.classes_end_date,
                    change_reason_comment = t.change_reason_comment,
                    home_city_id = t.home_city_id, 
                    destination_city_id = t.destination_city_id, 
                    dependent_count = t.dependent_count,
                    allowed_months = t.allowed_months,
                    weeks_allowed = t.weeks_allowed, 
                    allowed_tuition = t.allowed_tuition, 
                    allowed_books = t.allowed_books,
                    living_costs = t.living_costs, 
                    travel_allowance = t.travel_allowance, 
                    airfare_amount = t.airfare_amount,
                    disbursements_required = t.disbursements_required, 
                    air_travel_disbursement_period = t.air_travel_disbursement_period,
                    assessed_amount = t.assessed_amount,
                    assessment_type_id = 2
                FROM (
                    SELECT * FROM sfa.fn_get_assess_info (
                        @funding_request_id,
                        @assessment_id
                    )
                ) t
                WHERE assessment_id = @assessment_id;

                COMMIT TRANSACTION
            END TRY
            BEGIN CATCH
                ROLLBACK TRANSACTION;
            END CATCH
        END
    ELSE
        BEGIN
            BEGIN TRY
                BEGIN TRANSACTION

                INSERT INTO sfa.assessment(
                    student_contrib_exempt,
                    spouse_contrib_exempt,
                    student_contribution_review,
                    spouse_contribution_review,
                    parent_contribution_review
                ) VALUES (
                    'NO',
                    'NO',
                    'NO',
                    'NO',
                    'NO'
                );

                SET @assessment_id = SCOPE_IDENTITY();

                UPDATE sfa.assessment
                SET 
                    funding_request_id = t.funding_request_id,
                    classes_end_date = t.classes_end_date,
                    classes_start_date = t.classes_start_date,
                    allowed_months = t.allowed_months,
                    weeks_allowed = t.weeks_allowed,
                    home_city_id = t.home_city_id,
                    destination_city_id = t.destination_city,
                    travel_allowance = t.travel_allowance,
                    airfare_amount = t.airfare_amount,
                    weekly_amount = t.weekly_amount,
                    living_costs = t.living_costs,
                    allowed_tuition = t.allowed_tuition,
                    allowed_books = t.allowed_books,
                    disbursements_required = t.disbursements_required,
                    -- previous_disbursement = t.previous_disbursement,
                    assessed_amount = t.assessed_amount,
                    pre_leg_amount = t.pre_leg_amount,
                    assessment_type_id = 1
                FROM (
                    SELECT * FROM sfa.fn_get_new_info (
                        @application_id,
                        @assessment_id,
                        @funding_request_id,
                        @student_id
                    )
                ) t
                WHERE id = @assessment_id;

                COMMIT TRANSACTION
            END TRY
            BEGIN CATCH
                ROLLBACK TRANSACTION;
            END CATCH
            
        END
END

-- END FUNCTIONS TO ASSESSMENT_YG --
