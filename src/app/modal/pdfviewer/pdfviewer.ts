import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
    selector: 'pdfviewer',
    templateUrl: 'pdfviewer.html',
    styleUrls: [ 'pdfviewer.scss' ]
})
export class pdfViewer {

    // Data passed in by componentProps
    @Input() pdfUrl: any;


    constructor(public pdfviewer: PdfViewerModule, public modalCtrl: ModalController, private navParams: NavParams) { }

    closeModal() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

}