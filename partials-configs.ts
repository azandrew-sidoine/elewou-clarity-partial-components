
/**
 * This file defines configuration values that are shared accross modules
 */
export const partialConfigs = {
  routes: {
    commonRoutes: {
      dashboardRoute: 'dashboard',
      dashboardHomeRoute: 'dashboard/home',
      homeRoute: 'home',
      settings: 'settings',
      clientsHomeRoute: 'registration-home',
      clientsAddEditRoute: 'member-edit',
      clientsViewRoute: 'member-view',
      procurationsManageRoute: 'procurations-manage',
    },
  }
};
// Common routes
export const commonRoutes =  partialConfigs.routes.commonRoutes;

// Default paths definitions
export const defaultPath = `/${partialConfigs.routes.commonRoutes.dashboardRoute}`;


// Fixed value of the currency used in the application
export const APPLICATION_CURRENCY = 'XOF';
// File types definitions
export const imagesMimeExtensions = ['bmp', 'gif', 'ico', 'jpg', 'jpeg', 'png', 'svg', 'tiff', 'tif', 'webp'];
