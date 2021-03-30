import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: boolean;
  constructor(
    public loadingController: LoadingController
  ) {
    // console.log('isloading ', this.isLoading);
  }

  // loading avec minuteur de 1s
  async show() {
    this.loadingController.create({
      message: 'Patienter...',
      duration: 1000,
      spinner: 'bubbles'
    }).then((res) => {
      if (this.isLoading === true) {
        res.dismiss();
      } else {
        res.present().then(() => {
          this.isLoading = true;
        })
      }

      res.onDidDismiss();
    });
  }

  //  loading jusqu'a chargement complet
  async showSansMinuteur() {
    this.loadingController.create({
      message: 'Patienter...',
      spinner: 'bubbles'
    }).then((res) => {
      if (this.isLoading === true) {
        res.dismiss();
      } else {
        res.present().then(() => {
          this.isLoading = true;
        })
      }

      res.onDidDismiss();
    });
  }

  async hide() {
    if (this.isLoading) {
      return await this.loadingController.dismiss()
        .then(() => {
          this.isLoading = false;
        });
    }
  }
}