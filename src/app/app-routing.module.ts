import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/tabs/tabs.modules').then(m => m.TabsModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./features/slides/slides.modules').then(m => m.SlidesModule)
  },
  // { path: '**', component: WelcomeComponent }, // Wildcard route for a 404 page
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
