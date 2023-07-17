import {
  AsyncPipe,
  CurrencyPipe,
  DecimalPipe,
  JsonPipe,
  LowerCasePipe,
  PercentPipe,
  SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { GetTimeAgo, JSDate, ParseMonth } from '@azlabsjs/js-datetime';
import { after, before } from '@azlabsjs/str';

function substr(value: string, start: number, length?: number) {
  if (typeof value !== 'string') {
    return '';
  }
  if (start > value.length) {
    return '';
  }
  start = start >= 0 ? start : value.length - Math.abs(start);
  if (start < 0) {
    return '';
  }
  return String(value).substring(start, length ? start + length : undefined);
}

@Pipe({
  name: 'data',
})
export class ColumnDataPipe implements PipeTransform {
  constructor(
    private uppercasePipe: UpperCasePipe,
    private lowerCasePipe: LowerCasePipe,
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private jsonPipe: JsonPipe,
    private percentPipe: PercentPipe,
    private slicePipe: SlicePipe,
    private asyncPipe: AsyncPipe
  ) {}

  transform(
    value: any,
    transform: string | ((value: unknown) => unknown) | undefined
  ) {
    if (typeof transform === 'function') {
      return transform(value);
    }
    if (typeof transform === 'undefined' || transform === null) {
      return value;
    }
    const hasParams = transform.includes(':');
    const pipe = hasParams ? before(':', transform) : transform;
    const params = hasParams
      ? after(':', transform)
          ?.split(',')
          ?.map((x: string) => x.trim()) ?? []
      : [];
    switch (pipe) {
      case 'date':
        return this.formatDate(value, ...params);
      case 'datetime':
        return this.dateTime(value, ...params);
      case 'timeago':
        return this.timeAgo(value, ...params);
      case 'month':
        return this.getMonth(value);
      case 'masked':
        return this.mask(value, ...params.map((x: any) => Number(x)));
      case 'uppercase':
        return this.uppercasePipe.transform(value);
      case 'lowercase':
        return this.lowerCasePipe.transform(value); //
      case 'currency':
        return this.currencyPipe.transform(value); //
      case 'decimal':
        return this.decimalPipe.transform(value, ...params);
      case 'json':
        return this.jsonPipe.transform(value);
      case 'percent':
        return this.percentPipe.transform(value, ...params);
      case 'slice':
        return this.slicePipe.transform(
          value,
          +params[0],
          +params[1] ?? undefined
        );
      case 'async':
        return this.asyncPipe.transform(value);
      default:
        return value;
    }
  }

  /**
   * Returns the masked content
   *
   * @param value
   * @param length
   */
  mask(value?: string, length: number = 5): string {
    return value ? `*******${substr(value, -length)}` : '*******';
  }

  timeAgo(value: any, locale: string = 'fr-FR'): string {
    return typeof value === 'undefined' || value === null
      ? ''
      : JSDate.isValid(value)
      ? GetTimeAgo()(JSDate.create(value), locale ?? 'fr-FR')
      : value;
  }

  dateTime(value: any, args?: any): any {
    return typeof value === 'undefined' || value === null
      ? ''
      : JSDate.isValid(value)
      ? JSDate.format(value, args ? args : 'lll')
      : value;
  }

  formatDate(value: any, args?: any): any {
    return typeof value === 'undefined' || value === null
      ? ''
      : JSDate.isValid(value)
      ? JSDate.format(value, args ? args : 'DD/MM/YYYY')
      : value;
  }

  getMonth(value: any): any {
    return typeof value === 'undefined' || value === null
      ? ''
      : ParseMonth(value);
  }
}
