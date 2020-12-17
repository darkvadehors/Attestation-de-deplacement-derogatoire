import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
import { BacktimePipe } from './shared/pipe/time/backtime.pipe';

//Component
import { AppComponent } from './app.component';
import { StorageService } from './service/storage/storage.service';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    ActivityPipe,
    BacktimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [ StorageService, BacktimePipe, ActivityPipe, { provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent],
})
export class AppModule {}

//TODO supprimer pdfmake ligne 34 du package.json
