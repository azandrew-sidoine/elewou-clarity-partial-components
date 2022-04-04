import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { map, startWith } from "rxjs/operators";
import { Subject } from "rxjs";

type PropsType = {
  message: string;
  status: number;
  hasError: boolean;
  hidden: boolean;
};

enum StatusCode {
  UNAUTHORIZED = 401,
  AUTHENTICATED = 202 || 200,
  UNAUTHENTICATED = 403,
  BAD = 422 || 400,
  OK = 200 || 201,
  ERROR = 500,
}

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
            *ngSwitchCase="uiStateResultCode.BAD"
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

          <clr-alert
            *ngSwitchCase="uiStateResultCode.OK"
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
            *ngSwitchCase="uiStateResultCode.OK"
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
    <ng-content></ng-content>
    <!-- -->
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppUINotificationComponent {
  // Component Inputs
  @Input() uiStateResultCode = StatusCode;
  private _state$ = new Subject<Partial<PropsType>>();
  @Input() set props(state: Partial<PropsType>) {
    this._state$.next(state);
  }

  // Component Properties
  state$ = this._state$.asObservable().pipe(
    startWith({
      message: '',
      status: undefined,
      hasError: false,
      hidden: true,
    }),
    map((state) => ({
      ...state,
      status:
        500 === (state.status || StatusCode.OK)
          ? StatusCode.BAD
          : state?.status,
    }))
  );

  onClrAlertClosedChanged(value: boolean): void {
    if (value) {
      this._state$.next({
        message: "",
        status: StatusCode.OK,
        hasError: false,
        hidden: true,
      });
    }
  }
}
