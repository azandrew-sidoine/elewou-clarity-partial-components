import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationAlertComponent } from './notification-container';
import { AppUINotificationComponent } from './notification.component';
import { TrusteHTMLPipe } from './trust-html.pipe';

@NgModule({
  imports: [CommonModule, ClarityModule, TranslateModule],
  exports: [NotificationAlertComponent, AppUINotificationComponent],
  declarations: [
    NotificationAlertComponent,
    AppUINotificationComponent,
    TrusteHTMLPipe,
  ],
})
export class AlertModule {}
