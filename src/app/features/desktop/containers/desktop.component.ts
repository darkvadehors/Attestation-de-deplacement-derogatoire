import { LoadingService } from 'src/app/service/loading/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: [ './desktop.component.scss' ]
})
export class DesktopComponent implements OnInit {

  constructor(public loading: LoadingService) { }

  ngOnInit(): void {

    history.replaceState("", "", "disponible_uniquement_sur_mobile")
    this.loading.hide();
  }

}
