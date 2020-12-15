import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { SettingsComponent } from './containers/settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]

})

export class SettingsRoutingModule { }