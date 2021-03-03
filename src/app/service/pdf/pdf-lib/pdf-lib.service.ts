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
    let marginLeft = 62;
    let marginRight = 12;
    let marginBottum = 60;

    switch (activity) {
      case 1:
        drawText('x', marginLeft, 603, marginRight)
        break
      case 2:
        drawText('x', marginLeft, 551, marginRight)
        break
      case 3:
        drawText('x', marginLeft, 499, marginRight)
        break
      case 4:
        drawText('x', marginLeft, 460, marginRight)
        break
      case 5:
        drawText('x', marginLeft, 437, marginRight)
        break
      case 6:
        drawText('x', marginLeft, 412, marginRight)
        break
      case 7:
        drawText('x', marginLeft, 374, marginRight)
        break
      case 8:
        drawText('x', marginLeft, 336, marginRight)
        break;
      case 9:
        drawText('x', marginLeft, 260, marginRight)
        break;
      case 10:
        drawText('x', marginLeft, 208, marginRight)
        break;
      case 11:
        drawText('x', marginLeft, 128, marginRight)
        break;
      case 12:
        drawText('x', marginLeft, marginBottum + 15, marginRight)
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