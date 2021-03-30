import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsGuard implements CanActivate {

  constructor(private _storage: StorageService, private _router: Router) { }
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const lsData = this._storage.readLocal('setok');
    // console.log('data => ', lsData);
    if (this._storage.readLocal('setok') == 1) {
      return true;
    } else {
      return this._router.navigate([ 'settings' ])
    }
  }

}
