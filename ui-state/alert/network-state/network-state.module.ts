import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { NetworkStateComponent } from './network-state.component';
import { OnlineStateMonitoringComponent } from './online-state-monitoring.component';

@NgModule({
  imports: [CommonModule, ClarityModule],
  declarations: [OnlineStateMonitoringComponent, NetworkStateComponent],
  exports: [OnlineStateMonitoringComponent, NetworkStateComponent],
})
export class NetworkStateModule {}
