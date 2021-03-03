import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityPipe',
})
export class ActivityPipe implements PipeTransform {
  transform(activity: any): string {
    switch (activity) {
      case 1:
        activity = 'travail';
        break;
      case 2:
        activity = 'sante';
        break;
      case 3:
        activity = 'famille';
        break;
      case 4:
        activity = 'handicap';
        break;
      case 5:
        activity = 'convocation';
        break;
      case 6:
        activity = 'missions';
        break;
      case 7:
        activity = 'transits';
        break;
      case 8:
        activity = 'animaux';
        break;
      case 9:
        activity = 'courses';
        break;
      case 10:
        activity = 'sport';
        break;
      case 11:
        activity = 'rassemblement';
        break;
      case 12:
        activity = 'demarche';
        break;
    }
    return activity;
  }
}
