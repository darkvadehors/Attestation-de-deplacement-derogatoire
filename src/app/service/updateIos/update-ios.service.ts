import { StorageService } from 'src/app/service/storage/storage.service';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UpdateIosService {

  constructor(
    private _storageService: StorageService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  versionLocal = this._storageService.readLocal('version', false);
  // Initialisation de VersionLocal pour plus de rapidité.
  async createVersionIos() {
    // console.log('versinlocal', this.versionLocal);
    if (this.versionLocal != null) {
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
    if (this.versionLocal === null) {
      //Si il n'y a pas de version on en crée une.
      // this.createVersionIos();
    }
    // on récupère la valeur de timestamp dans le fichier ngsw.json crée par angular.
    // const {
    //   timestamp = null
    // } = await fetch('ngsw.json').then(r => r.json()).catch(() => {
    //   return;
    // });
    // if (this.versionLocal != timestamp) {
    //   // Message pour informer de la mise an jour
    //   const toast = await this.toastController.create({ message: 'Un instant, mise à jour...', duration: 3000 })
    //   toast.present()
    //     .then(() => // console.log('un instant'))
    //     .then(() => this.update());
    // }
  }

  async update() {
    const {
      timestamp = null
    } = await fetch('ngsw.json').then(r => r.json()).catch(err => err);

    this._storageService.saveLocal('version', timestamp, false);// on enregistre la nouvelle version.
    this._storageService.deleteLocal('setok');// supprime le setOk.
    // location.reload();
    alert('alert')
  }
}