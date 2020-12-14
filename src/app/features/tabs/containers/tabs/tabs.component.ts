import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: [ './tabs.component.scss' ]
})
export class TabsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        console.log('tabs');
        //FIXME mettre la redirection en tresettings et welcome ici
    }

}
