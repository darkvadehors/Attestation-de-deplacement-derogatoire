import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CryptoService } from '../crypto/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService implements OnInit {
  key: string

  constructor(private _crypto: CryptoService) { }

  ngOnInit() {

  }
  setLocalStorage(data: string, datakey: string) {

    switch (datakey) {
      case 'user':
        this.key = 'ac';
        break;
      case 'userfl':
        this.key = 'fl'
    }
    console.log('avant datacrypt',data);
    localStorage.setItem(this.key, this._crypto.encrypt(JSON.stringify(data)));
    // localStorage.setItem(this.key,(JSON.stringify(data)));
  }

  readLocalStorage(datakey: string): any {
    console.log('readLocalStorage entrée', localStorage.getItem(datakey));

    //control si il y a une this.key dans le storage
    if (localStorage.getItem(datakey)) {
      let datas = JSON.parse(this._crypto.decrypt(localStorage.getItem(datakey)));
      // let datas = (JSON.parse(localStorage.getItem(this.key)));
      console.log('apres decrypt', datas);
      return datas;
    } else {
      console.log('pas de storage');
      return null;
    }

  }
}