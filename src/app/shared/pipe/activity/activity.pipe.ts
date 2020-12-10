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
        activity = 'achats_culturel_cultuel';
        break;
      case 3:
        activity = 'sante';
        break;
      case 4:
        activity = 'famille';
        break;
      case 5:
        activity = 'handicap';
        break;
      case 6:
        activity = 'sport_annimaux';
        break;
      case 7:
        activity = 'convocation';
        break;
      case 8:
        activity = 'missions';
        break;
      case 9:
        activity = 'enfants';
        break;
    }
    return activity;
  }
}
