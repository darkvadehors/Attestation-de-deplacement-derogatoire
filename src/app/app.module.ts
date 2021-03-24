// ng build --prod --base-href ./
// ng build --prod --base-href ./ && npm run deploy
// ng build --prod --common-chunk --named-chunks --optimization --service-worker --source-map --base-href ./
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Ionic
import { IonicModule } from '@ionic/angular';

//Pipe
import { ActivityPipe } from './shared/pipe/activity/activity.pipe';
import { TimeBackPipe } from './shared/pipe/time/timeback.pipe';

//Component
import { AppComponent } from './app.component';
import { StorageService } from './service/storage/storage.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { VariableService } from './service/variable/variable.service';

//Modal
import { AttestationPdfComponent } from './modal/attestation-pdf/attestation-pdf.component'

//PDF
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AttestationTapComponent } from './modal/attestation-tap/attestation-tap.component';

//QRCodeModule
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
    AppComponent,
    ActivityPipe,
    TimeBackPipe,
    AttestationPdfComponent,
    AttestationTapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
    HttpClientModule,
    PdfViewerModule,
    QRCodeModule,
  ],
  providers: [
    VariableService,
    StorageService,
    DatePipe,
    TimeBackPipe,
    ActivityPipe,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }