import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatAmount",
})
export class FormatAmountPipe implements PipeTransform {
  transform(value: any, locale: string = "fr-FR", currency?: string): any {
    return Intl.NumberFormat(locale, { currency }).format(value);
  }
}

@Pipe({ name: "positiveNumber" })
export class PositiveNumber implements PipeTransform {
  transform(value: number): number {
    return Math.abs(value);
  }
}

@Pipe({ name: "parseInt" })
export class ParseInt implements PipeTransform {
  transform(value: string): number {
    return parseInt(value, 10);
  }
}
