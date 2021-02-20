import { backendRoutes } from './backend-route-paths';
import { appAccessControlList } from './access-control-list';
import { routeDefinitions as adminModuleRoutes } from './admin-route-definitions';

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
    adminModuleRoutes
  },
  acl: appAccessControlList,
  backendRoutesPaths: backendRoutes
};

// Add new constants here for module path
// Default Dashboard path
export const defaultPath = `/${partialConfigs.routes.commonRoutes.dashboardRoute}`;
// Admin module path
export const adminPath = adminModuleRoutes;
// Route definitions for backend ressources
export const backendRoutePaths = backendRoutes;

// Ressources Datasource Injection Tokens
// Admin Module
export const USERS_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'UsersDatasource';
// Department Data source provider key
export const DEPARTMENT_PAGINATOR_DATASOURCE_INJECTION_TOKEN = 'DepartmentDataSource';


// Fixed value of the currency used in the application
export const APPLICATION_CURRENCY = 'XOF';
// File types definitions
export const imagesMimeExtensions = ['bmp', 'gif', 'ico', 'jpg', 'jpeg', 'png', 'svg', 'tiff', 'tif', 'webp'];


// Export authorizations
export {
  adminPermissions,
} from './modules-authorizations';
