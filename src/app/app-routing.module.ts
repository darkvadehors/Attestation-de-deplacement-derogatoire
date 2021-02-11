import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroGuard } from './guards/intro/intro.guard';
import { DesktopGuard } from './guards/desktop/desktop.guard';
import { MobileGuard } from './guards/mobile/mobile.guard';

const routes: Routes = [
  {
    path: 'accueil',
    loadChildren: () => import('./features/desktop/desktop.modules').then(m => m.DesktopModule),
    canActivate: [ DesktopGuard ]
  },
  {
    path: '',
    loadChildren: () => import('./features/tabs/tabs.modules').then(m => m.TabsModule),
    canActivate: [
      MobileGuard,
      IntroGuard ]
    },
    {
      path: 'intro',
      loadChildren: () => import('./features/slides/slides.modules').then(m => m.SlidesModule),
      canActivate: [
        MobileGuard ]
    },
  { path: '**', redirectTo: 'accueil', pathMatch: 'full' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//FIXME bug sur la redirection android