import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Action } from '@ngrx/store';
import { Nav } from 'ionic-angular';

import { IFilterState, FilterActions } from './../../stores';
import { Car, FillUp, eFillUpType } from './../../models';
import * as _ from '../../../core/helpers/underscore';

@Component({
	selector: 'filter-menu-ion',
	styles: [
`
	.filter-header-title {
		display: inline-block;
		float: left;
		font-weight: bold;
		
		/* Centre the title at the same level as the bottoms */
		margin-top: 1rem;	
	}
	.filter-header-buttons {
		display: inline-block;
		float: right;
	}
	.filter-header-buttons::after {
		clear: both;
	}		
	.disabler {
		opacity: 0.5;
		pointer-events: none;
	}	
`
	],
	templateUrl: 'filter-menu-ion.html'
})

export class FilterMenuIon {
	/**
	 * Links the navigation control to the menu and vice versa
	 * Required so the events to open/close the menu will work.
	 */
	@Input() content: Nav;
	@Input("years") years: Array<number>;
	@Input("cars") cars: Array<Car>;
	@Input("filters") filters: IFilterState;

	@Output("on-change-filter") onChangeFilter: EventEmitter<Action> = new EventEmitter<Action>();


	private _fillTypes: Array<eFillUpType> = null;

	private _mpgOperators: Array<number> = new Array<number>(-1, 0, +1);
	
	constructor(
		private _filterActions: FilterActions
	) {
		this._fillTypes = FillUp.getFillTypes();
	}

/**** Year filters actions *****/

	protected onSelectYear(yearToToggle: number): void {
		this.onChangeFilter.emit(
			this._filterActions.ToggleYearFilter(yearToToggle)
		);

	}


	protected onAllYears(): void {
		this.onChangeFilter.emit(
			this._filterActions.ShowAllYears(this.years)
		);
		
	}

	protected onClearYears(): void {
		this.onChangeFilter.emit(
			this._filterActions.ClearAllYears()
		);
		
	}


/**** Car filters actions *****/

	protected onSelectCar(c: Car): void {
		this.onChangeFilter.emit(
			this._filterActions.ToggleCarFilter(c)
		)
	}

	protected onAllCars(): void {
		this.onChangeFilter.emit(
			this._filterActions.ShowAllCars(this.cars)
		)
	}

	protected onClearCars(): void {
		this.onChangeFilter.emit(
			this._filterActions.ClearAllCars()
		)
	}


/**** Journey filters actions *****/

	protected getJourneyTypeDescription(fillType: eFillUpType): string {
		return FillUp.getFillTypeDescription(fillType);
	}	

	protected onSelectJourneyType(ft: eFillUpType): void {
		this.onChangeFilter.emit(
			this._filterActions.ToggleJourneyFilter(ft)
		);
		
	}

	protected onAllJourneys(): void {
		this.onChangeFilter.emit(
			this._filterActions.ShowAllJourneyTypes(this._fillTypes)
		);
				
	}
	protected onClearJourneys(): void {
		this.onChangeFilter.emit(
			this._filterActions.ClearAllJourneyTypes()
		);
		
	}


/**** MPG filters actions *****/

	protected getMpgOperatorDescription(mpgOperator: number): string {
		if (mpgOperator < 0)
			return "Below average";
		else if (mpgOperator > 0)
			return "Above average";
		else
			return "Average (+/-10%)";
	}

	protected onSelectMpgOperator(mpgOperator: number): void {
		this.onChangeFilter.emit(
			this._filterActions.ToggleMpgAverageFilter(mpgOperator)
		);
		
	}

	protected onAllMpgAverages(): void {
		this.onChangeFilter.emit(
			this._filterActions.ShowAllMpgAverages(this._mpgOperators)
		);
		
	}

	protected onClearMpgAverages(): void {
		this.onChangeFilter.emit(
			this._filterActions.ClearAllMpgAverages()
		);

	}


	/**
	 * Flags whether a given filter in a list of filters is active or not.
	 * This is used to display a checkbox next to the relevant filtered value. 
	 */
	protected showFilterItem(items: Array<any>, currItem: any): boolean {
		if (_.isNull(items)) {
			return false;
		}		
		if (_.isNull(currItem)) {
			return items.length == 0;
		}

		let show: boolean = true;
		
		if (items.find((curr: any) => curr == currItem) === undefined) {
			show = false;
		}

		return show;
	}

}