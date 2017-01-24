import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Car, FillUp, MpgStats } from "../../models";

/**
 * Set of actions for acting upon the application UI state.
 */
@Injectable()
export class AppActions {

	static CHANGE_MEASUREMENT: string = 'CHANGE_MEASUREMENT';
	public ChangeMeasurement(measurement: boolean): Action {
		return {
			type: AppActions.CHANGE_MEASUREMENT,
			payload: measurement
		}
	}

	static CAR_ADD: string = 'CAR_ADD';
	public CarAdd(car: Car): Action {
		return {
			type: AppActions.CAR_ADD,
			payload: {
				car: car
			}
		}
	}

	static CAR_SAVE: string = 'CAR_SAVE';
	public CarSave(car: Car): Action {
		return {
			type: AppActions.CAR_SAVE,
			payload: {
				car: {
					id: car.id,
					type: car.type, 
					make: car.make,
					model: car.model,
					colour: car.colour,
					mileage: car.mileage
				}
			}
		}
	} // CarSave

	static CAR_EDIT: string = 'CAR_EDIT';
	public CarEdit(car: Car): Action {
		return {
			type: AppActions.CAR_EDIT,
			payload: car
		}

	} // CarEdit

	static TOGGLE_HISTORY_ITEM: string = 'TOGGLE_HISTORY_ITEM';
	public ToggleHistoryItem(carId: number): Action {
		return {
			type: AppActions.TOGGLE_HISTORY_ITEM,
			payload: carId
		}
	}

	static SHOW_YEAR_VIEW: string = 'SHOW_YEAR_VIEW';
	public ShowYearView(fills: Array<FillUp>, years?: Array<number>, selectedYear?: number): Action {
		return {
			type: AppActions.SHOW_YEAR_VIEW,
			payload: {
				filtersActive: false,
				fills: fills,
				years: years,
				selectedYear: selectedYear
			}
		}

	}

	static SHOW_FILTERED_VIEW: string = 'SHOW_FILTERED_VIEW';
	public ShowFilteredView(filteredFills: Array<FillUp>, years: Array<number>): Action {
		return {
			type: AppActions.SHOW_YEAR_VIEW,
			payload: {
				filtersActive: true,
				fills: filteredFills,
				years: years
			}
		}
	}

	static SHOW_MESSAGE: string = 'SHOW_MESSAGE';
	public ShowMessage(msg: string): Action {
		return {
			type: AppActions.SHOW_MESSAGE,
			payload: msg
		}
	}

	static HIDE_MESSAGE: string = 'HIDE_MESSAGE';
	public HideMessage(): Action {
		return {
			type: AppActions.HIDE_MESSAGE
		}
	}



	// Note:
	// The following aren't subject to reducers.  They _could_ be, they just aren't
	// These are probably "side effects" in ngrx v2
	static ADD_FILL_UP: string = 'ADD_FILL_UP';
	public AddFillUp(fillUp: FillUp): Action {
		return {
			type: AppActions.ADD_FILL_UP,
			payload: fillUp
		}
	}

	static ADD_STATS: string = 'ADD_STATS';
	public AddStats(stats: MpgStats): Action {
		return {
			type: AppActions.ADD_STATS,
			payload: {
				stats: stats
			}
		}
	}

	static SAVE_STATS: string = 'SAVE_STATS';
	public SaveStats(stats: MpgStats): Action {
		return {
			type: AppActions.SAVE_STATS,
			payload: {
				stats: stats
			}
		}
	}

} // AppActions


