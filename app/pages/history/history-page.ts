// Vendor imports
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { IONIC_DIRECTIVES, Page, NavController, NavParams, Events, Tabs } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

// Core imports 
import * as _ from "../../core/helpers/underscore";
import * as ditto from "../../core/helpers/ditto";
import { APP_PIPES } from "../../core/pipes";
import { SegmentList } from "../../core/components";
import { TimeServer } from "../../core/services";

// Application imports
import { ORCHESTRATOR_STRATEGY } from "../../strategy";
import { FillUp, Car } from "../../bricks/models";
import { IAppState, IFilterState, FilterActions, AppActions } from "../../bricks/stores";
import { FillUpDb } from "../../bricks/services/db2";
import { FillUpService } from '../../bricks/services';
import { AppHeaderIon, FillListIon } from "../../bricks/components";
import { FilterService } from "../../bricks/services";

// Page imports
import { TabsPage, ePages, FillUpPage, AppNavigation } from "../pages";

@Component({
	changeDetection: ORCHESTRATOR_STRATEGY, 
	directives: [IONIC_DIRECTIVES, AppHeaderIon, FillListIon, SegmentList],
	pipes: [APP_PIPES],
  template: 
`
	<app-header-ion [show-filter-menu]="true"></app-header-ion>

	<ion-content *ngIf="hasFills((_app$|async).fills)" class="container content animated fadeIn medium">

		<!--	
			Note:
			[selectedValue] _has_to_be_a_string_
			in the segment-list.
		-->
		<segment-list *ngIf="!hasFiltersActive(_currFilters)"
			[segments]="(_app$|async)?.years"
			[selected-value]="getSelectedYearAsString( (_app$|async)?.selectedYear )"
			(select)="onChangeYear($event)">
		</segment-list>

		<ion-segment *ngIf="hasFiltersActive(_currFilters)">
			<ion-segment-button (click)="onRemoveFilters()">
				Turn off filters
			</ion-segment-button>
		</ion-segment>

		<fill-list-ion 
			[history]="(_app$|async)?.fills"
			[show-fills]="(_app$|async)?.showFills"
			[measurement]="(_app$|async)?.measurement"
			(on-toggle)="onItemToggle($event)">
		</fill-list-ion>

	</ion-content>

	<ion-content class="content" *ngIf="!hasFills((_app$|async).fills)" class="animated fadeIn medium">
		<ion-card *ngIf="!hasFiltersActive(_currFilters)">
			<ion-card-header>
				No History
			</ion-card-header>
			<ion-card-content>
				<p>
					You haven't recorded any fills up yet.
				</p>
				<div text-right style="padding-top: 10rem">
					<button secondary text-right (click)="gotoFillUp()">Fill Up</button>
				</div>
			</ion-card-content>
		</ion-card>

		<ion-card *ngIf="hasFiltersActive(_currFilters)">
			<ion-card-header>
				No Results
			</ion-card-header>
			<ion-card-content>
				<p>
					Filter shows no results.
				</p>
				<div text-right style="padding-top: 10rem">
					<button secondary text-right (click)="onRemoveFilters()">Turn off filters</button>
				</div>
			</ion-card-content>
		</ion-card>
	</ion-content>
	
`	
})
export class HistoryPage {
	private _app$: Observable<IAppState> = null;
	private _app: IAppState = null;
	private _filter$: Observable<IFilterState> = null;
	private _currFilters: IFilterState = null;	
	
  constructor(
		private _store: Store<IAppState>,
		private _filterActions: FilterActions,
		private _appActions: AppActions,
		private _nav: NavController,
		private _tabs: Tabs,
		private _fillUpService: FillUpService, 
		private _timeServer: TimeServer,
		private _filterService: FilterService
	) {		
		this._app$ = <Observable<IAppState>> _store.select("appState");
		this._app$.subscribe((data: IAppState) => {
			this._app = data;
		});

		this._filter$ = <Observable<IFilterState>> _store.select("filterState");
		this._filter$.subscribe((data: IFilterState) => {
			this._currFilters = data;
		});

  }


	/**
	 * The SegmentList control gets confused if we use a real number (which "selectedYear" is)
	 * This is because the Ionic codebase does a === compare between the button values (where are always strings)
	 * against the data we're using, which is numeric.  As it's a === compare, the comparison fails.
	 * In essence it compares "2014"===2014 which from our perspective is the same, not from it's. 
	 * See "writeValue" property in "segment.js" in the Ionic codebase.
	 */
	getSelectedYearAsString(year: number): string {
		if (_.isNull(year))
			return null;
		return year.toString();
	}


	/**
	 * Evaluates what year of data should be shown initially.
	 */
	findSelectedYear(years: Array<number>): number {
		let currYear: number = this._timeServer.getCurrentTime().getFullYear();
		let selectedYear: number = null;
		
		// is the current year in our list? (we might not have filled up this year yet)
		selectedYear = years.find((y) => y === currYear);
		
		if (_.isNull(selectedYear)) {
			// haven't got the current year, so use the final year instead
			selectedYear = ditto.last(years);
		}
			
		return selectedYear;
	}
	
	
	/**
	 * Fired when user picks a new year from the segment-list control.
	 * Loads up the history for that year.
	 */
	onChangeYear(selectedItem: string) {
		// this._selectedYear = selectedYear;
		this.showHistoryForYear( Number(selectedItem) );
	}


	/**
	 * Fired when user toggles the showing of the detail of a fill-up 
	 */
	onItemToggle(f: FillUp) {
		this._store.dispatch(
			this._appActions.ToggleHistoryItem(f.id)
		);
	}


	/**
	 * If the current filter shows no results, the user can clear them to get
	 * back to where they were 
	 */
	onRemoveFilters() {
		// let filteredFills: Array<FillUp> = null;
		// let selectedYear: number = null;

		// this._store.dispatch(
		// 	this._filterActions.FiltersActiveUpdate(false)
		// );

		// filteredFills = this._filterService.getFilteredFills(this._currFilters, this._app.measurement);
		// if (ditto.any(filteredFills)) {
		// 	selectedYear = ditto.first(filteredFills).when.getFullYear();
		// }

		// this._store.dispatch(
		// 	this._appActions.ShowYearView(filteredFills, null, selectedYear)
		// );

		this._filterService.getFilteredFills(this._currFilters, this._app.measurement)
			.then((filteredFills: Array<FillUp>) => {
				let selectedYear: number = null;
				if (ditto.any(filteredFills)) {
					selectedYear = ditto.first(filteredFills).when.getFullYear();
				}

				this._store.dispatch(
					this._appActions.ShowYearView(filteredFills, null, selectedYear)
				);
			})
		;

	} // onRemoveFilters 

	
	/** 
	 * @description - Raises an action to show the history for the given year.
	 * @param - forYear - year of history to be shown
	 */
	private showHistoryForYear(forYear: number): void {
		// let cars: Array<Car> = this._app.cars;
		// let fills: Array<FillUp> = this._fillsDb.getFillUps()
		// 	.filter((f:FillUp) => f.when.getFullYear() == forYear)
		// ;

		this._fillUpService.getForYear(forYear)
			.then((fills: Array<FillUp>) => {
				this._store.dispatch(
					this._appActions.ShowYearView(fills, null, forYear)
				);
			})
		;

		// this._store.dispatch(
		// 	this._appActions.ShowYearView(fills, null, forYear)
		// );

	}


	/**
	 * Can't use "_" directly from the template 
	 * - dunno why, just errors about "_" being undefined :-(
	 */
	getPrettyDate(d: Date): string {
		return _.toPrettyDate(d);		
	}


	/**
	 * Flags whether there is ANY fill-up history to show.
	 * Pretty much only shows when you first start the app.
	 */	
	hasFills(fills: Array<FillUp>): boolean {
		if (_.isNull(fills))
			return false;
			
		return ditto.any(fills)
			&& ditto.any(fills)
		;
	}


	/**
	 * Flags whether filtering is on or off. 
	 */
	hasFiltersActive(filters: IFilterState): boolean {
		if (_.isNull(filters)) return false;
		if (_.isNull(filters.filtersActive)) return false;

		return filters.filtersActive;
	}


	/**
	 * Navs to the fill-up wizard
	 */
	gotoFillUp(): void {
		// AppNavigation.toFillUp(this._nav);
		// this._nav.setRoot(TabsPage, {tabIndex: 0});
		
		this._tabs.select(ePages.FillUp);
	}

}
