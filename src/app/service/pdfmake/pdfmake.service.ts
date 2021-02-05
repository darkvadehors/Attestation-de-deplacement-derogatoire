import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VariableService } from '../variable/variable.service';
//Pipe
import { TimeBackPipe } from '../../shared/pipe/time/timeback.pipe';
import { ActivityPipe } from '../../shared/pipe/activity/activity.pipe';
//PDF
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfmakeService {
  pdfMake: any = null;
  resume: any = null;
  dateofbirth: string = null;
  todaydate: any = new Date().toLocaleDateString();
  timebackColon: string = null;
  timebackH: string = null;

  // QRCode
  qrCodeData: string = null;

  constructor(
    private _varGlobal: VariableService,
    private _datepipe: DatePipe,
    private _timeBackPipe: TimeBackPipe,
    private _activityPipe: ActivityPipe,
  ) { }

  async generatePdf(activity: number) {

    console.log('Activity', activity);
    //Modifie l'heure de création avec un parametre Timeback
    this.timebackColon = this._timeBackPipe.transform(this._varGlobal.setting.timeback, true);
    this.timebackH = this._timeBackPipe.transform(this._varGlobal.setting.timeback, false);

    // modifie la date de fr
    this.dateofbirth = this._datepipe.transform(this._varGlobal.setting.dateofbirth, 'dd/MM/yyyy')

    sessionStorage.setItem('resume', JSON.stringify(this.resume));

    this.exportPdf(activity);
  }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = (pdfMakeModule as any).default;
      this.pdfMake.vfs = (pdfFontsModule as any).default.pdfMake.vfs;
    }
  }


  getDocumentDefinition(qrcode: string) {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));

    return {
      content: [
        {
          text: 'ATTESTATION DE DÉPLACEMENT DÉROGATOIRE DURANT LES HORAIRES DU COUVRE-FEU ',
          bold: false,
          // font: 'Times New Roman',
          fontSize: 17,
          alignment: 'center',
          margin: [ 40, 10, 40, 10 ]
        },
        {
          text: 'En application du décret no 2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l’épidémie de COVID-19 dans le cadre de l’état d’urgence sanitaire',
          bold: false,
          fontSize: 9,
          alignment: 'left',
          margin: [ 22, 0, 30, 22 ]
        },
        {
          text: [
            'Mme/M. :  ',
            { text: this._varGlobal.setting.firstname, fontSize: 11 },
            ' ',
            { text: this._varGlobal.setting.lastname, fontSize: 11 },

          ],
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 20, 0, 20, 5 ]
        },
        {
          text: [
            'Né(e) le : ',
            { text: this.dateofbirth, fontSize: 11, },
            { text: '                                             à : ' },
            { text: this._varGlobal.setting.cityofbird, fontSize: 11 },
          ],
          bold: false,
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 20, 0, 20, 5 ]
        },
        {
          text: [
            'Demeurant  : ',
            { text: this._varGlobal.setting.adress, fontSize: 11 },
            ' ',
            { text: this._varGlobal.setting.zipcode, fontSize: 11 },
            ' ',
            { text: this._varGlobal.setting.city, fontSize: 11 }
          ],
          bold: false,
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 20, 0, 20, 5 ]
        },
        {
          text: `certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé en application des mesures générales nécessaires pour faire face à l’épidémie de COVID-19 dans le cadre de l’état d’urgence sanitaire :`,
          bold: false,
          fontSize: 10.6,
          alignment: 'justify',
          margin: [ 20, 20, 20, 20 ]
        },
        {
          columns: [
            {
              width: 30,
              text: [
                { text: '[  ]', fontSize: 12 }
              ]
            },
            {
              width: '*',
              text: 'Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou le lieu  d’enseignement et de formation, déplacements professionnels ne pouvant être différés'
            }
          ],
          margin: [ 20, 0, 20, 0 ]
        },
        {
          columns: [
            {
              width: 30,
              text: [
                { text: '[  ]', fontSize: 12 }
              ]
            },
            {
              width: '*',
              text: 'Déplacements pour des consultations, examens, actes de prévention (dont vaccination) et soins ne pouvant être assurés à distance et ne pouvant être différés ou pour l’achat de produits de santé'
            }
          ],
          margin: [ 20, 10, 20, 0 ]
        },
        {
          columns: [
            {
              width: 30,
              text: [
                { text: '[  ]', fontSize: 12 }
              ]
            },
            {
              width: '*',
              text: 'Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou précaires ou pour la garde d’enfants'
            }
          ],
          margin: [ 20, 10, 20, 0 ]
        },
        {
          columns: [
            {
              width: 30,
              text: [
                { text: '[  ]', fontSize: 12 }
              ]
            },
            {
              width: '*',
              text: 'Déplacements des personnes en situation de handicap et de leur accompagnant'
            }
          ],
          margin: [ 20, 10, 20, 0 ]
        },
        {
          columns: [
            {
              width: 30,
              text: [
                { text: '[  ]', fontSize: 12 }
              ]
            },
            {
              width: '*',
              text: 'Déplacements pour répondre à une convocation judiciaire ou administrative'
            }
          ],
          margin: [ 20, 10, 20, 0 ]
        },
        {
          columns: [
            {
              width: 30,
              text: [
                { text: '[  ]', fontSize: 12 }
              ]
            },
            {
              width: '*',
              text: 'Déplacements pour participer à des missions d’intérêt général sur demande de l’autorité administrative'
            }
          ],
          margin: [ 20, 10, 20, 0 ]
        },
        {
          columns: [
            {
              width: 30,
              text: [
                { text: '[  ]', fontSize: 12 }
              ]
            },
            {
              width: '*',
              text: 'Déplacements liés à des transits ferroviaires, aériens ou en bus pour des déplacements de longues distances'
            }
          ],
          margin: [ 20, 10, 20, 0 ]
        },
        {
          columns: [
            {
              width: 30,
              text: [
                { text: '[  ]', fontSize: 12 }
              ]
            },
            {
              width: '*',
              text: 'Déplacements brefs, dans un rayon maximal d’un kilomètre autour du domicile pour les besoins des animaux de compagnie'
            }
          ],
          margin: [ 20, 10, 20, 0 ]
        },
        {
          text: [
            'Fait à :  ',
            { text: this._varGlobal.setting.city, fontSize: 11 },
          ],
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 20, 10, 20, 0 ]
        },
        {
          text: [
            'le : ',
            { text: this.todaydate, fontSize: 11, },
            { text: '                                             à : ' },
            { text: this.timebackColon, fontSize: 11 },
          ],
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 20, 5, 20, 0 ]
        },
        {
          text: '(Date et heure de début de sortie à mentionner obligatoirement)',
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 20, 5, 0, 20 ]
        },
        {
          qr: qrcode, alignment: 'right',
          margin: [ 0, 0, 20, 0 ], fit: '100'
        },
        {
          columns: [
            {
              width: 20,
              text: [
                { text: '1', fontSize: 5 }
              ]
            },
            {
              width: '*',
              text: `Les personnes souhaitant bénéficier de l’une de ces exceptions doivent se munir s’il y a lieu, lors de leurs déplacements hors de leur domicile, d’un document leur permettant de justifier que le déplacement considéré entre dans le champ de l’une de ces exceptions.`,
              fontSize: 8.5,
              alignment: 'justify',
            }
          ],
          margin: [ 20, 15, 40, 0 ]
        },
        // colored QR
        {
          qr: qrcode, alignment: 'left',
          margin: [ 20, 20, 20, 20 ], fit: '300'
        },
      ]
    }
  }



  qrCode(activity: number) {
    // converti le numéro de l'activity en mot
    const activityName = this._activityPipe.transform(activity);
    // assign a qrCode
    return this.qrCodeData =
      'Cree le : ' +
      this.todaydate +
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
      this.todaydate +
      ' a ' +
      this.timebackColon +
      ';\nMotifs: ' +
      activityName +
      ';';
  }

  async exportPdf(activity: number) {
    const documentDefinition = this.getDocumentDefinition(this.qrCode(activity));
    await this.loadPdfMaker();
    this.pdfMake.createPdf(documentDefinition).open();
    // const pdf = this.pdfMake.createPdf(documentDefinition);
    // console.log('pdf', pdf);
  }
}