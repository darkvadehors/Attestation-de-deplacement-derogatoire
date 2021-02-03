import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usersettings } from '../../../../model/usersettings';
import { StorageService } from '../../../../service/storage/storage.service';
import { VariableService } from '../../../../service/variable/variable.service';
//FIXME mettre une variable dans le localstorage pour confirme que les variables sont bien rentrées
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

  constructor(private _varGlobal: VariableService, private _router: Router, private _storage: StorageService, public alertCtl: AlertController, public formBuilder: FormBuilder) { }

  ngOnInit(): any {
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
    console.log('on désactive les tabs');

    document.querySelector(".welcome").setAttribute("disabled", "")
    document.querySelector(".map").setAttribute("disabled", "")
  };

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

  onSubmit() {

    console.log('this.validations_form.value', this.validations_form.value);

    this._storage.saveLocal('ac', this.validations_form.value);

    console.log('1');

    this.confirmAlert();
  }


  async confirmAlert() {

    console.log('2');

    const confirm = await this.alertCtl.create({

      header: 'Confirmation',
      subHeader: 'Paramètres Enregistrés',
      message: 'Vos réglages sont enregistrés localement. Vous pouvez créer votre attestation.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            console.log('3');

            this._storage.saveLocal('setok', '1');

            console.log('4');

            this._router.navigate([ '' ]);

          }
        }
      ]
    })
    // .then(confirm => {
    //   console.log('Present alert 1');
    //   confirm.present()
    // }
    //);

    console.log('lance l alerte ');
    await confirm.present();
    console.log('alerte lancé ');

  }

  //TODO verifier si toujours utilise ?
  ionViewWillLeave() {
    console.log('avant de sortir on reactive les tabs');

    //FIXME voir => renderer2 pour supprimer queryselector
    document.querySelector(".welcome").setAttribute("disabled", "false")
    document.querySelector(".map").setAttribute("disabled", "false")

  }
}