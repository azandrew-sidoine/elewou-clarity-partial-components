import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-online-state-monitoring',
  templateUrl: './online-state-monitoring.component.html',
})
/**
 * @deprecated
 */
export class OnlineStateMonitoringComponent {
  // #region Inputs
  @Input() offlineText: string =
    'Vous semblez être déconnecté. Tentative de reconnection en cours...';
  @Input() onlineText: string = 'Votre connection est rétablie...';
}
