import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../service/storage/storage.service';
import { PdfmakeService } from '../../../../service/pdf/pdfmake/pdfmake.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  pdfMake: any;

  constructor(
    private _router: Router,
    private _storage: StorageService,
    private _pdfmake: PdfmakeService) { }

  ngOnInit() {
    // Controle si IOS message de mise en garde
    // if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    //   //IOS
    //   alert('Attention sur IOS. Firefox est pas compatible avec CovAttest');
    // }
  }

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

  launchAttestation(activity: number) {

    this._storage.saveOnLine(activity);

    //creation du pdf
    this._pdfmake.generatePdf(activity);

  }

}