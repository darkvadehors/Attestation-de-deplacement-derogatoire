import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DesktopGuard implements CanActivate {

  constructor(private _router: Router, private _storage: StorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    // console.log('Guard DesktopGuard');
    const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    if (!isMobile) {
      //Desktop
      // console.log('Guard DesktopGuard true');
      return true;
    } else if (!this._storage.readLocal('intro')) {
      return this._router.navigate([ 'intro' ]);
    } else {
      //Mobile
      // console.log('Guard DesktopGuard false');
      return this._router.navigateByUrl(' ');
    }
  }

}
