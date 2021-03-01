import { SwUpdate } from '@angular/service-worker';
import { Component, OnInit, ApplicationRef } from '@angular/core';
import { VariableService } from './service/variable/variable.service';
import { App } from '@capacitor/core';
import { Platform, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private _varGlobal: VariableService, private _platform: Platform, private _update: SwUpdate, private _appRef: ApplicationRef, public toastController: ToastController) {
    this.appInitializer();
    this._varGlobal.loadVar();
    this.updateClient();
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
        this._update.checkForUpdate().then(async () => {
          // console.log('check Mise a jour');
          // const toast = await this.toastController.create({ message: 'Vérification des mises à jours.', duration: 3000 })
          // toast.present()
        });



        //   const toast = await this.toastController.create({ message: 'Vérification des mises à jours.', duration: 3000 })
        //   toast.present()

      }

    })
  }

  updateClient() {
    if (!this._update.isEnabled) {
      // console.log('Not Enabled');
      return;
    }
    this._update.available.subscribe(async (event) => {
      // console.log(`current`, event.current, `available `, event.available);
      // Si update available toast et reload
      const toast = await this.toastController.create({ message: 'Mises à jours.', duration: 3000, position: 'middle' })
      toast.present().then(() => this._update.activateUpdate().then(() => location.reload()));

    });
  }

}