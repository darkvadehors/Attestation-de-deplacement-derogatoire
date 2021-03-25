import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DayTimeGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const dateheure = new Date()
    const heuredelajournee: any = dateheure.getHours()

    console.log('heuredelajournee', heuredelajournee);
    if (heuredelajournee < 6 && heuredelajournee > 19) { //// confinement
      // if (heuredelajournee > 6 && heuredelajournee < 19) { // couvre feux
      console.log('vrai');
      return true;
    } else {
      console.log('false');
      return this.router.createUrlTree(
        [ 'tabs/confinement' ]);

    }

  }

}
