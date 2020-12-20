import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usersettings } from '../../model/usersettings';
import { StorageService } from '../storage/storage.service';
//FIXME LEs variable  ne passes plus voir pour faire un observable ou changer l'appel
@Injectable({
  providedIn: 'root'
})

export class VariableService {

  setting:Usersettings;

  constructor(private _storage: StorageService, private _router: Router) {
    console.log('constructeru variable Service');
    this.loadVar()
  }

  async ionViewWillEnter() {
    console.log('ionviewWilenter variable Service');
    this.loadVar()
  }

  loadVar() {
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
        timeback,
      lastchoice,
      } = this._storage.readLocal('ac');

      this.setting = {
        firstname,
        lastname,
        dateofbirth,
        cityofbird,
        adress,
        city,
        zipcode,
        timeback,
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
