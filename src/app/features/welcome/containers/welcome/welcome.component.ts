import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../service/storage/storage.service';
import { VariableService } from '../../../../service/variable/variable.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  title: string = environment.title;

  constructor(private _router: Router, private _storage: StorageService,private _varGlobal:VariableService) {
  }

  launchAttestation(activity: number) {
    console.log('activite welcom => ', activity);
    console.log('varG welcome ====>', this._varGlobal.setting);
    // this._varGlobal.setting.lastchoice = activity;
    this._storage.saveOnLine(activity);
    this._router.navigate([ 'tabs/attestation' ], { queryParams: { activity } });
  }

}