import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import vuetify from "./plugins/vuetify";
import VueCurrencyInput from 'vue-currency-input'

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;
Vue.use(VueCurrencyInput, { globalOptions: { currency: 'USD' } });

import ConfirmDialog from "./components/ConfirmDialog";

import ParentInfoForm from "./components/ParentInfoForm";
import ParentDependentsForm from "./components/ParentDependentsForm";

import ContactForm from "./components/ContactForm";
import BasicDemographicsForm from "./components/BasicDemographicsForm";
import StatisticalForm from "./components/StatisticalForm";
import ConsentForm from "./components/ConsentForm";


import ProgramInformationForm from "./components/ProgramInformationForm";
import CreditCheckForm from "./components/CreditCheckForm";
import CSLRestrictionForm from "./components/CSLRestrictionForm";

import TrainingAllowance from "./components/TrainingAllowance";
import YukonGrant from "./components/YukonGrant";
import YukonExcellence from "./components/YukonExcellence";

import CSLFullTimeForm from "./components/CSLFullTimeForm";
import CSLPartTimeForm from "./components/CSLPartTimeForm";
import CSGDisabilityForm from "./components/CSGDisabilityForm";
import CanadaStudyForm from "./components/CanadaStudyForm";

import AccommodationForm from "./components/AccommodationForm";

import PreStudyExpensesForm from "./components/PreStudyExpensesForm";
import StudyExpensesForm from "./components/StudyExpensesForm";

import PreStudyIncomeForm from "./components/PreStudyIncomeForm";
import StudyIncomeForm from "./components/StudyIncomeForm";

Vue.component("confirm-dialog", ConfirmDialog);

Vue.component("contact-form", ContactForm);
Vue.component("basic-demographics-form", BasicDemographicsForm);
Vue.component("statistical-form", StatisticalForm);
Vue.component("consent-form", ConsentForm);

Vue.component("program-information", ProgramInformationForm);
Vue.component("credit-check", CreditCheckForm);
Vue.component("csl-restriction", CSLRestrictionForm);

Vue.component("training-allowance", TrainingAllowance);
Vue.component("yukon-grant", YukonGrant);
Vue.component("yukon-excellence", YukonExcellence);

Vue.component("csl-fulltime", CSLFullTimeForm);
Vue.component("csl-parttime", CSLPartTimeForm);
Vue.component("csg-disability", CSGDisabilityForm);
Vue.component("canada-study", CanadaStudyForm);

Vue.component("accommodation", AccommodationForm);

Vue.component("prestudy-expenses", PreStudyExpensesForm);
Vue.component("study-expenses", StudyExpensesForm);

Vue.component("prestudy-income", PreStudyIncomeForm);
Vue.component("study-income", StudyIncomeForm);

Vue.component("parent-info-form", ParentInfoForm);
Vue.component("parent-dependents-form", ParentDependentsForm);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
