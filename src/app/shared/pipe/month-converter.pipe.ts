import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthConverter',
})
export class MonthConverterPipe implements PipeTransform {
  transform(value: number): string {
    const MONTH = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];
    return MONTH[value] || 'UNKNOWN';
  }
}
