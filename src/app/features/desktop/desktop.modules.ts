import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DesktopComponent } from './containers/desktop.component';
import { DesktopRoutingModule } from './desktop-routing.modules';



@NgModule({
    declarations: [ DesktopComponent ],
    imports: [
        CommonModule,
        DesktopRoutingModule,
        IonicModule,
    ],

})
export class DesktopModule { }
