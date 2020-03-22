import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { AppUIStoreManager } from 'src/app/lib/domain/helpers/app-ui-store-manager.service';
import { User } from 'src/app/lib/domain/auth/models/user';
import { RessourceRequestProcessingService } from './ressource-request-processing.service';
import { Dialog } from 'src/app/lib/domain/utils/window-ref';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { IDynamicForm, IHTMLFormControl } from 'src/app/lib/domain/components/dynamic-inputs/core';
import { DynamicControlParser } from 'src/app/lib/domain/helpers/dynamic-control-parser';
import { TypeUtilHelper } from 'src/app/lib/domain/helpers/type-utils-helper';

@Component({
  selector: 'app-ressource-request-processing',
  templateUrl: './ressource-request-processing.component.html',
  styles: [
    `
    .required-text,
    .field-has-error {
      color: rgb(241, 50, 50);
    }

    .clr-control-container textarea {
      min-width: 100% !important;
    }

    .clr-select-wrapper {
      min-width: 100% !important;
    }
    .clr-form-control-container {
      margin: 24px auto;
    }
    `
  ]
})
export class RessourceRequestProcessingComponent extends AbstractAlertableComponent implements OnInit {

  @Input() url: string;
  @Input() id: number | string;
  @Input() permission: string;
  @Input() collectionID: string | number;
  users: User[] = [];
  authenticatedUser: User;
  @Input() assignationButtonDisabled = false;
  @Input() rejectionButtonDisabled = false;
  @Input() validationButtonDisabled = false;

  @Input() validationForm: IDynamicForm;
  @Output() validationFormSumitted = new EventEmitter<{translations: any, body: object}>();
  validationFormGroup: FormGroup;

  @Output() assignmentCompletedSuccessfully = new EventEmitter();
  @Output() ressourceHandlerCompleted = new EventEmitter<number>();

  modalOpened = false;
  modalDescriptionText: string;
  validating: boolean;

  validationFormModalOpen: boolean;

  // Observation form control
  formControl = new FormControl(null, Validators.compose([
    Validators.required,
    Validators.maxLength(255)
  ]));

  constructor(
    uiStore: AppUIStoreManager,
    public componentService: RessourceRequestProcessingService,
    private dialog: Dialog,
    private typeHelper: TypeUtilHelper,
    private controlParser: DynamicControlParser
  ) { super(uiStore); }

  ngOnInit() {}

  buildValidationFormGroup(form: IDynamicForm, title?: string, description?: string) {
    this.validationForm = form;
    this.validationForm.title = this.typeHelper.isDefined(title) ? title : form.title;
    this.validationForm.description = this.typeHelper.isDefined(description) ? description : form.description;
    this.validationFormGroup = this.controlParser.buildFormGroupFromInputConfig(form.controlConfigs as IHTMLFormControl[]) as FormGroup;
  }

  async performRessourceProcessingAction(value: boolean) {
    if (!this.rejectionButtonDisabled && !this.validationButtonDisabled) {
      const translations = await this.componentService.loadTranslations(this.id);
      if (value) {
        // this.modalDescriptionText = translations.validationPrompt;
        this.validating = value;
        if (this.typeHelper.isDefined(this.validationForm)) {
          this.validationFormModalOpen = true;
        } else if (this.dialog.confirm(translations.validationPrompt)) {
          this.onValidate(translations);
        }
      } else {
        this.modalDescriptionText = translations.rejectionPrompt;
        this.modalOpened = true;
        this.validating = value;
      }
    }
  }

  async confirmDataProcessingAction() {
    if (!this.rejectionButtonDisabled && !this.validationButtonDisabled) {
      this.formControl.markAllAsTouched();
      const translations = await this.componentService.loadTranslations(this.id);
      if (this.validating) {
        this.onValidate(translations);
        return;
      }
      this.onReject(translations);
    }
  }

  async validateProcess() {
    const translations = await this.componentService.loadTranslations(this.id);
    this.validationFormSumitted.emit({translations, body: this.validationFormGroup.getRawValue()});
  }

  onValidate(translations: any, requestObjet?: object | any) {
    const obj = this.typeHelper.isDefined(requestObjet) ? Object.assign(requestObjet, { status: 1 }) :
      { status: 1, observations: this.formControl.value };
    this.appUIStoreManager.initializeUIStoreAction();
    this.componentService.updateRessource(this.url, this.id, obj).then((res) => {
      if (res.statusOK) {
        this.doCancelAction();
        this.validationButtonDisabled = true;
        this.rejectionButtonDisabled = true;
        this.assignationButtonDisabled = true;
        this.showSuccessMessage(translations.successfulValidation);
        this.ressourceHandlerCompleted.emit(1);
      } else if (res.errors) {
        this.showBadRequestMessage(translations.invalidRequestParams);
      } else {
        this.showBadRequestMessage(translations.serverRequestFailed);
      }
    })
      .catch((_) => {
        this.showErrorMessage(translations.serverRequestFailed);
      });
  }

  onReject(translations: any) {
    if (this.formControl.valid) {
      this.appUIStoreManager.initializeUIStoreAction();
      this.componentService.updateRessource(
        this.url,
        this.id,
        { status: 2, observations: this.formControl.value },
      ).then((res) => {
        if (res.statusOK) {
          this.doCancelAction();
          this.validationButtonDisabled = true;
          this.rejectionButtonDisabled = true;
          this.assignationButtonDisabled = true;
          this.showSuccessMessage(translations.successfulRejection);
          this.ressourceHandlerCompleted.emit(2);
        } else if (res.errors) {
          this.showBadRequestMessage(translations.invalidRequestParams);
        } else {
          this.showBadRequestMessage(translations.serverRequestFailed);
        }
      })
        .catch((_) => {
          this.showErrorMessage(translations.serverRequestFailed);
        });
    }
  }

  doValidationCancelAction() {
    this.validationFormGroup.reset();
    this.validationFormModalOpen = false;
  }

  doCancelAction() {
    this.formControl.reset();
    this.modalOpened = false;
  }

}
