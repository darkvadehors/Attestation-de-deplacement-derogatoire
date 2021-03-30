import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { App } from '@capacitor/core';
import { Platform, ToastController } from '@ionic/angular';
import { StorageService } from './service/storage/storage.service';
import { VariableService } from './service/variable/variable.service';
import { LoadingService } from './service/loading/loading.service';
import { RouteService } from './service/route/route.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {


  constructor(
    private _varGlobal: VariableService,
    private _platform: Platform,
    private _update: SwUpdate,
    private _storageService: StorageService,
    public toastController: ToastController,
    public loading: LoadingService,
    private _routeStatus: RouteService,
  ) {
    // console.log('App.component Constructeur');
    // affichage du loader
    this.loading.show;
    // chargement des variable Globales
    this._varGlobal.loadVar();
    // chargement de l'observable' route confinement ou couvrefeux pour la creation des tabs
    this._routeStatus.checkTimeRouteStatus();

    this.appInitializer();
    this.updateClient();
    // control si le stauts est cohérent avec la route


    // control si la key intro n'a pas été supprimée depuis le settings.
    // if (!this._storageService.readLocal('intro')) {
    //   // console.log('App.component.Constructeur Pas de intro');
    //   // ngZone permet de passe un lein externe, corrige des bug de redirection
    //   this._ngZone.run(() => {
    //     this._router.navigate([ 'intro' ]);
    //   });
    // }
  }

  async appInitializer() {
    // console.log('App.component appInitializer');

    // quand la platform est prete
    await this._platform.ready();
    // console.log('App.component _platform.ready');

    // on check le changement d'état et si isActive =>
    App.addListener('appStateChange', async ({ isActive }) => {

      // console.log('App.component addlistener');

      if (isActive) {
        // console.log('App.component isActive');

        // rechargement de la route status
        this._routeStatus.checkTimeRouteStatus();

        // control si la key intro n'a pas été supprimée depuis le settings.
        // if (!this._storageService.readLocal('intro')) {
        //   // console.log('App.component Pas de intro');
        //   this._ngZone.run(() => {
        //     this._router.navigate([ 'intro' ]);
        //   });
        // }

        // control si la key setok n'a pas été supprimée depuis le settings.
        // if (!this._storageService.readLocal('setok')) {
        //   // console.log('App.component Pas de Setok');
        //   this._ngZone.run(() => {
        //     this._router.navigate([ ' 'settings ]);
        //   });
        // }


      }

    });
  }

  updateClient() {
    if (this._update.isEnabled) {
      // console.log('App.component this._update.isEnabled Enabled');
      this._update.available.subscribe(async () => {
        // console.log(`current`, event.current, `available `, event.available);
        // Si update available toast et reload
        const toast = await this.toastController.create({ message: 'Mise à jour.', duration: 3000 })
        toast.present()
          .then(() => this._update.activateUpdate()
            .then(() => this._storageService.deleteLocal('setok'))
            .then(() => location.reload()));
      });
    }
  }

}