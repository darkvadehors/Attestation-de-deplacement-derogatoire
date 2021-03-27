import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AttestationComponent } from '../../../attestation/containers/attestation/attestation.component';
import { LoadingService } from '../../../../service/loading/loading.service';
import { StorageService } from '../../../../service/storage/storage.service';
import { version } from '../../../../../../package.json';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome-confinement.component.html',
  styleUrls: [ './welcome-confinement.component.scss' ],
})
export class WelcomeConfinementComponent {

  public version: string = version;

  constructor(
    private _router: Router,
    private _storage: StorageService,
    public loading: LoadingService,
    private _attestation: AttestationComponent) { }

  async ionViewWillEnter() {

    if (!this._storage.readLocal('setok')) {
      this._router.navigate([ 'tabs/settings' ])
    }

  }

  ionViewDidEnter() {
    // Hide loading quand la page est chargé
    this.loading.hide();
  }

  launchAttestation(activity: number) {

    this.loading.show();

    this._attestation.attestation(activity);

  }

}