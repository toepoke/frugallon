import { Injectable } from "@angular/core";
import { eFillUpType } from "./fill-up-type";
import { Car } from './car';

@Injectable()
export class Filters {

	filtersActive: boolean;
	filteredYears: Array<number> = Array<number>();
	filteredJourneyTypes: Array<eFillUpType> = new Array<eFillUpType>();
	filteredMpgAverages: Array<number> = new Array<number>();
	filteredCarIds: Array<number> = new Array<number>();

	static getDefaults(): Filters {
		let f: Filters = new Filters();
		
		f.filtersActive = false;
		f.filteredYears = new Array<number>();
		f.filteredJourneyTypes = new Array<eFillUpType>();
		f.filteredMpgAverages = new Array<number>();
		f.filteredCarIds = new Array<number>();

		return f;
	}

}
