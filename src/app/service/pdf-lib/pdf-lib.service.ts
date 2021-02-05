import { Injectable } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfLibService {

  constructor() { }

  async modifyPdf(pdf: any, activity: number) {

    const pdfDoc = await PDFDocument.load(pdf)
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const pages = pdfDoc.getPages()

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const firstPage = pages[ 0 ]
    const { width, height } = firstPage.getSize()

    const drawText = (text: any, x: number, y: number, size = 11) => {
      firstPage.drawText(text, { x, y, size, font })
    }
    switch (activity) {
      case 1:
        drawText('x', 63, 558, 13)
        break
      case 2:
        drawText('x', 63, 506, 12)
        break
      case 3:
        drawText('x', 63, 454, 12)
        break
      case 4:
        drawText('x', 63, 415, 12)
        break
      case 5:
        drawText('x', 63, 392, 12)
        break
      case 6:
        drawText('x', 63, 367, 12)
        break
      case 7:
        drawText('x', 63, 329, 12)
        break
      case 8:
        drawText('x', 63, 291, 12)
        break;
    }

    const pdfBytes = await pdfDoc.save()
    //export file

    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' });
    window.open(window.URL.createObjectURL(blob));
  }
}
