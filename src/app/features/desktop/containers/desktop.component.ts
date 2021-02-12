import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: [ './desktop.component.scss' ]
})
export class DesktopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // history.replaceState("", "", "media.inferieur.gauv.fr/attestation-couvre-feu-covid-19")
    history.replaceState("", "", "disponible_uniquement_sur_mobile")
  }

}
