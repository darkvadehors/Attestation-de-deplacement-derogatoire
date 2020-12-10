import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usersettings } from 'src/app/model/usersettings';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  settings_form: FormGroup;
  setting: Usersettings = null;
  constructor(private _router: Router, private _storage: StorageService) {}

  ngOnInit(): void {
    this.settings_form = new FormGroup({
      firstname: new FormControl(this._storage.setting?.firstname),
      lastname: new FormControl(this._storage.setting?.lastname),
      dateofbirth: new FormControl(this._storage.setting?.dateofbirth),
      cityofbird: new FormControl(this._storage.setting?.cityofbird),
      adress: new FormControl(this._storage.setting?.adress),
      city: new FormControl(this._storage.setting?.city),
      zipcode: new FormControl(this._storage.setting?.zipcode),
      backtime: new FormControl(this._storage.setting?.backtime),
    });
  }

  onSubmit() {
    console.log('this.settings_form.valuet', this.settings_form.value);
    console.log('this._storage.readLocal()',this._storage.readLocal());
    this._storage.saveLocal(this.settings_form.value);



    // this._storage.readLocal();
    this._router.navigate(['welcome']);
  }
}