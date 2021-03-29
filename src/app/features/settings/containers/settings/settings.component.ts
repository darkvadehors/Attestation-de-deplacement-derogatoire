import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { AlertController, IonRadioGroup, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DesktopComponent } from 'src/app/features/desktop/containers/desktop.component';
import { RouteService } from './../../../../service/route/route.service';
import { LoadingService } from '../../../../service/loading/loading.service';
import { UpdateIosService } from './../../../../service/updateIos/update-ios.service';
import { StorageService } from '../../../../service/storage/storage.service';
import { VariableService } from '../../../../service/variable/variable.service';
import { Usersettings } from '../../../../model/usersettings';
import { version } from '../../../../../../package.json'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ],
})
export class SettingsComponent implements OnInit {

  @ViewChild('disabled') tabs: ElementRef;
  @ViewChild('screenModeRadio') radioGroup: IonRadioGroup

  //  Observable status
  routeStatus$: Observable<any> = this._routeStatus.getRouteStatus();

  // initialize les variable de la route status
  tabsName: string;


  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;

  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  // initialize validation _form
  validations_form: FormGroup;

  // initialize setting avec valeur par default undefined
  setting: Usersettings = undefined;
  save: boolean = false;

  //  initialize affichage en mode PDF ou Tous anti PV avec valeur par default 1 -> TAP
  screenmode?: number = 1;

  // initialize vertion local
  versionLocal: string = version;

  constructor(
    public alertCtl: AlertController,
    public formBuilder: FormBuilder,
    public loading: LoadingService,
    public modalController: ModalController,
    private _varGlobal: VariableService,
    private _router: Router,
    private _storage: StorageService,
    private _Update: SwUpdate,
    private _upDateIos: UpdateIosService,
    private routerOutlet: IonRouterOutlet,
    private _routeStatus: RouteService,

    // ngZone pour les liens externe
    // private _ngZone: NgZone,
  ) { }

  ngOnInit(): void {

    // charge les variables Globales
    this._varGlobal.loadVar();

    // chargement de la route dans la variable tabsName pour le bouton submit
    this.routeStatus$.subscribe((data) => {
      this.tabsName = data?.tabsName;
    });

    // Validator pour le formulaire de settings
    this.validations_form = this.formBuilder.group({
      firstname: new FormControl(this._varGlobal.setting?.firstname, Validators.required),
      lastname: new FormControl(this._varGlobal.setting?.lastname, Validators.required),
      dateOfBirth: new FormControl(this._varGlobal.setting?.dateOfBirth || "0", Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.minLength(4),
      ])),
      cityofbird: new FormControl(this._varGlobal.setting?.cityofbird, Validators.required),
      adress: new FormControl(this._varGlobal.setting?.adress, Validators.required),
      city: new FormControl(this._varGlobal.setting?.city, Validators.required),
      zipcode: new FormControl(this._varGlobal.setting?.zipcode, Validators.compose([
        Validators.required
      ])),
      timeback: new FormControl(this._varGlobal.setting?.timeback || '20', Validators.required),
      stat: new FormControl(true, Validators.compose([
        Validators.pattern('true'),
        Validators.requiredTrue
      ])),
      screenmode: new FormControl(this._varGlobal.setting?.screenmode || 1, Validators.required),
    });
  }

  // avant d'entre dans la page
  ionViewDidEnter() {
    // fermeture du loader
    this.loading.hide();
    // chargement des variables
    this._varGlobal.loadVar();

    // FIXME controler l'utilité de l'update
    // this._Update.available.subscribe((event) => {
    //   console.log('object update');
    //   // confirm('Nouvelle version');
    // })
  }

  // messages de validation
  validation_messages = {
    'firstname': [
      { type: 'required', message: 'Le prénom est obligatoire.' }
    ],
    'lastname': [
      { type: 'required', message: 'Le nomn de famille  est obligatoire.' }
    ],
    'dateOfBirth': [
      { type: 'required', message: 'La date de naissance est obligatoire.' },
      { type: 'pattern', message: 'Merci de rentrer une date de naissance valide' }
    ],
    'cityofbird': [
      { type: 'required', message: 'La ville de naissance est obligatoire.' },
    ],
    'adress': [
      { type: 'required', message: 'L\'adresse est obligatoire.' },
    ],
    'zipcode': [
      { type: 'required', message: 'Le code postale est obligatoire.' },
    ],
    'city': [
      { type: 'required', message: 'La ville est obligatoire' }
    ],
    'timeback': [
      { type: 'required', message: 'Le nombres de minutes à soutraire est obligatoire' }
    ],
  };

  onSubmit(): any {
    // envoie des valeurs du fomrulaire dans la VariableService
    this._varGlobal.setting = this.validations_form.value;

    // ajoute d'une key ac (ac -> Attestation Covid) dans le localstorage contenant tous les réglages
    this._storage.saveLocal('ac', this.validations_form.value);
    // ajout de la key version au cas ou le updater serait desactive par un OS
    this._upDateIos.createVersionIos();
    // ajoute de la key setok pour valider la première configuration
    this._storage.saveLocal('setok', '1');

    // redirige vers le component en fonction de la tabsName charge par l'observable
    this._router.navigate([ this.tabsName ]);
  }

  ionViewWillLeave() {
    // avant de sortir de l'onglet affichage du loader
    this.loading.show();
  }

  async updateIos() {

    const alert = await this.alertCtl.create({

      header: 'Attention!',
      message: 'Vérifier que vous êtes bien <strong>connecté</strong> à internet!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        }, {
          text: 'Okay',
          handler: () => {
            // affichage du loader
            this.loading.show();
            // rechargement de la page pour force la mise a jour
            location.reload();
          }
        }
      ]
    });
    // affichage de l'alerte
    await alert.present();

  }


  radioGroupChange(event: any) {
    console.log("radioGroupChange", event.detail);
    this.selectedRadioGroup = event.detail;
  }

  radioFocus() {
    console.log("radioFocus");
  }
  radioSelect(event: any) {
    console.log("radioSelect", event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }

  revoirIntro() {
    // suppression de la key intro du localstorage
    this._storage.deleteLocal("intro");
    // redirection vers le component intro
    this._router.navigate([ 'intro' ])

  }

  async disclaimer() {
    const modal = await this.modalController.create({
      component: DesktopComponent,
      cssClass: 'my-custom-class',
      presentingElement: this.routerOutlet.nativeEl,
      // envoie d'une variable avec componentProps pour afficher le bouton "fermer" dans la page
      componentProps: {
        'button': 1,
      }
    });
    return await modal.present();
  }

}