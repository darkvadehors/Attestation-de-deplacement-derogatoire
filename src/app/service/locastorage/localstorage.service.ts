import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor(private _router: Router, private _storageMap: StorageMap) {}

  setLocalStorage(data: string) {
    localStorage.setItem(environment.dataName, JSON.stringify(data));
  }

  readLocalStorage() {
    const datas = JSON.parse(localStorage.getItem(environment.dataName));
    return datas;
  }

  deleteCurrentUser() {
    // localStorage.removeItem(environment.dataName);

    this._storageMap.delete(environment.dataName).subscribe(() => {});
    this._router.navigate(['setup']);
  }
}