import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { StorageService } from '../service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private _router: Router, private _storage: StorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this._storage.readLocal('fs')) {
      // console.log('guard true fs existe');
      return true;
    } else {
      // console.log('guard false');
      this._router.navigateByUrl('intro');
      return false
    }
  }

}
