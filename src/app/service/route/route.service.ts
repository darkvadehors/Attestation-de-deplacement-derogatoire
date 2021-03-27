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
    console.log('get', this._routeStatus$.asObservable());
    return this._routeStatus$.asObservable()
  }

  setRouteStatus(route: any) {
    this._routeStatus$.next(route)
    console.log('set', route, this._routeStatus$.asObservable());
  }

  // toggleNavState() {
  //   if (this.routeStatus$) {

  //   }
  //   const data = {
  //     tabsName: 'confinement',
  //     iconName: 'sunny-outline',
  //     tabsLabel: 'Confinement',
  //   }
  //   this.setRouteStatus(data);
  // }

}
