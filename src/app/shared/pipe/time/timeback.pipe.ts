import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeback',
})
export class TimeBackPipe implements PipeTransform {
  transform(time: number, format?: number): string {
    let timeBack: string = null;

    const mpm = 60000;

    let heures = new Date(Date.now() - time * mpm).getHours();

    let minutes = new Date(Date.now() - time * mpm).getMinutes();

    const pastH = (heures < 10 ? '0' : '') + heures
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
