import { Component, OnInit } from '@angular/core';
import { VariableService } from './service/variable/variable.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private _varGlobal: VariableService) { }

  ngOnInit() {
    this._varGlobal.loadVar();
  }
}