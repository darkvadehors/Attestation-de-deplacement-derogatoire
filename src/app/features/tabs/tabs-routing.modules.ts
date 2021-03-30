import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsComponent } from './containers/tabs/tabs.component';
import { ConfinementGuard } from './../../guards/confinement/confinement.guard';
import { CouvreFeuxGuard } from './../../guards/couvreFeux/couvre-feux.guard';
import { SettingsGuard } from 'src/app/guards/settings/settings.guard';

const routes: Routes = [
    {
        // path: '',
        path: '',
        component: TabsComponent,
        children: [
            {
                path: 'settings',
                loadChildren: () => import('../settings/settings.modules').then(m => m.SettingsModule)
            },
            {
                path: 'confinement',
                loadChildren: () => import('../welcome-confinement/welcome-confinement.modules').then(m => m.WelcomeConfinementModule),
                canActivate: [ SettingsGuard, ConfinementGuard ]
            },
            {
                path: 'couvreFeux',
                loadChildren: () => import('../welcome/welcome.modules').then(m => m.WelcomeModule),
                canActivate: [ SettingsGuard, CouvreFeuxGuard ]
            },
        ]
    },
    { path: '', redirectTo: '', pathMatch: 'full' }, // redirect to `first-component`
    // { path: '**', redirectTo: 'desktop', pathMatch: 'full' }
    { path: '**', redirectTo: ' ', pathMatch: 'full' }

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class TabsRoutingModule { }
