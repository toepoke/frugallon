import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
//import { FillsDb, SettingsDb } from '../db';
import { SettingDb, FillUpDb, DbCmdFailure } from "../db2";
import { FillUp, Settings } from '../../models';
import { TimeServer } from '../../../core/services';
import { FillUpService } from '../fill-up.service/fill-up.service';
import { IFilterState, applyFilters } from '../../stores/ifilter-state';
import * as ditto from '../../../core/helpers/ditto';
import * as _ from '../../../core/helpers/underscore';
import * as ACTIONS from "../../stores/actions/actions";

@Injectable()
export class FilterService {

	constructor(
		private _store: Store<IFilterState>,
		private _timeServer: TimeServer,
		private _fillUpDb: FillUpDb,
		private _settingDb: SettingDb,
		private _fillUpService: FillUpService
	) {

	}

	public getFilteredFills(filters: IFilterState, activeMeasurement: boolean): Promise<Array<FillUp>> {
		// let fills: Array<FillUp> = null;
		// let filtered: Array<FillUp> = null;

		// fills = this._fillsDb.getFillUps();

		// // TODO: Move "applyFilters"" to here?
		// filtered = applyFilters(fills, filters, activeMeasurement);
		
		// return filtered;

		// return this._fillUpDb.getAll()
		// 	.then((fills: Array<FillUp>) => {
		// 		let filtered: Array<FillUp> = applyFilters(fills, filters, activeMeasurement);

		// 		return filtered;
		// 	})
		// ;

		// TODO: getAll could be improved by apply the filters here!
		return this._fillUpService.getAll()
			.then((fills: Array<FillUp>) => {
				let filtered: Array<FillUp> = applyFilters(fills, filters, activeMeasurement);
				return filtered;
			})
		;
	}

// 	public getFillsForYear(year: number): Promise<Array<FillUp>> {
// 		// let fills: Array<FillUp> = null;
// 		// let filtered: Array<FillUp> = null;

// 		// fills = this._fillsDb.getFillUps();

// 		// filtered = fills.filter((f: FillUp) => f.when.getFullYear() == year);
		
// 		// return filtered;

// //		// return this._fillUpDb.getForYear(year);
// 		// if (!_.isNull(year)) {
// 		// 	return this._fillUpDb.getForYear(year);
// 		// } else {
// 		// 	return this._fillUpDb.getYears()
// 		// 		.then((years: Array<number>) => {
// 		// 			let selectedYear: number = this.establishSelectedYear(years);
// 		// 			return this._fillUpDb.getForYear(selectedYear);
// 		// 		})
// 		// 	;
// 		// }

// 		if (!_.isNull(year)) {
// 			return this._fillUpService.getForYear(year);
// 		} else {
// 			return this._fillUpService.getForYear(this._timeServer.getCurrentTime().getFullYear());

// 			return this._fillUpDb.getYears()
// 				.then((years: Array<number>) => {
// 					let selectedYear: number = this.establishSelectedYear(years);
// 					return this._fillUpService.getForYear(selectedYear);
// 				})
// 				.then((filly: Array<FillUp>) => {
// 					debugger;
// 					console.log(filly);
// 					return Promise.resolve(filly);
// 				})
// 				.catch((err: any) => {
// 					debugger;
// 					console.error(err);
// 				})
// 			;
// 		}

// 	}

	// /**
	//  * For when we don't know what year to show, so we either use the current year, or the latest ...
	//  */
	// public getFillsForBestYear(): Promise<Array<FillUp>> {
	// 	// let filtered: Array<FillUp> = null;
	// 	// let years: Array<number> = null;
	// 	// let selectedYear: number = null;

	// 	// // Get all years we have available
	// 	// years = this._fillsDb.getYears();

	// 	// selectedYear = this.establishSelectedYear(years);

	// 	// filtered = this.getFillsForYear(selectedYear);

	// 	// return filtered;

	// 	return this._fillUpDb.getYears()
	// 		.then((years: Array<number>) => {
	// 			let selectedYear: number = this.establishSelectedYear(years);
	// 			return this._fillUpDb.getForYear(selectedYear);
	// 		})
	// 	;
	// }

	public saveFilters(filters: IFilterState): Promise<Settings> {
		// let s: Settings = this._settingsDb.loadSettings();

		// s.filtersActive = filters.filtersActive;
		// s.filteredYears = filters.filteredYears;
		// s.filteredJourneyTypes = filters.filteredJourneyTypes;
		// s.filteredMpgAverages = filters.filteredMpgAverages;
		// s.filteredCarIds = filters.filteredCarIds;

		// s = this._settingsDb.saveSettings(s);		

		return this._settingDb.load()
			.then((settings: Settings) => {
				settings.filtersActive = filters.filtersActive;
				settings.filteredYears = filters.filteredYears;
				settings.filteredJourneyTypes = filters.filteredJourneyTypes;
				settings.filteredMpgAverages = filters.filteredMpgAverages;
				settings.filteredCarIds = filters.filteredCarIds;

				return this._settingDb.save(settings);				
			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;	
	}

	/**
	 * @description - Finds the most appropriate year of history to show on start up
	 * @param(years) - List of years we currently have stored
	 * @returns - If we have the current year in the history, the current year is returned.
	 *            Otherwise the most recent year of history is returned.
	 */
	private establishSelectedYear(years: Array<number>): number {
		let currYear: number = this._timeServer.getCurrentTime().getFullYear();

		if (ditto.empty(years)) {
			// user hasn't used the app yet, so use this year as a starter
			return currYear;
		}
		
		// cool we have some years recorded, but which should we show
		let selectedYear: number = null;
		
		// Is the current year in our list (we may not have had a fill up yet)
		selectedYear = years.find((y) => y === currYear);
		
		if (_.isNull(selectedYear)) {
			// haven't got the current year, so use the final year instead
			selectedYear = ditto.last(years);
		}

		return selectedYear;		
	} 
	

}