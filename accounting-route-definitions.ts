export const accountingRouteDefinitions = {
  // Register Saisie Ecritures
  tieiSaisieEcrituresRoute: 'tiei-saisie-ecritures',
  tieiAjoutEcrituresRoute: 'add-ecriture',
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
  actAutomaticRecordsPath: 'act-automatic-records',

  actSelectEntityRoute: 'select-entity',

  //annexes
  emploisRessources: 'emplois-ressources',
  immobilisation: 'immobilisation',
  amortissement: 'amortissement',
  provisions: 'provisions',
  tafir1: 'tafir1',
  tafir2: 'tafir2',
};

export enum accountingRouteParams {
  id = '/:id',
}
