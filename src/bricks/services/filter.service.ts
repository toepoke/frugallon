import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";

// Core
import { TimeService } from '../../core/services/time.service';
import * as ditto from '../../core/helpers/ditto';
import * as _ from '../../core/helpers/underscore';
import { DbCmdFailure } from '../../core/typed-db';

import { FiltersDb, FillUpDb } from "../db2";
import { FillUp, Filters } from '../models';
import { FillUpService } from './fill-up.service';
import { IFilterState } from '../stores';
 
@Injectable()
export class FilterService {

	constructor(
		private _store: Store<IFilterState>,
		private _timeServer: TimeService,
		private _fillUpDb: FillUpDb,
		private _filtersDb: FiltersDb,
		private _fillUpService: FillUpService
	) {

	}

	public getFilteredFills(filters: IFilterState, activeMeasurement: boolean): Promise<Array<FillUp>> {

		// // TODO: getAll could be improved by apply the filters here!
		// return this._fillUpService.getAll()
		// 	.then((fills: Array<FillUp>) => {
		// 		let filtered: Array<FillUp> = applyFilters(fills, filters, activeMeasurement);
		// 		return filtered;
		// 	})
		// ;

		return this._fillUpService.getFiltered(filters, activeMeasurement);
	}


	public saveFilters(filters: IFilterState): Promise<Filters> {

		return this._filtersDb.load()
			.then((settings: Filters) => {
				settings.filtersActive = filters.filtersActive;
				settings.filteredYears = filters.filteredYears;
				settings.filteredJourneyTypes = filters.filteredJourneyTypes;
				settings.filteredMpgAverages = filters.filteredMpgAverages;
				settings.filteredCarIds = filters.filteredCarIds;
				return this._filtersDb.save(settings);
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