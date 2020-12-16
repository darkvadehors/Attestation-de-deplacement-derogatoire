import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usersettings } from 'src/app/model/usersettings';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class VariableService {

  setting:Usersettings;

  constructor(private _storage:StorageService, private _router: Router) {

    console.log('Variable.service');

    // on test si il y a une donnée dans le localstorage et on la charge
    if (this._storage.readLocal('user')) {

      const {
      firstname,
      lastname,
      dateofbirth,
      cityofbird,
      adress,
      city,
      zipcode,
      backtime,
      lastchoice,
      } = this._storage.readLocal('user');

      this.setting = {
        firstname,
        lastname,
        dateofbirth,
        cityofbird,
        adress,
        city,
        zipcode,
        backtime,
        lastchoice,
      };

      console.log('variable storage ok');

    } else {

      console.log('variable storage pas ok => GO settings');

      // sinon on va la creer
      this._router.navigate([ 'settings' ]);
    }

  }

}
