import {
  AsyncPipe,
  CommonModule,
  CurrencyPipe,
  DecimalPipe,
  JsonPipe,
  LowerCasePipe,
  PercentPipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import {
  DateTimePipe,
  MaskedContentPipe,
  ParseDatePipe,
  ParseMonthPipe,
  SafeRessourceContentPipe,
  SafeWebContentPipe,
  TimeAgoPipe,
} from '../pipes';
import { ClrSmartGridComponent } from './clr-smart-grid.component';
import { ClrGridSelectDirective } from './directives';
import { ColumnDataPipe } from './pipes/colum-data.pipe';

@NgModule({
  declarations: [ClrSmartGridComponent, ColumnDataPipe, ClrGridSelectDirective],
  imports: [CommonModule, ClarityModule],
  exports: [ClrSmartGridComponent],
  providers: [
    UpperCasePipe,
    LowerCasePipe,
    CurrencyPipe,
    DecimalPipe,
    JsonPipe,
    PercentPipe,
    SlicePipe,
    AsyncPipe,
    ParseDatePipe,
    ParseMonthPipe,
    DateTimePipe,
    MaskedContentPipe,
    SafeWebContentPipe,
    SafeRessourceContentPipe,
    TimeAgoPipe,
  ],
})
export class ClrSmartGridModule {}
