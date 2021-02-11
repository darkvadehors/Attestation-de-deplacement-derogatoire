import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesktopComponent } from './containers/desktop.component';

const routes: Routes = [
    {
        path: '',
        component: DesktopComponent
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]

})

export class DesktopRoutingModule { }