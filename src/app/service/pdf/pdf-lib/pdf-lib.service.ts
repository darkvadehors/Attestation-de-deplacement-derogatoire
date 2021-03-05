import { pdfViewer } from './../../../modal/pdfviewer/pdfviewer';
import { environment } from '../../../../environments/environment.prod';
import { VariableService } from '../../variable/variable.service';
import { Injectable } from '@angular/core';

//Capacitor
import { Plugins } from '@capacitor/core';
const { Filesystem, Browser } = Plugins;

//Ionic
import { ModalController } from '@ionic/angular';
import { LoadingService } from '../../loading/loading.service';

// PDF-Lib
// import { PDFDocument, StandardFonts } from 'pdf-lib';

// mmodification des heures
import { DatePipe } from '@angular/common';
import { TimeBackPipe } from 'src/app/shared/pipe/time/timeback.pipe';

@Injectable({
  providedIn: 'root'
})
export class PdfLibService {
  routerOutlet: any;
  toDay: Date = new Date();

  constructor(
    private _varGlobal: VariableService,
    private modalCtrl: ModalController,
    private _datepipe: DatePipe,
    private _timeBackPipe: TimeBackPipe,
    public loading: LoadingService,
  ) { }

  async modifyPdf(pdf: any, activity: number) {

    // import de la library
    const pdflibModule = await import('pdf-lib').then(({ PDFDocument, StandardFonts }) => ({ PDFDocument, StandardFonts }));

    // const pdfDoc = await pdflibModule.PDFDocument.load(pdf)

    // Fetch qrCode
    const certificateUrl = './assets/certificate.33362af4.pdf';

    // Fetch certificate PDF
    const certificatePdfBytes = await fetch(certificateUrl).then((res) =>
      res.arrayBuffer(),
    );

    //Juste rename data in qrCodePdfBytes
    const qrCodePdfBytes = pdf;

    // Create a new PDFDocument
    // const pdfDoc = await PDFDocument.create();

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await pdflibModule.PDFDocument.load(certificatePdfBytes)

    // Embed the first page of the American flag PDF
    const [ qrCode ] = await pdfDoc.embedPdf(qrCodePdfBytes);

    // Load the constitution PDF into a PDFDocument
    // const usConstitutionPdf = await PDFDocument.load(certificatePdfBytes);

    // Embed the Helvetica font
    // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const font = await pdfDoc.embedFont(pdflibModule.StandardFonts.Helvetica)

    //On prend la premère page et on l'attribut a page1
    const page1 = pdfDoc.getPage(0);

    // Get the width/height of the American flag PDF scaled down to 30% of its original size
    const qrCodeDims1 = qrCode.scale(0.3);
    // Draw the American flag image in the center top of the page
    page1.drawPage(qrCode, {
      ...qrCodeDims1,
      x: page1.getWidth() - qrCodeDims1.width + 60,
      y: page1.getHeight() - qrCodeDims1.height - 90,
    });

    //  2° QRcode
    // Get the width/height of the American flag PDF scaled down to 30% of its original size
    const qrCodeDims2 = qrCode.scale(1.1);

    // Add a blank page to the document
    const page2 = pdfDoc.addPage();

    // Draw the American flag image in the center top of the page
    page2.drawPage(qrCode, {
      ...qrCodeDims2,
      x: page2.getWidth() - qrCodeDims2.width + 80,
      y: page2.getHeight() - qrCodeDims2.height - 50,
    });

    const pages = pdfDoc.getPages()
    const firstPage = pages[ 0 ]
    const { width, height } = firstPage.getSize()
    const drawText = (text: any, x: number, y: number, size = 11) => {
      firstPage.drawText(text, { x, y, size, font })
    }

    pdfDoc.setTitle(environment.title)
    let marginLeft1 = 148;
    let marginX = 73;
    let marginY = 75;
    let marginRight2 = 12;

    const name: string = this._varGlobal.setting.firstname + ' ' + this._varGlobal.setting.lastname;
    const adress: string = this._varGlobal.setting.adress + ' ' + this._varGlobal.setting.zipcode + ' ' + this._varGlobal.setting.city;
    const dateofbirth: string = this._datepipe.transform(this._varGlobal.setting.dateofbirth, 'dd/MM/yyyy').toString();

    drawText(name, marginLeft1, 704);
    drawText(dateofbirth, marginLeft1, 684);
    drawText(this._varGlobal.setting.cityofbird, 311, 684);
    drawText(adress, marginLeft1 + 4, 667);

    switch (activity) {
      case 1:
        // drawText('x', marginX, 603, marginRight2)
        drawText('x', marginX, marginY + 505, marginRight2)
        break
      case 2:
        drawText('x', marginX, marginY + 471, marginRight2)
        break
      case 3:
        drawText('x', marginX, marginY + 437, marginRight2)
        break
      case 4:
        drawText('x', marginX, marginY + 404, marginRight2)
        break
      case 5:
        drawText('x', marginX, marginY + 383, marginRight2)
        break
      case 6:
        drawText('x', marginX, marginY + 362, marginRight2)
        break
      case 7:
        drawText('x', marginX, marginY + 328, marginRight2)
        break
      case 8:
        drawText('x', marginX, marginY + 295, marginRight2)
        break;
      case 9:
        drawText('x', marginX, marginY + 230, marginRight2)
        break;
      case 10:
        drawText('x', marginX, marginY + 185, marginRight2)
        break;
      case 11:
        drawText('x', marginX, marginY + 115, marginRight2)
        break;
      case 12:
        drawText('x', marginX, marginY + 70, marginRight2)
        break;
    }

    drawText(this._varGlobal.setting.city, 106, 113);
    drawText(this._datepipe.transform(this.toDay, "dd/MM/yyyy"), 92, 94);
    drawText(this._timeBackPipe.transform(this._varGlobal.setting.timeback, 2), 311, 94);

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' })
    const pdfUrl = window.URL.createObjectURL(blob);

    const modal = await this.modalCtrl.create({
      component: pdfViewer,
      cssClass: 'my-custom-class',
      keyboardClose: true,
      componentProps: {
        'pdfUrl': pdfUrl,
      }
    });
    return await modal.present();
  }

}