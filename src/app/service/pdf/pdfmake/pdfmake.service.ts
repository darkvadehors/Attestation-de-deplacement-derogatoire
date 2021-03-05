import { LoadingService } from './../../../service/loading/loading.service';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VariableService } from '../../variable/variable.service';
//Pipe
import { TimeBackPipe } from '../../../shared/pipe/time/timeback.pipe';
import { ActivityPipe } from '../../../shared/pipe/activity/activity.pipe';
//PDF
import { PdfLibService } from '../pdf-lib/pdf-lib.service';
import { LoadingController } from '@ionic/angular';
// import { fonts } from 'pdfmake/build/pdfmake';
@Injectable({
  providedIn: 'root'
})
export class PdfmakeService {
  pdfMake: any = null;
  dateofbirth: string = null;
  toDayFr: string;
  toDay: Date = new Date();
  timebackColon: string = null;
  timebackH: string = null;
  timebackT: string = null;
  qrCodeData: string = null;

  constructor(
    private _varGlobal: VariableService,
    private _datepipe: DatePipe,
    private _timeBackPipe: TimeBackPipe,
    private _activityPipe: ActivityPipe,
    private _pdflib: PdfLibService,
    public loadingController: LoadingController,
    public loading: LoadingService
  ) { }

  async generatePdf(activity: number) {
    this.timebackH = this._timeBackPipe.transform(this._varGlobal.setting.timeback, 1);
    this.timebackColon = this._timeBackPipe.transform(this._varGlobal.setting.timeback, 2);
    this.timebackT = this._timeBackPipe.transform(this._varGlobal.setting.timeback, 3);
    this.toDayFr = this._datepipe.transform(this.toDay, "dd/MM/yyyy")
    this.dateofbirth = this._datepipe.transform(this._varGlobal.setting.dateofbirth, 'dd/MM/yyyy')

    // const loading = await this.loadingController.create({
    //   message: 'Patientez....',
    // });

    // await loading.present();

    this.loading.show();

    await this.exportPdf(activity);

    // await loading.dismiss();
  }

  documentDefinition(qrcode: string): any {
    return {
      content: [
        // colored QR
        {
          qr: qrcode
        },
      ],
    }
  }

  qrCode(activity: number) {
    // converti le numéro de l'activity en mot
    const activityName = this._activityPipe.transform(activity);
    // assign a qrCode
    return this.qrCodeData =
      'Cree le : ' +
      this.toDayFr +
      ' a ' +
      this.timebackH +
      // identification
      ';\nNom : ' +
      this._varGlobal.setting.lastname +
      ';\nPrenom: ' +
      this._varGlobal.setting.firstname +
      ';\nNaissance: ' +
      this.dateofbirth +
      ' a ' +
      this._varGlobal.setting.cityofbird +
      // Personnal Adress
      ';\nAdresse: ' +
      this._varGlobal.setting.adress +
      ' ' +
      this._varGlobal.setting.zipcode +
      ' ' +
      this._varGlobal.setting.city +
      ' ' +
      // Exit time
      ';\nSortie: ' +
      this.toDayFr +
      ' a ' +
      this.timebackColon +
      ';\nMotifs: ' +
      activityName +
      ';';
  }

  async exportPdf(activity: number) {

    // const dateFile = this._datepipe.transform(this.toDay, 'yyyy-MM-dd_') + this.timebackT;
    const documentDefinition = this.documentDefinition(this.qrCode(activity));

    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      // const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = (pdfMakeModule as any).default;
      // this.pdfMake.vfs = (pdfFontsModule as any).default.pdfMake.vfs;
    }

    // const pdfDocGenerator = this.pdfMake.createPdf(documentDefinition, null, fonts);
    const pdfDocGenerator = this.pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBase64((data: any) => {
      this._pdflib.modifyPdf(data, activity);
    });
  }
}