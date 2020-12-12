import { Injectable, OnInit } from '@angular/core';

import { Usersettings } from 'src/app/model/usersettings';

import { FirebaseService } from '../firebase/firebase.service';
import { LocalstorageService } from '../locastorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})

export class StorageService{


  constructor(
    private _fb: FirebaseService,
    private _ls: LocalstorageService
  ) {
    console.log('Sorti du Constructeur storage');
  }

  // Local

  readLocal() {
    console.log('readlocal');
    return this._ls.readLocalStorage();
  }
  saveLocal(data: any) {
    console.log('Data storage.service',data);
    this._ls.setLocalStorage(data);
  }

  // Online
  saveOnLine(data: any) {
    console.log('saveonline');
    this._fb.saveStat(data);
  }
}
