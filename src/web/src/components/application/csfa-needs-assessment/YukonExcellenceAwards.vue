<template>
  <div class="home">
    <h1>Funding Status</h1>
    <div class="col-md-12">
      <v-card class="default mb-5 bg-color-blue" v-for="item, index in application.funding_requests" :key="index">
        <v-card-title>Assessment - Yukon Excellence Awards</v-card-title>
        <v-card-text>
          <div class="row low-margin">
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-menu
                    :disabled="showAdd"
                    v-model="item.assessed_date_menu"
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
                        v-model="item.assessed_date"
                        label="Assessed Date"
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
                      v-model="item.assessed_date"
                      @input="item.assessed_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
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
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-8">
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
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
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
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
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
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-8">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Assessed Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="application.assessed_amount"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
          <div class="row low-margin">
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="YEA Earned"
                    @keypress="validate.isNumber($event)"
                    v-model="yea_earned"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="YEA Used"
                    @keypress="validate.isNumber($event)"
                    v-model="yea_used"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-8">
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
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="YEA Earned"
                    @keypress="validate.isNumber($event)"
                    v-model="yea_earned"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-9">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="YEA Used"
                    @keypress="validate.isNumber($event)"
                    v-model="yea_used"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row justify-start">
                <div class="col-md-8">
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
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 nopadding d-flex">
              <div class="col-md-8">
                <div class="row justify-start">
                  <div class="col-md-11">
                    <v-textarea
                      rows="3"
                      style="width:95.25%;"
                      outlined 
                      dense 
                      background-color="white" 
                      hide-details 
                      label="Comment"
                      v-model="comments"
                      >
                    </v-textarea>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="row justify-start d-flex">
                  <div class="col-md-8">
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
                  <div class="col-md-8">
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
                  <div class="col-md-3">
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
                </div>
              </div>
            </div>
          </div>
          <div class="row low-margin">
            <div class="col-md-12 nopadding d-flex">
              <div class="col-md-8">
                <div class="row justify-start">
                  <div class="col-md-10">
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="row justify-start d-flex">
                  <div class="col-md-8">
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
                </div>
              </div>
            </div>
          </div>
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