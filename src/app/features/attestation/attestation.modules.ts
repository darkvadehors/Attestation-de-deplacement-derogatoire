import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Ionic
import { IonicModule } from '@ionic/angular';
// QRCode
import { QRCodeModule } from 'angularx-qrcode';

import { AttestationComponent } from './containers/attestation/attestation.component';
import { AttestationRoutingModule } from './attestation-routing.modules';

@NgModule({
    declarations: [ AttestationComponent ],
    imports: [
        CommonModule,
        AttestationRoutingModule,
        IonicModule,
        QRCodeModule,
    ],

})
export class AttestationModule { }
