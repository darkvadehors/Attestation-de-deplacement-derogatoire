import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SettingsComponent } from './containers/settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
