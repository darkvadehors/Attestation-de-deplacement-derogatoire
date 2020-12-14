import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AttestationComponent } from './attestation/attestation.component';
import { AttestationRoutingModule } from './attestation-routing.modules';


@NgModule({
    declarations: [ AttestationComponent ],
    imports: [
        CommonModule,
        AttestationRoutingModule,
        IonicModule
    ]
})
export class AttestationModule { }
