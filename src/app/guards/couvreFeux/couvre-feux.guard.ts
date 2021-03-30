import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouteService } from 'src/app/service/route/route.service';

@Injectable({
  providedIn: 'root'
})
export class CouvreFeuxGuard implements CanActivate {
  constructor(
    private _RouteStatus: RouteService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const dateheure = new Date()
    const heuredelajournee: any = dateheure.getHours()

    // console.log('CouvreFeux heure', heuredelajournee);
    if (heuredelajournee < 6 || heuredelajournee > 19) {
      const data = {
        tabsName: 'couvreFeux',
        iconName: 'moon-outline',
        tabsLabel: 'Couvre Feux',
      }
      this._RouteStatus.setRouteStatus(data);
      // console.log('CouvreFeuxGuard vrai');
      return true;
    } else {
      // console.log('CouvreFeuxGuard false');
      return false;
    }

  }

}
