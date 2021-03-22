import { AttestationComponent } from './../attestation/containers/attestation/attestation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { WelcomeComponent } from './containers/welcome/welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.modules';
import { AttestationModule } from '../attestation/attestation.modules';


@NgModule({
    declarations: [ WelcomeComponent ],
    imports: [
        CommonModule,
        WelcomeRoutingModule,
        IonicModule,
    ],
    providers: [
        AttestationComponent
    ]
})
export class WelcomeModule { }
