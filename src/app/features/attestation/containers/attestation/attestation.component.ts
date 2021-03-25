import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { VariableService } from 'src/app/service/variable/variable.service';
import { DatePipe } from '@angular/common';
import { TimeBackPipe } from 'src/app/shared/pipe/time/timeback.pipe';
import { ActivityPipe } from 'src/app/shared/pipe/activity/activity.pipe';
import { AttestationTapComponent } from 'src/app/modal/attestation-tap/attestation-tap.component';
import { PdfmakeService } from 'src/app/service/pdf/pdfmake/pdfmake.service';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: [ './attestation.component.scss' ]
})
export class AttestationComponent {

  loading: HTMLIonLoadingElement;

  constructor(
    private _routerOutlet: IonRouterOutlet,
    private _pdfMake: PdfmakeService,
    private _varGlobal: VariableService,
    private _datePipe: DatePipe,
    private _timeBackPipe: TimeBackPipe,
    private _activityPipe: ActivityPipe,
    public loadingController: LoadingController,
    public loadingService: LoadingService,
    public modalCtrl: ModalController,
    public modalController: ModalController,
  ) { }

  async ionViewWillEnter() {
    this.loadingService.hide();
  }

  async attestation(activity: number) {

    // Date du jour
    const dateOptions: any = { year: "numeric", month: "long", day: "2-digit" };
    // create date of day
    const toDay: Date = new Date();
    let toDayFr: string;
    let toDayFrLong: string;
    // conver in french format short
    toDayFr = this._datePipe.transform(toDay, "dd/MM/yyyy");
    // conver in french format long
    toDayFrLong = (toDay.toLocaleDateString("fr-FR", dateOptions));

    // Date de naissance
    let dateOfBirth = new Date(this._varGlobal.setting.dateOfBirth);
    let dateOfBirthFrLong: string;
    // conver in long format 13 mars 2021
    dateOfBirthFrLong = (dateOfBirth.toLocaleDateString("fr-FR", dateOptions));

    //Heures
    let timeBackColon: string = null;
    let timeBackH: string = null;
    let timeBackT: string = null;

    // //Qrcode
    // let qrCodeData: string = null;

    //Heures
    // format 12h34
    timeBackH = this._timeBackPipe.transform(this._varGlobal.setting.timeback, 1);
    //  format 12:34
    timeBackColon = this._timeBackPipe.transform(this._varGlobal.setting.timeback, 2);
    //  format 12-34
    timeBackT = this._timeBackPipe.transform(this._varGlobal.setting.timeback, 3);


    // converti le numéro de l'activity en mot 1= travail
    const activityName = this._activityPipe.transform(activity);



    if (this._varGlobal.setting.screenmode === 1) {
      const modal = await this.modalCtrl.create({
        component: AttestationTapComponent,
        cssClass: 'my-custom-class',
        keyboardClose: true,
        // presentingElement: this._routerOutlet.nativeEl,
        componentProps: {
          'activityName': activityName,
          'dateOfBirth': dateOfBirth,
          'dateOfBirthFrLong': dateOfBirthFrLong,
          'toDayFr': toDayFr,
          'toDayFrLong': toDayFrLong,
          'timeBackT': timeBackT,
          'timeBackH': timeBackH,
          'timeBackColon': timeBackColon,
        }
      });
      return await modal.present();
    } else {
      const data = {
        toDayFr,
        toDayFrLong,
        dateOfBirth,
        dateOfBirthFrLong,
        timeBackColon,
        timeBackH,
        timeBackT
      }
      this._pdfMake.generatePdf(activity, activityName, data);
    }
    // assign a value
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
