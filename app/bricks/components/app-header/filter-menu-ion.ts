import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IONIC_DIRECTIVES, Nav } from 'ionic-angular';
import { COMPONENT_STRATEGY } from "../../../strategy";
import { FillUp, eFillUpType, Car } from "../../models";
import { Action } from "@ngrx/store";
import { IFilterState, FilterActions } from "../../../bricks/stores";
import * as ACTIONS from "../../stores/actions/actions";
import * as _ from "../../../core/helpers/underscore";
import * as ditto from "../../../core/helpers/ditto";

@Component({
	selector: "filter-menu-ion",
	changeDetection: COMPONENT_STRATEGY,
	directives: [IONIC_DIRECTIVES],
	styles: [
`
	.disabler {
		opacity: 0.5;
		pointer-events: none;
	}
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
`
	],
	template:
`
		<ion-menu [content]="content" id="rhsMenu" side="right">
			<ion-toolbar>
				<ion-list>
					<ion-item>
						<ion-label>Filtering:</ion-label>
						<ion-toggle [checked]="filtersActive" (ionChange)="onFilterActiveToggle($event._checked)"></ion-toggle>						
					</ion-item>
				</ion-list>
			</ion-toolbar>
			
			<ion-content>
				<div [class.disabler]="!filtersActive">
					<ion-card>
						<ion-card-header>
							<div class="filter-header-title">Years</div>
							<div class="filter-header-buttons">
								<button small light (click)="onAllYears()">All</button>
								<button small light (click)="onClearYears()">Clear</button>
							</div>						
						</ion-card-header>
						<ion-list>
							<ion-item *ngFor="let y of years" (click)="onSelectYear(y)">
								{{y}}
								<ion-icon *ngIf="showFilterItem(filters?.filteredYears, y)" name="checkmark" item-right></ion-icon>
							</ion-item> 
						</ion-list>
					</ion-card>

					<ion-card>
						<ion-card-header>
							<div class="filter-header-title">Cars</div>
							<div class="filter-header-buttons">
								<button small light (click)="onAllCars()">All</button>
								<button small light (click)="onClearCars()">Clear</button>
							</div>						
						</ion-card-header>
						<ion-list>
							<ion-item *ngFor="let c of cars" item-right (click)="onSelectCar(c)">
								<ion-icon class="large" [style.color]="c.colour" [style.backgroundColor]="c.backgroundColour()" name="car" item-left></ion-icon>
								<span>&nbsp;<!-- Removes margin between icon and text --></span>
								<ion-label class="no-left-offset">{{c}}</ion-label>
								<ion-icon *ngIf="showFilterItem(filters?.filteredCarIds, c.id)" name="checkmark" item-right></ion-icon>
							</ion-item>
						</ion-list>
					</ion-card>

					<ion-card>
						<ion-card-header>
							<div class="filter-header-title">Journey Types</div>
							<div class="filter-header-buttons">
								<button small light (click)="onAllJourneys()">All</button>
								<button small light (click)="onClearJourneys()">Clear</button>
							</div>						
						</ion-card-header>
						<ion-list>
							<ion-item *ngFor="let t of _fillTypes" item-right (click)="onSelectJourneyType(t)">
								{{getJourneyTypeDescription(t)}}
								<ion-icon *ngIf="showFilterItem(filters?.filteredJourneyTypes, t)" name="checkmark" item-right></ion-icon>
							</ion-item>
						</ion-list>
					</ion-card>

					<ion-card>
						<ion-card-header>
							<div class="filter-header-title">MPG Averages</div>
							<div class="filter-header-buttons">
								<button small light (click)="onAllMpgAverages()">All</button>
								<button small light (click)="onClearMpgAverages()">Clear</button>
							</div>						
						</ion-card-header>
						<ion-list>
							<ion-item *ngFor="let mo of _mpgOperators" item-right (click)="onSelectMpgOperator(mo)">
								{{getMpgOperatorDescription(mo)}}
								<ion-icon *ngIf="showFilterItem(filters?.filteredMpgAverages, mo)" name="checkmark" item-right></ion-icon>
							</ion-item>
						</ion-list>
					</ion-card>

				</div>
			</ion-content>
		</ion-menu>
`,
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
	@Input("filters-active") filtersActive: boolean;

	@Output("on-toggle-filters") onToggleFilters: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output("on-change-filter") onChangeFilter: EventEmitter<Action> = new EventEmitter<Action>();


	private _fillTypes: Array<eFillUpType> = null;

	private _mpgOperators: Array<number> = new Array<number>(-1, 0, +1);
	
	constructor(
		private _filterActions: FilterActions
	) {
		this._fillTypes = FillUp.getFillTypes();
	}

/**** Year filters actions *****/

	private onSelectYear(yearToToggle: number): void {
		this.onChangeFilter.emit(
			this._filterActions.ToggleYearFilter(yearToToggle)
		);

	}


	private onAllYears(): void {
		this.onChangeFilter.emit(
			this._filterActions.ShowAllYears(this.years)
		);
		
	}

	private onClearYears(): void {
		this.onChangeFilter.emit(
			this._filterActions.ClearAllYears()
		);
		
	}


/**** Car filters actions *****/

	private onSelectCar(c: Car): void {
		this.onChangeFilter.emit(
			this._filterActions.ToggleCarFilter(c)
		)
	}

	private onAllCars(): void {
		this.onChangeFilter.emit(
			this._filterActions.ShowAllCars(this.cars)
		)
	}

	private onClearCars(): void {
		this.onChangeFilter.emit(
			this._filterActions.ClearAllCars()
		)
	}


/**** Journey filters actions *****/

	private getJourneyTypeDescription(fillType: eFillUpType): string {
		return FillUp.getFillTypeDescription(fillType);
	}	

	private onSelectJourneyType(ft: eFillUpType): void {
		this.onChangeFilter.emit(
			this._filterActions.ToggleJourneyFilter(ft)
		);
		
	}

	private onAllJourneys(): void {
		this.onChangeFilter.emit(
			this._filterActions.ShowAllJourneyTypes(this._fillTypes)
		);
				
	}
	private onClearJourneys(): void {
		this.onChangeFilter.emit(
			this._filterActions.ClearAllJourneyTypes()
		);
		
	}


/**** MPG filters actions *****/

	private getMpgOperatorDescription(mpgOperator: number): string {
		if (mpgOperator < 0)
			return "Below average";
		else if (mpgOperator > 0)
			return "Above average";
		else
			return "Average (+/-10%)";
	}

	private onSelectMpgOperator(mpgOperator: number): void {
		this.onChangeFilter.emit(
			this._filterActions.ToggleMpgAverageFilter(mpgOperator)
		);
		
	}

	private onAllMpgAverages(): void {
		this.onChangeFilter.emit(
			this._filterActions.ShowAllMpgAverages(this._mpgOperators)
		);
		
	}

	private onClearMpgAverages(): void {
		this.onChangeFilter.emit(
			this._filterActions.ClearAllMpgAverages()
		);

	}


	/**
	 * Flags whether a given filter in a list of filters is active or not.
	 * This is used to display a checkbox next to the relevant filtered value. 
	 */
	private showFilterItem(items: Array<any>, currItem: any): boolean {
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


	/**
	 * Toggles filtering on/off via the filter menu
	 */
	private onFilterActiveToggle(isChecked: boolean): void {
		this.onToggleFilters.emit(isChecked);
	}

}

