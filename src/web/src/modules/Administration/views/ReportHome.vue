<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        {
          text: 'Administration Home',
          to: '/administration',
          exact: true,
        },
        {
          text: 'Reports',
          to: '/administration/reports',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
    <h1>Reports</h1>
    <v-divider></v-divider>

    <v-row>
      <v-col class="d-flex my-3">
        <v-select
          label="Choose a report"
          :items="reportOptions"
          v-model="report"
          return-object
          outlined
          dense
          hide-details
        />
        <v-btn color="primary" @click="runClick" class="ml-4 my-0" style="width: 200px">
          <v-icon class="mr-2">mdi-eye</v-icon> Preview
        </v-btn>
      </v-col>
    </v-row>
    <v-card class="default">
      <v-card-text>
        <v-row>
          <v-col class="d-flex">
            <v-text-field
              v-model="search"
              label="Search"
              dense
              outlined
              background-color="white"
              hide-details
              class="mb-2"
            />
            <v-btn color="info" @click="downloadClick" class="my-0 ml-4" style="width: 183px"
              ><v-icon class="mr-2">mdi-download</v-icon> Download</v-btn
            >
          </v-col>
        </v-row>
        <v-data-table
          :search="search"
          :headers="reportHeaders"
          :items="reportData"
          dense
          :footer-props="{ 'items-per-page-options': [15, 30, 50, 100, -1] }"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import store from "@/store";

export default {
  data: () => ({
    search: "",
  }),
  computed: {
    ...mapState(["showSideBarAdmin"]),
    ...mapGetters("reportsStore", ["reportHeaders", "reportData", "downloadLink"]),
    ...mapState("reportsStore", ["reportOptions", "selectedReport"]),
    report: {
      get() {
        return this.selectedReport;
      },
      set(value) {
        this.setReport(value);
      },
    },
  },
  async created() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));
  },
  methods: {
    ...mapActions("reportsStore", ["runReport", "setReport"]),
    runClick() {
      this.search = "";
      this.runReport();
    },
    downloadClick() {
      if (this.downloadLink) window.open(this.downloadLink);
    },
  },
};
</script>
