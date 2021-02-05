import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VariableService } from '../variable/variable.service';
//TODO Voir pour installer pdf-lib al aplace de pdfmake
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TimefrPipe } from '../../shared/pipe/time/timefr.pipe';
import { StorageService } from '../storage/storage.service';
import { TimeBackPipe } from '../../shared/pipe/time/timeback.pipe';
import { DayfrPipe } from '../../shared/pipe/dayfr/dayfr.pipe';
import { ActivityPipe } from '../../shared/pipe/activity/activity.pipe';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfmakeService {
  pdfMake: any;
  resume: any;
  dateofbirth: string;

  // title: string = environment.title;
  todaydate: any = new Date().toLocaleDateString();
  dayfr: any = null;
  timebackColon: string = null;
  timebackH: string = null;

  // transfert de parametres
  params: number | string = null;
  pageNum: number = null;

  // QRCode
  qrCodeData: string = null;
  static generatePdf: any;


  constructor(private _varGlobal: VariableService, private _datepipe: DatePipe) { }

  async generatePdf(qrcode: string) {



    //Modifie l'heure de création avec un parametre Timeback
    this.timebackColon = this._timeBackPipe.transform(
      this._varGlobal.setting.timeback,
      true
    );
    this.timebackH = this._timeBackPipe.transform(
      this._varGlobal.setting.timeback,
      false
    );

    // modifie la date de fr
    this.dayfr = this._dayfr.transform(
      this._varGlobal.setting.dateofbirth
    )

    // console.log('this._varGlobal.setting.dateofbirth', this._varGlobal.setting.dateofbirth);
    this.dateofbirth = this._datepipe.transform(this._varGlobal.setting.dateofbirth, 'dd/MM/yyyy')
    // console.log('dateofbird', this.dateofbirth);

    sessionStorage.setItem('resume', JSON.stringify(this.resume));


    // console.log(this._varGlobal.setting.dateofbirth);
    const documentDefinition = this.getDocumentDefinition(qrcode);
    await this.loadPdfMaker();
    this.pdfMake.createPdf(documentDefinition).open();
  }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      // this.pdfMake = pdfMakeModule;
      // this.pdfMake.vfs = pdfFontsModule.pdfMake.vfs;
      this.pdfMake = (pdfMakeModule as any).default;
      this.pdfMake.vfs = (pdfFontsModule as any).default.pdfMake.vfs;
    }
  }


  getDocumentDefinition(qrcode: string) {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));


    // console.log(this._varGlobal.setting.dateofbirth);


    return {

      content: [
        {
          text: 'ATTESTATION DE DÉPLACEMENT DÉROGATOIRE',
          bold: true,
          fontSize: 15,
          alignment: 'center',
          margin: [ 0, 0, 0, 20 ]
        },
        {
          text: 'En application du décret no 2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l’épidémie de COVID-19 dans le cadre de l’état d’urgence sanitaire',
          bold: false,
          fontSize: 10,
          alignment: 'center',
          margin: [ 20, 0, 20, 20 ]
        },
        {
          text: 'Mme/M. : ' + this._varGlobal.setting.firstname + ' ' + this._varGlobal.setting.lastname,
          bold: false,
          fontSize: 10,
          alignment: 'left',
          margin: [ 20, 0, 20, 20 ]
        },
        {
          text: 'Né(e) le : ' + this.dateofbirth + '              à ' + this._varGlobal.setting.cityofbird,
          bold: false,
          fontSize: 10,
          alignment: 'left',
          margin: [ 20, 0, 20, 20 ]
        },
        {
          text: 'Demeurant  : ' + this._varGlobal.setting.adress + ' ' + this._varGlobal.setting.zipcode + ' ' + this._varGlobal.setting.city,
          bold: false,
          fontSize: 10,
          alignment: 'left',
          margin: [ 20, 0, 20, 20 ]
        },
        {
          text: `certifie que mon déplacement est lié au motif suivant(cocher la case) autorisé par le décret no 2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l’épidémie de COVID-19 dans le cadre de l’état d’urgence sanitaire :`,
          bold: false,
          fontSize: 10,
          alignment: 'left',
          margin: [ 20, 0, 20, 0 ]
        },
        {
          text: `Note:Les personnes souhaitant bénéficier de l’une de ces exceptions doivent se munir s’il y a lieu, lors de leurs déplacements hors de leur domicile, d’un document leur permettant de justifier que le déplacement considéré entre dans le champ de l’une de ces exception`,
          bold: false,
          fontSize: 6,
          alignment: 'left',
          margin: [ 20, 5, 20, 5 ]
        },
        {
          text: `1. Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou un établissement d’enseignement ou de formation ; déplacements professionnels ne pouvant être différés;déplacements pour un concours ou un examen;Note: A utiliser par les travailleurs non-salariés, lorsqu’ils ne peuvent disposer d’un justificatif de déplacement établi par leur employeur.`,
          bold: false,
          fontSize: 10,
          alignment: 'left',
          margin: [ 20, 20, 20, 20 ]
        },



        // colored QR
        {
          qr: qrcode, alignment: 'left',
          margin: [ 20, 20, 20, 20 ], fit: '250'
        },
      ]
    }
  }
}