/*
Storage.service prend  deux parametres pour el local storage:
 * data => pour les données
 * datakey => pour la clé de variable
*/
import { Injectable } from '@angular/core';
// import { FirebaseService } from './firebase/firebase.service';
import { LocalstorageService } from './locastorage/localstorage.service';

@Injectable({
  providedIn: 'root',
})

export class StorageService{

  constructor(
    // private _fb: FirebaseService,
    private _ls: LocalstorageService
  ) { }

  // Local
  readLocal(datakey: string) {
    // console.log('readlocal', datakey);
    return this._ls.readLocalStorage(datakey);
  }
  saveLocal(datakey: string, data: string) {
    // console.log('Data storage.service', datakey, data);
    this._ls.setLocalStorage(datakey, data);
  }

  //TODO sup Local storage
  // Online
  //TODO passer le type en string
  saveOnLine(data: any) {
    // console.log('saveonline');
    // this._fb.saveStat(data);
  }
}
