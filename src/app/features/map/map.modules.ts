import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MapRoutingModule } from './map-routing.modules';
//QRCode
import { QRCodeModule } from 'angularx-qrcode';
import { MapComponent } from './containers/map/map.component';

@NgModule({
    declarations: [ MapComponent ],
    imports: [
        CommonModule,
        MapRoutingModule,
        IonicModule,
        QRCodeModule
    ]
})
export class MapModule { }
