import { backendRoutes } from './backend-route-paths';
import { immRequestExcelSheetHeaders, rcDncHeaders } from './excel-sheets-headers';
import { appAccessControlList } from './access-control-list';
import { routeDefinitions as adminModuleRoutes } from './admin-route-definitions';
import { immatriculationRouteDefinitions as immatriculationModuleRoutes } from './immatriculation-route-definitions';
import { contributionRouteDefinitions as contributionsModuleRoutes } from './contribution-route-definitions';
import { liquidationRouteDefinitions as liquidationsModuleRoutes } from './liquidation-route-definitions';
import { accountingRouteDefinitions as comptabiliteModuleRoutes } from './accounting-route-definitions';
import { onboardingDeskRouteDefinitions } from './onboarding-desk-route-definitions';

/**
 * This file defines configuration values that are shared accross modules
 */
export const partialConfigs = {
  routes: {
    commonRoutes: {
      dashboardRoute: 'dashboard',
      dashboardHomeRoute: 'dashboard/home',
      homeRoute: 'home',
    },
    adminModuleRoutes,
    immatriculationModuleRoutes,
    contributionsModuleRoutes,
    liquidationsModuleRoutes,
    comptabiliteModuleRoutes,
  },
  acl: appAccessControlList,
  backendRoutesPaths: backendRoutes,
  // clientRoutePaths: clientRoutes,
  immRequestExcelHeaders: immRequestExcelSheetHeaders,
  rcDncExcelHeaders: rcDncHeaders,
  assignableCollections: {
    rtiei_membership_requests: 1,
    rtiei_contribution_declarations: 2,
    rtiei_contribution_payments: 3,
    rtiei_liquidations: 4,
    rc_membership: 5,
    rc_contribution_declarations: 6,
    rc_liquidations: 7,
  },
  latestTaskNumberOfMinutes: 2280,
  min_life_annuity: 10500,
  retirement_age: 55,
  declarationsExcelHeaders: {
    insurance_id: 'Numero assurance',
    amount: 'Montant Cotisation'
  },
  liquidationTypes: {
    rachatTypeID: 1,
    capitalTypeID: 4,
    reversionTypeID: 5,
    annuityTypeID: 2,
    invalidityTypeID: 3,
    invalidityAnnuity: 6
  },
  liquidationTypeBusinessDayLabel: {
    annuity: {
      id: 2,
      rtieiBusinessDayLabel: 'rcap_annuity_business_days',
      rcBusinessDayLabel: 'rcomp_annuity_business_days'
    },
    capital: {
      id: 4,
      rtieiBusinessDayLabel: 'rcap_allocation_allowance_business_days',
      rcBusinessDayLabel: 'rcomp_allocation_allowance_business_days'
    },
    reversion: {
      id: 5,
      rtieiBusinessDayLabel: 'rcap_reversion_allowance_business_days',
      rcBusinessDayLabel: 'rcomp_reversion_allowance_business_days'
    },
    invalidity: {
      id: 3,
      rtieiBusinessDayLabel: 'rcap_invalidity_allowance_business_days',
      rcBusinessDayLabel: 'rcomp_invalidity_allowance_business_days'
    },
    invalidityAnnuity: {
      id: 6,
      rtieiBusinessDayLabel: 'rcap_invalidity_annuity_business_days',
      rcBusinessDayLabel: 'rcomp_invalidity_annuity_business_days'
    }
  },
  regimes: {
    rCompID: 3,
    rCapID: 2,
    rRevID: 1
  }
};

// Add new constants here for module path
// Default Dashboard path
export const defaultPath = `/${partialConfigs.routes.commonRoutes.dashboardRoute}`;
// Immatriculation Module Path
export const immatriculationPath = immatriculationModuleRoutes;
// Liquidation Module Path
export const liquidationsPath = liquidationsModuleRoutes;
// Contriution Module Path
export const contributionPath = contributionsModuleRoutes;
// Contriution Module Path
export const comptabilitePath = comptabiliteModuleRoutes;
// Admin module path
export const adminPath = adminModuleRoutes;
// Route definitions for backend ressources
export const backendRoutePaths = backendRoutes;
// Route definitions for clients ressources

// Route definitions for dossiers ressources
export const onboardingDeskPaths = onboardingDeskRouteDefinitions;

// contribution cotisation account id
export const contributionAccountType = 1;
// individual account id
export const individualAccountType = 2;
// retirement account id
export const retirementAccountType = 3;

// Ressources Datasource Injection Tokens
// Admin Module
export const USERS_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'UsersDatasource';
// Department Data source provider key
export const DEPARTMENT_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'DepartmentDataSource';

// Rtiei Modules
// ImmRequest Data source provider key
export const RTIEI_MEMBERSHIP_REQUEST_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'ImmRequestDataSource';
// inWorkers Data source provider key
export const IN_WORKERS_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'InWorkersDataSource';
// Strutures Data source provider key
export const STRUCTURES_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'StructuresDataSource';
// Rtiei Contribution declaration data source injection token
export const RTIEI_CONTRIBUTION_DECLRATION_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'RtieiContributionDeclarationDataSource';

// Rc Module data source
export const RC_MEMBERSHIP_DATASOURCE_INJECTION_TOKEN = 'RcMembershipDataSource';
// Rc Member data source injection token
export const RC_MEMBERS_DATASOURCE_INJECTION_TOKEN = 'RcMembersDataSource';
// Rc Contribution declaration data source injection token
export const RC_CONTRIBUTION_DECLRATION_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'RcContributionDeclarationDataSource';


// Type of possible liquidations
export const liquidationTypes = partialConfigs.liquidationTypes;

export const liquidationTypesBusinessDayLabels = partialConfigs.liquidationTypeBusinessDayLabel;

// Complementary retirement entity definition for structures
export const RC_STRUCTURES = 'rc_structures';
// Complementary retireement entity definition for members
export const RC_MEMBERS = 'rc_members';

// Fixed value of the currency used in the application
export const APPLICATION_CURRENCY = 'XOF';

// Member types constantes
export const independantWorker = 2;
export const worshipMinister = 3;
export const informalWorkers = 1;

// File types definitions
export const imagesMimeExtensions = ['bmp', 'gif', 'ico', 'jpg', 'jpeg', 'png', 'svg', 'tiff', 'tif', 'webp'];

// Liquidation types groups
export const allowanceLiquidationTypes = [
  partialConfigs.liquidationTypes.rachatTypeID,
  partialConfigs.liquidationTypes.capitalTypeID,
  partialConfigs.liquidationTypes.reversionTypeID,
  partialConfigs.liquidationTypes.invalidityTypeID
];

export const annuityLiquidationTypes = [
  partialConfigs.liquidationTypes.annuityTypeID,
  partialConfigs.liquidationTypes.invalidityAnnuity
];
// ! END Liquidation types groups

// Component form ids constants
export { rcModulesForms, inModulesForms } from './modules-forms';

// Export authorizations
export {
  adminPermissions,
  contributionPermissions,
  rcContributionPermissions,
  rcMembershipPermissions,
  rtieiMembershipRequestPermissions,
  rtieiLiquidationPermissions,
  rcLiquidationPermissions,
  cptaPermissions
} from './modules-authorizations';
