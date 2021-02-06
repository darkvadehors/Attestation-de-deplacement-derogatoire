import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/tabs/tabs.modules').then(m => m.TabsModule),
    canActivate: [ IntroGuard ]
  },
  {
    path: 'intro',
    loadChildren: () => import('./features/slides/slides.modules').then(m => m.SlidesModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//FIXME bug sur la redirection android