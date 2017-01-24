import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { IAppState, IFilterState, AppActions, FilterActions } from '../bricks/stores';
import { TabsPage } from '../pages/tabs/tabs';

import { AppDatabase } from '../bricks/db2/app-database';

@Component({
  template: 
  `<ion-nav [root]="_rootPage"></ion-nav>`
})
export class MyApp {
	static APP_VERSION: string = "0.0.1";

  _rootPage = TabsPage;

	_filter$: Observable<IFilterState> = null;
	_app$: Observable<IAppState> = null;
  _filters$: Observable<IFilterState> = null;

  constructor(
    platform: Platform,
    private _store: Store<any>,
    private _appActions: AppActions, private _filterActions: FilterActions,
    private _appDb: AppDatabase
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.initialiseApp();
    });
  }

  initialiseApp(): void {
    this._app$ = <Observable<IAppState>> this._store.select("appState");
    this._filter$ = <Observable<IFilterState>> this._store.select("filterState");

    this._appDb.primeDb()
      .then(() => console.log("database primed."))
      // .then(() => {
        // TODO: Get initial state
      // })
      .catch((err: any) => console.error(err))
    ;
  }

  // private getInitialState(): Promise<any> {
    // TODO: Get initial state
  // }

}
