import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usersettings } from '../../model/usersettings';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root'
})

export class VariableService {

  setting:Usersettings;

  constructor(private _storage: StorageService, private _router: Router) { }

  loadVar() {
    // on test si il y a une donnée dans le localstorage et on la charge
    if (this._storage.readLocal('ac')) {
      const {
        firstname,
        lastname,
        dateofbirth,
        cityofbird,
        address,
        city,
        zipcode,
        timeback,
        lastchoice,
      } = this._storage.readLocal('ac');

      this.setting = {
        firstname,
        lastname,
        dateofbirth,
        cityofbird,
        address,
        city,
        zipcode,
        timeback,
        lastchoice,
      };
    } else {

      // sinon on va la creer
      this._router.navigate([ 'tabs/settings' ]);
    }
  }

}
