import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  collectionName = environment.dataName;

  constructor(private afs: AngularFirestore) {}

  saveStat(lastchoice: number) {
    this.afs
      .collection(this.collectionName + 'statistic')
      .add({ createdAt: Date.now(), choix: lastchoice });
  }
}
