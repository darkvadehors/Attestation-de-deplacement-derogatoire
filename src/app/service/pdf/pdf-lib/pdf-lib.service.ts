import { environment } from '../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class PdfLibService {


  constructor() { }

  //-----------------------------------------------------------------------------------------Modify PDF
  async modifyPdf(pdf: any, activity: number, dateFile: String) {

    const pdfDoc = await PDFDocument.load(pdf)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
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

  savePdf(pdfBytes: any, dateFile: String) {

    const { Filesystem } = Plugins;
    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob);
    const fileName: string = 'attestation-' + dateFile + '.pdf';
    const link: any = document.createElement("a");


    //FIXME Bug avec Firefox Mobile

    // incompatible Firefox Mobile
    const strWindowFeatures = "menubar=yes,location=no,resizable=yes,scrollbars=yes,status=no";
    window.open(url, '_blank', strWindowFeatures);


    //Compitablie firefox Mobile
    // document.body.appendChild(link);
    // link.href = url;
    // link.setAttribute("target", "_blank");
    // link.download = fileName;
    // link.click();
    // window.URL.createObjectURL(url);
    // window.URL.revokeObjectURL(url);
  }
}