// System
import { Action, ActionReducer } from "@ngrx/store";
import * as ditto from "../../../core/helpers/ditto";
import * as _ from "../../../core/helpers/underscore";

// Dependencies
import { IFilterState } from "../ifilter.state";
import { eFillUpType } from "../../models";
import { FilterActions } from '../actions/filter.actions';
import { AppActions } from '../actions/app.actions';

export const filterStateReducer: ActionReducer<IFilterState> = (oldState: IFilterState, action: Action) => {
	let newState: IFilterState = null;

	switch (action.type) {
		case FilterActions.INITIALISE_APP:
			// payload is the same shape => just take as is
			newState = action.payload;
		break;

		case AppActions.SHOW_YEAR_VIEW:
			newState = ditto.updateItem(oldState, {
				filtersActive: action.payload.filtersActive
			});
		break;

		case FilterActions.FILTERS_ACTIVE_UPDATE:
			newState = ditto.updateItem(oldState, {
				filtersActive: action.payload
			});
		break;


		case FilterActions.TOGGLE_YEAR_FILTER:
			if (_.isNull(action.payload)) {
				// null => no filter (show all)
				newState = ditto.updateItem<IFilterState>(oldState, {
					filteredYears: new Array<number>()
				});
			} else {
				newState = ditto.updateItem<IFilterState>(oldState, {
					filteredYears: arrayToggle(oldState.filteredYears, action.payload)
				});
			}
		break;
		case FilterActions.SHOW_ALL_YEARS:
			// clear existing selections
			newState = ditto.updateItem<IFilterState>(oldState, {
				filteredYears: ditto.replaceAll(action.payload)
			});
		break;
		case FilterActions.CLEAR_ALL_YEARS:
			newState = ditto.updateItem<IFilterState>(oldState, {
				filteredYears: new Array<number>()
			});
		break;


		case FilterActions.TOGGLE_JOURNEY_FILTER:
			if (_.isNull(action.payload)) {
				// null => show all
				newState = ditto.updateItem<IFilterState>(oldState, {
					filteredJourneyTypes: new Array<number>()
				});
			} else {
				newState = ditto.updateItem<IFilterState>(oldState, {
					filteredJourneyTypes: arrayToggle(oldState.filteredJourneyTypes, action.payload)
				});
			}
		break;
		case FilterActions.SHOW_ALL_JOURNEY_TYPES:
			newState = ditto.updateItem<IFilterState>(oldState, {
				filteredJourneyTypes: ditto.replaceAll(action.payload)
			});
		break;
		case FilterActions.CLEAR_ALL_JOURNEY_TYPES:
			newState = ditto.updateItem<IFilterState>(oldState, {
				filteredJourneyTypes: new Array<eFillUpType>()
			});
		break;


		case FilterActions.TOGGLE_MPG_AVERAGE_FILTER:
			if (_.isNull(action.payload)) {
				// null => show all
				newState = ditto.updateItem<IFilterState>(oldState, {
					filteredMpgAverages: new Array<number>()
				});
			} else {
				newState = ditto.updateItem<IFilterState>(oldState, {
					filteredMpgAverages: arrayToggle(oldState.filteredMpgAverages, action.payload)
				});
			}
		break;	
		case FilterActions.SHOW_ALL_MPG_AVERAGES:
			newState = ditto.updateItem<IFilterState>(oldState, {
				filteredMpgAverages: ditto.replaceAll(action.payload)
			});
		break;

		case FilterActions.CLEAR_ALL_MPG_AVERAGES:
			newState = ditto.updateItem<IFilterState>(oldState, {
				filteredMpgAverages: new Array<eFillUpType>()
			});
		break;


		case FilterActions.TOGGLE_CAR_FILTER:
			if (_.isNull(action.payload)) {
				// null => show all 
				newState = ditto.updateItem<IFilterState>(oldState, {
					filteredCarIds: new Array<number>()
				});
			} else {
				newState = ditto.updateItem<IFilterState>(oldState, {
					filteredCarIds: arrayToggle(oldState.filteredCarIds, action.payload)
				});
			}
		break;


		case FilterActions.SHOW_ALL_CARS:
			newState = ditto.updateItem<IFilterState>(oldState, {
				filteredCarIds: ditto.replaceAll(action.payload)
			});
		break;

		case FilterActions.CLEAR_ALL_CARS:
			newState = ditto.updateItem<IFilterState>(oldState, {
				filteredCarIds: new Array<number>()
			});
		break;

		default:
			// no change
			newState = oldState;
	}

	return newState;

} // filterStateReducer


// Returns true if added
// Returns false if removed
function arrayToggle<T>(harry: Array<T>, value: T): Array<T> {
	let found: T = null;
	let results: Array<T>;

	found = harry.find((v) => v === value);
	if (found === undefined) {
		// add
		results = ditto.append(harry, value);
	} else {
		// remove
		results = ditto.deleteItems(harry, (x: any) => x === value);
	}

	return results;
} // arrayToggle
