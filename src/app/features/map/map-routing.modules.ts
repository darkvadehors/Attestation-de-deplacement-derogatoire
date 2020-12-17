import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MapComponent } from './containers/map/map.component';

const routes: Routes = [
    {
        path: '',
        component: MapComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: environment.firebaseConfig.apiKey
        })
    ],
    exports: [ RouterModule ]

})

export class MapRoutingModule { }