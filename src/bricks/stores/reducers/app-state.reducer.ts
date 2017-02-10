import { ColourSet } from './../../../core/components/colour-picker-ion/colour-set';
// System
import { Action, ActionReducer } from "@ngrx/store";
import * as ditto from "../../../core/helpers/ditto";
import * as _ from "../../../core/helpers/underscore";

// Dependencies
import { IAppState } from "../iapp.state";
import { AppActions } from '../actions/app.actions'
import { VehicleType, ePages } from '../../models';

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
				showFills: new Array<number>(),
				fillTypes: action.payload.fillTypes,
				colours: getDefaultColours(),
				vehicleTypes: VehicleType.getVehicleTypes(),
				currentPage: ePages.FillUp,
				previousPage: null, 
				leftMenuActive: false,
				rightMenuActive: false
			};
		break;

		case AppActions.CHANGE_MEASUREMENT:
			newState = ditto.updateItem(oldState, {
				measurement: action.payload,
				measurementType: (action.payload ? "UK" : "US"),
			});
		break;
		
		case AppActions.SHOW_YEAR_VIEW:
			newState = ditto.updateItem(oldState, {
				// years isn't always changed, so only propagate through if we have new info
				years: (action.payload.years ? action.payload.years : oldState.years),
				fills: action.payload.fills,
				selectedYear: action.payload.selectedYear
			});
		break;

		case AppActions.CAR_ADD:
			newState = ditto.updateItem(oldState, {
				cars: ditto.append(oldState.cars, action.payload.car)
			});
		break;

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
		break;		
			
		case AppActions.CAR_EDIT:
			newState = ditto.updateItem(oldState, {
				editingCar: action.payload
			});
		break;

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
		break;

		case AppActions.PAGE_CHANGE:
			newState = ditto.updateItem(oldState, {
				previousPage: (_.isNull(oldState) ? null : oldState.currentPage),
				currentPage: action.payload.page				
			});
		break;

		case AppActions.POP_PAGE:
			newState = ditto.updateItem(oldState, {
				previousPage: null,
				currentPage: oldState.previousPage
			});
		break;

		case AppActions.TOGGLE_LEFT_MENU:
			newState = ditto.updateItem(oldState, {
				leftMenuActive: !oldState.leftMenuActive
			});
		break;

		case AppActions.TOGGLE_RIGHT_MENU:
			newState = ditto.updateItem(oldState, {
				rightMenuActive: !oldState.rightMenuActive
			});
		break;

		default:
			// no change for the given action
			newState = oldState;
	}

console.log("%c" + action.type, 'background: #222; color: #bada55', action.payload, newState);

	return newState;

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