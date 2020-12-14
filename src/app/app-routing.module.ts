import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttestationComponent } from 'src/app/features/attestation/attestation.component';
import { SetupComponent } from 'src/app/features/setup/setup.component';
import { WelcomeComponent } from 'src/app/features/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'setup',
    component: SetupComponent,
  },
  {
    path: 'attestation',
    component: AttestationComponent,
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: WelcomeComponent }, // Wildcard route for a 404 page
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
