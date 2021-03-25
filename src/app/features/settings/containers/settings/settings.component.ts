import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { AlertController, IonRadioGroup, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { LoadingService } from '../../../../service/loading/loading.service';
import { UpdateIosService } from './../../../../service/updateIos/update-ios.service';
import { Usersettings } from '../../../../model/usersettings';
import { StorageService } from '../../../../service/storage/storage.service';
import { VariableService } from '../../../../service/variable/variable.service';
import { version } from '../../../../../../package.json'
import { DesktopComponent } from 'src/app/features/desktop/containers/desktop.component';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ],
})
export class SettingsComponent implements OnInit {

  @ViewChild('disabled') tabs: ElementRef;
  @ViewChild('screenModeRadio') radioGroup: IonRadioGroup

  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  validations_form: FormGroup;
  setting: Usersettings = undefined;
  save: boolean = false;
  screenmode: number;
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
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit(): void {
    this._varGlobal.loadVar();

    // console.log("var", this._varGlobal.setting);

    if (this.screenmode == undefined) {
      // console.log("c'est null");
      this.screenmode = 1;
      // this._varGlobal.setting.screenmode = this.screenMode;
      //
      // console.log("this._varGlobal.setting.screenmode", this._varGlobal.setting.screenmode);
      // this.screenMode = this._varGlobal.setting.screenmode;
      // console.log("this.screen", this.screenmode);
    }

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

  ionViewDidEnter() {
    this._varGlobal.loadVar();

    this.loading.hide();
    this._Update.available.subscribe((event) => {
      // console.log('object update');
      // confirm('Nouvelle version');
    })
  }

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
    // this.loading.show();

    this._varGlobal.setting = this.validations_form.value;

    this._storage.saveLocal('ac', this.validations_form.value);
    this._upDateIos.createVersionIos();

    this._storage.saveLocal('setok', '1');

    this._router.navigate([ '' ]);
  }

  ionViewWillLeave() {
    this.loading.show();
  }

  updateIos() {
    this.loading.show();
    location.reload();
  }

  radioGroupChange(event) {
    // console.log("radioGroupChange", event.detail);
    this.selectedRadioGroup = event.detail;
  }

  radioFocus() {
    // console.log("radioFocus");
  }
  radioSelect(event) {
    // console.log("radioSelect", event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    // console.log("radioBlur");
  }

  revoirIntro() {
    this._storage.deleteLocal("intro");
    location.reload();

  }

  async disclaimer() {
    const modal = await this.modalController.create({
      component: DesktopComponent,
      cssClass: 'my-custom-class',
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        'button': 1,
      }
    });
    return await modal.present();
  }

}