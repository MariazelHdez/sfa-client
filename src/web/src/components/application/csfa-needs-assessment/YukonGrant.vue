<template>
  <div class="home">
    <h1>Funding Status</h1>
    <div class="col-md-12">
      <v-card class="default mb-5" v-for="item, index in application.funding_requests" :key="index">
        <v-card-title>Assessment - Yukon Grant</v-card-title>
        <v-card-text>
          <div class="d-flex flex-row">
            <div class="col-md-9">
              <div class="row d-flex flex-row">
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
              <div class="row d-flex flex-row">
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
              <div class="row d-flex flex-row">
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
                <div class="col-md-4 d-flex align-items-center">
                  <p class="clearfix">1 = Quarters, 2 = Semesters</p>
                </div>
              </div>
              <div class="Row d-flex flex-row">
                <v-card-title>Post Legislation Method</v-card-title>
              </div>
              <div class="row d-flex flex-row">
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
              <div class="col-md-9 d-flex flex-row justify-end">
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
              <div class="col-md-12">
                <div class="col-md-12">
                  <v-textarea
                    rows="3"
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
            <div class="col-md-3">
              
            </div>
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
