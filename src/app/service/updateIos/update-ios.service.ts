import { StorageService } from 'src/app/service/storage/storage.service';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UpdateIosService {

  constructor(
    private _storageService: StorageService,
    public toastController: ToastController,
  ) { }

  versionLocal = this._storageService.readLocal('version', false);
  // Initialisation de VersionLocal pour plus de rapidité.
  async createVersionIos() {
    if (!this.versionLocal) {
      const {
        timestamp = null
      } = await fetch('ngsw.json').then(r => r.json()).catch(err => err);
      // // enregistrement de la valeur du localStorage.
      this._storageService.saveLocal('version', timestamp, false);
    } else {
      this.checkUpdateIos();
    }
  }

  async checkUpdateIos() {
    if (!this.versionLocal) {
      //Si il n'y a pas de version on en crée une.
      this.createVersionIos();
    }
    // on récupère la valeur de timestamp dans le fichier ngsw.json crée par angular.
    const {
      timestamp = null
    } = await fetch('ngsw.json').then(r => r.json()).catch(() => {
      return;
    });
    if (this.versionLocal != timestamp) {
      // Message pour informer de la mise an jour
      const toast = await this.toastController.create({ message: 'Un instant, mise à jour...', duration: 3000 })
      toast.present()
        .then(() => this._storageService.saveLocal('version', timestamp, false))// on enregistre la nouvelle version.
        .then(() => alert(`Mise à jour! vérifier l'onglet réglages`))
        .then(() => location.reload()); // on recharge la page.
    }
  }
}