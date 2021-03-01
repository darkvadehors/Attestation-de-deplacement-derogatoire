import { SwUpdate } from '@angular/service-worker';
import { Component, OnInit } from '@angular/core';
import { VariableService } from './service/variable/variable.service';
import { App } from '@capacitor/core';
import { Platform, ToastController } from '@ionic/angular';
import { LoadingService } from './service/loading/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private _varGlobal: VariableService,
    private _platform: Platform,
    private _update: SwUpdate,
    public toastController: ToastController,
    public loading: LoadingService
  ) {
    this._varGlobal.loadVar();
    this.updateClient();
    this.appInitializer();
    }

  ngOnInit(): void {
    this.loading.show
  }

  async appInitializer() {
    // quand la platform est prete
    await this._platform.ready();

    // on check le changement d'état et si isActive
    App.addListener('appStateChange', async ({ isActive }) => {

      if (isActive) {
        // console.log('isactivate');
        // quand l'app est activé on charge la varglobale
        this._varGlobal.loadVar();

        // console.log('isstable');
        // on check les mise à jour
        if (this._update.isEnabled) {
          this._update.checkForUpdate().then(async () => {
          });

        }
        // else if (/webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) { // Si Apple
        //   //Mobile
        //   this._update.available.subscribe((event) => {
        //     console.log('hash', event.current)
        //   });
        //   // location.reload()
        // }
      }

    })
  }

  updateClient() {
    if (this._update.isEnabled) {
      // console.log('Not Enabled');
      this._update.available.subscribe(async (event) => {
        // console.log(`current`, event.current, `available `, event.available);
        // Si update available toast et reload
        const toast = await this.toastController.create({ message: 'Mise à jour.', duration: 3000 })
        toast.present().then(() => this._update.activateUpdate().then(() => location.reload()));

      });
    }
  }

}
// const toast = await this.toastController.create({ message: 'Vérification des mises à jours.', duration: 3000 })
// toast.present()