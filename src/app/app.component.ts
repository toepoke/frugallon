import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// Core
import { TimeService } from '../core/services';

import { IAppState, IFilterState, AppActions, FilterActions } from '../bricks/stores';
import { FilterService, FillUpService, AppService } from '../bricks/services';
import { TabsPage, AboutPage, SettingsPage } from '../pages';
// import { CoreIllustrationsPage } from '../pages/_illustrations/core-illustrations';
// import { BricksIllustrationsPage } from '../pages/_illustrations/bricks-illustrations';


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
    private _appService: AppService
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

    this._appService.primeDb()
      .then(() => console.log("database primed."))
			.then(() => this._appService.getInitialUiState() )
      .then((initState: IAppState) => {
				this._store.dispatch( this._appActions.InitialiseApp(initState) );
      })
      .catch((err: any) => console.error(err))
    ;
  }

	protected openSettings(): void {
		this._menuCtrl.close("menu1");
		this._nav.push(SettingsPage);
	}

	protected openAbout(): void {
		this._menuCtrl.close("menu1");
		this._nav.push(AboutPage);
	}

}
