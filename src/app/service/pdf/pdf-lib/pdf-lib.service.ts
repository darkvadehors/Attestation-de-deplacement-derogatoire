import { pdfViewer } from './../../../modal/pdfviewer/pdfviewer';
import { environment } from '../../../../environments/environment.prod';
import { Injectable } from '@angular/core';

//Capacitor
import { Plugins } from '@capacitor/core';
const { Filesystem, Browser } = Plugins;

//Ionic
import { ModalController } from '@ionic/angular';
import { LoadingService } from '../../loading/loading.service';


@Injectable({
  providedIn: 'root'
})
export class PdfLibService {
  routerOutlet: any;


  constructor(
    public modalController: ModalController,
    private modalCtrl: ModalController,
    public loading: LoadingService
  ) { }

  async modifyPdf(pdf: any, activity: number, dateFile: String) {

    const pdflibModule = await import('pdf-lib').then(({
      PDFDocument, StandardFonts
    }) => ({
      PDFDocument, StandardFonts
    }));
    const pdfDoc = await pdflibModule.PDFDocument.load(pdf)
    const font = await pdfDoc.embedFont(pdflibModule.StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()

    const firstPage = pages[ 0 ]
    const { width, height } = firstPage.getSize()

    const drawText = (text: any, x: number, y: number, size = 11) => {
      firstPage.drawText(text, { x, y, size, font })
    }

    pdfDoc.setTitle(environment.title)

    switch (activity) {
      case 1:
        drawText('x', 73, 558, 13)
        break
      case 2:
        drawText('x', 73, 506, 12)
        break
      case 3:
        drawText('x', 73, 454, 12)
        break
      case 4:
        drawText('x', 73, 415, 12)
        break
      case 5:
        drawText('x', 73, 392, 12)
        break
      case 6:
        drawText('x', 73, 367, 12)
        break
      case 7:
        drawText('x', 73, 329, 12)
        break
      case 8:
        drawText('x', 73, 291, 12)
        break;
    }

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