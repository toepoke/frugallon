import { eFillUpType, FillUp, MpgStat, Car } from "../models";
import * as ditto from "../../core/helpers/ditto";

export interface IFilterState {
	/** @description - Filters are on or off */
	filtersActive: boolean;	
	
	/** @description - Filter by year (empty => show all) */
	filteredYears: Array<number>;

	/** @description - Filter by motorway, commute, etc (empty => show all) */
	filteredJourneyTypes: Array<eFillUpType>;

	/** @description - Filter by average mpg (-1 = bad, 0 = neutral, 1 = good) (empty => show all) */
	filteredMpgAverages: Array<number>;

	/** @description - Filter by car */
	filteredCarIds: Array<number>;

}


export function applyFilters(fills: Array<FillUp>, filters: IFilterState, activeMeasurement: boolean): Array<FillUp> {
	let filtered: Array<FillUp> = null;
	
	filtered = applyYearFilter(fills, filters.filteredYears);
	filtered = applyJourneyFilter(filtered, filters.filteredJourneyTypes);
	filtered = applyMPGFilter(filtered, filters.filteredMpgAverages, activeMeasurement);
	filtered = applyCarFilter(filtered, filters.filteredCarIds);
	
	return filtered;
}


export function applyCarFilter(fills: Array<FillUp>, carIds: Array<number>): Array<FillUp> {
	let filtered: Array<FillUp> = null;

	filtered = fills.filter((f: FillUp) => {
		return ditto.any(
			carIds.filter((id: number) => id == f.carId)
		)
	})

	return filtered;
}

export function applyYearFilter(fills: Array<FillUp>, years: Array<number>): Array<FillUp> {
	let filtered: Array<FillUp> = null;

	filtered = fills.filter((f: FillUp) => {
		return ditto.any(
			years.filter((year: number) => year == f.when.getFullYear())
		)
	});

	return filtered;
}


export function applyJourneyFilter(fills: Array<FillUp>, journeyTypes: Array<eFillUpType>): Array<FillUp> {
	let filtered: Array<FillUp> = null;

	filtered = fills.filter((f: FillUp) => {
		return ditto.any(
			journeyTypes.filter((jt: eFillUpType) => {
				return jt == f.fillType
			})
		);
	});

	return filtered;
}


export function applyMPGFilter(fills: Array<FillUp>, mpgAverage: Array<number>, measurement: boolean): Array<FillUp> {
	let filtered: Array<FillUp> = null;

	filtered = fills.filter((f: FillUp) => {
		let mpg: number = f.getMpg(measurement);
		let stats: MpgStat = f.getMpgStats(measurement);
		let include: boolean = false;

		mpgAverage.forEach((avg: number) => {
			if (avg < 0 && stats.isUnderAverage(mpg))
				include = true;
			else if (avg == 0 && stats.isAverage(mpg))
				include = true;
			else if (avg > 0 && stats.isAboveAverage(mpg))
				include = true; 
		});
		
		return include;
	});

	return filtered;
}
