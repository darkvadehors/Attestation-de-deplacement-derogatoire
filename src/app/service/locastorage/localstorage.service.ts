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
    localStorage.setItem(environment.dataName,this._crypto.encrypt(JSON.stringify(data)));
  }

<<<<<<< Updated upstream
  readLocalStorage() {
    const datas = JSON.parse(this._crypto.decrypt(localStorage.getItem(environment.dataName)));
    console.log('apres decrypt', datas);
=======
  readLocalStorage(data:string) {
    const datas = JSON.parse(localStorage.getItem(data));
>>>>>>> Stashed changes
    return datas;
  }

  deleteCurrentUser() {
    // localStorage.removeItem(environment.dataName);

    this._storageMap.delete(environment.dataName).subscribe(() => {});
    this._router.navigate(['setup']);
  }
}