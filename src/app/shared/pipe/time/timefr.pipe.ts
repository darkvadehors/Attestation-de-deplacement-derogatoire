import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timefr'
})
export class TimefrPipe implements PipeTransform {

  constructor(private _datepite: DatePipe) { }

  transform(value: Date | number): string {
    const date = this._datepite.transform(value, 'dd/MM/yyyy')
    // console.log('date Pipe', date);
    return date;
  }

}
