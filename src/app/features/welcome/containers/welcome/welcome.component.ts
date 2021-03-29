import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AttestationComponent } from './../../../attestation/containers/attestation/attestation.component';
import { LoadingService } from './../../../../service/loading/loading.service';
import { StorageService } from './../../../../service/storage/storage.service';
import { version } from './../../../../../../package.json';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {

  pdfMake: any;
  public version: string = version;

  constructor(
    private _router: Router,
    private _storage: StorageService,
    private _attestation: AttestationComponent,
    public loadingService: LoadingService
  ) { }

  async ionViewWillEnter() {

    if (!this._storage.readLocal('setok')) {
      this._router.navigate([ 'tabs/settings' ])
    }

  }

  ionViewDidEnter() {
    // Hide loadingService quand la page est chargé
    this.loadingService.hide();
  }

  launchAttestation(activity: number) {

    this._attestation.attestation(activity);
  }

}