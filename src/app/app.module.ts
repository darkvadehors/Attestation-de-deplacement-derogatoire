// ng build --prod --base-href ./
// ng build --prod --base-href ./ && npm run deploy
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


// Ionic
import { IonicModule } from '@ionic/angular';

//Firebase
// import { AngularFireModule } from "@angular/fire";
// import { AngularFirestoreModule } from "@angular/fire/firestore";

//Pipe
import { ActivityPipe } from './shared/pipe/activity/activity.pipe';
import { TimeBackPipe } from './shared/pipe/time/timeback.pipe';

//Component
import { AppComponent } from './app.component';
import { StorageService } from './service/storage/storage.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { VariableService } from './service/variable/variable.service';

//Modal
import { pdfViewer } from './modal/pdfviewer/pdfviewer'

//PDF
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    ActivityPipe,
    TimeBackPipe,
    pdfViewer,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    PdfViewerModule,
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