import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsComponent } from './containers/tabs/tabs.component';


const routes: Routes = [
    {
        path: '',
        component: TabsComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../welcome/welcome.modules').then(m => m.WelcomeModule)
            },
            {
                path: 'reglages',
                loadChildren: () => import('../settings/settings.modules').then(m => m.SettingsModule)
            },
            {
                path: 'attestation',
                loadChildren: () => import('../attestation/attestation.modules').then(m => m.AttestationModule)
            }
        ]
    },

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class TabsRoutingModule { }
