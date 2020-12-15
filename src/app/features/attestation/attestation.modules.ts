import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AttestationComponent } from './containers/attestation/attestation.component';
import { AttestationRoutingModule } from './attestation-routing.modules';
//QRCode
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [ AttestationComponent ],
    imports: [
        CommonModule,
        AttestationRoutingModule,
        IonicModule,
        QRCodeModule
    ]
})
export class AttestationModule { }
