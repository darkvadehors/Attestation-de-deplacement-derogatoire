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

    if (this._storage.readLocal('intro')) {
      return true;
    } else {
      this._router.navigateByUrl('intro');
    }
  }

}
