import { logging } from 'protractor';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { Component, NgZone, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Platform, ToastController } from '@ionic/angular';
import { App } from '@capacitor/core';

import { VariableService } from './../../../../service/variable/variable.service';
import { UpdateIosService } from './../../../../service/updateIos/update-ios.service';
import { StorageService } from '../../../../service/storage/storage.service';
import { RouteService } from './../../../../service/route/route.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: [ './tabs.component.scss' ]
})
export class TabsComponent implements OnInit {

    routeStatus$: Observable<any> = this._routeStatus.getRouteStatus()

    tabsName: string;
    iconName: string;
    tabsLabel: string;

    constructor(
        private _router: Router,
        private _storageService: StorageService,
        private _routeStatus: RouteService,
        private _varGlobal: VariableService,
        private _platform: Platform,
        private _update: SwUpdate,
        private _upDateIos: UpdateIosService,
        private _ngZone: NgZone,
        public toastController: ToastController,
        public loadingService: LoadingService,
    ) {
        this._varGlobal.loadVar();
        this.routeStatus$.subscribe((data) => {
            // console.log('tabs.componement Constructeur -routeStatus$- changement d etat', data);
            this.tabsName = data?.tabsName;
            this.tabsLabel = data?.tabsLabel;
            this.iconName = data?.iconName;
        });
        this.appInitializer();


        // // control si la key intro n'a pas été supprimée depuis le settings.
        // if (!this._storageService.readLocal('intro')) {
        //     // console.log('App.component Pas de Setok');
        //     this._ngZone.run(() => {
        //         this._router.navigate([ 'intro' ]);
        //     });
        // }

    }

    async ngOnInit() {
        // console.log("tabs-Component");
    }

    ngAfterContentInit() {

        // console.log('tabs-Component ngAfterContentInit');

        this._router.navigate([ this.tabsName ])

    }

    ionViewWillLoad() {

    }

    async appInitializer() {
        // console.log('tabs-Component appInitializer');
        // quand la platform est prete
        await this._platform.ready();
        // console.log('tabs-Component _platform.ready');

        // on check le changement d'état et si isActive
        App.addListener('appStateChange', async ({ isActive }) => {

            // console.log('tabs-Component addlistener');

            if (isActive) {
                // console.log('tabs-Component isActive');

                // control si la key intro n'a pas été supprimée depuis le settings.
                // if (!this._storageService.readLocal('intro')) {
                //   // console.log('tabs-component Pas de Setok');
                //   this._ngZone.run(() => {
                //     this._router.navigate([ 'intro' ]);
                //   });
                // }

                // // control si la key setok n'a pas été supprimée depuis le settings.
                // if (!this._storageService.readLocal('setok')) {
                //   // console.log('tabs-component Pas de Setok');
                //   this._ngZone.run(() => {
                //     this._router.navigate([ 'settings' ]);
                //   });
                // }

                // quand l'app est activé on charge la varglobale
                this._varGlobal.loadVar();

                // check du status
                if (this._storageService.readLocal('status', false)) {
                    // console.log('tabs-Component le ls existe', this._storageService.readLocal('status', false));
                    if (this._storageService.readLocal('status', false) !== this.tabsName) {
                        this._storageService.saveLocal('status', this.tabsName, false)
                        // console.log('tabs-Component on charge le component');
                        this._ngZone.run(() => {
                            this._router.navigate([ this.tabsName ]);
                        });
                    }
                }

                // on check si les mises à jour sont activé => ServiceWorker
                if (this._update.isEnabled) {
                    // console.log('tabs-Component ServiceWorker isEnabled');
                    // pour android
                    this._update.checkForUpdate().then(async () => {
                        // console.log('tabs-Component CheckForUpDate');
                    });
                    // } else if (/webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) { // Si Apple
                } else { // Si Apple
                    // console.log('tabs-Component update IOS');
                    this._upDateIos.checkUpdateIos();
                }
            }

        });
    }

}
