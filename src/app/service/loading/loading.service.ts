import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: Promise<HTMLIonLoadingElement>

  constructor(public loadingController: LoadingController) {
    this.loading = this.loadingController.create({
      message: 'Patientez....',
      spinner: 'dots',
      cssClass: 'loading',
    });

  }

  async show() {
    await (await this.loading).present();
  }
  async hide() {
    await (await this.loading).dismiss();
  }
}
