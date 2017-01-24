import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Car, FillUp, eFillUpType, MpgStat } from "../../models";
import { IFilterState } from "../ifilter-state";

/**
 * Set of actions for filtering details of fill-ups.
 */
@Injectable()
export class FilterActions {

//	static INITIALISE_NGRX: string = '@@ngrx/INIT';

	static INITIALISE_APP: string = 'INITIALISE_APP';


	// TODO: SHOW_HISTORY

	static FILTERS_ACTIVE_UPDATE: string = 'FILTERS_ACTIVE_UPDATE';
	public FiltersActiveUpdate(filtersOn: boolean): Action {
		return {
			type: FilterActions.FILTERS_ACTIVE_UPDATE,
			payload: filtersOn
		}
	}

	static TOGGLE_YEAR_FILTER: string = 'TOGGLE_YEAR_FILTER';
	public ToggleYearFilter(year: number): Action {
		return {
			type: FilterActions.TOGGLE_YEAR_FILTER,
			payload: year
		}
	}

	static SHOW_ALL_YEARS: string = 'SHOW_ALL_YEARS';
	public ShowAllYears(allYears: Array<number>): Action {
		return {
			type: FilterActions.SHOW_ALL_YEARS,
			payload: allYears
		}
	}

	static CLEAR_ALL_YEARS: string = 'CLEAR_ALL_YEARS';
	public ClearAllYears(): Action {
		return {
			type: FilterActions.CLEAR_ALL_YEARS,
			payload: null
		}
	}	


	static TOGGLE_JOURNEY_FILTER: string = 'TOGGLE_JOURNEY_FILTER';
	public ToggleJourneyFilter(journeyType: eFillUpType): Action {
		return {
			type: FilterActions.TOGGLE_JOURNEY_FILTER,
			payload: journeyType
		}
	}

	static SHOW_ALL_JOURNEY_TYPES: string = 'SHOW_ALL_JOURNEY_TYPES';
	public ShowAllJourneyTypes(allJourneyTypes: Array<eFillUpType>): Action {
		return {
			type: FilterActions.SHOW_ALL_JOURNEY_TYPES,
			payload: allJourneyTypes
		}
	}

	static CLEAR_ALL_JOURNEY_TYPES: string = 'CLEAR_ALL_JOURNEY_TYPES';
	public ClearAllJourneyTypes(): Action {
		return {
			type: FilterActions.CLEAR_ALL_JOURNEY_TYPES,
			payload: null
		}
	}


	static TOGGLE_MPG_AVERAGE_FILTER: string = 'TOGGLE_MPG_AVERAGE_FILTER';
	public ToggleMpgAverageFilter(mpgAverage: number): Action {
		return {
			type: FilterActions.TOGGLE_MPG_AVERAGE_FILTER,
			payload: mpgAverage
		}
	}

	static SHOW_ALL_MPG_AVERAGES: string = 'SHOW_ALL_MPG_AVERAGES';
	public ShowAllMpgAverages(allMpgAverages: Array<number>): Action {
		return {
			type: FilterActions.SHOW_ALL_MPG_AVERAGES,
			payload: allMpgAverages
		}
	}

	static CLEAR_ALL_MPG_AVERAGES: string = 'CLEAR_ALL_MPG_AVERAGES';
	public ClearAllMpgAverages(): Action {
		return {
			type: FilterActions.CLEAR_ALL_MPG_AVERAGES,
			payload: null
		}
	}


	static TOGGLE_CAR_FILTER: string = 'TOGGLE_CAR_FILTER';
	public ToggleCarFilter(car: Car): Action {
		return {
			type: FilterActions.TOGGLE_CAR_FILTER,
			payload: car.id
		}
	}

	static SHOW_ALL_CARS: string = 'SHOW_ALL_CARS';
	public ShowAllCars(cars: Array<Car>): Action {
		return {
			type: FilterActions.SHOW_ALL_CARS,
			payload: cars.map((c:Car) => c.id)
		}
	}

	static CLEAR_ALL_CARS: string = 'CLEAR_ALL_CARS';
	public ClearAllCars(): Action {
		return {
			type: FilterActions.CLEAR_ALL_CARS,
			payload: null
		}
	}


} // FilterActions
