import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { map, startWith, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

type PropsType = {
  message: string;
  status: number;
  hasError: boolean;
  hidden: boolean;
};

enum StatusCode {
  UNAUTHORIZED = 401,
  AUTHENTICATED = 202,
  UNAUTHENTICATED = 403,
  BAD = 400,
  OK = 200,
  CREATED = 201,
  ERROR = 500,
}

@Component({
  selector: 'app-ui-notification',
  template: `
    <ng-container *ngIf="state$ | async as state">
      <drewlabs-action-notification-container *ngIf="!state.hidden">
        <ng-container *ngIf="getAlertProps(state) as props">
          <clr-alert [clrAlertType]="props.type" [clrAlertClosable]="false">
            <clr-alert-item>
              <span
                class="alert-text"
                [innerHTML]="props.message ?? '' | translate | trustHtml"
              ></span>
              <div class="alert-actions">
              <cds-icon shape="times" (click)="onClrAlertClosedChanged(true)"></cds-icon>
              </div>
            </clr-alert-item>
          </clr-alert>
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

  @Output() close = new EventEmitter<any>();

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
      // status:
      //   500 === (state.status ?? StatusCode.OK)
      //     ? StatusCode.BAD
      //     : state?.status,
    })),
    tap((state) =>{
      // console.log(state);
    })
  );

  getAlertProps(state: Partial<PropsType>) {
    const status: number = Number(state.status);

    if (status === Number(StatusCode.BAD)) {
      return {
        type: 'warning',
        message: state.message ?? 'invalidRequestParams',
      };
    }

    if (status === Number(StatusCode.ERROR)) {
      return {
        type: 'danger',
        message: state.message ?? 'serverRequestFailed',
      };
    }

    if (status === Number(StatusCode.UNAUTHORIZED)) {
      return {
        type: 'warning',
        message: 'auth.unauthorized',
      };
    }

    if (status === Number(StatusCode.UNAUTHENTICATED)) {
      return {
        type: 'warning',
        message: 'login.authenticationFailed',
      };
    }

    if (status === Number(StatusCode.AUTHENTICATED)) {
      return {
        type: 'success',
        message: 'login.successful',
      };
    }

    if (
      status === Number(StatusCode.OK) ||
      status === Number(StatusCode.CREATED)
    ) {
      return {
        type: 'success',
        message: state.message,
      };
    }
    return undefined;
  }

  onClrAlertClosedChanged(value: boolean): void {
    if (value) {
      this.close.emit(value);
    }
  }
}
