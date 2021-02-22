import { Injectable } from '@angular/core';
import { CryptoService } from '../../crypto/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  key: string = null;

  constructor(private _crypto: CryptoService) { }

  readLocalStorage(datakey: string): any {

    if (localStorage.getItem(datakey)) {
      let datas = JSON.parse(this._crypto.decrypt(localStorage.getItem(datakey)));
      return datas;
    } else {
      return null;
    }

  }

  setLocalStorage(datakey: string, data: string) {
    localStorage.setItem(datakey, this._crypto.encrypt(JSON.stringify(data)));
  }

}