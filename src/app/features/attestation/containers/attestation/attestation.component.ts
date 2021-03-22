import { PdfmakeService } from './../../../../service/pdf/pdfmake/pdfmake.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/service/loading/loading.service';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: [ './attestation.component.scss' ]
})
export class AttestationComponent implements OnInit {

  pdfMake: any;
  loading: HTMLIonLoadingElement;
  myAngularxQrCode: string = null;

  constructor(
    public loadingController: LoadingController,
    public loadingservice: LoadingService,
    public modalCtrl: ModalController,
    public modalController: ModalController,
    private _pdfmake: PdfmakeService

  ) {
    // assign a value
    this.myAngularxQrCode = 'Your QR code data string';
  }

  ngOnInit(): void {
    this.loadingservice.hide();
  }

  async ionViewWillEnter() {

    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = (pdfMakeModule as any).default;
      this.pdfMake.vfs = (pdfFontsModule as any).default.pdfMake.vfs;
    }

  }

  attestation(activity: number) {
    this._pdfmake.generatePdf(activity)
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
