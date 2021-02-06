/*
le piepe prend deux valeurs, la date et le choix du séparateur : ou h
// : => true or 1
 h => false or 0
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeback',
})
export class TimeBackPipe implements PipeTransform {
  transform(time: number, format?: number): string {
    let timeBack: string = null;

    // Millisecond per minutes => mpm
    const mpm = 60000;

    const pastH = new Date(Date.now() - time * mpm).getHours();

    // ajoute un Zero si moin de 10
    let minutes = new Date(Date.now() - time * mpm).getMinutes();

    const pastM = (minutes < 10 ? '0' : '') + minutes;
    switch (format) {
      case 1:
        timeBack = pastH + 'h' + pastM;
        break
      case 2:
        timeBack = pastH + ':' + pastM;
        break
      case 3:
        timeBack = pastH + '-' + pastM;
        break
    }

    return timeBack;
  }
}
