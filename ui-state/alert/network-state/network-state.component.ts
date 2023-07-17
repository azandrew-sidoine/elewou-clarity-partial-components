import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, interval } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { NetworkState, NetworkStatus } from './network-state.service';

const defaultMessages = {
  offline:
    'Vous semblez être déconnecté. Tentative de reconnection en cours...',
  online: 'Votre connection est rétablie',
};

type PropsType = {
  offline: string;
  online: string;
};

@Component({
  selector: 'azjs-network-state',
  templateUrl: './network-state.component.html',
  styles: [],
})
export class NetworkStateComponent implements OnInit {
  // #region Inputs
  @Input() messages: PropsType = defaultMessages;
  // #endregion
  _showAlertView$ = new BehaviorSubject(false);
  showAlertView$ = this._showAlertView$.asObservable();

  // TODO : Takes computing of the online status algorithm to another observable
  state$ = combineLatest([
    this.provider.connectionStatus$,
    this.showAlertView$,
  ]).pipe(
    map(([value, hidden]) => {
      value = value || NetworkStatus.OFFLINE;
      if (value === NetworkStatus.OFFLINE) {
        return {
          stateChanged: true,
          online: false,
          hidden,
        };
      } else {
        interval(3000)
          .pipe(
            first(),
            tap(() => this._showAlertView$.next(true))
          )
          .subscribe();
        return {
          online: true,
          hidden,
        };
      }
    })
  );

  constructor(private provider: NetworkState) {}

  ngOnInit(): void {
    this.provider.registerToConnectionStates();
  }
}
