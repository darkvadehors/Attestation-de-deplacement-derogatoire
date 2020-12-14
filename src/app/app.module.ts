import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

// ReactiveFormss
import { ReactiveFormsModule } from '@angular/forms';

//QRCode
import { QRCodeModule } from 'angularx-qrcode';

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
import { SetupComponent } from './features/setup/setup.component';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { AttestationComponent } from './features/attestation/attestation.component';
import { StorageService } from './service/storage/storage.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AttestationComponent,
    SetupComponent,
    WelcomeComponent,
    ActivityPipe,
    BacktimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    QRCodeModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [ StorageService, BacktimePipe, ActivityPipe, { provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent],
})
export class AppModule {}