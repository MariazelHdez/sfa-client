import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import NotFound from "../views/NotFound.vue";
import Login from "../views/Login";
import LoginComplete from "../views/LoginComplete";
import Profile from "../views/Profile";
import store from "../store";

import Reports from "../views/Reports";
import AdministrationHome from "../views/Administration/AdministrationHome";
import Search from "../views/Search";

import ApplicationDetails from "../components/application/ApplicationDetails";
import FamilyInfo from "../components/application/family-info/FamilyInfo";
import StudentDetails from "../components/student/StudentDetails";
import Status from "../components/application/Status";
import AcademicYear from "../components/application/AcademicYear";
import SFAFundingRequests from "../components/application/sfa-funding-requests/SFAFundingRequests";
import ScholarshipApplications from "../components/application/sfa-funding-requests/scholarships/ScholarshipApplications";
import CSFAFundingRequests from "../components/application/csfa-funding-requests/CSFAFundingRequests";
import CSFANeedsAssessment from "../components/application/csfa-needs-assessment/CSFANeedsAssessment";
import Documentation from "../components/application/Documentation";

import CanadianArmyScholarship from "../components/application/csfa-needs-assessment/CanadianArmyScholarship";
import StudentTrainingAllowance_OtherFundings from "../components/application/csfa-needs-assessment/StudentTrainingAllowance-OtherFundings";
import YukonGrant from "../components/application/csfa-needs-assessment/YukonGrant";
import YukonExcellenceAwards from "../components/application/csfa-needs-assessment/YukonExcellenceAwards";


import StudentModuleRoutes from "@/modules/student/router";
import ApplicationTypeModuleRooutes from "@/modules/application-type/router";
import InstitutionModuleRoutes from "@/modules/institution/router";
import ProvinceModuleRoutes from "@/modules/province/router";
import CountriesModuleRoutes from "@/modules/countries/router";
import CitiesModuleRoutes from "@/modules/cities/router";
import AddressTypeModuleRoutes from "@/modules/address-type/router";
import IndigenousLearnerModuleRoutes from "@/modules/indigenous-learner/router";
import languageModuleRoutes from "@/modules/language/router";
import maritalStatusModuleRoutes from "@/modules/marital-status/router";
import studyFieldModuleRoutes from "@/modules/study-field/router";
import parentalRelationshipModuleRoutes from "@/modules/parental-relationship/router";
import firstNationModuleRoutes from "@/modules/first-nation/router";
import portalStatusModuleRoutes from "@/modules/portal-status/router";
import sexModuleRoutes from "@/modules/sex/router";
import institutionLevelModuleRoutes from "@/modules/institution-level/router";
import ageDistributionModuleRoutes from "@/modules/age-distribution/router";
import highSchoolModuleRoutes from "@/modules/high-school/router";
import assessmentTypeModuleRoutes from "@/modules/assessment-type/router";
import studentCategoryModuleRoutes from "@/modules/student-category/router";
import batchGroupModuleRoutes from "@/modules/batch-group/router";
import educationLevelModuleRoutes from "@/modules/education-level/router";
import reasonsForChangeModuleRoutes from "@/modules/reasons-for-change/router";
import disbursementTypeModuleRoutes from "@/modules/disbursement-type/router";
import statusModuleRoutes from "@/modules/status/router";
import statusReasonModuleRoutes from "@/modules/status-reason/router";
import yukonGrantEligibilityRoutes from "@/modules/yukon-grant-eligibility/router";
import fundingGroupRoutes from "@/modules/funding-group/router";
import disabilityTypeRoutes from "@/modules/disability-type/router";
import disabilityTypeWithoutCSLRoutes from "@/modules/disability-type-without-csl/router";
import aboriginalStatusRoutes from "@/modules/aboriginal-status/router";
import disabilityServiceRoutes from "@/modules/disability-service/router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/application/:id/personal",
    name: "ApplicationDetails",
    component: ApplicationDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/family-info",
    name: "FamilyInfo",
    component: FamilyInfo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/status",
    name: "Status",
    component: Status,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/academic-year",
    name: "AcademicYear",
    component: AcademicYear,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/sfa-funding-requests",
    name: "SFAFundingRequests",
    component: SFAFundingRequests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/scholarship-applications",
    name: "ScholarshipApplications",
    component: ScholarshipApplications,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/csfa-funding-requests",
    name: "CSFAFundingRequests",
    component: CSFAFundingRequests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/csfa-needs-assessment",
    name: "CSFANeedsAssessment",
    component: CSFANeedsAssessment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/documentation",
    name: "Documentation",
    component: Documentation,
    meta: {
      requiresAuth: true
    }
  },



  {
    path: "/assessment/:id/canadian-armys-cholarship",
    name: "CanadianArmyScholarship",
    component: CanadianArmyScholarship,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/assessment/:id/student-training-allowance-other-fundings",
    name: "CanadianArmyScholarship",
    component: StudentTrainingAllowance_OtherFundings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/assessment/:id/yukon-grant",
    name: "YukonGrant",
    component: YukonGrant,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/assessment/:id/yukon-excellence-awards",
    name: "YukonExcellenceAwards",
    component: YukonExcellenceAwards,
    meta: {
      requiresAuth: true
    }
  },
  






  {
    path: "/student/:id",
    name: "StudentDetails",
    component: StudentDetails,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/administration",
    name: "AdministrationHome",
    component: AdministrationHome,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/sign-in",
    name: "Login",
    component: Login
  },
  {
    path: "/login-complete",
    name: "LoginComplete",
    component: LoginComplete
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  
	...ApplicationTypeModuleRooutes,
	...StudentModuleRoutes,
  ...InstitutionModuleRoutes,
  ...ProvinceModuleRoutes,
  ...CountriesModuleRoutes,
  ...CitiesModuleRoutes,
  ...AddressTypeModuleRoutes,
  ...IndigenousLearnerModuleRoutes,
  ...languageModuleRoutes,
  ...maritalStatusModuleRoutes,
  ...studyFieldModuleRoutes,
  ...parentalRelationshipModuleRoutes,
  ...firstNationModuleRoutes,
  ...portalStatusModuleRoutes,
  ...sexModuleRoutes,
  ...studentCategoryModuleRoutes,
  ...institutionLevelModuleRoutes,
  ...ageDistributionModuleRoutes,
  ...highSchoolModuleRoutes,
  ...assessmentTypeModuleRoutes,
  ...batchGroupModuleRoutes,
  ...educationLevelModuleRoutes,
  ...reasonsForChangeModuleRoutes,
  ...disbursementTypeModuleRoutes,
  ...statusModuleRoutes,
  ...statusReasonModuleRoutes,
  ...yukonGrantEligibilityRoutes,
  ...fundingGroupRoutes,
  ...disabilityTypeRoutes,
  ...disabilityTypeWithoutCSLRoutes,
  ...aboriginalStatusRoutes,
  ...disabilityServiceRoutes,

  {
    path: "*",
    name: "Not Found",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  var requiresAuth = to.meta.requiresAuth || false;

  store.dispatch("setAppSidebar", to.path.startsWith("/application") || to.path.startsWith("/student"))
  store.dispatch("setAppSideBarAdmin", to.path.startsWith("/administration"))

  if (!requiresAuth) {
    return next();
  }

  await store.dispatch("checkAuthentication");
  var isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    console.log("You aren't authenticatd, redirecting to sign-in")
    next("/sign-in");
    return;
  }

  return next();
});

export default router;
