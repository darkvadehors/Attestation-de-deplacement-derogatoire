import { LoadingService } from './../../../../service/loading/loading.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../service/storage/storage.service';
import { PdfmakeService } from '../../../../service/pdf/pdfmake/pdfmake.service';
import { version } from '../../../../../../package.json'
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
    private _pdfmake: PdfmakeService,
    public loading: LoadingService) { }

  async ionViewWillEnter() {

    if (!this._storage.readLocal('setok')) {
      this._router.navigate([ 'tabs/settings' ])
    }

    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = (pdfMakeModule as any).default;
      this.pdfMake.vfs = (pdfFontsModule as any).default.pdfMake.vfs;
    }

  }

  ionViewDidEnter() {
    // Hide loading quand la page est chargé
    // this.loading.hide();
  }

  launchAttestation(activity: number) {

    this.loading.show();
    this._storage.saveOnLine(activity);

    this._pdfmake.generatePdf(activity);

  }

}