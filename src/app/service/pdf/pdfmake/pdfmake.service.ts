import { VariableService } from 'src/app/service/variable/variable.service';
import { LoadingService } from './../../../service/loading/loading.service';
import { Injectable, OnInit } from '@angular/core';
//PDF
import { PdfLibService } from '../pdf-lib/pdf-lib.service';
import { LoadingController } from '@ionic/angular';
// import { fonts } from 'pdfmake/build/pdfmake';
@Injectable({
  providedIn: 'root'
})
export class PdfmakeService implements OnInit {
  pdfMake: any = null;
  qrCodeData: string = null;

  constructor(
    private _pdflib: PdfLibService,
    public loadingController: LoadingController,
    public loading: LoadingService,
    private _varGlobal: VariableService,
  ) { }

  async ngOnInit() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = (pdfMakeModule as any).default;
      this.pdfMake.vfs = (pdfFontsModule as any).default.pdfMake.vfs;
    }
  }
  async generatePdf(activity: number, activityName: string, attestationData: any) {

    // // assign a qrCode
    const qrCodeData =
      'Cree le : ' +
      attestationData.toDayFr +
      ' a ' +
      attestationData.timeBackH +
      // identification
      ';\nNom : ' +
      this._varGlobal.setting.lastname +
      ';\nPrenom: ' +
      this._varGlobal.setting.firstname +
      ';\nNaissance: ' +
      attestationData.dateOfBirth +
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
      attestationData.toDayFr +
      ' a ' +
      attestationData.timeBackColon +
      ';\nMotifs: ' +
      activityName +
      ';';

    const docDefinition = {
      content: [
        // colored QR
        {
          qr: qrCodeData
        },
      ],
    }

    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      // const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = (pdfMakeModule as any).default;
      // this.pdfMake.vfs = (pdfFontsModule as any).default.pdfMake.vfs;
    }

    // const pdfDocGenerator = this.pdfMake.createPdf(documentDefinition, null, fonts);
    const pdfDocGenerator = this.pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBase64((data: any) => {
      this._pdflib.modifyPdf(data, activity);
    });

  }
}