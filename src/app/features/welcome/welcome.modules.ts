import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.modules';


@NgModule({
    declarations: [ WelcomeComponent ],
    imports: [
        CommonModule,
        WelcomeRoutingModule,
        IonicModule
    ]
})
export class WelcomeModule { }
