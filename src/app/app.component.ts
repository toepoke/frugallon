import { Store, Action } from '@ngrx/store';
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Platform, Nav, MenuController, Toggle } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// Core
import { TimeService } from '../core/services';
import * as _ from '../core/helpers/underscore';

import { IAppState, IFilterState, AppActions, FilterActions } from '../bricks/stores';
import { FilterService, FillUpService, AppService } from '../bricks/services';
import { FillUp } from './../bricks/models';
import { TabsPage, AboutPage, SettingsPage } from '../pages';
// import { CoreIllustrationsPage } from '../pages/_illustrations/core-illustrations';
// import { BricksIllustrationsPage } from '../pages/_illustrations/bricks-illustrations';


@Component({
	templateUrl: 'app.html'
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
	protected _currentAppState: IAppState = null;
	protected _currentFilters: IFilterState = null;

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
		this._app$subscription = this._app$.subscribe((data: IAppState) => {
			if (_.isPresent(data)) {
				this._currentAppState = data;				
			}
		});
    this._filter$ = <Observable<IFilterState>> this._store.select("filterState");
		this._filter$subscription = this._filter$.subscribe((data: IFilterState) => {
			if (_.isPresent(data)) {
				this._currentFilters = data;
			}
		});

    this._appService.primeDb()
      .then(() => console.log("database primed."))
			.then(() => this._appService.getInitialUiState() )
      .then((initState: IAppState) => {
				this._store.dispatch( this._appActions.InitialiseApp(initState) );
      })
			.then(() => this._appService.getInitialFiltersState()) 
			.then((initialFilters: IFilterState) => {
				this._store.dispatch( this._filterActions.InitialiseApp(initialFilters) );
			})
      .catch((err: any) => console.error(err))
    ;
  
	} // initialiseApp


	/**
	 * Ensure subscription is destroyed when view is removed from the DOM
	 * (otherwise => memory leaks!)
	 */
	protected ionViewDidUnload(): void {
		this._app$subscription.unsubscribe();
		this._filter$subscription.unsubscribe();
	}		

	protected toggleLeftMenu(evt: any): void {
		this._store.dispatch(this._appActions.ToggleLeftMenu());
	}

	protected toggleRightMenu(evt: any): void {
		this._store.dispatch(this._appActions.ToggleRightMenu());
	}

	protected openSettings(): void {
		this._menuCtrl.close("menu1");
		this._nav.push(SettingsPage);
	}


	protected openAbout(): void {
		this._menuCtrl.close("menu1");
		this._nav.push(AboutPage);
	}


	protected onFilterChange(filterChangeAction: Action): void {
		this._store.dispatch( filterChangeAction );

		// TODO: Should this be a side effect?
		this.refreshHistoryView();
	}


	/**
	 * Fired when user toggles the filters on or off
	 */
	protected onToggleFilters(evt: Toggle): void {
		let filtersActive: boolean = evt.checked;

		this._store.dispatch(
			this._filterActions.FiltersActiveUpdate(filtersActive)
		);

		// TODO: Should this be a side effect?
		this.refreshHistoryView();

	} // onToggleFilters


	/**
	 * If filters are active => apply latest filters
	 * If filters are not active => show the "selectedYear" or the current year (if "selectedYear" isn't specified)
	 */
	protected refreshHistoryView(selectedYear: number = null): void {
		if (this._currentFilters.filtersActive) {
			this._filterService.getFilteredFills(this._currentFilters, this._currentAppState.measurement)
				.then((filteredFills: Array<FillUp>) => {
					this._store.dispatch(
						this._appActions.ShowFilteredView(filteredFills, null)
					);
					this._filterService.saveFilters(this._currentFilters);
				})
			;
			
		} else {
			if (_.isNull(selectedYear)) {
				selectedYear = this._timeService.getCurrentTime().getFullYear();
			}

			this._fillUpService.getForYear(selectedYear)
				.then((filteredFills: Array<FillUp>) => {
					this._store.dispatch(
						this._appActions.ShowYearView(filteredFills, null, selectedYear)
					);
					this._filterService.saveFilters(this._currentFilters);
					
				})
			;
			
		}		
			
	} // refreshHistoryView	

} // MyApp
