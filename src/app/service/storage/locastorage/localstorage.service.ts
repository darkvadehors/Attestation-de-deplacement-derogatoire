import { Injectable } from '@angular/core';
import { CryptoService } from '../../crypto/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  key: string = null;

  constructor(private _crypto: CryptoService) { }

  readLocalStorage(datakey: string, crypt: boolean = true): any {

    if (localStorage.getItem(datakey)) {
      if (crypt === true) {
        let datas = JSON.parse(this._crypto.decrypt(localStorage.getItem(datakey)));
        return datas;
      } else {
        let datas = JSON.parse(localStorage.getItem(datakey));
        return datas;
      }
    } else {
      return null;
    }

  }

  setLocalStorage(datakey: string, data: string, crypt: boolean = true): any {
    if (crypt === true) {
      localStorage.setItem(datakey, this._crypto.encrypt(JSON.stringify(data)));
    } else {
      localStorage.setItem(datakey, JSON.stringify(data));
    }
  }

}