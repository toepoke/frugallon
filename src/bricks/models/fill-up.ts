import * as _ from "../../core/helpers/underscore";
import { eFillUpType } from './fill-up-type';
import { Car } from "./car";
import { MpgStat } from "./mpg-stat";

export class FillUp {
	/** @description - unique (primary) key */
	id: number = 0;
	
	/** @description - Id of the car being filled up */
	carId: number = null;
	
	/** @description - Model of "carId" */
	car: Car = null;

	/** @description - Describes the type of trips that took place resulting in the fill-up */
	fillType: eFillUpType = null;

	/** @description - Stats model of "carId" */
	metricStats: MpgStat = null;
	imperialStats: MpgStat = null;

	/** @description - MPG (UK) achieved in this trip */
	metricMpg: number = null;

	/** @description - MPG (US) achieved in this trip */
	imperialMpg: number = null;

	/** @description Number of miles travelled in this trip */
	miles: number = null;
	
	/** @description Number of litres filled in this trip */
	litres: number = null;
	
	/** @description Price (per litre) paid (in pounds and pence) */
	price: number = null;
	
	/** @description Date/Time when the fillup took place */
	when: Date = null;
	
	constructor() {
		this.reset();
	}

	/**
	 * Resets the data in a "FillUp" to it's starting point.
	 */
	private reset(): void {
		this.id = null;
		this.carId = null;
		this.car = null;
		this.fillType = null;
		this.miles = null; 
		this.litres = null;
		this.price = null;
		this.when = new Date();
		this.metricMpg = null;
		this.imperialMpg = null;
	}
	
	
	/**
	 * Returns a copy of the given "FillUp" object. 
	 */	
	static clone(f: FillUp) {
		let cln: FillUp = new FillUp();
		cln.id = Number(f.id);
		cln.carId = Number(f.carId);
		cln.car = f.car;
		cln.fillType = f.fillType;
		cln.miles = Number(f.miles);
		cln.litres = Number(f.litres);
		cln.price = Number(f.price);
		cln.when = f.when;
		cln.imperialMpg = f.imperialMpg;
		cln.metricMpg = f.metricMpg;
		return cln;
	}
	

	static getFillTypes(): Array<eFillUpType> {
		return new Array<eFillUpType>(
			eFillUpType.NotSpecified,
			eFillUpType.Commute,
			eFillUpType.Motorway,
			eFillUpType.Mix
		);
	}

	static getFillTypeDescription(forType: eFillUpType): string {
		switch (forType) {
			case null:
			case eFillUpType.NotSpecified: return "Was not logged";
			case eFillUpType.Motorway: return "Motorway";
			case eFillUpType.Commute: return "Commute";
			case eFillUpType.Mix: return "Mixed";
			default:
				throw new Error(`fillUp::getFillTypeDescription - Unknown type ${forType}`);
		}
	}


	/**
	 * Creates a "FillUp" object from a JSON string.
	 * @remarks: The JSON.parse method only returns the data, it doesn't associate 
	 * the methods of the class.
	 */
	static fromJson(data: string): FillUp {
		let json: FillUp = JSON.parse(data);
		let f: FillUp = FillUp.clone(json);
		// json.parse doesn't parse date objects, hence ..
		if (!_.isNull(f.when))
			f.when = new Date(f.when.toString());
		return f;
	}
	
	
	/**
	 * Creates a list of "FillUp" objects from a JSON string.
	 */
	static fromJsonList(data: string): Array<FillUp> {
		let jsons: Array<FillUp> = JSON.parse(data);
		let fills: Array<FillUp> = new Array<FillUp>();
		
		if (!_.isNull(jsons)) {		
			jsons.forEach((f: FillUp) => {
				let tmp: FillUp = FillUp.fromJson(JSON.stringify(f));
				fills.push(tmp);
			});
		}
		
		return fills;
	}


	/**
	 * Sorts an array of "FillUp" objects by the "when" field.
	 * @param: ascending - true gives ascending sort, false gives descending. 
	 */	
	static sortByDate(fills: Array<FillUp>, ascending: boolean = true): Array<FillUp> {
		let ordered: Array<FillUp> = fills.sort((a:FillUp, b:FillUp) => {
			if (a.when === b.when)
				return 0;
			if (ascending) {
				return (a.when < b.when ? -1 : +1);
			} else {
				return (a.when > b.when ? -1 : +1);
			}
		});
		
		return ordered;
	}


	/**
	 * Gets the appropriate MPG figure for the active measurement;
	 * @param measurementType - true gets metric (UK), false gets imperial (US). 
	 */
	getMpg(measurementType: boolean = true/*UK*/): number {
		this.refreshMpgFigures();

		if (measurementType) {
			return this.metricMpg;
		} else {
			return this.imperialMpg;
		}
	}

	refreshMpgFigures(): void {
		this.metricMpg = this.calculateMpg(true/*UK*/);
		this.imperialMpg = this.calculateMpg(false/*US*/);
	}

	/**
	 * Calculates the Miles Per Gallon (MPG) for the "FillUp"
	 * @param measurementType - true uses metric (UK) calc, false uses imperial (US). 
	 */
	private calculateMpg(measurementType: boolean): number {
		let mpg: number = 0;
		let fraction: number = 0;
		
		if (measurementType) {
			fraction = 0.21997;
		} else {
			fraction = 0.26417;
		}
		
		mpg = (this.miles / (this.litres * fraction) );
		
		return mpg;
	}


	/**
	 * @description - Convenience method to return the metric or 
	 * imperial stats, depending on what type is requested.
	 */
	getMpgStats(forMeasurement: boolean): MpgStat {
		if (forMeasurement) {
			return this.metricStats;
		} else {
			return this.imperialStats;
		} 

	} // getMpgStats
	
	
	/**
	 * Gets MPG as a metric (UK) value.
	 */
	getMetricMpg(): number {
		return this.getMpg(true/*metric*/);
	}
	
	
	/**
	 * Gets MPG as n imperial measurement
	 */
	getImperialMpg(): number {
		return this.getMpg(false/*imperial*/);
	}

	
	/**
	 * How much this fill up cost 
	 */
	getTotal(): number {
		if (this.price === null || this.litres === null) {
			return null;
		}
		
		return (this.price * this.litres);
	}

}
