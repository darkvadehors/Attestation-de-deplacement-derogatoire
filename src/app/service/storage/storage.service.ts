import { Injectable, OnInit } from '@angular/core';
import { Usersettings } from 'src/app/model/usersettings';
import { FirebaseService } from '../firebase/firebase.service';
import { LocalstorageService } from '../locastorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements OnInit{
  setting: Usersettings = null;

  constructor(
    private _fb: FirebaseService,
    private _ls: LocalstorageService
  ) {
    console.log('Sorti du Constructeur storage');
  }

  ngOnInit() {}

  // Local
  checkLocalStorage():boolean{
    console.log('CheckLocal',this._ls.checkLocalStorage());

    if (this._ls.checkLocalStorage()){
      console.log('construire setting');
      this.makeSettings()
      return this._ls.checkLocalStorage();
    } else {
      return this._ls.checkLocalStorage();
    }

  }

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

  makeSettings (){
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

    console.log(this.readLocal());
    console.log(this.setting);
  }

}

