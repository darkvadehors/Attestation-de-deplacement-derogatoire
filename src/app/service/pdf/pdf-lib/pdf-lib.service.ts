import { environment } from '../../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfLibService {


  constructor() { }

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

    const pdfBytes = await pdfDoc.save()

    this.savePdf(pdfBytes, dateFile)
  }

  //-----------------------------------------------------------------------------------------Save PDF

  async savePdf(pdfBytes: any, dateFile: String) {

    // const { Filesystem } = Plugins;
    // const blob = new Blob([ pdfBytes ], { type: 'application/pdf' })
    // si pas de type download
    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob);

    //FIXME Bug avec Firefox Mobile

    // incompatible Firefox Mobile
    // demande ouverure
    // window.open(url, '_blank');
    // window.URL.createObjectURL(url);
    // window.URL.revokeObjectURL(url);

    //await Browser.open({ url: 'http://capacitorjs.com/' });
    // demande autorisation
    // console.log('blob', blob);
    // Message ouverture
    // await Browser.open({ url });

    // check si bloquer de pop-up
    // const win = window.open(url, '_blank');
    // if (win) {
    //   //Browser has allowed it to be opened
    //   win.focus();
    // } else {
    //   //Browser has blocked it
    //   alert('Please allow popups for this website');
    // }

    // //Compitablie firefox Mobile
    const fileName: string = 'attestation-' + dateFile + '.pdf';
    const link: any = document.createElement("a");
    link.href = url;
    link.setAttribute("target", "_blank");
    // link.setAttribute("type", "hidden"); // make it hidden if needed
    // link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link); // Ajoute l'element au DOM
    // link.click();
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
    // link.remove();
    document.body.removeChild(link); // Enleve l'element du DOM
  }

}