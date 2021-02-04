import { Injectable } from '@angular/core';
import { VariableService } from '../variable/variable.service';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { FileSaverService } from 'ngx-filesaver';
@Injectable({
  providedIn: 'root'
})

export class PdfmakeService {

  constructor(private _varGlobal: VariableService, private _FileSaverService: FileSaverService) { }

  async generatePdf(qrcode: string) {

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Add a blank page to the document
    const page = pdfDoc.addPage()

    // Get the width and height of the page
    const { width, height } = page.getSize()

    // Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText(qrcode, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' });
    window.open(window.URL.createObjectURL(blob));


  }
}