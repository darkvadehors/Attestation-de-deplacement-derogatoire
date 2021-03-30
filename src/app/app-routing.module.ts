import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesktopGuard } from './guards/desktop/desktop.guard';
import { MobileGuard } from './guards/mobile/mobile.guard';
import { IntroGuard } from './guards/intro/intro.guard';

const routes: Routes = [
  {
    path: 'desktop',
    loadChildren: () => import('./features/desktop/desktop.modules').then(m => m.DesktopModule),
    canActivate: [
      DesktopGuard
    ]
  },
  {
    path: '',
    loadChildren: () => import('./features/tabs/tabs.modules').then(m => m.TabsModule),
    canActivate: [
      IntroGuard,
      MobileGuard
    ]
  },
  {
    path: 'intro',
    loadChildren: () => import('./features/slides/slides.modules').then(m => m.SlidesModule),
    canActivate: [
      MobileGuard,
    ]
  },
  { path: '**', redirectTo: ' ', pathMatch: 'full' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }