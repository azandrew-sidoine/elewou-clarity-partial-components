import { Component, Input, EventEmitter, Output } from "@angular/core";
import {
  AppUIStateProvider,
  UIStateStatusCode,
} from "src/app/lib/domain/helpers/app-ui-store-manager.service";
import { User } from "src/app/lib/domain/auth/contracts/v2";
import { RessourceRequestProcessingService } from "./ressource-request-processing.service";
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from "@angular/forms";
import {
  IDynamicForm,
  IHTMLFormControl,
} from "src/app/lib/domain/components/dynamic-inputs/core";
import { DynamicControlParser } from "src/app/lib/domain/helpers/dynamic-control-parser";
import { Dialog } from "src/app/lib/domain/utils";
import { ProcessActionType, ResourceStatus } from "./types";
import { isFunction } from "lodash";

@Component({
  selector: "app-ressource-request-processing",
  templateUrl: "./ressource-request-processing.component.html",
  styles: [
    `
      .required-text,
      .field-has-error {
        color: rgb(241, 50, 50);
      }

      .clr-control-container textarea,
      .clr-control-container input[type="text"] {
        /* width: 100% !important; */
        width: 400px !important;
        max-width: 100% !important;
      }

      /* .clr-select-wrapper {
      min-width: 100% !important;
    } */
      .clr-form-control-container {
        /* width: 100% !important! */
        margin: 24px auto;
      }
    `,
  ],
})
export class RessourceRequestProcessingComponent {
  @Input() url: string;
  @Input() id: number | string;
  @Input() permission: string;
  @Input() collectionID: string | number;
  users: User[] = [];
  @Input() assignationButtonDisabled = false;
  @Input() rejectionButtonDisabled = false;
  @Input() validationButtonDisabled = false;
  // tslint:disable-next-line: no-inferrable-types
  @Input() triggerButtonClass: string = "btn btn-primary btn-sm";
  // tslint:disable-next-line: no-inferrable-types
  @Input() showAssignmentButton: boolean = true;
  @Input() showValidateButton: boolean = true;
  @Input() showRejectButton: boolean = true;

  @Input("validationForm") form: IDynamicForm;
  @Output("validationFormSumitted") submitted = new EventEmitter<{
    translations: any;
    body: object;
  }>();
  validationFormGroup: FormGroup;
  @Output() assignmentCompletedSuccessfully = new EventEmitter();
  @Output() ressourceHandlerCompleted = new EventEmitter<number>();

  // tslint:disable-next-line: no-inferrable-types
  @Input() validatedStatusCode: number = ResourceStatus.VALIDATED;
  // tslint:disable-next-line: no-inferrable-types
  @Input() rejectedStatusCode: number = ResourceStatus.REJETED_OR_CANCELLED;
  // tslint:disable-next-line: no-inferrable-types
  @Input() pendingStatuCode: number = ResourceStatus.PENDING;

  showRejectModal = false;
  private _actionType = ProcessActionType.VALIDATION;
  showValidationModal: boolean;

  // Observation form control
  formControl = new FormControl(
    null,
    Validators.compose([Validators.required, Validators.maxLength(255)])
  );

  // Modals buttons text
  @Input() rejectBtnText = "ANNULER/REJETER";
  @Input() validateBtnText = "VALIDER";

  @Input() cancelFormActionBtnText = "ANNULER";
  @Input() confirmFormActionBtnText = "CONFIRMER";

  @Input() rejectModalTitle = "Observation de traitement";
  private _rejectModalDescription: string;
  @Input() set rejectModalDescription(value: string) {
    this._rejectModalDescription = value;
  }
  get rejectModalDescription() {
    return this._rejectModalDescription;
  }
  @Input() observationInputLabelText = "Observation";
  @Input() onRejectFormSubmitted: (
    control: AbstractControl,
    resourceID: string | number
  ) => void;

  public state$ = this.uiState.uiState;
  // Emitted when the form group is initialized
  @Output() formGroupReadyStateChanges = new EventEmitter<AbstractControl>();

  constructor(
    private uiState: AppUIStateProvider,
    public componentService: RessourceRequestProcessingService,
    private dialog: Dialog,
    private controlParser: DynamicControlParser
  ) {}

  public setResourceID(id: string | number) {
    this.id = id;
    return this;
  }

  buildValidationFormGroup = (
    form: IDynamicForm,
    title?: string,
    description?: string
  ) => {
    this.form = form;
    this.form.title = title ?? form.title;
    this.form.description = description ?? form.description;
    this.validationFormGroup = this.controlParser.buildFormGroupFromInputConfig(
      form.controlConfigs as IHTMLFormControl[]
    ) as FormGroup;
    this.formGroupReadyStateChanges.emit(this.validationFormGroup);
  };

  performRessourceProcessingAction = async (value: boolean) => {
    const translations = await this.componentService.loadTranslations(this.id);
    return value
      ? this._handleValidation(translations)
      : this._handleRejectAction(translations);
  };

  private _handleValidation = (translations: { [index: string]: any }) => {
    this._actionType = ProcessActionType.VALIDATION;
    this.form
      ? (this.showValidationModal = true)
      : this.dialog.confirm(translations.validationPrompt)
      ? this.onValidate(translations)
      : false;
  };

  private _handleRejectAction = (translations: { [index: string]: any }) => {
    this.rejectModalDescription =
      this.rejectModalDescription ?? translations.rejectionPrompt;
    this.showRejectModal = true;
    this._actionType = ProcessActionType.REJECTION;
  };

  confirmDataProcessingAction = async () => {
    this.formControl.markAllAsTouched();
    const translations = await this.componentService.loadTranslations(this.id);
    return this._actionType === ProcessActionType.VALIDATION
      ? this.onValidate(translations)
      : isFunction(this.onRejectFormSubmitted)
      ? this.onRejectFormSubmitted(this.formControl, this.id)
      : this.onReject(translations);
  };

  validateProcess = async () => {
    const translations = await this.componentService.loadTranslations(this.id);
    this.submitted.emit({
      translations,
      body: this.validationFormGroup.getRawValue(),
    });
  };

  onValidate = (translations: any, requestObjet?: object | any) => {
    const obj = requestObjet
      ? { ...requestObjet, status: this.validatedStatusCode }
      : {
          status: this.validatedStatusCode,
          observations: this.formControl.value,
        };
    this.uiState.startAction();
    this.componentService
      .updateRessource(this.url, this.id, obj)
      .then((res) => {
        if (res.statusOK) {
          this.doCancelAction();
          this.validationButtonDisabled = true;
          this.rejectionButtonDisabled = true;
          this.assignationButtonDisabled = true;
          this.uiState.endAction(
            translations.successfulValidation,
            UIStateStatusCode.STATUS_OK
          );
          this.ressourceHandlerCompleted.emit(this.validatedStatusCode);
        } else if (res.errors) {
          this.uiState.endAction(
            translations.invalidRequestParams,
            UIStateStatusCode.BAD_REQUEST
          );
        } else {
          this.uiState.endAction(
            translations.serverRequestFailed,
            UIStateStatusCode.ERROR
          );
        }
      })
      .catch((_) => {
        this.uiState.endAction(
          translations.serverRequestFailed,
          UIStateStatusCode.ERROR
        );
      });
  };

  onReject = (translations: any) => {
    if (this.formControl.valid) {
      this.uiState.startAction();
      this.componentService
        .updateRessource(this.url, this.id, {
          status: this.rejectedStatusCode,
          observations: this.formControl.value,
        })
        .then((res) => {
          if (res.statusOK) {
            this.doCancelAction();
            this.disableActionButtons();
            this.uiState.endAction(
              translations.successfulRejection,
              UIStateStatusCode.STATUS_OK
            );
            this.ressourceHandlerCompleted.emit(this.rejectedStatusCode);
          } else if (res.errors) {
            this.uiState.endAction(
              translations.serverRequestFailed,
              UIStateStatusCode.ERROR
            );
          } else {
            this.uiState.endAction(
              translations.serverRequestFailed,
              UIStateStatusCode.ERROR
            );
          }
        })
        .catch((_) => {
          this.uiState.endAction(
            translations.serverRequestFailed,
            UIStateStatusCode.ERROR
          );
        });
    }
  };

  doFinishAction = () => {
    this.showValidationModal = false;
    this.showRejectModal = false;
  };

  doValidationCancelAction = () => {
    this.validationFormGroup.reset();
    this.showValidationModal = false;
  };

  disableActionButtons = () => {
    this.validationButtonDisabled = true;
    this.rejectionButtonDisabled = true;
    this.assignationButtonDisabled = true;
  };

  doCancelAction = () => {
    this.formControl.reset();
    this.showRejectModal = false;
  };
}
