import { PdfmakeService } from './../../../../service/pdfmake/pdfmake.service';
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

  constructor(private _router: Router, private _storage: StorageService, private _varGlobal: VariableService, private _pdf: PdfmakeService) { }

  ionViewWillEnter() {

    this._varGlobal.loadVar();
    if (!this._storage.readLocal('setok')) {
      this._router.navigate([ 'tabs/settings' ])
    }
  }

  launchAttestation(activity: number) {

    this._storage.saveOnLine(activity);

    console.log('Activity', activity);

    this._pdf.generatePdf(activity)
  }

}