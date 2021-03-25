import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SettingsComponent } from './containers/settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.modules';

@NgModule({
    declarations: [ SettingsComponent ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class SettingsModule { }
