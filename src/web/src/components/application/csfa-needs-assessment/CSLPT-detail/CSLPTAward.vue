<template>
  <div class="home cslpt-base-assessment">
    <v-card class="default mb-5 bg-color-blue">
      <v-card-text class="nopadding d-flex flex-wrap top-margin low-margin">
        <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap low-margin">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-7 col-lg-7 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Total Study Cost"
                      @keypress="validate.isNumber($event)"
                      v-model="total_study_cost"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Outstanding Loans"
                      @keypress="validate.isNumber($event)"
                      v-model="outstanding_loans"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Total Grant"
                      @keypress="validate.isNumber($event)"
                      v-model="total_grant"
                    ></v-text-field>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-5 col-lg-5 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Max. Allowable"
                      @keypress="validate.isNumber($event)"
                      v-model="max_allowable"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Calculated Award"
                      @keypress="validate.isNumber($event)"
                      v-model="calculated_award"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-7 col-lg-7 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
                <div class="col-xs-12 col-sm-5 col-lg-5 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-btn 
                        :disabled="showAdd"
                        dense
                        color="blue" 
                        class="my-0"
                        block
                      >
                      RE-CALC
                    </v-btn>
                  </div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap low-margin">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-7 col-lg-7 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Requested Amount"
                      @keypress="validate.isNumber($event)"
                      v-model="requested_amount"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Outstanding Overaward"
                      @keypress="validate.isNumber($event)"
                      v-model="outstanding_overaward"
                    ></v-text-field>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-5 col-lg-5 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Returned/Uncashable Cert"
                      @keypress="validate.isNumber($event)"
                      v-model="returned_uncashable_cert"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Actual Award"
                      @keypress="validate.isNumber($event)"
                      v-model="actual_award"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-7 col-lg-7 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
                <div class="col-xs-12 col-sm-5 col-lg-5 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12">
                    <v-btn 
                        :disabled="showAdd"
                        dense
                        color="blue" 
                        class="my-0"
                        block
                      >
                      DISBURSE
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Non-Award Reason"
                      v-model="assessed_type"
                      item-text="DESCRIPTION"
                      item-value="REQUEST_TYPE_ID"
                    ></v-select>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-select
                      :disabled="showAdd"
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Over-Award Reason"
                      v-model="assessed_type"
                      item-text="DESCRIPTION"
                      item-value="REQUEST_TYPE_ID"
                    ></v-select>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Previous Cert"
                      @keypress="validate.isNumber($event)"
                      v-model="previous_cert"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                  <div class="col-xs-12 col-lg-12 line-jump-height not-displayed-sx"></div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 nopadding d-flex flex-wrap mobile-low-margin">
                <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Previous Disbursements"
                      @keypress="validate.isNumber($event)"
                      v-model="previous_disbursements"
                    ></v-text-field>
                  </div>
                  <div class="col-xs-12 col-lg-12">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Net Amount"
                      @keypress="validate.isNumber($event)"
                      v-model="net_amount"
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div class="col-lg-12">
      <v-card class="default mb-5 bg-color-blue">
        <v-card-title>Disbursement (s)</v-card-title>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom">
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Reference #</p>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
            <p class="nomargin">Disbursed Amt</p>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
            <p class="nomargin">Disbursement Type</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Due Date</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Issue Date</p>
          </div>
          <div class="col-xs-4 col-sm-4 col-lg-4 nopadding d-flex align-center justify-center">
            <p class="nomargin">Change Reason</p>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding d-flex align-center justify-center">
            <p class="nomargin">Batch ID</p>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-lg-12 d-flex low-margin noppading-top">
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="reference_number"
            ></v-text-field>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="disbursed_amt"
            ></v-text-field>
          </div>
          <div class="col-xs-2 col-sm-2 col-lg-2 nopadding">
            <v-select
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              v-model="disbursement_type"
              item-text="DESCRIPTION"
              item-value="REQUEST_TYPE_ID"
            ></v-select>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="due_date"
            ></v-text-field>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="issue_date"
            ></v-text-field>
          </div>
          <div class="col-xs-4 col-sm-4 col-lg-4 nopadding">
            <v-select
              :disabled="showAdd"
              outlined
              dense
              background-color="white"
              hide-details
              v-model="disbursement_type"
              item-text="DESCRIPTION"
              item-value="REQUEST_TYPE_ID"
            ></v-select>
          </div>
          <div class="col-xs-1 col-sm-1 col-lg-1 nopadding">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @keypress="validate.isNumber($event)"
              v-model="family_size"
            ></v-text-field>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import validator from "@/validator";
export default {
  name: "Home",
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  async created() {
    this.validate = validator;
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }
  }
};
</script>
<style>
  .nopadding {
    padding: 0 !important;
  }
  .nopadding-lr {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .noppading-bottom,
  .nopadding-bottom {
    padding-bottom: 0 !important;
  }
  .noppading-top {
    padding-top: 0 !important;
  }
  .nopadding-left {
    padding-left: 0 !important;
  }
  .noppading-right {
    padding-right: 0 !important;
  }
  .padding-top{
    padding-top: 17px !important;
  }
  .equalize-heights {
    height: 40px;
  }
  .border-top {
    border-top: 3px solid #ccc;
  }
  .border-container{
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .w-auto{
    min-width: unset !important;
    width: 100%;
  }
  .bg-color-blue{
    background-color: #E2F1FD !important;
  }
  .low-margin{
    margin-bottom: 20px !important;
  }
  .low-marginx2{
    margin-bottom: 40px !important;
  }
  .top-margin{
    margin-top: 20px !important;
  }  
  .txtarea-width{
    width: 97.6% !important;
  }
  .line-jump-height{
    height: 64px;
  }
  .v-btn:not(.v-btn--round).v-size--default{
    padding: 0 8px !important;
  }
  .cslpt-base-assessment .right-block-container > div{
    border-left: 0px;
  }
  .cslpt-base-assessment .right-block-container{
    border-left: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .not-displayed-lg{
    display: none;
  }
  .v-card__title{
    font-weight: bold !important;
    font-size: 1.65rem !important;
  }
  .height-fit-content{
    height: fit-content !important;
  }
  .justify-end{
    justify-content: flex-end !important;
  }
  .justify-start{
    justify-content: flex-start !important;
  }
  .justify-center{
    justify-content: center !important;
  }
  .cslpt-base-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslpt-base-assessment .right-block-container{
      border-left: 0px;
    }
    .v-card__title{
      font-size: 1.25rem !important;
    }
    .not-displayed-lg{
      display: block;
      height: 0px;
      margin: 20px 15px;
    }
    .cslpt-base-assessment .right-block-container .not-displayed-lg{
      border-top: 1px solid #ccc;
    }
    .not-displayed-sx-md,
    .d-flex.not-displayed-sx-md{
      display: none;
    }
    .not-displayed-sx-md,
    .d-flex.not-displayed-sx-md{
      height: 0px !important;
      padding: 0px !important;
    }
  }
  @media (max-width: 599px){
    .mobile-custom-border{
      padding: 10px !important;
      margin: 10px;
      border: 2px solid #ccc;
      border-radius: 5px;;
    }
    .mobile-custom-border-2{
      padding: 10px !important;
      margin: 10px;
      border: 2px solid #ccc;
      border-radius: 5px;;
    }
    .mobile-custom-border::after{
      content: '';
      position: relative;
      left: 43%;
      top: 16px;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 15px solid #ccc;
      clear: both;
    }
    .nopadding-left{
      padding-left: 14px !important;
    }
    .mobile-noppading-top{
      padding-top: 0px !important;
    }
    .mobile-noppading-bottom{
      padding-bottom: 0px !important;
    }
    .not-displayed-sx,
    .d-flex.not-displayed-sx{
      display: none;
    }
    .not-displayed-sx,
    .d-flex.not-displayed-sx{
      height: 0px !important;
      padding: 0px !important;
    }
    .mobile-column-flex{
      flex-direction: column;
    }
    .mobile-low-margin{
      margin-bottom: 20px !important;
    }
    .mobile-top-margin{
      margin-top: 20px !important;
    }
    .clss-st-date-re-order{
      order: 2;
    }
    .clss-en-date-re-order{
      order: 3;
    }
    .help-txt-re-order{
      order: 1;
    }
  }


</style>
