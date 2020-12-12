import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usersettings } from 'src/app/model/usersettings';
import { StorageService } from 'src/app/service/storage/storage.service';
import { AlertController } from '@ionic/angular';
import { VariableService } from 'src/app/service/variable/variable.service';

//FIXME Probleme de chargement des variables
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  settings_form: FormGroup;
  setting: Usersettings = null;
  constructor(
    public alertController: AlertController,
    private _varGlobal:VariableService,
    private _router: Router,
    private _storage: StorageService, ) {}

  ngOnInit(): any {
    this.settings_form = new FormGroup({
      firstname: new FormControl(this._varGlobal.setting.firstname),
      lastname: new FormControl(this._varGlobal.setting?.lastname),
      dateofbirth: new FormControl(this._varGlobal.setting?.dateofbirth),
      cityofbird: new FormControl(this._varGlobal.setting?.cityofbird),
      adress: new FormControl(this._varGlobal.setting?.adress),
      city: new FormControl(this._varGlobal.setting?.city),
      zipcode: new FormControl(this._varGlobal.setting?.zipcode),
      backtime: new FormControl(this._varGlobal.setting?.backtime || '20'),
    });
  }

  onSubmit() {
    console.log('this.settings_form.value', this.settings_form.value);
    this._storage.saveLocal(this.settings_form.value);
    this.confirmAlert();
  }

  async confirmAlert() {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Paramètre Enregistré',
      message: 'Vos réglages sont enregistrer localement\n Vous pouvez créer votre attestation.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this._router.navigate(['welcome']);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }


}