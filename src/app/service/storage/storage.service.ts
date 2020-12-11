import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usersettings } from 'src/app/model/usersettings';
import { FirebaseService } from '../firebase/firebase.service';
import { LocalstorageService } from '../locastorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setting: Usersettings = null;

  constructor(
    private _router: Router,
    private _fb: FirebaseService,
    private _ls: LocalstorageService
  ) {
    if (this.readLocal()) {
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
      } = this.readLocal();

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
    }
  }

  readLocal(data:string) {
    return this._ls.readLocalStorage(data);
  }

  saveOnLine(data: any) {
    this._fb.saveStat(data);
  }

  saveLocal(data: any) {
    console.log('Data storage.service',data);
    this._ls.setLocalStorage(data);
  }
}

