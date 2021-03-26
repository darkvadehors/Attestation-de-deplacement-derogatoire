import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DayTimeGuard implements CanActivate {

  constructor(private _router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const dateheure = new Date()
    const heuredelajournee: any = dateheure.getHours()

    console.log('heuredelajournee', heuredelajournee);

    // if (heuredelajournee > 6 || heuredelajournee < 19) { // couvre feux journée
    if (heuredelajournee < 6 && heuredelajournee > 19) { // Couvre feux soir
      console.log('vrai');
      return true;
    } else {
      console.log('false');
      return this._router.parseUrl('/tabs/confinement');

    }

  }

}
