
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
      // CLIENTS
      clientsHomeRoute: 'clients-home',
      clientsListRoute: 'clients-list',
      clientsAddEditRoute: 'client-edit',
      clientsViewRoute: 'client-view',
      procurationsManageRoute: 'procurations-manage',

      // ACCOUNTS
      accountHomeRoute:'account_home',
      accountListRoute:'account_list',

      // CAISSE
      cashierHomeRoute:'cashier_home',
      cashierListRoute: 'cashier_list',
      cashierAddRoute: 'cashier_add',
      cashierOperationAddRoute: 'cashier_operation_add',

      // CREDITS
      creditsHomeRoute: 'credits_home',
      creditsListRoute: 'credits_list',
      creditAddRoute: 'credit_add ',

      // BANQUES
      bankHomeRoute: 'bank_home',
      bankListRoute: 'bank_list',
      bankAddRoute: 'bank_add',

      // DAT
      datHomeRoute: 'dat_home',
      datListRoute: 'dat_list',
      datAddRoute: 'dat_add',
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
