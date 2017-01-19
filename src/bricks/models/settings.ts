import { Injectable, ChangeDetectionStrategy } from "@angular/core";
import { Car } from './car';

@Injectable()
export class Settings {
	/**
	 * Flags the type of MPG measurement being used:
	 *  - true => UK/Metric
	 *  - false => US/Imperial
	 */
	measurement: boolean = true;

	/**
	 * Version of the database.
	 */
	dbVersion: string = "0.0.1";
		
	static getDefaults(): Settings {
		let s = new Settings();
		s.measurement = true/*Metric/UK*/;
		return s;
	}
	
}
