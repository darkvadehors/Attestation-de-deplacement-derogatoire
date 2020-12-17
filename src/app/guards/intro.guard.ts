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
    console.log('true');
    if (Boolean(this._storage.readLocal('userfs'))) {
      return true;
    } else {
      console.log('false');
      this._router.navigateByUrl('intro');
      return false
    }
  }

}
