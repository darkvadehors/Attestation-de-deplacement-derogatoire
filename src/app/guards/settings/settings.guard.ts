import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from 'src/app/service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsGuard implements CanActivate {

  constructor(private _storage: StorageService) { }
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this._storage.readLocal('setok')) {
      return true;
    } else {
      return false;
    }
  }

}
