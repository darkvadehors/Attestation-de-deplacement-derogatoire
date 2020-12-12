//TODO faire un pdfng build --prod --baseHref ./
//FIXME Redirection sur welcom si pas de donnée
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage/storage.service';
import { ActivityPipe } from 'src/app/shared/pipe/activity/activity.pipe';
import { BacktimePipe } from 'src/app/shared/pipe/time/backtime.pipe';
import { environment } from 'src/environments/environment';

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
  params: number | string = null;
  activity: string = null;
  pageNum: number = null;

  // QRCode
  qrCode: string = null;

  constructor(
    private _router: Router,
    public storage: StorageService,
    private _Activatedroute: ActivatedRoute,
    private _backTimePipe: BacktimePipe,
    private _activityPipe: ActivityPipe
  ) {}

  async ionViewWillEnter() {
    console.log('this.setting.backtime', this.storage.setting.backtime);
    console.log('test', this.storage.setting.adress);
    // Récupère le QueryParametre activity
    this._Activatedroute.queryParamMap.subscribe((params) => {
      this.params = +params.get('activity') || 0;
    });

    //Modifie l'heure de création avec un parametre BackTime
    this.backtimeColon = this._backTimePipe.transform(
      this.storage.setting.backtime,
      true
    );
    this.backtimeH = this._backTimePipe.transform(
      this.storage.setting.backtime,
      false
    );

    console.log('this.params', this.params);
    // converti le numéro de l'activity en mot
    this.activity = this._activityPipe.transform(this.params);

    console.log('this.activity', this.activity);
    // assign a qrCode
    this.qrCode =
      'Cree le : ' +
      this.todaydate +
      ' a ' +
      this.backtimeH +
      // identification
      ';\nNom : ' +
      this.storage.setting.lastname +
      ';\nPrenom: ' +
      this.storage.setting.firstname +
      ';\nNaissance: ' +
      this.storage.setting.dateofbirth +
      ' a ' +
      this.storage.setting.cityofbird +
      // Personnal Adress
      ';\nAdresse: ' +
      this.storage.setting.adress +
      ' ' +
      this.storage.setting.zipcode +
      ' ' +
      this.storage.setting.city +
      ' ' +
      // Exit time
      ';\nSortie: ' +
      this.todaydate +
      ' a ' +
      this.backtimeColon +
      ';\nMotifs: ' +
      this.activity;
  }

  refresh() {
    this.params = null;
    this._router.navigate(['welcome']);
  }
}
