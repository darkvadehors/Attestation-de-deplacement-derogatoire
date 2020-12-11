import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  title: string = environment.title;

  constructor(private _router: Router, private _storage: StorageService) {
  }

  ionViewWillEnter() {







    // console.log('this._storage.setting',this._storage.readLocal(environment.dataName));



    console.log('1 ===>',this._storage.checkLocalStorage());
    // if (this._storage.readLocal(environment.dataName).value === null || this._storage.readLocal(environment.dataName).value === undefined) {
      if (!this._storage.checkLocalStorage) {
        console.log('reglage ok');
      } else {
        console.log('pas de reglages');
        // this._router.navigate(['setup']);
    }
  }








  launchAttestation(activity: number) {
    this._storage.setting.lastchoice = activity;
    this._storage.saveOnLine(activity);
    this._router.navigate(['attestation'], { queryParams: { activity } });
  }

  delete() {
    // this._datas.deleteCurrentUser();
    this._router.navigate(['setup']);
  }
}