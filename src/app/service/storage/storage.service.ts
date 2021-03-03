import { Injectable } from '@angular/core';
import { LocalstorageService } from './locastorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})

export class StorageService{

  constructor(
    private _ls: LocalstorageService
  ) { }

  readLocal(datakey: string, crypt?: boolean) {
    return this._ls.readLocalStorage(datakey, crypt);
  }
  saveLocal(datakey: string, data: string, crypt?: boolean) {
    this._ls.setLocalStorage(datakey, data, crypt);
  }

  saveOnLine(data: any) {
  }
}
