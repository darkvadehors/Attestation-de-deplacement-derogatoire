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
    // sessionStorage.setItem('resume', JSON.stringify(this.resume));

    //FIXME ajout la font time new roman
    return {
      info: {
        title: 'COVID-19 - Déclaration de déplacement',
        author: `Ministère de l'injustice`,
        subject: 'Attestation de déplacement dérogatoire',
        keywords: [ 'covid19', 'covid-19', 'attestation', 'déclaration', 'déplacement', 'officielle', 'gouvernement', ],
      },
      content: [
        {
          text: 'ATTESTATION DE DÉPLACEMENT DÉROGATOIRE DURANT LES HORAIRES DU COUVRE-FEU ',
          margin: [ 40, 8.5, 40, 10 ],
          style: 'header',
        },
        {
          text: 'En application du décret no 2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l’épidémie de COVID-19 dans le cadre de l’état d’urgence sanitaire',
          fontSize: 9,
          alignment: 'left',
          margin: [ 30, 0, 60, 22 ]
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
          margin: [ 30, 0, 20, 5 ]
        },
        {
          text: [
            'Né(e) le : ',
            { text: this.dateofbirth, fontSize: 11, },
            { text: '                                             à : ' },
            { text: this._varGlobal.setting.cityofbird, fontSize: 11 },
          ],
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 30, 0, 20, 5 ]
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
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 30, 0, 20, 5 ]
        },
        {
          text: `certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé en application des mesures générales nécessaires pour faire face à l’épidémie de COVID-19 dans le cadre de l’état d’urgence sanitaire :`,
          fontSize: 10.6,
          alignment: 'justify',
          margin: [ 30, 20, 20, 20 ]
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
          margin: [ 30, 0, 20, 0 ]
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
          margin: [ 30, 10, 20, 0 ]
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
          margin: [ 30, 10, 20, 0 ]
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
          margin: [ 30, 10, 20, 0 ]
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
          margin: [ 30, 10, 20, 0 ]
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
          margin: [ 30, 10, 20, 0 ]
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
          margin: [ 30, 10, 20, 0 ]
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
          margin: [ 30, 10, 20, 0 ]
        },
        {
          text: [
            'Fait à :  ',
            { text: this._varGlobal.setting.city, fontSize: 11 },
          ],
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 30, 10, 20, 0 ]
        },
        {
          text: [
            'le : ',
            { text: this.toDayFr, fontSize: 11, },
            { text: '                                                        à : ' },
            { text: this.timebackColon, fontSize: 11 },
          ],
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 30, 5, 20, 0 ]
        },
        {
          text: '(Date et heure de début de sortie à mentionner obligatoirement)',
          fontSize: 10.6,
          alignment: 'left',
          margin: [ 30, 5, 0, 10 ]
        },
        {
          qr: qrcode, alignment: 'left',
          margin: [ 390, 0, 0, 0 ], fit: '114'
        },
        {
          columns: [
            {
              width: 15,
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
          margin: [ 50, 15, 32, 0 ]
        },

        // colored QR
        {
          qr: qrcode, alignment: 'left',
          margin: [ 16, 12, 0, 0 ], fit: '305', version: 10, eccLevel: 'M',
          pageBreak: 'before'
        },
      ],
      styles: {
        header: {
          fontSize: 17,
          alignment: 'center',
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8.5
        }
      }
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

    const dateFile = this._datepipe.transform(this.toDay, 'yyyy-MM-dd_') + this.timebackT;
    const documentDefinition = this.documentDefinition(this.qrCode(activity));

    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = (pdfMakeModule as any).default;
      this.pdfMake.vfs = (pdfFontsModule as any).default.pdfMake.vfs;
    }

    const pdfDocGenerator = this.pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBase64((data: any) => {
      this._pdflib.modifyPdf(data, activity, dateFile);
    });
  }
}