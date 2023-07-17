import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormatAmountPipe,
  ParseInt,
  PositiveNumber,
} from "./numbers-formats.pipe";
import {
  ParseDatePipe,
  TimeAgoPipe,
  ParseMonthPipe,
  DateTimePipe,
} from "./parse-date.pipe";
import {
  SafeWebContentPipe,
  SafeRessourceContentPipe,
  CheckScriptsPipe,
} from "./safe-web-content.pipe";
import { MaskedContentPipe } from "./masked-content.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormatAmountPipe,
    TimeAgoPipe,
    ParseDatePipe,
    ParseMonthPipe,
    PositiveNumber,
    SafeWebContentPipe,
    SafeRessourceContentPipe,
    CheckScriptsPipe,
    DateTimePipe,
    ParseInt,
    MaskedContentPipe,
  ],
  exports: [
    FormatAmountPipe,
    TimeAgoPipe,
    ParseDatePipe,
    ParseMonthPipe,
    PositiveNumber,
    SafeWebContentPipe,
    SafeRessourceContentPipe,
    CheckScriptsPipe,
    DateTimePipe,
    ParseInt,
    MaskedContentPipe,
  ],
})
export class PipesModule {}
