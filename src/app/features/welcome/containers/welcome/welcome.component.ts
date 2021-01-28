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

  constructor(private _router: Router, private _storage: StorageService, private _varGlobal: VariableService) { }

  ionViewDidLoad() {
    if (!this._storage.readLocal('setok')) {
      //TODO Ajouter class display:none
      this._router.navigate([ 'tabs/settings' ])
    }
  }

  launchAttestation(activity: number) {
    this._storage.saveOnLine(activity);
    // on passe l'activitée en queryParams
    this._router.navigate([ 'tabs/attestation' ], { queryParams: { activity } });
  }

}