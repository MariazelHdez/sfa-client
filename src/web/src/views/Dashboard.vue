<template>
  <div class="home">
    <h1>Dashboard</h1>

    <v-card class="mt-5" color="#fff2d5">
      <v-card-title>Find a Student or Application</v-card-title>
      <v-card-text>
        <v-text-field
          dense
          outlined
          background-color="white"
          label="Search"
          append-icon="mdi-magnify"
          @click:append="doSearch"
          @keydown="searchKeyUp"
          hint="Enter a Name, SIN or locator number and press Enter"
          v-model="search"
        ></v-text-field>
        <router-link to="/search">Advanced search</router-link>
      </v-card-text>
    </v-card>
    <div class="row" style="margin: 12px 0px 0px 0px">
      <div class="col-md-3" style="padding: 8px 0px 8px 0px">
        <v-select
          outlined
          dense
          background-color="white"
          hide-details
          label="Select a filter"
          v-model="filter"
          multiple
          item-text="name"
          item-value="code_name"
          :items="filters"
          @change="persistFilter"
        ></v-select>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-md-4">
                <v-card class="mt-5" color="#fff2d5">
                    <v-card-title>Recently viewed Students:</v-card-title>
                    <v-card-text>
                      <p v-if="recentStudents.length == 0" class="mb-0">None yet</p>
                        <ol v-if="recentStudents.length > 0">
                            <li
                                v-for="(item, idx) of recentStudents"
                                :key="idx"
                            >
                                <router-link :to="`/student/${item.id}`"
                                    >{{ item.first_name }} {{ item.initials }}
                                    {{ item.last_name }} ({{ item.sin }})
                                </router-link>
                            </li>
                        </ol>
                    </v-card-text>
                </v-card>
            </div> -->
      <div class="col-md-4">
        <v-card color="#fff2d5">
          <v-card-title>Recently viewed Applications:</v-card-title>
          <v-card-text>
            <p v-if="recentApplications.length == 0" class="mb-0">None yet</p>
            <ol v-if="recentApplications.length > 0">
              <li v-for="(item, idx) of recentApplications" :key="idx">
                <router-link :to="`/application/${item.id}/personal`"
                  >{{ getStudentName(item) }} - {{ item.academic_year_id }}: {{ item.main_institution.name }}
                </router-link>
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-md-4">
        <v-card color="#fff2d5">
          <v-card-title>New Applications</v-card-title>
          <v-card-text>
            <div v-if="loading">Loading...</div>
            <p v-if="newApplications.length == 0 && !loading" class="mb-0">None yet</p>
            <ol v-if="newApplications.length > 0">
              <li v-for="(item, idx) of newApplications" :key="idx">
                <router-link :to="`/application/${item.id}/personal`">
                  {{ item.title }}
                </router-link>
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-md-4">
        <v-card color="#fff2d5">
          <v-card-title>Recent updates or messages</v-card-title>
          <v-card-text>
            <p v-if="recentUpdated.length == 0" class="mb-0">None yet</p>
            <ol v-if="recentUpdated.length > 0">
              <li v-for="(item, idx) of recentUpdated" :key="idx">
                <router-link :to="`/application/${item.id}/personal`"
                  >{{ item.title }} - <span style="font-size: 10px">{{ getFormattedDate(item.updated_at) }}</span>
                </router-link>
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <v-navigation-drawer v-model="drawer" absolute right temporary width="600" loading>
      <v-list-item loading>
        <v-list-item-content>
          <v-list-item-title>
            <div class="float-right">
              <v-btn
                x-small
                color="primary"
                text
                :to="'/search?text=' + search"
                class="my-0"
                style="font-size: 12px !important"
              >
                Advanced search</v-btn
              >
            </div>
            <div class="float-left">Students ({{ resultCount }} matches)</div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <div style="max-height: 90%; overflow-y: scroll">
        <v-data-table
          hide-default-footer
          :headers="[
            { text: '', value: 'action', width: '40px' },
            { text: 'SIN', value: 'sin' },
            { text: 'Name', value: 'name' },
            { text: 'Locator', value: 'locator_number' },
          ]"
          :items="searchResults"
          :items-per-page="-1"
          :loading="isSearching"
          @click:row="selectStudent"
          loading-text="Searching for students"
        >
          <template v-slot:item.action="{ item }">
            <v-btn outlined icon color="primary" :to="`/student/${item.student_id}`" title="View student record"
              ><v-icon>mdi-school</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { get, includes } from "lodash";
import { APPLICATION_URL, STUDENT_SEARCH_URL } from "../urls";

export default {
  name: "Home",
  computed: {
    ...mapState(["recentStudents"]),
  },
  data: () => ({
    filter: [],
    recentApplications: [],
    search: "",
    drawer: null,
    selectedStudent: null,
    searchResults: [],
    resultCount: 0,
    isSearching: false,
    newApplications: [],
    recentUpdated: [],
    loading: true,
    filters: [
      {
        name: "Clear",
        code_name: "CLEAR",
      },
      { divider: true },
      {
        name: "A",
        code_name: "A",
      },
      {
        name: "B",
        code_name: "B",
      },
      {
        name: "C",
        code_name: "C",
      },
      {
        name: "D",
        code_name: "D",
      },
      {
        name: "E",
        code_name: "E",
      },
      {
        name: "F",
        code_name: "F",
      },
      {
        name: "G",
        code_name: "G",
      },
      {
        name: "H",
        code_name: "H",
      },
      {
        name: "I",
        code_name: "I",
      },
      {
        name: "J",
        code_name: "J",
      },
      {
        name: "K",
        code_name: "K",
      },
      {
        name: "L",
        code_name: "L",
      },
      {
        name: "M",
        code_name: "M",
      },
      {
        name: "N",
        code_name: "N",
      },
      {
        name: "O",
        code_name: "O",
      },
      {
        name: "P",
        code_name: "P",
      },
      {
        name: "Q",
        code_name: "Q",
      },
      {
        name: "R",
        code_name: "R",
      },
      {
        name: "S",
        code_name: "S",
      },
      {
        name: "T",
        code_name: "T",
      },
      {
        name: "U",
        code_name: "U",
      },
      {
        name: "V",
        code_name: "V",
      },
      {
        name: "W",
        code_name: "W",
      },
      {
        name: "X",
        code_name: "X",
      },
      {
        name: "Y",
        code_name: "Y",
      },
      {
        name: "Z",
        code_name: "Z",
      },
    ],
  }),
  mounted() {
    if (localStorage.DASHBOARD_LASTNAME_FILTER) {
      this.filter = localStorage.DASHBOARD_LASTNAME_FILTER.split(",");
    }

    if (localStorage.RECENT_APPLICATIONS) {
      this.recentApplications = JSON.parse(localStorage.RECENT_APPLICATIONS);
    } else {
      localStorage.setItem("RECENT_APPLICATIONS", JSON.stringify([]));
    }

    axios
      .get(`${APPLICATION_URL}/all`, {
        params: {
          filter: this.filter,
        },
      })
      .then((response) => {
        this.newApplications = get(response, "data.data", []);
      })
      .catch((error) => console.log(error))
      .finally(() => (this.loading = false));

    axios
      .get(`${APPLICATION_URL}/latest-updates`, {
        params: {
          filter: this.filter,
        },
      })
      .then((response) => {
        this.recentUpdated = get(response, "data.data", []);
      })
      .catch((error) => console.log(error))
      .finally(() => (this.loading = false));
  },
  methods: {
    getFormattedDate(date) {
      return new Date(date).toLocaleDateString();
    },
    getData() {
      axios
        .get(`${APPLICATION_URL}/all`, {
          params: {
            filter: this.filter,
          },
        })
        .then((response) => {
          this.newApplications = get(response, "data.data", []);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));

      axios
        .get(`${APPLICATION_URL}/latest-updates`, {
          params: {
            filter: this.filter,
          },
        })
        .then((response) => {
          this.recentUpdated = get(response, "data.data", []);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    searchKeyUp(event) {
      if (event.key == "Enter") this.doSearch();
    },
    persistFilter(item_code_name) {
      if (includes(item_code_name, "CLEAR") || includes(item_code_name, "ALL")) {
        localStorage.setItem("DASHBOARD_LASTNAME_FILTER", []);
        this.filter = [];
      } else {
        localStorage.setItem("DASHBOARD_LASTNAME_FILTER", item_code_name);
      }

      this.getData();
    },
    doSearch() {
      this.drawer = true;
      this.selectedStudent = null;
      this.searchResults = [];
      this.resultCount = 0;

      let cleanSearch = this.search.trim().toLowerCase();
      if (cleanSearch.length == 0) return;

      this.isSearching = true;

      axios
        .post(`${STUDENT_SEARCH_URL}`, { terms: cleanSearch })
        .then((resp) => {
          this.searchResults = resp.data.data;
          this.resultCount = resp.data.meta.item_count;
        })
        .catch((err) => {
          this.$emit("showError", err);
        })
        .finally(() => {
          this.isSearching = false;
        });
    },
    selectStudent(item) {
      this.selectedStudent = item;
      this.$router.push(`/student/${item.student_id}`);
    },
    getStudentName(application) {
      return `${get(application, "student.first_name", "Not defined")} ${get(application, "student.last_name", "")}`;
    },
    selectApplication(item) {
      this.selectedApplication = item;
      this.$router.push(`/application/${item.id}/personal`);
    },
  },
};
</script>

<style scoped>
.v-card__title {
  word-break: keep-all;
}
</style>
