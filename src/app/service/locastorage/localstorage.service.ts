import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';
import { CryptoService } from '../crypto/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor(private _router: Router, private _storageMap: StorageMap, private _crypto:CryptoService) {}

  setLocalStorage(data: any) {
    console.log('avant datacrypt',data);
    // localStorage.setItem(environment.dataName,this._crypto.encrypt(JSON.stringify(data)));
    localStorage.setItem(environment.dataName,(JSON.stringify(data)));
  }

  readLocalStorage():any {
    console.log('readLocalStorage entrée',localStorage.getItem(environment.dataName));

    //control si il y a une key dans le storage
    if (localStorage.getItem(environment.dataName)) {
      // let datas = JSON.parse(this._crypto.decrypt(localStorage.getItem(environment.dataName)));
      let datas = (JSON.parse(localStorage.getItem(environment.dataName)));
      console.log('apres decrypt', datas);
      return datas;
    } else {
      console.log('pas de storage');
      return null;
    }

  }
}