import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';
import { LoadingService } from 'src/app/service/loading/loading.service';

@Component({
    selector: 'pdfviewer',
    templateUrl: 'pdfviewer.html',
    styleUrls: [ 'pdfviewer.scss' ]
})

export class pdfViewer implements OnInit {
    loading: HTMLIonLoadingElement;

    // Data passed in by componentProps
    @Input() pdfUrl: any;


    constructor(
        public loadingController: LoadingController,
        public pdfviewer: PdfViewerModule,
        public modalCtrl: ModalController,
        public loadingservice: LoadingService
    ) { }

    async ngOnInit() {
        // this.loading = await this.loadingController.create({
        //     message: `Création de l'attestation....`,
        // });
        // await this.loading.present();
    }

    callBackFn(pdf: PDFDocumentProxy) {
        // arret le loading une fois le pdf genere
        // console.log('callback');
        // this.loadingservice.hide();
    }

    pageRendered(e: CustomEvent) {
        this.loadingservice.hide();
      }

    closeModal() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

}