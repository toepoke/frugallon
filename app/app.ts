import { Component, ViewEncapsulation, Injector, provide, Type, ViewChild } from "@angular/core";
import { IONIC_DIRECTIVES, ionicBootstrap, App, Platform, Nav, NavController, NavOptions, ViewController, SqlStorage } from 'ionic-angular';
import { provideForms } from '@angular/forms';
import { ProgressMessage } from "./core/components";

import { AppMenuIon } from "./bricks/components";
import { FillUpPage, HistoryPage, StatsPage, CarListPage, TabsPage, SettingsPage, WelcomePage } from "./pages/pages";
import { CarsDb, CarMakersDb, FillsDb, SettingsDb, MpgStatsDb } from "./bricks/services/db";
import { CarDb, CarMakerDb, FillUpDb, SettingDb, MpgStatDb, DbProviders } from './bricks/services/db2';
import { TimeServer } from "./core/services";
import { FilterService, FillUpService } from "./bricks/services";
import { ORCHESTRATOR_STRATEGY } from "./strategy";
import { Observable } from 'rxjs/Observable';
import { Settings, Car, FillUp } from "./bricks/models";
import { appStateReducer, filterStateReducer, IFilterState , IAppState, FilterActions, AppActions } from "./bricks/stores";

import * as _ from "./core/helpers/underscore";
import * as ditto from "./core/helpers/ditto";

import { provideStore, Store, usePreMiddleware, usePostMiddleware, Action } from "@ngrx/store";
import * as ACTIONS from "./bricks/stores/actions/actions";


/* TESTS */
import {run} from './app-runner';
/* TESTS */

@Component({
	directives: [IONIC_DIRECTIVES, AppMenuIon, ProgressMessage],
	changeDetection: ORCHESTRATOR_STRATEGY,
	// Forces the styles to be available globally
	encapsulation: ViewEncapsulation.None,
  template: 
`
	<progress-message [message]="_message"></progress-message>

	<app-menu-ion 
		[app-state]="(_app$|async)" 
		[filters-state]="_currFilters" 
		(on-filters-active)="onFiltersActive($event)"
		(on-change-filter)="onFilterChange($event)"
		[content]="navcontent">
	</app-menu-ion>
	
	<ion-nav [root]="_rootPage" #navcontent swipeBackEnabled="false"></ion-nav>
`,	
	// // http://ionicframework.com/docs/v2/api/config/Config/
  // config: {
	// 	// Putting tabs at the bottom because the title bar isn't scrollable and in landscape
	// 	// mode you can scroll down to see what you're editing.
	// 	tabbarPlacement: 'bottom'
	// }
})

export class MyApp {
	@ViewChild(Nav) nav: Nav;
  _rootPage: any = WelcomePage;
	_message: string = "";
	_filter$: Observable<IFilterState> = null;
	_app$: Observable<IAppState> = null;
	_appState: IAppState = null;
	_currFilters: IFilterState = null;

  constructor(
		private _app: App, 
		private _platform: Platform,
		private _store: Store<IAppState>,
		private _appActions: AppActions,
		private _filterActions: FilterActions,
		private _timeServer: TimeServer,
		private _filterService: FilterService,
		private _fillUpService: FillUpService,
		private _settingsDb: SettingDb,
		private _fillsDb: FillUpDb,
		private _carsDb: CarDb,
		private _carMakerDb: CarMakerDb,
		private _mpgStatDb: MpgStatDb
	) {
		this._app$ = <Observable<IAppState>> _store.select("appState");
		this._filter$ = <Observable<IFilterState>> _store.select("filterState");

		this._app$.subscribe((ns: IAppState) => this._appState = ns);
		this._filter$.subscribe((fs: IFilterState) => {
			if (!_.isNull(fs)) {
				this._currFilters = fs
			}
		});	
		

		this.initializeApp();

// run();		

  } // constructor


  initializeApp() {
		// The platform is now ready. Note: if this callback fails to fire, follow
		// the Troubleshooting guide for a number of possible solutions:
		//
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		//
		// First, let's hide the keyboard accessory bar (only works natively) since
		// that's a better default:
		//
		// Keyboard.setAccessoryBarVisible(false);
		//
		// For example, we might change the StatusBar color. This one below is
		// good for dark backgrounds and light text:
		// StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
		
		// this._store.dispatch(
		// 	this._appActions.ShowMessage("Loading ....")
		// );
		
		// this.primeDatabase();

		this.primeDatabase()
			.then(() => this.initialiseAppState() )
			.catch((err: any) => console.error(err))
		;
		

		// this._store.dispatch(
		// 	this._appActions.HideMessage()
		// );

  } // initializeApp


	private initialiseAppState(): void {
		// let currYear: number = null;
		// let currSettings: Settings = null;
		// let years: Array<number> = null;
		// let selectedYear: number = null;

		// currYear = this._timeServer.getCurrentTime().getFullYear();
		// currSettings = this._settingsDb.loadSettings();
		// // Fill in the platform specific stuff for the settings
		// currSettings.platforms = this._platform.platforms();
		// currSettings.isWeb = this._platform.is("mobileweb");
		
		// years = this._fillsDb.getYears();

		// // show the latest data on start-up
		// if (!currSettings.filtersActive && ditto.any(years)) {
		// 	selectedYear = ditto.last(years);
		// }


		// let cars: Array<Car> = this._carsDb.getAllCars();

		// this._store.dispatch({
		// 	type: ACTIONS.INITIALISE_APP, 
		// 	payload: {
		// 		// app state
		// 		debug: currSettings.debug,
		// 		appVersion: currSettings.appVersion,
		// 		dbVersion: currSettings.dbVersion,
		// 		years: years,
		// 		cars: cars,
		// 		selectedYear: selectedYear,
		// 		fills: new Array<FillUp>(),
		// 		measurement: currSettings.measurement,
		// 		measurementType: (currSettings.measurement ? "UK" : "US"),
		// 		platforms: currSettings.platforms,
		// 		isWeb: currSettings.isWeb,

		// 		// filtering state
		// 		filtersActive: currSettings.filtersActive,
		// 		filteredYears: currSettings.filteredYears,
		// 		filteredJourneyTypes: currSettings.filteredJourneyTypes,
		// 		filteredMpgAverages: currSettings.filteredMpgAverages,
		// 		filteredCarIds: currSettings.filteredCarIds
		// 	}
		// });

		// // load the filtered or full history view as appropriate
		// this.onFiltersActive(currSettings.filtersActive);

		// this.refreshHistoryView(selectedYear);		

		this.getInitialState()
			.then((initState: any) => {
				console.log(initState);

				this._store.dispatch({
					type: ACTIONS.INITIALISE_APP,
					payload: initState
				});
				
				this.onFiltersActive(initState.filtersActive);
				this.refreshHistoryView(initState.selectedYear);
			})
		;

	} // initialiseAppState

	// TODO: Should return IAppState (IAppState shouldn't have filters, we have the separate filters slice)
	private getInitialState(): Promise<any> {
		let initState: any = {};

		// // We delay populating fills until later on, and emit an action once we know the
		// // appropriate year to show
		// initState.fills = new Array<FillUp>();

		return this._fillUpService.getYears()
			.then((years: Array<number>) => {
				initState.years = years;
				return this._carsDb.getAll();
			})
			.then((cars: Array<Car>) => {
				initState.cars = cars;
				return this._settingsDb.load();
			})
			.then((settings: Settings) => {
				// These don't really belong in settings table
				initState.debug = settings.debug;
				initState.appVersion = settings.appVersion;
				initState.dbVersion = settings.dbVersion;
				initState.isWeb = settings.isWeb;
				initState.platforms = settings.platforms;
				// These don't really belong in settings table

				initState.measurement = settings.measurement;
				initState.measurementType = (settings.measurement ? 'UK' : 'US');
				initState.filtersActive = settings.filtersActive;
				initState.filteredYears = settings.filteredYears;
				initState.filteredJourneyTypes = settings.filteredJourneyTypes;
				initState.filteredMpgAverages = settings.filteredMpgAverages;
				initState.filteredCarIds = settings.filteredCarIds;
				
				let selectedYear: number = this._timeServer.getCurrentTime().getFullYear();
				if (!settings.filtersActive && ditto.any(initState.years)) {
					selectedYear = <number> ditto.last(initState.years);
				}
				initState.selectedYear = selectedYear;

				// return this._fillsDb.getForYear(selectedYear);
				return this._fillUpService.getForYear(selectedYear);
			})
			.then((fills: Array<FillUp>) => {
				initState.fills = fills;
				return initState;
			})
			.catch((err: any) => console.error(err))
		;

	} // getInitialState



	/**  
	 * @description - Loads data from the database that we'll need on first loading the application.
	 */
	//private primeDatabase(): void {
		// this._carsDb.primeTable();
		// this._settingsDb.primeTable();
	//}

	
	private primeDatabase(): Promise<any> {
		// TODO: add a "dbService" that abstracts it all out?
		return this._carsDb.prime()
			.then(() => this._fillsDb.createTable())
			.then(() => this._settingsDb.prime())
			.then(() => this._carMakerDb.prime())
			.then(() => this._mpgStatDb.createTable())
			.catch((err: any) => console.error("primeDatabase::", err))
		;
	}

	private refreshHistoryView(selectedYear: number = null): void {
		let filteredFills: Array<FillUp> = null;

		if (this._currFilters.filtersActive) {
			// filteredFills = this._filterService.getFilteredFills(this._currFilters, this._appState.measurement);
			// this._store.dispatch(
			// 	this._appActions.ShowFilteredView(filteredFills, null)
			// );
			this._filterService.getFilteredFills(this._currFilters, this._appState.measurement)
				.then((filteredFills: Array<FillUp>) => {
					this._store.dispatch(
						this._appActions.ShowFilteredView(filteredFills, null)
					);
					this._filterService.saveFilters(this._currFilters);
				})
			;
			
		} else {
			// if (selectedYear !== null) {
			// 	// Have a year selected, so we'll show that one
			// 	filteredFills = this._filterService.getFillsForYear(selectedYear);
			// } else {
			// 	// No selection, get the best bet (i.e. the latest year we have data for)
			// 	filteredFills = this._filterService.getFillsForBestYear();
			// }

			if (_.isNull(selectedYear))
				selectedYear = 2016;

			this._fillUpService.getForYear(selectedYear)
				.then((filteredFills: Array<FillUp>) => {
					this._store.dispatch(
						this._appActions.ShowYearView(filteredFills, null, selectedYear)
					);
					this._filterService.saveFilters(this._currFilters);
					
				})
			;
			

			// this._filterService.getFillsForYear(selectedYear)
			// 	.then((filteredFills: Array<FillUp>) => {
			// 		this._appActions.ShowYearView(filteredFills, null, selectedYear);
			// 		this._filterService.saveFilters(this._currFilters);
			// 	})
			// ;

			// this._store.dispatch(
			// 	this._appActions.ShowYearView(filteredFills, null, selectedYear) 
			// );

			// if (ditto.any(filteredFills)) {
			// 	selectedYear = ditto.first(filteredFills).when.getFullYear();
			// }

		}		
		
		// this._filterService.saveFilters(this._currFilters);
	
	} // refreshHistoryView


	/**
	 * When filters are toggled "on"" or "off" from the filters menu 
	 */
	private onFiltersActive(filtersOn: boolean): void {
		this._store.dispatch(
			this._filterActions.FiltersActiveUpdate(filtersOn)
		);

		this.refreshHistoryView();

	} // onFiltersActive


	private onFilterChange(filterChangeAction: Action): void {
		// apply the changes to the filters via the store
		// ... subscription in constructor propogates the new filters once resolved
		this._store.dispatch(filterChangeAction);

		this.refreshHistoryView();

	}

} 

const DB_NAME: string = 'frugallon';
const DB_PROVIDER: number = DbProviders.WEB_SQL;
let carDb: CarDb = new CarDb(DB_NAME, DB_PROVIDER);
let carMakerDb: CarMakerDb = new CarMakerDb(DB_NAME, DB_PROVIDER);
let fillUpDb: FillUpDb = new FillUpDb(DB_NAME, DB_PROVIDER);
let settingDb: SettingDb = new SettingDb(DB_NAME, DB_PROVIDER);
let mpgStatDb: MpgStatDb = new MpgStatDb(DB_NAME, DB_PROVIDER);
 
// carDb.enableLogging();
// carMakerDb.enableLogging();
// fillUpDb.enableLogging();
// settingDb.enableLogging();
// mpgStatDb.enableLogging();

ionicBootstrap(
	MyApp, [
		provideForms(),
		provideStore({ 
			appState: appStateReducer, 
			filterState: filterStateReducer 
		}),
		provide(CarDb, { useValue: carDb } ),
		provide(CarMakerDb, { useValue: carMakerDb } ),
		provide(FillUpDb, { useValue: fillUpDb } ),
		provide(SettingDb, { useValue: settingDb } ),
		provide(MpgStatDb, { useValue: mpgStatDb } ),
		// CarsDb, CarMakersDb, FillsDb, SettingsDb, MpgStatsDb,
		//CarDb, CarMakerDb, FillUpsDb, SettingDb, MpgStatDb,
		FillUpService,
		TimeServer, FilterService, FilterActions, AppActions
	], {
		tabbarPlacement: 'bottom'
	}
).catch((err: any) => {
	debugger;
});