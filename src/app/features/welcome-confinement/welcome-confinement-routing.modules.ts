import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeConfinementComponent } from './containers/welcome-confinement/welcome-confinement.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeConfinementComponent
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]

})

export class WelcomeConfinementRoutingModule { }