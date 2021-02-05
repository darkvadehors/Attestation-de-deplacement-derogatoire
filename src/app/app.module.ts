import { AttestationComponent } from './features/attestation/containers/attestation/attestation.component';
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

// Ionic
import { IonicModule } from '@ionic/angular';

//Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

//Pipe
import { ActivityPipe } from './shared/pipe/activity/activity.pipe';
import { TimeBackPipe } from './shared/pipe/time/timeback.pipe';

//Component
import { AppComponent } from './app.component';
import { StorageService } from './service/storage/storage.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { VariableService } from './service/variable/variable.service';
import { TimefrPipe } from './shared/pipe/time/timefr.pipe';
import { DayfrPipe } from './shared/pipe/dayfr/dayfr.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ActivityPipe,
    TimeBackPipe,
    TimefrPipe,
    DayfrPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [ VariableService, StorageService, DatePipe, TimeBackPipe, ActivityPipe, AttestationComponent, { provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent],
})
export class AppModule {}

//TODO supprimer pdfmake ligne 34 du package.json
