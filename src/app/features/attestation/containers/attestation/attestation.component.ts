import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/service/loading/loading.service';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: [ './attestation.component.scss' ]
})
export class AttestationComponent implements OnInit {

  loading: HTMLIonLoadingElement;
  myAngularxQrCode: string = null;

  constructor(
    public loadingController: LoadingController,
    public loadingservice: LoadingService,
    public modalCtrl: ModalController,
    public modalController: ModalController

  ) {
    // assign a value
    this.myAngularxQrCode = 'Your QR code data string';
  }

  ngOnInit(): void {
    this.loadingservice.hide();
    console.log('tutu');
  }



  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
