import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Car, FillUp, MpgStats, ePages, ePagesToString } from "../../models";
import { IAppState } from '../iapp.state';
//@ngrx/store/init
/**
 * Set of actions for acting upon the application UI state.
 */
@Injectable()
export class AppActions {

	static INITIALISE_APP: string = "App::INITIALISE_APP";
	public InitialiseApp(initialState: IAppState): Action {
		return {
			type: AppActions.INITIALISE_APP,
			payload: initialState
		}
	}

	static CHANGE_MEASUREMENT: string = 'App::CHANGE_MEASUREMENT';
	public ChangeMeasurement(measurement: boolean): Action {
		return {
			type: AppActions.CHANGE_MEASUREMENT,
			payload: measurement
		}
	}

	static CAR_ADD: string = 'App::CAR_ADD';
	public CarAdd(car: Car): Action {
		return {
			type: AppActions.CAR_ADD,
			payload: {
				car: car
			}
		}
	}

	static CAR_SAVE: string = 'App::CAR_SAVE';
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
					backgroundColour: car.backgroundColour,
					mileage: car.mileage
				}
			}
		}
	} // CarSave

	static CAR_EDIT: string = 'App::CAR_EDIT';
	public CarEdit(car: Car): Action {
		return {
			type: AppActions.CAR_EDIT,
			payload: car
		}

	} // CarEdit

	static TOGGLE_HISTORY_ITEM: string = 'App::TOGGLE_HISTORY_ITEM';
	public ToggleHistoryItem(carId: number): Action {
		return {
			type: AppActions.TOGGLE_HISTORY_ITEM,
			payload: carId
		}
	}

	static TOGGLE_LEFT_MENU: string = 'App::TOGGLE_LEFT_MENU';
	public ToggleLeftMenu(): Action {
		return {
			type: AppActions.TOGGLE_LEFT_MENU
		}
	}

	static TOGGLE_RIGHT_MENU: string = 'App::TOGGLE_RIGHT_MENU';
	public ToggleRightMenu(): Action {
		return {
			type: AppActions.TOGGLE_RIGHT_MENU
		}
	}

	static SHOW_YEAR_VIEW: string = 'App::SHOW_YEAR_VIEW';
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

	static SHOW_FILTERED_VIEW: string = 'App::SHOW_FILTERED_VIEW';
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

	static SHOW_MESSAGE: string = 'App::SHOW_MESSAGE';
	public ShowMessage(msg: string): Action {
		return {
			type: AppActions.SHOW_MESSAGE,
			payload: msg
		}
	}

	static HIDE_MESSAGE: string = 'App::HIDE_MESSAGE';
	public HideMessage(): Action {
		return {
			type: AppActions.HIDE_MESSAGE
		}
	}



	// Note:
	// The following aren't subject to reducers.  They _could_ be, they just aren't
	// TODO: These are probably "side effects" in ngrx v2
	static ADD_FILL_UP: string = 'App::ADD_FILL_UP';
	public AddFillUp(fillUp: FillUp): Action {
		return {
			type: AppActions.ADD_FILL_UP,
			payload: fillUp
		}
	}

	static ADD_STATS: string = 'App::ADD_STATS';
	public AddStats(stats: MpgStats): Action {
		return {
			type: AppActions.ADD_STATS,
			payload: {
				stats: stats
			}
		}
	}

	static SAVE_STATS: string = 'App::SAVE_STATS';
	public SaveStats(stats: MpgStats): Action {
		return {
			type: AppActions.SAVE_STATS,
			payload: {
				stats: stats
			}
		}
	}

	static PAGE_CHANGE: string = 'App::PAGE_CHANGE';
	public ChangePage(newPage: ePages): Action {
		return {
			type: AppActions.PAGE_CHANGE,
			payload: {
				page: newPage,
				pageName: ePagesToString(newPage)	// for info really
			}
		}
	}

	/**
	 * Used when going back from a dialog page (e.g. About)
	 */
	static POP_PAGE: string = 'App::POP_PAGE';
	public PopPage(): Action {
		return {
			type: AppActions.POP_PAGE
		}
	}

} // AppActions


