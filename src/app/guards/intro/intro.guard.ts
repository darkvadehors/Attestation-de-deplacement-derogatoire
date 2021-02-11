import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../../service/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private _router: Router, private _storage: StorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // intro => First Start

    if (this._storage.readLocal('intro')) {
      console.log('introguard true');
      return true;
    } else {
      console.log('introguard false');
      this._router.navigateByUrl('intro');
      // return false;
    }
  }

}
