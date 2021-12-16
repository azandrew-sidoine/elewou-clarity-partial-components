export const accountingRouteDefinitions = {
  // Register Saisie Ecritures
  tieiSaisieEcrituresRoute: 'tiei-saisie-ecritures',
  tieiAjoutEcrituresRoute: 'add-ecriture',
  tieiSaisieEcrituresReleveRoute: 'releve-ecriture',
  // Register Saisie Ecritures details
  tieiSaisieEcrituresDetailsRoute: 'tiei-saisie-ecritures/details',
  tieiSaisieEcrituresUpdateRoute: 'tiei-saisie-ecritures/update',
  // Balance
  tieiBalanceRoute: 'tiei-balance/liste',
  // grand livre
  tieiGrandlivreRoute: 'tiei-grand-livre/liste',
  // Manage Deversements
  tieiDeversementsRoute: 'tiei-deversements',
  // Gestion Etats Financiers
  tieiEtatsFinanciersRoute: 'tiei-etats-financiers',
  tieiEtatsFinanciersBilanRoute: 'tiei-bilan',
  tieiEtatsFinanciersResultatRoute: 'tiei-resultat',

  // Ordonnance Paramétrages
  tieiParametrageComptesRoute: 'tiei-parametrage-comptes',
  actBalanceSheetRoute: 'act-parametrage-bilan',
  actBalanceSheetRootRoute: 'act-parametrage-bilan-root',
  actResultAccountRoute: 'act-parametrage-resultat',
  actResultAccountRootRoute: 'act-parametrage-resultat-root',
  actAccountNatureRoute: 'act-parametrage-nature',
  actAccountNatureRootRoute: 'act-parametrage-nature-roots',

  // exerices
  actExerciseRoute: 'exercise',
  actExercisePeriodRoute: 'exercise-period',

  // type operation / type journal
  actTypeJournalRoute: 'act-type-journal',
  actTypeJournalOperation: 'act-type-operation',

  // informations de compte (company, director, setting)
  actSettingsRoute: 'settings/general',
  actCompanyRoute: 'settings/company',
  actDirectorRoute: 'settings/company-director',

  // Onboarding root
  tieiOnBoardRoute: 'act-onBoard',

  // Automatic accouting record configurations
  actAutomaticRecordConfigurationPath: 'settings/act-automatic-records',
  actRcapAutomaticRecordsPath: 'rcap-act-automatic-records',

  actSelectEntityRoute: 'select-entity',

  //annexes
  emploisRessources: 'emplois-ressources',
  immobilisation: 'immobilisation',
  amortissement: 'amortissement',
  provisions: 'provisions',
};

export enum accountingRouteParams {
  id = '/:id',
}
