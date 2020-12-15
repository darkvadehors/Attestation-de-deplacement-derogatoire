import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlidesComponent } from './containers/slides/slides.component';
import { SlidesRoutingModule } from './slides-routing.modules';

@NgModule({
    declarations: [ SlidesComponent ],
    imports: [
        CommonModule,
        IonicModule,
        SlidesRoutingModule

    ]
})
export class SlidesModule { }