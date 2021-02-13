import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {


  constructor(private afs: AngularFirestore) {}

  saveStat(lastchoice: number) {
    this.afs
      .collection('statistic')
      .add({ createdAt: Date.now(), choix: lastchoice });
  }

}
