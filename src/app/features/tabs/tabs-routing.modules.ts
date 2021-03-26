import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsGuard } from './../../guards/settings/settings.guard';
import { MobileGuard } from './../../guards/mobile/mobile.guard';
import { TabsComponent } from './containers/tabs/tabs.component';
import { DayTimeGuard } from 'src/app/guards/dayTime/day-time.guard';


const routes: Routes = [
    {
        path: 'tabs', // redirectTo: 'welcome', pathMatch: 'full',
        component: TabsComponent,
        children: [
            {
                path: 'couvreFeux',
                loadChildren: () => import('../welcome/welcome.modules').then(m => m.WelcomeModule),
                canActivate: [ MobileGuard, DayTimeGuard ]
            },
            {
                path: 'confinement',
                loadChildren: () => import('../welcome-confinement/welcome-confinement.modules').then(m => m.WelcomeConfinementModule),
                canActivate: [ MobileGuard ]
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
        redirectTo: 'tabs/couvreFeux',
        pathMatch: 'full'
    }

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class TabsRoutingModule { }
