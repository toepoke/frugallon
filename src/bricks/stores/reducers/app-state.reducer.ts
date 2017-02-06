import { ColourSet } from './../../../core/components/colour-picker-ion/colour-set';
// System
import { Action, ActionReducer } from "@ngrx/store";
import * as ditto from "../../../core/helpers/ditto";
// import * as _ from "../../../core/helpers/underscore";

// Dependencies
import { IAppState } from "../iapp.state";
import { AppActions } from '../actions/app.actions'

export const appStateReducer: ActionReducer<IAppState> = (oldState: IAppState, action: Action) => {
	let newState: IAppState = null;

	switch (action.type) {
		case AppActions.INITIALISE_APP:
			newState = {
				appVersion: action.payload.appVersion,
				dbVersion: action.payload.dbVersion,
				years: <Array<number>>action.payload.years,
				cars: action.payload.cars,
				fills: action.payload.fills,
				selectedYear: action.payload.selectedYear,
				editingCar: action.payload.editingCar,
				measurement: action.payload.measurement,
				measurementType: action.payload.measurementType,
				action: action.payload.action,
				showFills: new Array<number>(),
				fillTypes: action.payload.fillTypes,
				colours: getDefaultColours()
			};
			console.log("INITIALISED: ", newState);
			
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
					backgroundColour: action.payload.car.backgroundColour,
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


function getDefaultColours(): ColourSet {
	let offBlue: string = "#A6AFF7";
	let trans: string = "transparent";
	let cols: ColourSet = new Map<string, string>();

	cols = new Map<string,string>([
		[ "black", trans ],
		[ "white", offBlue ],
		[ "grey", trans ],
		[ "blue", trans ],
		[ "red", trans ],
		[ "darkorange", trans ],
		[ "yellow", offBlue ],
		[ "green", trans ],
		[ "brown", trans ],
		[ "blueviolet", trans ],
		[ "firebrick", trans ],
		[ "hotpink", trans ],
		[ "cadetblue", trans ],
		[ "darkslateblue", trans ],
		[ "crimson", trans ],
		[ "darkgoldenrod", trans ],
		[ "gold", trans ],
		[ "lemonchiffon", offBlue ],
		[ "orangered", trans ],
		[ "sienna", trans ]
	]);		

	return cols;
}