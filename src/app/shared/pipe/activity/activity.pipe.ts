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
        activity = 'judiciaire';
        break;
      case 6:
        activity = 'missions';
        break;
      case 7:
        activity = 'transit';
        break;
      case 8:
        activity = 'animaux';
        break;
      case 9:
        activity = 'sport';
        break;
      // case 10:
      //   activity = 'achats';
      //   break;
      // case 11:
      //   activity = 'enfants';
      //   break;
      // case 12:
      //   activity = 'culte_culturel';
      //   break;
      case 21:
        activity = 'sport';
        break;
      case 22:
        activity = 'achats';
        break;
      case 23:
        activity = 'enfants';
        break;
      case 24:
        activity = 'culte_culturel';
        break;
      case 25:
        activity = 'demarche';
        break;
      case 26:
        activity = 'travail';
        break;
      case 27:
        activity = 'sante';
        break;
      case 28:
        activity = 'famille';
        break;
      case 29:
        activity = 'handicap';
        break;
      case 30:
        activity = 'judiciaire';
        break;
      case 31:
        activity = 'demenagement';
        break;
      case 32:
        activity = 'transit';
        break;
    }
    return activity;
  }
}
