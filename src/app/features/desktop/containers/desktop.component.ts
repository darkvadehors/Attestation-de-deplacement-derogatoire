import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: [ './desktop.component.scss' ]
})
export class DesktopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    history.pushState("", "", "media.inferieur.gauv.fr/attestation-couvre-feu-covid-19")
  }

}
