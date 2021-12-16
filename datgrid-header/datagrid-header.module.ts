import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RessourceRequestProcessingModule } from '../ressource-request-processing/ressource-request-processing.module';
import { DatgridHeaderComponent } from './datgrid-header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RessourceRequestProcessingModule,
    TranslateModule
  ],
  declarations: [
    DatgridHeaderComponent
  ],
  exports: [
    DatgridHeaderComponent
  ]
})
export class DatagridHeaderModule {}
