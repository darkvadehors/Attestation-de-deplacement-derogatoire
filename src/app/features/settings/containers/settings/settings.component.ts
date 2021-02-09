import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usersettings } from '../../../../model/usersettings';
import { StorageService } from '../../../../service/storage/storage.service';
import { VariableService } from '../../../../service/variable/variable.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ],
})
export class SettingsComponent implements OnInit {

  @ViewChild('disabled') tabs: ElementRef;

  validations_form: FormGroup;
  setting: Usersettings = null;
  save: boolean = false;

  constructor(
    public alertCtl: AlertController,
    public formBuilder: FormBuilder,
    private _varGlobal: VariableService,
    private _router: Router,
    private _storage: StorageService,
    private _renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this._varGlobal.loadVar();
    let zipCodeRegex = /^(?:[0-8]\d|9[0-8])\d{3}$/;

    this.validations_form = this.formBuilder.group({
      firstname: new FormControl(this._varGlobal.setting?.firstname, Validators.required),
      lastname: new FormControl(this._varGlobal.setting?.lastname, Validators.required),
      dateofbirth: new FormControl(this._varGlobal.setting?.dateofbirth, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.minLength(4),
      ])),
      cityofbird: new FormControl(this._varGlobal.setting?.cityofbird, Validators.required),
      adress: new FormControl(this._varGlobal.setting?.adress, Validators.required),
      city: new FormControl(this._varGlobal.setting?.city, Validators.required),
      zipcode: new FormControl(this._varGlobal.setting?.zipcode, Validators.compose([
        Validators.pattern(zipCodeRegex),
        Validators.maxLength(6),
        Validators.required
      ])),
      timeback: new FormControl(this._varGlobal.setting?.timeback || '20', Validators.required),
      stat: new FormControl(true, Validators.compose([
        Validators.pattern('true'),
        Validators.requiredTrue
      ]))
    });
  }

  ionViewDidEnter() {
    this._varGlobal.loadVar();
  }

  validation_messages = {
    'firstname': [
      { type: 'required', message: 'Le prénom est obligatoire.' }
    ],
    'lastname': [
      { type: 'required', message: 'Le nomn de famille  est obligatoire.' }
    ],
    'dateofbirth': [
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
      { type: 'pattern', message: 'Merci de rentrer un code postale valide' }
    ],
    'city': [
      { type: 'required', message: 'La ville est obligatoire' }
    ],
    'timeback': [
      { type: 'required', message: 'Le nombres de minutes à soutraire est obligatoire' }
    ],
  };

  onSubmit(): any {

    this._varGlobal.setting = this.validations_form.value;

    this._storage.saveLocal('ac', this.validations_form.value);

    this._storage.saveLocal('setok', '1');
    this._router.navigate([ '' ]);
  }


}