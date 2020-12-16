import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usersettings } from 'src/app/model/usersettings';
import { StorageService } from 'src/app/service/storage/storage.service';
import { AlertController } from '@ionic/angular';
import { VariableService } from 'src/app/service/variable/variable.service';

//FIXME Probleme de chargement des variables
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ],
})
export class SettingsComponent implements OnInit {
  validations_form: FormGroup;
  setting: Usersettings = null;
  save: boolean = false;

  constructor(private _varGlobal: VariableService, private _router: Router, private _storage: StorageService, public alertController: AlertController, public formBuilder: FormBuilder) { }

  ngOnInit(): any {
    let zipCodeRegex = /^(?:[0-8]\d|9[0-8])\d{3}$/;

    this.validations_form = this.formBuilder.group({
      firstname: new FormControl(this._varGlobal.setting?.firstname, Validators.required),
      lastname: new FormControl(this._varGlobal.setting?.lastname, Validators.required),
      dateofbirth: new FormControl(this._varGlobal.setting?.dateofbirth, Validators.required),
      cityofbird: new FormControl(this._varGlobal.setting?.cityofbird, Validators.required),
      adress: new FormControl(this._varGlobal.setting?.adress, Validators.required),
      city: new FormControl(this._varGlobal.setting?.city, Validators.required),
      zipcode: new FormControl(this._varGlobal.setting?.zipcode, Validators.compose([
        Validators.pattern(zipCodeRegex),
        Validators.required
      ])),
      backtime: new FormControl(this._varGlobal.setting?.backtime || '20', Validators.required),
      stat: new FormControl(true, Validators.compose([
        Validators.pattern('true'),
        Validators.requiredTrue
      ]))
    });
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
    'backtime': [
      { type: 'required', message: 'Le nombres de minutes à soutraire est obligatoire' }
    ],
  };


  async confirmAlert() {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Paramètres Enregistrés',
      message: 'Vos réglages sont enregistrés localement. Vous pouvez créer votre attestation.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this._router.navigate([ 'welcome' ]);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  onSubmit() {

    console.log('this.validations_form.value', this.validations_form.value);
    this.save = true;
    this._storage.saveLocal('user', this.validations_form.value);
    this.confirmAlert();
  }

  //TODO verifier si toujours utilise ?
  ionViewWillLeave() {
    console.log('save in ', this.save);
    if (!this.save && this._storage.readLocal('user')) {
      console.log('save out ', this.save);
      this._storage.saveLocal('user', this.validations_form.value);
    }
  }
}