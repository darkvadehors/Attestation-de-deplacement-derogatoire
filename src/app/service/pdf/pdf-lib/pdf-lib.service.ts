import { AttestationPdfComponent } from './../../../modal/attestation-pdf/attestation-pdf.component';
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
  page: any;
  constructor(
    private _varGlobal: VariableService,
    private modalCtrl: ModalController,
    private _datePipe: DatePipe,
    private _timeBackPipe: TimeBackPipe,
    public loading: LoadingService,
  ) { }

  async modifyPdf(pdf: any, activity: number) {

    // import de la library
    const pdflibModule = await import('pdf-lib').then(({ PDFDocument, StandardFonts }) => ({ PDFDocument, StandardFonts }));

    // certificat choise
    // const certificateUrl = './assets/certificate.33362af4.pdf';
    let certificateUrl: string;
    // Attribution du bon pdf
    if (activity < 20) {
      certificateUrl = './assets/pdf/curfew-certificate.40bf5adf.pdf';
    } else {
      certificateUrl = './assets/pdf/quarantine-certificate.1f118cea.pdf';
    }

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

    // Embed the first page
    const [ qrCode ] = await pdfDoc.embedPdf(qrCodePdfBytes);

    // Embed the Helvetica font
    // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const font = await pdfDoc.embedFont(pdflibModule.StandardFonts.Helvetica)

    // compte el nombre de page
    const totalPages = pdfDoc.getPageCount()

    // on creer un page par page
    // console.log('nbr page', totalPages);
    // const page = [];
    // for (let i = 0; i < totalPages; i++) {
    //   page[ i ] = pdfDoc.getPage(i);
    // }

    const pages = pdfDoc.getPages()
    const firstPage = pages[ 0 ]
    if (totalPages > 1) {
      const page2 = pages[ 1 ]
    }

    // const page2 = pages[ 1 ]
    const { width, height } = firstPage.getSize()


    pdfDoc.setTitle(environment.title)
    let marginLeftBig = 148;
    let marginLeftSmall = 73;
    const marginY = 75;
    const marginRight2 = 12;

    //On prend la premère page et on l'attribut a page1
    const page1 = pdfDoc.getPage(0);

    // Get the width/height of QRcode scaled down to 30% of its original size
    const qrCodeDims1 = qrCode.scale(0.3);

    //  2° QRcode
    // Get the width/height of the American flag PDF scaled down to 30% of its original size
    const qrCodeDims2 = qrCode.scale(1.1);

    const drawTextPage = (text: any, x: number, y: number, size = 11) => {
      this.page.drawText(text, { x, y, size, font })
    }

    // ------------------------------------------- Page CouvreFeux ------------------------------------------------------------------------
    if (activity < 20) {
      this.page = page1
      // Draw the qrcode1 top of the page
      page1.drawPage(qrCode, {
        ...qrCodeDims1,
        x: page1.getWidth() - qrCodeDims1.width + 60,
        y: page1.getHeight() - qrCodeDims1.height - 660,
      });

      // Add a blank page to the document
      const pageQrCodeCouvreFeux = pdfDoc.addPage();

      // Draw the American flag image in the center top of the page
      pageQrCodeCouvreFeux.drawPage(qrCode, {
        ...qrCodeDims2,
        x: pageQrCodeCouvreFeux.getWidth() - qrCodeDims2.width + 80,
        y: pageQrCodeCouvreFeux.getHeight() - qrCodeDims2.height - 50,
      });

      // information de la personne
      const name: string = this._varGlobal.setting.firstname + ' ' + this._varGlobal.setting.lastname;
      const adress: string = this._varGlobal.setting.adress + ' ' + this._varGlobal.setting.zipcode + ' ' + this._varGlobal.setting.city;
      const dateOfBirth: string = this._datePipe.transform(this._varGlobal.setting.dateOfBirth, 'dd/MM/yyyy').toString();

      drawTextPage(name, marginLeftBig, 704);
      drawTextPage(dateOfBirth, marginLeftBig, 684);
      drawTextPage(this._varGlobal.setting.cityofbird, 311, 684);
      drawTextPage(adress, marginLeftBig + 4, 667);

      drawTextPage('Fait à ', 73, 113);
      // Ville
      drawTextPage(this._varGlobal.setting.city, 106, 113);
      // date du jour
      drawTextPage('Le ' + this._datePipe.transform(this.toDay, "dd/MM/yyyy"), 73, 94);
      // Heure de l'attestation
      drawTextPage('à ' + this._timeBackPipe.transform(this._varGlobal.setting.timeback, 2), 311, 94);
      // mention legal
      drawTextPage('(Date et heure de début de sortie à mentionner obligatoirement)', 73, 78);

    } else {
    // ------------------------------------------- Page Confinement ------------------------------------------------------------------------

      let lastPage = pdfDoc.getPage(totalPages - 1);
      let marginLeftBig = 110;
      this.page = page1;

      // Draw the qrcode1 top of the page
      lastPage.drawPage(qrCode, {
        ...qrCodeDims1,
        x: lastPage.getWidth() - qrCodeDims1.width + 60,
        y: lastPage.getHeight() - qrCodeDims1.height - 660,
      });

      // let drawText = (text: any, x: number, y: number, size = 11) => {
      //   lastPage.drawText(text, { x, y, size, font })
      // }
      // Add a blank page to the document
      const qrCodePageConfinement = pdfDoc.addPage();

      // Draw the American flag image in the center top of the page
      qrCodePageConfinement.drawPage(qrCode, {
        ...qrCodeDims2,
        x: qrCodePageConfinement.getWidth() - qrCodeDims2.width + 80,
        y: qrCodePageConfinement.getHeight() - qrCodeDims2.height - 50,
      });

      // information de la personne
      const name: string = this._varGlobal.setting.firstname + ' ' + this._varGlobal.setting.lastname;
      const adress: string = this._varGlobal.setting.adress + ' ' + this._varGlobal.setting.zipcode + ' ' + this._varGlobal.setting.city;
      const dateOfBirth: string = this._datePipe.transform(this._varGlobal.setting.dateOfBirth, 'dd/MM/yyyy').toString();

      drawTextPage(name, marginLeftBig, 516);
      drawTextPage(dateOfBirth, marginLeftBig, 501);
      drawTextPage(this._varGlobal.setting.cityofbird, 220, 501);
      drawTextPage(adress, marginLeftBig + 17, 488);

      this.page = lastPage;
      drawTextPage('Fait à ', 73, 113);
      // Ville
      drawTextPage(this._varGlobal.setting.city, 106, 113);
      // date du jour
      drawTextPage('Le ' + this._datePipe.transform(this.toDay, "dd/MM/yyyy"), 73, 94);
      // Heure de l'attestation
      drawTextPage('à ' + this._timeBackPipe.transform(this._varGlobal.setting.timeback, 2), 311, 94);
      // mention legal
      drawTextPage('(Date et heure de début de sortie à mentionner obligatoirement)', 73, 78);

    }


    let y: number = null;
    switch (activity) {
      case 1:
        y = 505;
        break
      case 2:
        y = 471;
        break
      case 3:
        y = 437;
        break
      case 4:
        y = 404;
        break
      case 5:
        y = 383;
        break
      case 6:
        y = 338;
        break
      case 7:
        y = 305;
        break
      case 8:
        y = 270;
        break;
      case 9:
        y = 230;
        break;
      case 10:
        y = 185;
        break;
      case 11:
        y = 115;
        break;
      case 12:
        y = 70;
        break;
      case 21:
        y = 292;
        break;
      case 22:
        y = 170;
        break;
      case 23:
        y = 86;
        break;
      case 24:
        y = 707;
        break;
      case 25:
        y = 650;
        break;
      case 26:
        y = 554;
        break;
      case 27:
        y = 458;
        break;
      case 28:
        y = 403;
        break;
      case 29:
        y = 349;
        break;
      case 30:
        y = 307;
        break;
      case 31:
        y = 239;
        break;
      case 32:
        y = 170;
        break;
    }
    // console.log('activity', activity);
    if (activity > 20 && activity <= 23) {
      marginLeftSmall = 60;
      this.page = page1;
      drawTextPage('x', marginLeftSmall, marginY + y, marginRight2)
    } else if (activity > 23) {
      marginLeftSmall = 60;
      drawTextPage('x', marginLeftSmall, marginY + y, marginRight2)
    } else {
      drawTextPage('x', marginLeftSmall, marginY + y, marginRight2)
    }

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' })
    const pdfUrl = window.URL.createObjectURL(blob);

    const modal = await this.modalCtrl.create({
      component: AttestationPdfComponent,
      cssClass: 'my-custom-class',
      keyboardClose: true,
      componentProps: {
        'pdfUrl': pdfUrl,
      }
    });
    return await modal.present();
  }

}