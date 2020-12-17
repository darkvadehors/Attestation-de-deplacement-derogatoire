import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MapRoutingModule } from './map-routing.modules';
import { MapComponent } from './containers/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';

@NgModule({
    declarations: [ MapComponent ],
    imports: [
        CommonModule,
        MapRoutingModule,
        IonicModule,
        AgmCoreModule.forRoot({
            apiKey: environment.firebaseConfig.apiKey
        })
    ]
})
export class MapModule { }
