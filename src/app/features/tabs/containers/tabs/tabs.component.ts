import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../service/storage/storage.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: [ './tabs.component.scss' ]
})
export class TabsComponent {
    constructor(private _router: Router, private _storage: StorageService) { }

    ionViewWillLoad() {

        if (!this._storage.readLocal('setok')) {
            this._router.navigate([ 'tabs/settings' ])
        }
    }
}
