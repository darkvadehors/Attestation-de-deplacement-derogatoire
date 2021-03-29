import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MobileGuard implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    console.log('Mobile Guard');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      //Mobile
      console.log('Mobil Guard True');
      return true;
    } else {
      //Desktop
      console.log('Mobil Guard false');
      return this._router.navigate([ 'desktop' ]);
      // return false;
    }
  }

}
