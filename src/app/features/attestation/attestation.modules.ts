import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Ionic
import { IonicModule } from '@ionic/angular';

import { AttestationComponent } from './containers/attestation/attestation.component';
import { AttestationRoutingModule } from './attestation-routing.modules';

@NgModule({
    declarations: [ AttestationComponent ],
    imports: [
        CommonModule,
        AttestationRoutingModule,
        IonicModule,
    ],

})
export class AttestationModule { }
