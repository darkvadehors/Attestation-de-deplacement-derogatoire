import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usersettings } from '../../model/usersettings';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class VariableService {

  setting:Usersettings;

  constructor(private _storage:StorageService, private _router: Router) {
  }

  async ionViewWillEnter() {





    console.log('Variable.service entree======> ', this.setting);

    // on test si il y a une donnée dans le localstorage et on la charge
    if (this._storage.readLocal('ac')) {
      console.log('contenu du ls = >', this._storage.readLocal('ac'));
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
      } = await this._storage.readLocal('ac');

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

      console.log('Variable.service sortie ======> ', this.setting);

    } else {

      console.log('variable storage pas ok => GO settings');

      // sinon on va la creer
      this._router.navigate([ 'tabs/settings' ]);
    }

  }

}
