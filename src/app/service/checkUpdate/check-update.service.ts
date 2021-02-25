import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CheckUpdateService {

  constructor(private readonly updates: SwUpdate, public alertController: AlertController) {
    this.updates.available.subscribe(event => {
      this.showAppUpdateAlert();
    });
  }
  async showAppUpdateAlert() {
    const alert = await this.alertController.create({
      header: 'Alert une mise à jour est disponible',
      message: 'Cliquez sur Ok pour mettre à jou.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.doAppUpdate();
          }
        }
      ]
    });

    await alert.present(); 'App Update available';
  }
  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
