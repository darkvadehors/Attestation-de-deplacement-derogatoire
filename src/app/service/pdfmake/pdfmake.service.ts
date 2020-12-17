import { Injectable } from '@angular/core';

import { VariableService } from '../variable/variable.service';
//TODO Voir pour installer pdf-lib al aplace de pdfmake
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfmakeService {
  pdfMake: any;
  resume: any;
  dateOB: string;

  constructor(private _varGlobal: VariableService) { }

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

  async generatePdf(qrcode: string) {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));


    console.log(this._varGlobal.setting.dateofbirth);
    console.log(this.dateOB);
    const documentDefinition = this.getDocumentDefinition(qrcode);
    await this.loadPdfMaker();
    this.pdfMake.createPdf(documentDefinition).open();
  }

  getDocumentDefinition(qrcode: string) {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));


    console.log(this._varGlobal.setting.dateofbirth);


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
          text: 'Né(e) le : ' + this._varGlobal.setting.dateofbirth + '              à ' + this._varGlobal.setting.cityofbird,
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