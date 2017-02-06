import { FillUp } from './../../bricks/models/fill-up';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Tabs } from 'ionic-angular';
import { FilterService, FillUpService } from './../../bricks/services';
import { TimeService } from './../../core/services';
import { AppActions, IAppState, IFilterState } from './../../bricks/stores';
import { ePages } from '../tabs/tabs';
import * as ditto from '../../core/helpers/ditto';
import * as _ from '../../core/helpers/underscore';

@Component({
  selector: 'page-history',
	changeDetection: ChangeDetectionStrategy.OnPush,
  template:
`

	<ion-header>
		<ion-navbar>

			<button ion-button text-left [menuToggle]="menu1">
				<ion-icon name="menu"></ion-icon>
			</button>
			
      <ion-title text-center>
				<product-name-ion></product-name-ion>
      </ion-title>
			
			<ion-buttons end>
				<button ion-button text-right menuToggle="menu2">
					<ion-icon name="funnel"></ion-icon>
				</button>
			</ion-buttons>

		</ion-navbar>
	</ion-header>

	<ion-content *ngIf="hasFills((_app$|async).fills)" class="background container content animated fadeIn medium" padding>

		<!--	
			Note:
			[selectedValue] _has_to_be_a_string_
			in the segment-list.
		-->
		<segment-list-ion *ngIf="!hasFiltersActive(_currFilters)"
			[segments]="(_app$|async)?.years"
			[selected-value]="getSelectedYearAsString( (_app$|async)?.selectedYear )"
			[show-when-single]="false"
			(select)="onChangeYear($event)">
		</segment-list-ion>

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

	<ion-content class="content" *ngIf="!hasFills((_app$|async).fills)" class="background animated fadeIn medium" padding>
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
	private _app$subscription: Subscription = null;
	private _app: IAppState = null;
	private _filters$: Observable<IFilterState> = null;
	private _filters$subscription: Subscription = null;
	private _currFilters: IFilterState = null;

  constructor(
		private _store: Store<IAppState>,
		private _appActions: AppActions,
		private _tabs: Tabs,
		private _fillUpService: FillUpService,
		private _filterService: FilterService,
		private _timeService: TimeService
	) {
		this._app$ = <Observable<IAppState>> _store.select("appState");
		this._app$subscription = this._app$.subscribe((appState: IAppState) => {
			if (_.isPresent(appState)) {
				this._app = appState;
			}
		});

		this._filters$ = <Observable<IFilterState>> _store.select("fitlerState");
		this._filters$subscription = this._filters$.subscribe((filterState: IFilterState) => {
			if (_.isPresent(filterState)) {
				this._currFilters = filterState;
			}
		});
  }

	/**
	 * Ensure subscription is destroyed when view is removed from the DOM
	 * (otherwise => memory leaks!)
	 */
	protected ionViewDidUnload(): void {
		this._app$subscription.unsubscribe();
		this._filters$subscription.unsubscribe();
	}	

	/**
	 * The SegmentList control gets confused if we use a real number (which "selectedYear" is)
	 * This is because the Ionic codebase does a === compare between the button values (where are always strings)
	 * against the data we're using, which is numeric.  As it's a === compare, the comparison fails.
	 * In essence it compares "2014"===2014 which from our perspective is the same, not from it's. 
	 * See "writeValue" property in "segment.js" in the Ionic codebase.
	 */
	protected getSelectedYearAsString(year: number): string {
		if (_.isNull(year))
			return null;
		return year.toString();
	}


	/**
	 * Evaluates what year of data should be shown initially.
	 */
	protected findSelectedYear(years: Array<number>): number {
		let currYear: number = this._timeService.getCurrentTime().getFullYear();
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
	protected onChangeYear(selectedItem: string) {
		// this._selectedYear = selectedYear;
		this.showHistoryForYear( Number(selectedItem) );
	}


	/**
	 * Fired when user toggles the showing of the detail of a fill-up 
	 */
	protected onItemToggle(f: FillUp) {
		this._store.dispatch(
			this._appActions.ToggleHistoryItem(f.id)
		);
	}


	/**
	 * If the current filter shows no results, the user can clear them to get
	 * back to where they were 
	 */
	protected onRemoveFilters() {
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
		this._fillUpService.getForYear(forYear)
			.then((fills: Array<FillUp>) => {
				this._store.dispatch(
					this._appActions.ShowYearView(fills, null, forYear)
				);
			})
		;

	} // showHistoryForYear


	/**
	 * Can't use "_" directly from the template 
	 * - dunno why, just errors about "_" being undefined :-(
	 */
	protected getPrettyDate(d: Date): string {
		return _.toPrettyDate(d);		
	}


	/**
	 * Flags whether there is ANY fill-up history to show.
	 * Pretty much only shows when you first start the app.
	 */	
	protected hasFills(fills: Array<FillUp>): boolean {
		if (_.isNull(fills))
			return false;
			
		return ditto.any(fills)
			&& ditto.any(fills)
		;
	}


	/**
	 * Flags whether filtering is on or off. 
	 */
	protected hasFiltersActive(filters: IFilterState): boolean {
		if (_.isNull(filters)) return false;
		if (_.isNull(filters.filtersActive)) return false;

		return filters.filtersActive;
	}


	/**
	 * Navs to the fill-up wizard
	 */
	gotoFillUp(): void {
		this._tabs.select(ePages.FillUp);
	}

} // history
