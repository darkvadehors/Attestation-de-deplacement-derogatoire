import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usersettings } from 'src/app/model/usersettings';
import { environment } from 'src/environments/environment';
import { FirebaseService } from '../firebase/firebase.service';
import { LocalstorageService } from '../locastorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements OnInit{
  setting: Usersettings = null;


  constructor(
    private _router: Router,
    private _fb: FirebaseService,
    private _ls: LocalstorageService
  ) {

    console.log('constructeur');
    // Déclaratin de la Promise

    //TODO promise
     //if (this.readLocal(environment.dataName)) {
    //   console.log('Entree dans le constructeur');
    //   const {
    //     firstname,
    //     lastname,
    //     dateofbirth,
    //     cityofbird,
    //     adress,
    //     city,
    //     zipcode,
    //     backtime,
    //     lastchoice,
    //   } = this.readLocal(environment.dataName);

    //   this.setting = {
    //     firstname,
    //     lastname,
    //     dateofbirth,
    //     cityofbird,
    //     adress,
    //     city,
    //     zipcode,
    //     backtime,
    //     lastchoice,
    //   };

    // } else {
    //   console.log('Na pas pu creer this.setting');
    // }
    console.log('Sorti du Constructeur storage');
  }

  ngOnInit() {

      // const myPromise = (this.readLocal(environment.dataName));
      // myPromise.then(localStorageData => {
      //   console.log('Data de la promise',data);
      //   const {
      //         firstname,
      //         lastname,
      //         dateofbirth,
      //         cityofbird,
      //         adress,
      //         city,
      //         zipcode,
      //         backtime,
      //         lastchoice,
      //       } = data
      // })
      // let myPromise = (this.readLocal(environment.dataName));
      // if (this.readLocal(environment.dataName)) {
      //   console.log('Entree dans le constructeur');
      //   const {
      //     firstname,
      //     lastname,
      //     dateofbirth,
      //     cityofbird,
      //     adress,
      //     city,
      //     zipcode,
      //     backtime,
      //     lastchoice,
      //   } = this.readLocal(environment.dataName);

      //   this.setting = {
      //     firstname,
      //     lastname,
      //     dateofbirth,
      //     cityofbird,
      //     adress,
      //     city,
      //     zipcode,
      //     backtime,
      //     lastchoice,
      //   };
    }

  // Local
  checkLocalStorage(){
    console.log('CheckLocal');
    return this._ls.checkLocalStorage();
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

}

