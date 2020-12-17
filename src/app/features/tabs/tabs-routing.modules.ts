import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsComponent } from './containers/tabs/tabs.component';


const routes: Routes = [
    {
        path: 'tabs', // redirectTo: 'welcome', pathMatch: 'full',
        component: TabsComponent,
        children: [
            {
                path: 'welcome',
                loadChildren: () => import('../welcome/welcome.modules').then(m => m.WelcomeModule)
            },
            {
                path: 'map',
                loadChildren: () => import('../map/map.modules').then(m => m.MapModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('../settings/settings.modules').then(m => m.SettingsModule)
            },
            {
                path: 'attestation',
                loadChildren: () => import('../attestation/attestation.modules').then(m => m.AttestationModule)
            }
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/welcome',
        pathMatch: 'prefix'
    }


];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class TabsRoutingModule { }
