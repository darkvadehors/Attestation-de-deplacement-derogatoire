//TODO faire un pdfng build --prod --baseHref ./
//FIXME Redirection sur welcom si pas de donnée
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PdfmakeService } from '../../../../service/pdfmake/pdfmake.service';
import { StorageService } from '../../../../service/storage/storage.service';
import { VariableService } from '../../../../service/variable/variable.service';
import { ActivityPipe } from '../../../../shared/pipe/activity/activity.pipe';
import { BacktimePipe } from '../../../../shared/pipe/time/backtime.pipe';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss'],
})
export class AttestationComponent {

  title: string = environment.title;

  todaydate: any = new Date().toLocaleDateString();
  backtimeColon: string = null;
  backtimeH: string = null;

  // transfert de parametres
  params: number = null;
  activity: string = null;
  pageNum: number = null;

  // QRCode
  qrCodeData: string = null;

  constructor(
    public varGlobal:VariableService,
    public storage: StorageService,
    private _router: Router,
    private _Activatedroute: ActivatedRoute,
    private _backTimePipe: BacktimePipe,
    private _activityPipe: ActivityPipe,
    private _pdfService: PdfmakeService
  ) {}

  async ionViewWillEnter() {
    // Récupère le QueryParametre activity
    this._Activatedroute.queryParamMap.subscribe((params) => {
      this.params = +params.get('activity') || 0;
    });

    //Modifie l'heure de création avec un parametre BackTime
    this.backtimeColon = this._backTimePipe.transform(
      this.varGlobal.setting.backtime,
      true
    );
    this.backtimeH = this._backTimePipe.transform(
      this.varGlobal.setting.backtime,
      false
    );

    // converti le numéro de l'activity en mot
    this.activity = this._activityPipe.transform(this.params);

    // console.log('this.params', this.params);
    // assign a qrCode
    this.qrCodeData =
      'Cree le : ' +
      this.todaydate +
      ' a ' +
      this.backtimeH +
      // identification
      ';\nNom : ' +
      this.varGlobal.setting.lastname +
      ';\nPrenom: ' +
      this.varGlobal.setting.firstname +
      ';\nNaissance: ' +
      this.varGlobal.setting.dateofbirth +
      ' a ' +
      this.varGlobal.setting.cityofbird +
      // Personnal Adress
      ';\nAdresse: ' +
      this.varGlobal.setting.adress +
      ' ' +
      this.varGlobal.setting.zipcode +
      ' ' +
      this.varGlobal.setting.city +
      ' ' +
      // Exit time
      ';\nSortie: ' +
      this.todaydate +
      ' a ' +
      this.backtimeColon +
      ';\nMotifs: ' +
      this.activity;
  }

  generatePdf() {
    this._pdfService.generatePdf(this.qrCodeData);
  }

  refresh() {
    this.params = null;
    this._router.navigate(['welcome']);
  }
}
