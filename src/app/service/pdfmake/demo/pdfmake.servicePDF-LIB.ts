// import { Injectable } from '@angular/core';
// import { VariableService } from '../../variable/variable.service';
// import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';


// @Injectable({
//   providedIn: 'root'
// })
// export class PdfmakeService {

//   constructor(private _varGlobal: VariableService) { }
//   pdfBytes: any;
//   async modifyPdf(params: number) {


//     const pdfDoc = await PDFDocument.create();
//     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

//     // Add a blank page to the document
//     const page = pdfDoc.addPage()

//     // Get the width and height of the page
//     const { width, height } = page.getSize()

//     // Draw a string of text toward the top of the page
//     const fontSize = 30
//     page.drawText('Creating PDFs in JavaScript is awesome!', {
//       x: 50,
//       y: height - 4 * fontSize,
//       size: fontSize,
//       font: timesRomanFont,
//       color: rgb(0, 0.53, 0.71),
//     })

//     // Serialize the PDFDocument to bytes (a Uint8Array)
//     this.pdfBytes = await pdfDoc.save()

//       // Trigger the browser to download the PDF document
//       (this.pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf").download;


//     // const url = './assets/certificate.pdf'
//     // const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
//     // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

//     // const pdfDoc = await PDFDocument.load(existingPdfBytes)
//     // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

//     // const pages = pdfDoc.getPages()
//     // const firstPage = pages[ 0 ]
//     // const { width, height } = firstPage.getSize()
//     // firstPage.drawText('This text was added with JavaScript!', {
//     //   x: 5,
//     //   y: height / 2 + 300,
//     //   size: 50,
//     //   font: helveticaFont,
//     //   color: rgb(0.95, 0.1, 0.1),
//     //   rotate: degrees(-45),
//     // })

//     // const page1 = pdfDoc.getPages()[ 0 ]
//     // const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
//     // const drawText = (text: string, x: number, y: number, size: number = 11) => {
//     //   page1.drawText(text, { x, y, size, font })
//     // }

//     // drawText(this._varGlobal.setting.lastname, 80, 650)
//     // drawText(this._varGlobal.setting.firstname, 105, 625)
//     // drawText(`${this._varGlobal.setting.dateofbirth} à ${this._varGlobal.setting.cityofbird}`, 173, 601)
//     // drawText(this._varGlobal.setting.adress, 198, 577)
//     // drawText(`${this._varGlobal.setting.zipcode} ${this._varGlobal.setting.city}`, 50, 557)
    // console.log('params', params);
//     // switch (params) {
//     //   case 1:
//     //     drawText('x', 76.5, 526, 20)
//     //     break;
//     //   case 2:
//     //     drawText('x', 76.5, 476.5, 20)
//     //     break
//     //   case 4:
//     //     drawText('x', 76.5, 436, 20)
//     //     break
//     //   case 5:
//     //     drawText('x', 76.5, 399.5, 20)
//     //     break
//     //   case 6:
//     //     drawText('x', 76.5, 344, 20)
//     //     break
//     //   case 7:
//     //     drawText('x', 76.5, 297, 20)
//     //     break
//     //   case 8:
//     //     drawText('x', 76.5, 261, 20)
//     //     break
//     // }
//     const pdfBytes = await pdfDoc.save()
//   }

// }
