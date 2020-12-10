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

  constructor(private _router: Router, private _storage: StorageService) {}

  ionViewWillEnter() {
    console.log(this._storage.setting);
    if (localStorage.getItem(environment.dataName) === null) {
      console.log('pas ok');
      this._router.navigate(['setup']);
    } else {
      console.log('ok');
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