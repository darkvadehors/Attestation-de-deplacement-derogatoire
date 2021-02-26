import { CheckUpdateService } from './service/checkUpdate/check-update.service';
import { Component, OnInit } from '@angular/core';
import { VariableService } from './service/variable/variable.service';
import { App } from '@capacitor/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private _varGlobal: VariableService, private _platform: Platform, private _upDate: CheckUpdateService) {
    this.appInitializer();
    this._upDate;
  }

  ngOnInit() {
    this._varGlobal.loadVar();
  }

  async appInitializer() {

    await this._platform.ready();

    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) { this._varGlobal.loadVar() }
    })
  }
}