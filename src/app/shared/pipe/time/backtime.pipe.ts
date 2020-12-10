import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backtime',
})
export class BacktimePipe implements PipeTransform {
  transform(time: number, format?: boolean): string {
    let backTime: string = null;
    // Millisecond per minutes => mpm
    const mpm = 60000;

    const pastH = new Date(Date.now() - time * mpm).getHours();

    // ajoute un Zero si moin de 10
    let minutes = new Date(Date.now() - time * mpm).getMinutes();

    const pastM = (minutes < 10 ? '0' : '') + minutes;
    if (format  ==  true)  {
      backTime = pastH + ':' + pastM;
    } else {
      backTime = pastH + 'h' + pastM;
    }

    return backTime;
  }
}
