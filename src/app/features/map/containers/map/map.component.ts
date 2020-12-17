import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Plugins } from '@capacitor/core';
import { VariableService } from '../../../../service/variable/variable.service';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit {

  coords: any;

  constructor(private http: HttpClient, private _varGlobal: VariableService) { }

  // Fonction d'initialisation du composant.
  async ngOnInit() {
    this._varGlobal.loadVar();

    const coordinates = await Geolocation.getCurrentPosition();

    this.coords = coordinates.coords;
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([ this.coords.latitude, this.coords.longitude ], 18);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Attestation Covid 19'
    }).addTo(myfrugalmap);

    const identifiant = this._varGlobal.setting.firstname + ' - ' + this._varGlobal.setting.lastname;
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    L.marker([ this.coords.latitude, this.coords.longitude ], { icon: myIcon }).bindPopup(identifiant).addTo(myfrugalmap).openPopup();

  }

}