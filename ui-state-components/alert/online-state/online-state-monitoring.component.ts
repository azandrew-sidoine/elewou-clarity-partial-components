import { Component, OnInit, Input } from "@angular/core";
import {
  ConnectionStatus,
  OnlineStateMonitoring,
} from "./online-state-monitoring.service";
import { first, map, tap } from "rxjs/operators";
import { BehaviorSubject, combineLatest, interval } from "rxjs";

@Component({
  selector: "app-online-state-monitoring",
  templateUrl: "./online-state-monitoring.component.html",
  styles: [],
})
export class OnlineStateMonitoringComponent implements OnInit {
  // #region Inputs
  @Input() offlineText: string =
    "Vous semblez être déconnecté. Tentative de reconnection en cours...";
  @Input() onlineText: string = "Votre connection est rétablie...";
  // #endregion
  _showAlertView$ = new BehaviorSubject(false);
  showAlertView$ = this._showAlertView$.asObservable();

  // TODO : Takes computing of the online status algorithm to another observable
  state$ = combineLatest([
    this.provider.connectionStatus$,
    this.showAlertView$,
  ]).pipe(
    map(([value, hidden]) => {
      value = value || ConnectionStatus.OFFLINE;
      if (value === ConnectionStatus.OFFLINE) {
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

  constructor(private provider: OnlineStateMonitoring) {}

  ngOnInit(): void {
    this.provider.registerToConnectionStates();
  }
}
