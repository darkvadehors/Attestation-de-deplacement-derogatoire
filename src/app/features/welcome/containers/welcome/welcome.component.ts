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
  constructor(
    private _router: Router,
    private _storage: StorageService,
    private _pdfmake: PdfmakeService) { }

  ngOnInit() { }


  ionViewWillEnter() {

    if (!this._storage.readLocal('setok')) {
      this._router.navigate([ 'tabs/settings' ])
    }

  }

  launchAttestation(activity: number) {

    this._storage.saveOnLine(activity);

    //creation du pdf
    this._pdfmake.generatePdf(activity);

  }

}