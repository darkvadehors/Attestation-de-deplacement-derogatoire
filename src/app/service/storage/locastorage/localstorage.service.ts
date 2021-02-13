import { Injectable } from '@angular/core';
import { CryptoService } from '../../crypto/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  key: string = null;

  constructor(private _crypto: CryptoService) { }

  readLocalStorage(datakey: string): any {

    // console.log('readLocalStorage entrée', localStorage.getItem(datakey));

    //control si il y a une datakey dans le storage
    if (localStorage.getItem(datakey)) {
      let datas = JSON.parse(this._crypto.decrypt(localStorage.getItem(datakey)));
      // let datas = (JSON.parse(localStorage.getItem(datakey)));
      // console.log('apres decrypt', datas);
      return datas;
    } else {
      // console.log('pas de storage');
      return null;
    }

  }

  setLocalStorage(datakey: string, data: string) {
    // console.log('avant datacrypt', data);
    localStorage.setItem(datakey, this._crypto.encrypt(JSON.stringify(data)));
    // localStorage.setItem(datakey, (JSON.stringify(data)));
  }

}