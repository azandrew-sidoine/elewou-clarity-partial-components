export const routeDefinitions = {
  // --- APP USER ROUTE -----
  // Données entrantes
  incomingListRoute: 'incoming/list',
  incomingEditRoute: 'incoming/edit',

  // Gestion des données de contrôle
  controlListRoute: 'control/list', // liste des contrôles
  controlStatsRoute: 'control/stats', // Statistiques des contrôle

  // Gestion des droits et Beneficiaires
  rightsListRoute: 'rights/list',
  excelRightsListRoute: 'excel_rights/list',
  recipientsRoute: 'rights/recipients',
  recipientsActiveRoute: 'rights/reciepients',
  recipientsInactiveRoute: 'rights/recipients/inactive',

  // Réglages de contrôles
  settingsRoute: 'settings',
  migrateDataRoute: 'settings/migrate-data', //Import & Export
  fingersRoute: 'settings/fingers', //Import & Export
  addressRoute: 'settings/addresse', //Import & Export
  rightsTypeRoute: 'settings/rights', // Type of rights
  devicesRoute: 'settings/devices', //Liste des peripheriques de contrôle
  editionsRoute: 'settings/editions', // Editions de contrôle de vie
  sessionsRoute: 'settings/sessions', // Liste des sessions de contrôle par edition
  dataTypesRoute: 'settings/data-type', // Type de donnees biometriques

  rightsBinding: 'right-binding', // liaison des droits

  enrollement: 'enrollement', // enrollement
  geolocation: 'geolocation',
};
