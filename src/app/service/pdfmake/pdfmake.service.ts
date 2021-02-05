import { Injectable, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { VariableService } from '../variable/variable.service';
import { PDFDocument, StandardFonts } from 'pdf-lib';
// import { FileSaverService } from 'ngx-filesaver';
import { StorageService } from '../storage/storage.service';
import { TimeBackPipe } from '../../shared/pipe/time/timeback.pipe';
import { DayfrPipe } from './../../shared/pipe/dayfr/dayfr.pipe';
import { ActivityPipe } from '../../shared/pipe/activity/activity.pipe';
@Injectable({
  providedIn: 'root'
})

export class PdfmakeService {

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

  constructor(
    public storage: StorageService,
    private _varGlobal: VariableService,
    private _timeBackPipe: TimeBackPipe,
    private _dayfr: DayfrPipe,
    private _activityPipe: ActivityPipe,
    // private _FileSaverService: FileSaverService
  ) { }

  async generatePdf(activity: any) {

    //Pipe

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

    const url = './assets/certificateCouvreFeux.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[ 0 ]
    const { width, height } = firstPage.getSize()

    const drawText = (text: any, x: number, y: number, size = 11) => {
      firstPage.drawText(text, { x, y, size, font })
    }

    // Sortie
    // drawText(`${this._varGlobal.setting.firstname} ${this._varGlobal.setting.lastname}`, 95, 702)
    // drawText(this._varGlobal.setting.dateofbirth, 95, 685)
    // drawText(this._varGlobal.setting.cityofbird || '', 215, 685)
    // drawText(`${this._varGlobal.setting.address} ${this._varGlobal.setting.zipcode} ${this._varGlobal.setting.city}`, 106, 666)


    // switch (activity) {
    //   case 1:
    //     drawText('x', 45, 551, 20)
    //     break
    //   case 2:
    //     drawText('x', 45, 480, 20)
    //     break
    //   case 3:
    //     drawText('x', 45, 432, 20)
    //     break
    //   case 4:
    //     drawText('x', 45, 408, 20)
    //     break
    //   case 5:
    //     drawText('x', 45, 371.5, 20)
    //     break
    //   case 6:
    //     drawText('x', 45, 347, 20)
    //     break
    //   case 7:
    //     drawText('x', 45, 274, 20)
    //     break
    //   case 8:
    //     drawText('x', 45, 250, 20)
    //     break;
    //   case 9:
    //     drawText('x', 45, 226, 20)
    //     break;
    // }


    //  Couvre Feux
    drawText(`${this._varGlobal.setting.firstname} ${this._varGlobal.setting.lastname}`, 119, 665);
    drawText(this.dayfr, 119, 645);
    drawText(this._varGlobal.setting.cityofbird || '', 312, 645);
    drawText(`${this._varGlobal.setting.address} ${this._varGlobal.setting.zipcode} ${this._varGlobal.setting.city}`, 133, 625);

    switch (activity) {
      case 1:
        drawText('x', 73, 540, 12)
        break
      case 2:
        drawText('x', 73, 507, 12)
        break
      case 3:
        drawText('x', 73, 461, 12)
        break
      case 4:
        drawText('x', 73, 429, 12)
        break
      case 5:
        drawText('x', 73, 408, 12)
        break
      case 6:
        drawText('x', 73, 386, 12)
        break
      case 7:
        drawText('x', 73, 352, 12)
        break
      case 8:
        drawText('x', 73, 319, 12)
        break;
    }

    drawText(this._varGlobal.setting.city, 105, 274, 11)
    drawText(`${this.todaydate}`, 91, 255, 11)
    drawText(`${this.timebackH}`, 312, 255, 11)


    // converti le numéro de l'activity en mot
    activity = this._activityPipe.transform(this.params);

    // assign a qrCode
    this.qrCodeData =
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
      this._varGlobal.setting.dateofbirth +
      ' a ' +
      this._varGlobal.setting.cityofbird +
      // Personnal address
      ';\nadresse: ' +
      this._varGlobal.setting.address +
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
      activity;





    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    //export file
    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' });
    window.open(window.URL.createObjectURL(blob));


  }
}