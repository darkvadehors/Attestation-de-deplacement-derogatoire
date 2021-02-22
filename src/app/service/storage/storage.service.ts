import { Injectable } from '@angular/core';
import { LocalstorageService } from './locastorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})

export class StorageService{

  constructor(
    private _ls: LocalstorageService
  ) { }

  readLocal(datakey: string) {
    return this._ls.readLocalStorage(datakey);
  }
  saveLocal(datakey: string, data: string) {
    this._ls.setLocalStorage(datakey, data);
  }

  saveOnLine(data: any) {
  }
}
