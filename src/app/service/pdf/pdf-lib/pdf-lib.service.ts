import { pdfViewer } from './../../../modal/pdfviewer/pdfviewer';
import { environment } from '../../../../environments/environment.prod';
import { Injectable } from '@angular/core';

//Capacitor
import { Plugins } from '@capacitor/core';
const { Filesystem, Browser } = Plugins;

//Ionic
import { ModalController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class PdfLibService {
  routerOutlet: any;


  constructor(public modalController: ModalController, private modalCtrl: ModalController) { }

  //-----------------------------------------------------------------------------------------Modify PDF
  async modifyPdf(pdf: any, activity: number, dateFile: String) {


    const pdflibModule = await import('pdf-lib').then(({
      PDFDocument, StandardFonts
    }) => ({
      PDFDocument, StandardFonts
    }));
    const pdfDoc = await pdflibModule.PDFDocument.load(pdf)
    const font = await pdfDoc.embedFont(pdflibModule.StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()

    // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const firstPage = pages[ 0 ]
    const { width, height } = firstPage.getSize()

    const drawText = (text: any, x: number, y: number, size = 11) => {
      firstPage.drawText(text, { x, y, size, font })
    }

    // attestation-2021-02-05_13-26
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

    // const pdfBytes = await pdfDoc.save()
    // const pdfBytes = await pdfDoc.saveAsBase64()
    const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true })
    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob);
    const fileName: string = 'attestation-' + dateFile + '.pdf';

    const modal = await this.modalController.create({
      component: pdfViewer,
      cssClass: 'my-custom-class',
      componentProps: {
        'title': fileName
      },
      swipeToClose: true,
    });

    return await modal.present();

  }

  //-----------------------------------------------------------------------------------------Save PDF

  async savePdf(pdfBytes: any) {

    // si pas de type download
    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' })
    const pdfUrl = window.URL.createObjectURL(blob);

    //FIXME Bug avec Firefox Mobile

    // incompatible Firefox Mobile
    // demande ouverure dasn un nouvelle onglet ne fonction pas avec firefox
    // window.open(url);


    // demande autorisation et ouvre dans un autre onglet mais ne fonction pas avec firefox
    // Message ouverture
    // await Browser.open({ url });


    // Ouvre le pdf dans le meme onglet
    // //Compitablie firefox Mobile
    // const fileName: string = 'attestation-' + dateFile + '.pdf';
    // const link: any = document.createElement("a");
    // link.href = url;
    // link.download = fileName;
    // // link.setAttribute("target", "_blank");
    // link.target = "_blank";
    // // document.body.appendChild(link); // Ajoute l'element au DOM
    // // link.click();
    // link.dispatchEvent(
    //   new MouseEvent('click', {
    //     bubbles: true,
    //     cancelable: true,
    //     view: window
    //   })
    // );
    // link.remove();
    // document.body.removeChild(link); // Enleve l'element du DOM


    //Capacitor browser
    // ouvre un nouvelle ongle si utf8 mais ne fonctionne pas sur firefox
    // await Browser.open({ url: url });


    const modal = await this.modalCtrl.create({
      // nom du component de la modal
      component: pdfViewer,
      cssClass: 'my-custom-class',
      // swipeToClose: true,
      keyboardClose: true,
      componentProps: {
        'pdfUrl': pdfUrl,
      }
    });
    // ouvre la modal
    return await modal.present();

  }

}