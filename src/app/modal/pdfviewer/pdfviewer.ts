import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
    selector: 'pdfviewer',
    templateUrl: 'pdfviewer.html',
    styleUrls: [ 'pdfviewer.scss' ]
})

export class pdfViewer implements OnInit {
    loading: HTMLIonLoadingElement;

    // Data passed in by componentProps
    @Input() pdfUrl: any;


    constructor(public loadingController: LoadingController, public pdfviewer: PdfViewerModule, public modalCtrl: ModalController) { }

    async ngOnInit() {
        this.loading = await this.loadingController.create({
            message: `Création de l'attestation....`,
        });
        //appel le loader
        await this.loading.present();
    }

    // après chargement complet du PDF
    callBackFn(pdf: PDFDocumentProxy) {
        //finir le loader
        this.loading.dismiss();
    }

    closeModal() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

}