// System
import { Action, ActionReducer } from "@ngrx/store";
import * as ditto from "../../../core/helpers/ditto";
// import * as _ from "../../../core/helpers/underscore";

// Dependencies
import { IAppState } from "../iapp-state";
import { Car, FillUp } from "../../models";
import { AppActions } from '../actions/app.actions'

export const INITALISE_NGRX: string = "@@ngrx/INIT";
export const INITIALISE_APP: string = "INITIALISE_APP";

// Data Shape Reminder
// ====================
// class AppState {
// 	appVersion: string = "";
//	cars: Array<Car> = new Array<Car>();
// 	dbVersion: string = "";
// 	fills: Array<FillUp> = new Array<FillUp>();
// 	selectedYear: number = null;
//  editingCar: Car = null;
// 	years: Array<number> = new Array<number>();
// }

export const appStateReducer: ActionReducer<IAppState> = (oldState: IAppState, action: Action) => {
	let newState: IAppState = null;

	switch (action.type) {
		case INITALISE_NGRX:
			newState = {
				appVersion: "",
				dbVersion: "",
				years: new Array<number>(),
				cars: new Array<Car>(),
				fills: new Array<FillUp>(),
				selectedYear: 0,
				editingCar: null,
				measurement: false,
				measurementType: "",
				action: action.type,
				showFills: new Array<number>()
			};
		return newState;
			
		case INITIALISE_APP:
			newState = ditto.updateItem(oldState, {
				appVersion: action.payload.appVersion,
				dbVersion: action.payload.dbVersion,
				years: <Array<number>>action.payload.years,
				cars: action.payload.cars,
				selectedYear: action.payload.selectedYear,
				fills: action.payload.fills,
				measurement: action.payload.measurement,
				measurementType: action.payload.measurementType
			});
			return newState;

		case AppActions.CHANGE_MEASUREMENT:
			newState = ditto.updateItem(oldState, {
				measurement: action.payload,
				measurementType: (action.payload ? "UK" : "US"),
			});
			return newState;
		
		case AppActions.SHOW_YEAR_VIEW:
			newState = ditto.updateItem(oldState, {
				// years isn't always changed, so only propagate through if we have new info
				years: (action.payload.years ? action.payload.years : oldState.years),
				fills: action.payload.fills,
				selectedYear: action.payload.selectedYear
			});
			return newState;

		case AppActions.CAR_ADD:
			newState = ditto.updateItem(oldState, {
				cars: ditto.append(oldState.cars, action.payload.car)
			});
			return newState;

		case AppActions.CAR_SAVE:
			newState = ditto.updateItem(oldState, {
				cars: ditto.updateList(oldState.cars, ((c) => c.id == action.payload.car.id), {
					type: action.payload.car.type,
					make: action.payload.car.make,
					model: action.payload.car.model,
					colour: action.payload.car.colour,
					mileage: action.payload.car.mileage
				})
			});			
			return newState;
			
		case AppActions.CAR_EDIT:
			newState = ditto.updateItem(oldState, {
				editingCar: action.payload
			});
			return newState;

		case AppActions.TOGGLE_HISTORY_ITEM:
			let id: number = action.payload;
			
			if (oldState.showFills.find((x: number) => x === id)) {
				// remove
				newState = ditto.updateItem(oldState, {
					showFills: ditto.deleteItems(oldState.showFills, (x: number) => x === id )
				});
			} else {
				// add
				newState = ditto.updateItem(oldState, {
					showFills: ditto.append(oldState.showFills, id)
				});
			}
			return newState;

		default:
			// no change for the given action
			return oldState;
	}

} // appStateReducer


