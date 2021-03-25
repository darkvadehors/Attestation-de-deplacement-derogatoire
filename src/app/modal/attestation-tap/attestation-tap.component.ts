import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { VariableService } from 'src/app/service/variable/variable.service';

@Component({
  selector: 'app-attestation-tap',
  templateUrl: './attestation-tap.component.html',
  styleUrls: [ './attestation-tap.component.scss' ]
})
export class AttestationTapComponent implements OnInit {
  loading: HTMLIonLoadingElement;
  infoScreen: any;
  qrcodewitdh: number = (window.screen.availWidth * (90 / 100));

  //Qrcode
  qrCodeData: string = null;

  // Data passed in by componentProps
  @Input() activityName: any;
  @Input() data: object;
  @Input() dateOfBirth: string;
  @Input() dateOfBirthFrLong: string;
  @Input() toDayFr: string;
  @Input() toDayFrLong: string;
  @Input() timeBackT: string;
  @Input() timeBackH: string;
  @Input() timeBackColon: string;

  constructor(
    public modalCtrl: ModalController,
    public loadingService: LoadingService,
    public varGlobal: VariableService
  ) { }

  ngOnInit(): void {


    // assign a qrCode
    this.qrCodeData =
      'Cree le : ' +
      this.toDayFr +
      ' a ' +
      this.timeBackH +
      // identification
      ';\nNom : ' +
      this.varGlobal.setting.lastname +
      ';\nPrenom: ' +
      this.varGlobal.setting.firstname +
      ';\nNaissance: ' +
      this.dateOfBirthFrLong +
      ' a ' +
      this.varGlobal.setting.cityofbird +
      // Personnal Adress
      ';\nAdresse: ' +
      this.varGlobal.setting.adress +
      ' ' +
      this.varGlobal.setting.zipcode +
      ' ' +
      this.varGlobal.setting.city +
      ' ' +
      // Exit time
      ';\nSortie: ' +
      this.toDayFr +
      ' a ' +
      this.timeBackColon +
      ';\nMotifs: ' +
      this.activityName;

    // console.log('largeur', window.screen.availWidth);

    this.loadingService.hide();
  }

  pageRendered(e: CustomEvent) {
    this.loadingService.hide();
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
