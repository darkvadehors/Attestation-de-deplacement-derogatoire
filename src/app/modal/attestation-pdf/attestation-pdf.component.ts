import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/service/loading/loading.service';
@Component({
    selector: 'attestationPdf',
    templateUrl: 'attestation-pdf.component.html',
    styleUrls: [ 'attestation-pdf.component.scss' ]
})

export class AttestationPdfComponent implements OnInit {
    loading: HTMLIonLoadingElement;

    // Data passed in by componentProps
    @Input() pdfUrl: any;

    constructor(
        public modalCtrl: ModalController,
        public loadingService: LoadingService
    ) { }

    async ngOnInit() { }

    // retour du html pour fermer la modal
    pageRendered(e: CustomEvent) {
        this.loadingService.hide();
    }

    closeModal() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

}