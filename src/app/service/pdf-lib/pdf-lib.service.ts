import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { DatePipe } from '@angular/common';
import { FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { readFile } from 'fs';
@Injectable({
  providedIn: 'root'
})
export class PdfLibService {

  constructor(private _datepipe: DatePipe, private _httpClient: HttpClient,
    private _FileSaverService: FileSaverService,) { }

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

  savePdf(pdfBytes: any, dateFile: String) {

    //TODO transformer en pipe de control mobile desktop

    const fileName: string = 'attestation-' + dateFile;
    const link: any = document.createElement("a");
    const blob = new Blob([ pdfBytes ], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob);

    document.body.appendChild(link);


    var obj = { Title: 'Mon Attestation', Url: url };
    history.pushState(obj, obj.Title, obj.Url);


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      //Mobile

      // window.open(window.URL.createObjectURL(blob));

      // this._httpClient.get(pdfBytes, {
      //   // responseType: ResponseContentType.Blob // This must be a Blob type
      // }).subscribe(res => {
      //   this._FileSaverService.save((<any>res)._body, fileName);
      // });
      // const { Filesystem } = Plugins;
      // readFile(options: FileReadOptions) => Promise<FileReadResult>

      //TODO changer l'adresse de la bar d'adresse media.interieur.gouv.fr
      const strWindowFeatures = "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no";
      window.open(window.URL.createObjectURL(blob), '_blank', strWindowFeatures);

    } else {
      //Desktop
      link.setAttribute("target", "_blank");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
    }
    // window.URL.revokeObjectURL(url);
    // window.URL.createObjectURL(url);


  }

}
