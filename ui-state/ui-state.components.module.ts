import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AlertModule } from './alert/notification/notification.module';
import { NetworkStateModule } from './alert/network-state';
import { AppComponentsLoadingComponent } from './loader/app-component-loader.component';

@NgModule({
  declarations: [AppComponentsLoadingComponent],
  imports: [CommonModule],
  exports: [AppComponentsLoadingComponent, AlertModule, NetworkStateModule],
})
export class UIStateComponentsModule {
  static forRoot(): ModuleWithProviders<UIStateComponentsModule> {
    return {
      ngModule: UIStateComponentsModule,
      providers: [],
    };
  }
}
