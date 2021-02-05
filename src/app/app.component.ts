import {VariableService} from './service/variable/variable.service';
import {Component, OnInit} from '@angular/core';
import { Plugins } from '@capacitor/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor( private _varGlobal:VariableService){}

  ngOnInit(): void {
    this._varGlobal.loadVar();
  }
}