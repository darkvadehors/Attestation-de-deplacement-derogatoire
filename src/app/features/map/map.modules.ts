import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { MapRoutingModule } from './map-routing.modules';
import { MapComponent } from './containers/map/map.component';



@NgModule({
    declarations: [ MapComponent ],
    imports: [
        CommonModule,
        HttpClientModule,
        MapRoutingModule,
        IonicModule,
    ],

})
export class MapModule { }
