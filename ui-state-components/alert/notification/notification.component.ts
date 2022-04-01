import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { createSubject } from 'src/app/lib/core/rxjs/helpers';
import { isDefined } from 'src/app/lib/core/utils';
import {
  UIState,
  UIStateStatusCode,
  uiStatusUsingHttpErrorResponse,
} from 'src/app/lib/core/ui-state';
import { ErrorHandler } from 'src/app/lib/core/http/contracts/error-handler';
import { isServerBadRequest, HTTP_CLIENT } from 'src/app/lib/core/http';

@Component({
  selector: 'app-ui-notification',
  template: `
    <ng-container *ngIf="state$ | async as state">
      <drewlabs-action-notification-container *ngIf="!state.hidden">
        <ng-container [ngSwitch]="state.status">
          <clr-alert
            *ngSwitchCase="uiStateResultCode.ERROR"
            [clrAlertType]="'danger'"
            [clrAlertClosable]="false"
          >
            <clr-alert-item>
              <span
                class="alert-text"
                [innerHTML]="
                  state?.message || 'serverRequestFailed'
                    | translate
                    | safeWebContent
                "
              ></span>
              <div class="alert-actions">
                <clr-icon
                  shape="times"
                  (click)="onClrAlertClosedChanged(true)"
                ></clr-icon>
              </div>
            </clr-alert-item>
          </clr-alert>
          <!-- Case bad request input authentication -->
          <clr-alert
            *ngSwitchCase="uiStateResultCode.BAD_REQUEST"
            [clrAlertType]="'warning'"
            [clrAlertClosable]="false"
          >
            <clr-alert-item>
              <span
                class="alert-text"
                [innerHTML]="
                  state.message ?? 'invalidRequestParams'
                    | translate
                    | safeWebContent
                "
              ></span>
              <div class="alert-actions">
                <clr-icon
                  shape="times"
                  (click)="onClrAlertClosedChanged(true)"
                ></clr-icon>
              </div>
            </clr-alert-item>
          </clr-alert>
          <!-- Case invalid credentials -->
          <clr-alert
            *ngSwitchCase="uiStateResultCode.UNAUTHENTICATED"
            [clrAlertType]="'warning'"
            [clrAlertClosable]="false"
          >
            <clr-alert-item>
              <span
                class="alert-text"
                [innerHTML]="'login.authenticationFailed' | translate"
              ></span>
              <div class="alert-actions">
                <clr-icon
                  shape="times"
                  (click)="onClrAlertClosedChanged(true)"
                ></clr-icon>
              </div>
            </clr-alert-item>
          </clr-alert>
          <!-- Case successful login -->
          <clr-alert
            *ngSwitchCase="uiStateResultCode.AUTHENTICATED"
            [clrAlertType]="'success'"
            [clrAlertClosable]="false"
          >
            <clr-alert-item>
              <span
                class="alert-text"
                [innerHTML]="'login.successful' | translate"
              ></span>
              <div class="alert-actions">
                <clr-icon
                  shape="times"
                  (click)="onClrAlertClosedChanged(true)"
                ></clr-icon>
              </div>
            </clr-alert-item>
          </clr-alert>

          <!-- Resource request completed successfully -->
          <clr-alert
            *ngSwitchCase="uiStateResultCode.STATUS_OK"
            [clrAlertType]="'success'"
            [clrAlertClosable]="false"
          >
            <clr-alert-item>
              <span
                class="alert-text"
                [innerHTML]="state?.message | translate | safeWebContent"
              ></span>
              <div class="alert-actions">
                <clr-icon
                  shape="times"
                  (click)="onClrAlertClosedChanged(true)"
                ></clr-icon>
              </div>
            </clr-alert-item>
          </clr-alert>
          <clr-alert
            *ngSwitchCase="uiStateResultCode.STATUS_CREATED"
            [clrAlertType]="'success'"
            [clrAlertClosable]="false"
          >
            <clr-alert-item>
              <span
                class="alert-text"
                [innerHTML]="state?.message | translate | safeWebContent"
              ></span>
              <div class="alert-actions">
                <clr-icon
                  shape="times"
                  (click)="onClrAlertClosedChanged(true)"
                ></clr-icon>
              </div>
            </clr-alert-item>
          </clr-alert>
          <!-- -->
        </ng-container>
      </drewlabs-action-notification-container>
    </ng-container>
    <!-- UI NOTIFCATION COMPONENT-->
    <app-online-state-monitoring></app-online-state-monitoring>
    <!-- -->
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppUINotificationComponent implements OnDestroy {
  @Input() uiStateResultCode = UIStateStatusCode;
  private _state$ = createSubject<
    Partial<{
      message: string;
      status: number;
      hasError: boolean;
      hidden: boolean;
    }>
  >();
  @Input() set uiState(state: UIState) {
    this._state$.next({
      message: state.uiMessage,
      status: state.status,
      hasError: state.hasError,
      hidden: state.performingAction || !isDefined(state.status),
    });
  }

  public state$ = this._state$.asObservable().pipe(
    startWith({
      message: '',
      status: undefined,
      hasError: false,
      hidden: true,
    }),
    map((state) => ({
      ...state,
      status: isServerBadRequest(state.status || UIStateStatusCode.OK)
        ? UIStateStatusCode.BAD
        : state?.status,
    }))
  );

  @Output() endActionEvent = new EventEmitter<{
    status?: number;
    message?: string;
  }>();

  // tslint:disable-next-line: variable-name
  private _destroy$ = createSubject();

  onClrAlertClosedChanged(value: boolean): void {
    if (value) {
      this._state$.next({
        message: '',
        status: UIStateStatusCode.OK,
        hasError: false,
        hidden: true,
      });
    }
  }

  constructor(@Inject(HTTP_CLIENT) errorHandler: ErrorHandler) {
    errorHandler.errorState$
      .pipe(
        takeUntil(this._destroy$),
        tap((state) => {
          this.endActionEvent.emit({
            status: uiStatusUsingHttpErrorResponse(state),
            message: '',
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy = () => this._destroy$.next({});
}
