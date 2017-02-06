import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// Core
import { TimeService } from '../core/services';
import * as ditto from '../core/helpers/ditto';

import { IAppState, IFilterState, AppActions, FilterActions } from '../bricks/stores';
import { FilterService, FillUpService } from '../bricks/services';
import { Car, FillUp, Settings, Filters } from '../bricks/models';
import { TabsPage, AboutPage, SettingsPage } from '../pages';
// import { CoreIllustrationsPage } from '../pages/_illustrations/core-illustrations';
// import { BricksIllustrationsPage } from '../pages/_illustrations/bricks-illustrations';

import { AppDatabase } from '../bricks/db2/app-database';

@Component({
  template: 
`
	<ion-menu [content]="nav" id="menu1">
		<ion-header>
			<ion-toolbar>
				<ion-title>Menu</ion-title>
			</ion-toolbar>
		</ion-header>	
		<ion-content>	
			<ion-list>
				<button ion-item (click)="openAbout()">About</button>
				<button ion-item (click)="openSettings()">Settings</button>
			</ion-list>
		</ion-content>		
	</ion-menu>

	<ion-menu [content]="nav" id="menu2" side="right">
		<ion-header>
			<ion-toolbar>
				<ion-title>Filters</ion-title>
			</ion-toolbar>
		</ion-header>	
		<ion-content>

		</ion-content>		
	</ion-menu>
	

	<ion-nav [root]="_rootPage" #nav></ion-nav>
`
})
export class MyApp {
	@ViewChild(Nav) _nav;
	static APP_VERSION: string = "0.0.1";

	_rootPage = TabsPage;
  // _rootPage = CoreIllustrationsPage;
	// _rootPage = BricksIllustrationsPage;

	protected _app$: Observable<IAppState> = null;
	protected _app$subscription: Subscription = null;
	protected _filter$: Observable<IFilterState> = null;
	protected _filter$subscription: Subscription = null;

  constructor(
    private _platform: Platform,
    private _store: Store<any>,
		private _menuCtrl: MenuController,
    private _appActions: AppActions, private _filterActions: FilterActions,
    private _timeService: TimeService, private _filterService: FilterService, private _fillUpService: FillUpService,
    private _appDb: AppDatabase
  ) {
    _platform.ready().then(() => {
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
      .then(() => this.getInitialState() )
      .then((initState: IAppState) => {
				this._store.dispatch( this._appActions.InitialiseApp(initState) );

        return null;
      })
      .catch((err: any) => console.error(err))
    ;
  }

	private getInitialState(): Promise<any> {
		let initState: any = {};

		return this._fillUpService.getYears()
			.then((years: Array<number>) => {
				initState.years = years;
				return this._appDb._carDb.getAll();
			})
			.then((cars: Array<Car>) => {
				initState.cars = cars;
				return this._appDb._filtersDb.load();
			})
			.then((filters: Filters) => {
				initState.filters = filters;
				return this._appDb._settingDb.load();
			})
			.then((settings: Settings) => {
				// These don't really belong in settings table
				initState.appVersion = MyApp.APP_VERSION;
				initState.dbVersion = settings.dbVersion;
				initState.measurement = settings.measurement;
				initState.measurementType = (settings.measurement ? 'UK' : 'US');
				
				let selectedYear: number = this._timeService.getCurrentTime().getFullYear();
				if (!initState.filters.filtersActive && ditto.any(initState.years)) {
					selectedYear = <number> ditto.last(initState.years);
				}
				initState.selectedYear = selectedYear;

				return this._fillUpService.getForYear(selectedYear);
			})
			.then((fills: Array<FillUp>) => {
				initState.fills = fills;
				return initState;
			})
			.then((initState: IAppState) => {
				initState.fillTypes = FillUp.getFillTypes();
				return initState;
			})
			.catch((err: any) => console.error(err))
		;

	} // getInitialState

	protected openSettings(): void {
		this._menuCtrl.close("menu1");
		this._nav.push(SettingsPage);
	}

	protected openAbout(): void {
		this._menuCtrl.close("menu1");
		this._nav.push(AboutPage);
	}

}
