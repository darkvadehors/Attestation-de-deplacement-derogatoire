import { Injectable } from '@angular/core';
import { CryptoService } from '../crypto/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  key: string = null;

  constructor(private _crypto: CryptoService) { }

  readLocalStorage(datakey: string): any {

    console.log("readlocalStoarge datakey", datakey);
    switch (datakey) {
      case 'user':
        this.key = 'ac'; //Attestation Covid
        break;
      case 'userfs':
        this.key = 'fs' // First Start
    }
    console.log(this.key);
    console.log('readLocalStorage entrée', localStorage.getItem(this.key));

    //control si il y a une this.key dans le storage
    if (localStorage.getItem(this.key)) {
      let datas = JSON.parse(this._crypto.decrypt(localStorage.getItem(this.key)));
      // let datas = (JSON.parse(localStorage.getItem(this.key)));
      console.log('apres decrypt', datas);
      return datas;
    } else {
      console.log('pas de storage');
      return null;
    }

  }

  setLocalStorage(datakey: string, data: string) {

    switch (datakey) {
      case 'user':
        this.key = 'ac';
        break;
      case 'userfs': // user first Start
        this.key = 'fs'
    }
    console.log('avant datacrypt', data);
    localStorage.setItem(this.key, this._crypto.encrypt(JSON.stringify(data)));
    // localStorage.setItem(this.key,(JSON.stringify(data)));
  }

}