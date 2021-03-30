import { Injectable } from '@angular/core';
import { Usersettings } from '../../model/usersettings';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root'
})

export class VariableService {

  setting:Usersettings;

  constructor(private _storage: StorageService) { }
  loadVar() {
    if (this._storage.readLocal('ac')) {
      const {
        firstname,
        lastname,
        dateOfBirth,
        cityofbird,
        adress,
        city,
        zipcode,
        timeback,
        screenmode,
        lastchoice,
      } = this._storage.readLocal('ac');

      this.setting = {
        firstname,
        lastname,
        dateOfBirth,
        cityofbird,
        adress,
        city,
        zipcode,
        timeback,
        screenmode,
        lastchoice,
      };
    } else {
      // console.log('variable.service pas de key: ac');
    }
  }

}
