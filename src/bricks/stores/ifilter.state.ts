import { eFillUpType, } from "../models";

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

