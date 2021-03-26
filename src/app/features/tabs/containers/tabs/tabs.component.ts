import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../service/storage/storage.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: [ './tabs.component.scss' ]
})
export class TabsComponent {
    constructor(private _router: Router, private _storageService: StorageService) { }

    ionViewWillLoad() {

        if (!this._storageService.readLocal('setok')) {
            this._router.navigate([ 'tabs/settings' ])
        }
    }
}
