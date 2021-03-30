import { DesktopComponent } from './features/desktop/containers/desktop.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesktopGuard } from './guards/desktop/desktop.guard';
import { MobileGuard } from './guards/mobile/mobile.guard';
import { IntroGuard } from './guards/intro/intro.guard';

import { TabsComponent } from './features/tabs/containers/tabs/tabs.component';
const routes: Routes = [
  {
    path: 'desktop',
    loadChildren: () => import('./features/desktop/desktop.modules').then(m => m.DesktopModule),
    canActivate: [
      DesktopGuard
    ]
  },
  {
    path: 'intro',
    loadChildren: () => import('./features/slides/slides.modules').then(m => m.SlidesModule),
    canActivate: [
      MobileGuard
    ]
  },
  {
    path: '',
    loadChildren: () => import('./features/tabs/tabs.modules').then(m => m.TabsModule),
    canActivate: [
      // MobileGuard,
      IntroGuard
    ]
  },
  { path: '', redirectTo: 'desktop', pathMatch: 'full' },
  { path: '**', component: TabsComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }