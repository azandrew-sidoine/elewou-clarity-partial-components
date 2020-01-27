import { Injectable } from '@angular/core';
import {
  postRessource,
  deleteRessource,
  putRessource
} from 'src/app/lib/domain/contracts/abstract-request-client';
import { HttpRequestService, IResponseBody } from 'src/app/lib/domain/http/core';
import { ISerializableBuilder } from 'src/app/lib/domain/built-value/contracts/serializers';
import { TranslationService } from 'src/app/lib/domain/translator/translator.service';
import { RessourceAssignment } from './ressource-assignment';
import { isDefined } from '../../../domain/utils/type-utils';

@Injectable()
export class RessourceRequestProcessingService {

  public readonly assignationRessoucesPath = 'ressources/ressource_assignations';

  /**
   * @description Service initializer
   */
  constructor(
    private client: HttpRequestService,
    private translate: TranslationService
  ) {
  }

  /**
   * @description Returns a list of translation that can be use on the Immatriculation component and it children
   */
  loadTranslations(ressourceId?: string|number, username?: string, count?: number): Promise<any> {
    return this.translate.translate([
      'invalidRequestParams',
      'serverRequestFailed',
      'successfulRequest',
      'validationPrompt',
      'rejectionPrompt',
      'successfulValidation',
      'successfulRejection',
      'assignmentPrompt',
      'successfullAssignment',
      'batchAssignmentPrompt'
    ], {name: `Demande No ${ressourceId}`, username, count}).toPromise();
  }

  public createAssignment(requestURL: string, requestBody: object|object[]) {
    return postRessource<RessourceAssignment>(
      this.client,
      `${requestURL}`,
      requestBody,
      RessourceAssignment.builder() as ISerializableBuilder<RessourceAssignment>
    );
  }

  /**
   * @inheritdoc
   */
  deleteRessource(requestURL: string, id: any): Promise<IResponseBody> {
    return deleteRessource<RessourceAssignment>(
      this.client,
      requestURL,
      id,
    );
  }

  /**
   * @inheritdoc
   */
  updateRessource(requestURL: string, id: any, values: object): Promise<IResponseBody> {
    return putRessource<RessourceAssignment>(
      this.client,
      `${requestURL}`,
      id,
      values,
    );
  }

  isDefined(value: any) {
    return isDefined(value);
  }
}