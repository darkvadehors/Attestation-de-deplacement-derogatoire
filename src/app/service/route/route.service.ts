import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private _routeStatus$: BehaviorSubject<any> = new BehaviorSubject(null);
  routeStatus$: Observable<any> = this._routeStatus$.asObservable();

  constructor() { }

  getRouteStatus() {
    // console.log('getRouteStatus', this._routeStatus$.asObservable());
    return this._routeStatus$.asObservable()
  }

  setRouteStatus(route: any) {
    this._routeStatus$.next(route)
    // console.log('setRouteStatus', route, this._routeStatus$.asObservable());
  }


  checkTimeRouteStatus() {
    // console.log('route.service checkTimeRouteStatus');
    // Configuration de l'observable pour les Tabs
    const dateheure = new Date();
    const heuredelajournee: any = dateheure.getHours();

    if (heuredelajournee < 6 || heuredelajournee > 19) {
      const data = {
        tabsName: 'couvreFeux',
        iconName: 'moon-outline',
        tabsLabel: 'Couvre Feux',
      }
      this.setRouteStatus(data);
      // console.log('RouteService couvre Feux', data);
    } else if (heuredelajournee > 6 && heuredelajournee < 19) {
      const data = {
        tabsName: 'confinement',
        iconName: 'sunny-outline',
        tabsLabel: 'Confinement',
      }
      this.setRouteStatus(data);
      // console.log('RouteService confinenent', data);
    }
  }
}
