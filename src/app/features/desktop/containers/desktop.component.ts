import { LoadingService } from 'src/app/service/loading/loading.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: [ './desktop.component.scss' ]
})
export class DesktopComponent implements OnInit {

  // Data passed in by componentProps
  @Input() button: boolean;

  constructor(public loading: LoadingService, public modalController: ModalController) { }

  ngOnInit(): void {

    history.replaceState("", "", "disponible_uniquement_sur_mobile")
    this.loading.hide();
  }

  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
