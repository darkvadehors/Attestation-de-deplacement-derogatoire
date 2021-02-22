import { SettingsGuard } from './../../guards/settings/settings.guard';
import { MobileGuard } from './../../guards/mobile/mobile.guard';
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
                loadChildren: () => import('../welcome/welcome.modules').then(m => m.WelcomeModule),
                canActivate: [ MobileGuard, SettingsGuard ]
            },
            {
                path: 'settings',
                loadChildren: () => import('../settings/settings.modules').then(m => m.SettingsModule),
                canActivate: [ MobileGuard ]
            }
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/welcome',
        pathMatch: 'full'
    }
//FIXME verifier prefix ou full

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class TabsRoutingModule { }
