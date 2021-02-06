import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PdfLibService {

  constructor(private _datepipe: DatePipe) { }

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

    // const blob = new Blob([ pdfBytes ], { type: 'application/pdf' });
    // window.open(window.URL.createObjectURL(blob));

    this.savePdf(pdfBytes, dateFile)
  }

  savePdf(pdfBytes: any, dateFile: String) {

    const fileName: string = 'attestation-' + dateFile;
    const a: any = document.createElement("a");

    document.body.appendChild(a);
    // a.style = "display: none";

    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);

  }

}
