import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../../service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private _storage: StorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // console.log('Guard IntroGuard');

    // si la cle intro dans le local Storage est presente on laisse passer
    if (this._storage.readLocal('intro')) {
      // console.log('Guard IntroGuard true');
      return true;
    } else {
      // console.log('Guard IntroGuard false');
      // return this._router.navigateByUrl('index');
      return false;
    }
  }

}
