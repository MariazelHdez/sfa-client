<template>
  <div class="home">
    <h1>Funding Status</h1>
    <div class="col-md-12">
      <v-card class="default mb-5 bg-color-blue" v-for="item, index in application.funding_requests" :key="index">
        <v-card-title>Assessment - Yukon Grant</v-card-title>
        <v-card-text class="nopadding-lr">
          <div class="d-flex flex-row low-margin">
            <div class="col-md-8 nopadding">
              <div class="col-md-12 d-flex flex-row nopadding">
                <div class="col-md-4">
                  <v-menu
                      :disabled="showAdd"
                      v-model="assesst_date_menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      left
                      nudge-top="26"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :disabled="showAdd"
                          v-model="assesst_date"
                          label="Assesst Date"
                          append-icon="mdi-calendar"
                          hide-details
                          readonly
                          outlined
                          dense
                          background-color="white"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :disabled="showAdd"
                        v-model="assesst_date"
                        @input="assesst_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                </div>
                <div class="col-md-4">
                  <v-menu
                      :disabled="showAdd"
                      v-model="classes_start_date_menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      left
                      nudge-top="26"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :disabled="showAdd"
                          v-model="classes_start_date"
                          label="Classes Start Date"
                          append-icon="mdi-calendar"
                          hide-details
                          readonly
                          outlined
                          dense
                          background-color="white"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :disabled="showAdd"
                        v-model="classes_start_date"
                        @input="classes_start_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                </div>
                <div class="col-md-4">
                  <v-select
                    :disabled="showAdd"
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Home Community"
                    v-model="home_community"
                    item-text="DESCRIPTION"
                    item-value="REQUEST_TYPE_ID"
                  ></v-select>
                </div>
              </div>
              <div class="col-md-12 d-flex flex-row nopadding">
                <div class="col-md-4">
                  <v-menu
                    :disabled="showAdd"
                    v-model="effectoive_rate_date_menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    left
                    nudge-top="26"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :disabled="showAdd"
                        v-model="effectoive_rate_date"
                        label="Effectoive Rate Date"
                        append-icon="mdi-calendar"
                        hide-details
                        readonly
                        outlined
                        dense
                        background-color="white"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :disabled="showAdd"
                      v-model="effectoive_rate_date"
                      @input="effectoive_rate_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-md-4">
                  <v-menu
                    :disabled="showAdd"
                    v-model="classes_end_date_menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    left
                    nudge-top="26"
                    offset-y
                    min-width="auto"
                  >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :disabled="showAdd"
                      v-model="classes_end_date"
                      label="Classes End Date"
                      append-icon="mdi-calendar"
                      hide-details
                      readonly
                      outlined
                      dense
                      background-color="white"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                      :disabled="showAdd"
                      v-model="classes_end_date"
                      @input="classes_end_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
                <div class="col-md-4">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Destination City"
                    v-model="batch_id"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-md-12 d-flex flex-row nopadding low-margin">
                <div class="col-md-3">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Program Division"
                    @keypress="validate.isNumber($event)"
                    v-model="program_division"
                  ></v-text-field>
                </div>
                <div class="col-md-4 d-flex align-center">
                  <p class="nomargin-bottom">1 = Quarters, 2 = Semesters</p>
                </div>
              </div>
              <div class="col-md-12 d-flex flex-row nopadding">
                <v-card-title>Post Legislation Method</v-card-title>
              </div>
              <div class="col-md-12 d-flex flex-row nopadding">
                <div class="col-md-3">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Previous Weeks"
                    @keypress="validate.isNumber($event)"
                    v-model="previous_weeks"
                  ></v-text-field>
                </div>
                <div class="col-md-3">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessed Weeks"
                    @keypress="validate.isNumber($event)"
                    v-model="assessed_weeks"
                  ></v-text-field>
                </div>
                <div class="col-md-3">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Allowed Weeks"
                    @keypress="validate.isNumber($event)"
                    v-model="allowed_weeks"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-md-9 d-flex flex-row justify-end nopadding">
                <div class="col-md-4">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Weekly Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="weekly_amount"
                  ></v-text-field>
                </div>
              </div>
              <div class="col-md-12 nopadding">
                <div class="col-md-12">
                  <v-textarea
                    rows="3"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comment"
                    v-model="comments"
                  ></v-textarea>
                </div>
              </div>
            </div>
            <div class="col-md-4 nopadding">
              <div class="col-md-12 d-flex flex-row nopadding equalize-height">
                <div class="col-md-12 ">
                  <v-btn 
                      :disabled="showAdd"
                      dense
                      color="blue" 
                      class="my-0"
                      block
                    >
                      Re-calc
                  </v-btn>
                </div>
              </div>
              <div class="col-md-12 nopadding">
                <div class="col-md-12 nopadding d-flex flex-row">
                  <div class="col-md-7 nopadding">
                    <div class="col-md-12">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Travel Allowance"
                        @keypress="validate.isNumber($event)"
                        v-model="travel_allowance"
                      ></v-text-field>
                    </div>
                    <div class="col-md-12 ">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Airfare Amount"
                        @keypress="validate.isNumber($event)"
                        v-model="airfare_amount"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="col-md-5 nopadding d-flex align-center">
                    <div class="col-md-12 ">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Disbursement Period 1, 2..."
                        @keypress="validate.isNumber($event)"
                        v-model="disbursement_period"
                      ></v-text-field>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 nopadding d-flex align-center low-margin">
                  <div class="col-md-7">
                    <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="No. of Disbursements"
                      @keypress="validate.isNumber($event)"
                      v-model="no_of_disbursements"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="col-md-12 nopadding low-margin">
                <div class="col-md-12 nopadding d-flex flex-row">
                  <div class="col-md-7 nopadding">
                    <div class="col-md-12 ">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Adjust Amount"
                        @keypress="validate.isNumber($event)"
                        v-model="adjust_amount"
                      ></v-text-field>
                    </div>
                    <div class="col-md-12 ">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Assessed Amount"
                        @keypress="validate.isNumber($event)"
                        v-model="assessed_amount"
                      ></v-text-field>
                    </div>
                    <div class="col-md-12">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Previous Disbursement"
                        @keypress="validate.isNumber($event)"
                        v-model="previous_disbursement"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="col-md-5 nopadding d-flex align-end">
                    <div class="col-md-12">
                      <v-btn 
                        :disabled="showAdd"
                        dense
                        color="blue" 
                        class="my-0 w-auto"
                        block
                      >
                        Disburse
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 nopadding">
                <div class="col-md-12 nopadding d-flex flex-row">
                  <div class="col-md-7 nopadding">
                    <div class="col-md-12">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Over Award"
                        @keypress="validate.isNumber($event)"
                        v-model="over_award"
                      ></v-text-field>
                    </div>
                    <div class="col-md-12 ">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Over Disburse Period 1, 2..."
                        @keypress="validate.isNumber($event)"
                        v-model="over_disburse_period"
                      ></v-text-field>
                    </div>
                    <div class="col-md-12 ">
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
                    <div class="col-md-12 ">
                      <v-select
                        :disabled="showAdd"
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Assessment Type"
                        v-model="assessment_type"
                        item-text="DESCRIPTION"
                        item-value="REQUEST_TYPE_ID"
                      ></v-select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <v-card class="default mb-5 bg-color-blue">
              <v-card-title>Payment Management</v-card-title>
              <div class="row col-md-12">
                <div class="col-md-2">
                  <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Amount"
                      @keypress="validate.isNumber($event)"
                      v-model="pm_amount"
                    ></v-text-field>
                </div>
                <div class="col-md-2">
                  <v-menu
                      :disabled="showAdd"
                      v-model="pm_issue_date_menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      left
                      nudge-top="26"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :disabled="showAdd"
                          v-model="pm_issue_date"
                          label="Issue Date"
                          append-icon="mdi-calendar"
                          hide-details
                          readonly
                          outlined
                          dense
                          background-color="white"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :disabled="showAdd"
                        v-model="pm_issue_date"
                        @input="pm_issue_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                </div>
                <div class="col-md-2">
                  <v-menu
                      :disabled="showAdd"
                      v-model="pm_due_date_menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      left
                      nudge-top="26"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :disabled="showAdd"
                          v-model="pm_due_date"
                          label="Due Date"
                          append-icon="mdi-calendar"
                          hide-details
                          readonly
                          outlined
                          dense
                          background-color="white"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :disabled="showAdd"
                        v-model="pm_due_date"
                        @input="pm_due_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                </div>
                <div class="col-md-1">
                  <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Tax Year"
                      @keypress="validate.isNumber($event)"
                      v-model="pm_tax_year"
                    ></v-text-field>
                </div>
                <div class="col-md-3">
                  <v-select
                    :disabled="showAdd"
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Change Reason"
                    v-model="pm_change_reason"
                    item-text="DESCRIPTION"
                    item-value="REQUEST_TYPE_ID"
                  ></v-select>
                </div>
                <div class="col-md-2">
                  <v-text-field
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Batch ID"
                      @keypress="validate.isNumber($event)"
                      v-model="pm_batch_id"
                    ></v-text-field>
                </div>
              </div>
              <div class="col-md-1">
                <v-btn 
                  :disabled="showAdd"
                  dense
                  color="blue" 
                  class="my-0"
                  block
                >
                  Disburse
                </v-btn>
                </div>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "../../../store";
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
    store.dispatch("setAppSidebar", true);
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
  .nomargin-bottom {
    margin-bottom: 0 !important;
  }
  .equalize-heights {
    height: 40px;
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
    margin-bottom: 35px !important;
  }
  .txtarea-width{
    width: 97.6% !important;
  }
</style>
