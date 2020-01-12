/**
 * This file defines configuration values that are shared accross modules
 */
export const partialConfigs = {
  routes: {
    commonRoutes: {
      // Dashboard module route paths
      dashboardRoute: 'dashboard',
      // Home component route path
      dashboardHomeRoute: 'dashboard/home',
      // Home component relative route path
      homeRoute: 'home',
    },
    adminModuleRoutes: {
      // Management routes
      managementsRoute: 'managements',
      // Account routes
      accountRoute: 'account',
      // Roles management routes
      rolesManagementRoute: 'roles',
      // Role creation routes
      createRole: 'roles/create',
      // Role update route
      updatedRoleRoute: 'roles/update',
      // User creation routes
      createUsersRoute: 'users/create',
      // Users update route
      updatedUserRoute: 'users/update',
      // User creation routes
      listUsersRoute: 'users/list',
      // Forms management routes
      formsManagementRoute: 'forms',
      // Forms creation routes
      createFormsRoute: 'forms/create',
      // Module management routes
      modulesManagementRoute: 'modules',
      // Module management routes
      createModulesRoute: 'modules/create',
      // Module management routes
      updateModulesRoute: 'modules/update',
    },
    immatriculationModuleRoutes: {
      // Enregistrement routes
      enregistrementRoute: 'home/enregistrement',
      // Dossier enregistrement routes
      listRecordsRoute: 'home/liste-enregistrements',
      // Dossier Structures routes
      structuresRoute: 'home/structures',
      // Dossier Travailleurs routes
      workersRoute: 'home/workers',
      // Ajouter Structures routes
      addStructureRoute: 'home/structures/add-structure',
      // Mon compte routes
      userInfoRoute: 'profile',
      // Adhésion RC route
      membershipRcRoute: 'home/membership_rc',
      // Adhésion Employeurs Route
      membershipRcEmployersRoute: 'home/employers',
      // Liste Demandes d'Adhésion Route
      membershipRcListRoute: 'home/membership_list',
      // Liste Adhérents
      membershipRcMembersRoute: 'home/members_rc',
    }
  },
  assignableCollections: {
    imm_requests: 1,
    rtiei_contribution_declarations: 2,
    rtiei_contribution_payments: 3
  },
  acl: {
    all: 'all',
    create_departments: 'create-departments',
    create_imm_request_assignation: 'create-imm-request-assignation',
    create_imm_requests: 'create-imm-requests',
    create_members: 'create-members',
    create_organisations: 'create-organisations',
    create_permissions: 'create-permissions',
    create_roles: 'create-roles',
    create_rtiei_contribution_declaration_assignations: 'create-rtiei-contribution-declaration-assignations',
    create_rtiei_contribution_payment_assignations: 'create-rtiei-contribution-payment-assignations',
    create_rtiei_contribution_declarations: 'create-rtiei-contribution-declarations',
    create_rtiei_contribution_payments: 'create-rtiei-contribution-payments',
    create_rtiei_membership_request_assignations: 'create-rtiei-membership-request-assignations',
    create_rtiei_membership_requests: 'create-rtiei-membership-requests',
    delete_departments: 'delete-departments',
    delete_imm_request_assignation: 'delete-imm-request-assignation',
    delete_imm_requests: 'delete-imm-requests',
    delete_members: 'delete-members',
    delete_organisations: 'delete-organisations',
    delete_permissions: 'delete-permissions',
    delete_roles: 'delete-roles',
    delete_rtiei_contribution_declaration_assignations: 'delete-rtiei-contribution-declaration-assignations',
    delete_rtiei_contribution_declarations: 'delete-rtiei-contribution-declarations',
    delete_rtiei_contribution_payment_assignations: 'delete-rtiei-contribution-payment-assignations',
    delete_rtiei_contribution_payments: 'delete-rtiei-contribution-payments',
    delete_rtiei_membership_request_assignations: 'delete-rtiei-membership-request-assignations',
    delete_rtiei_membership_requests: 'delete-rtiei-membership-requests',
    list_departments: 'list-departments',
    list_imm_request_assignations: 'list-imm-request-assignations',
    list_imm_requests: 'list-imm-requests',
    list_members: 'list-members',
    list_organisations: 'list-organisations',
    list_permissions: 'list-permissions',
    list_roles: 'list-roles',
    list_rtiei_accounts: 'list-rtiei-accounts',
    list_rtiei_contribution_declaration_assignations: 'list-rtiei-contribution-declaration-assignations',
    list_rtiei_contribution_declarations: 'list-rtiei-contribution-declarations',
    list_rtiei_contribution_payment_assignations: 'list-rtiei-contribution-payment-assignations',
    list_rtiei_contribution_payments: 'list-rtiei-contribution-payments',
    list_rtiei_membership_request_assignations: 'list-rtiei-membership-request-assignations',
    list_rtiei_membership_requests: 'list-rtiei-membership-requests',
    manage_departments: 'manage-departments',
    manage_organisations: 'manage-organisations',
    manage_permissions: 'manage-permissions',
    manage_roles: 'manage-roles',
    update_departments: 'update-departments',
    update_imm_request_assignation: 'update-imm-request-assignation',
    update_imm_requests: 'update-imm-requests',
    update_members: 'update-members',
    update_organisations: 'update-organisations',
    update_password: 'update-password',
    update_permissions: 'update-permissions',
    update_roles: 'update-roles',
    update_rtiei_contribution_declaration_assignations: 'update-rtiei-contribution-declaration-assignations',
    update_rtiei_contribution_declarations: 'update-rtiei-contribution-declarations',
    update_rtiei_contribution_payment_assignations: 'update-rtiei-contribution-payment-assignations',
    update_rtiei_contribution_payments: 'update-rtiei-contribution-payments',
    update_rtiei_membership_request_assignations: 'update-rtiei-membership-request-assignations',
    update_rtiei_membership_requests: 'update-rtiei-membership-requests',
    list_structures: 'list-structures',
    create_structures: 'create-structures',
    update_structures: 'update-structures',
    delete_structures: 'delete-structures',
    list_modules: 'list-modules',
    create_modules: 'create-modules',
    update_modules: 'update-modules',
    delete_modules: 'delete-modules'
  }
};

