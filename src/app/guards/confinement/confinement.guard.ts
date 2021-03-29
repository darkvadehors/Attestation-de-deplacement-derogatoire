import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RouteService } from 'src/app/service/route/route.service';

@Injectable({
  providedIn: 'root'
})
export class ConfinementGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _routeStatus: RouteService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const dateheure = new Date()
    const heuredelajournee: any = dateheure.getHours()

  // console.log('Confinement heure', heuredelajournee);
    if (heuredelajournee > 6 && heuredelajournee < 19) {
      const data = {
        tabsName: 'confinement',
        iconName: 'sunny-outline',
        tabsLabel: 'Confinement',
      }
      this._routeStatus.setRouteStatus(data);
    // console.log('ConfinementGuard vrai');
      return true;
    } else {
      // console.log('ConfinementGuard false');
      return false;
    }

  }

}
