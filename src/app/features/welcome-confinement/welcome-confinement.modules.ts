import { AttestationComponent } from '../attestation/containers/attestation/attestation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { WelcomeConfinementComponent } from './containers/welcome-confinement/welcome-confinement.component';
import { WelcomeConfinementRoutingModule } from './welcome-confinement-routing.modules';


@NgModule({
    declarations: [ WelcomeConfinementComponent ],
    imports: [
        CommonModule,
        WelcomeConfinementRoutingModule,
        IonicModule,
    ],
    providers: [
        AttestationComponent
    ]
})
export class WelcomeConfinementModule { }
