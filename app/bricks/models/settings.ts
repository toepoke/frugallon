import { Injectable, ChangeDetectionStrategy } from "@angular/core";
import { eFillUpType } from "./fill-up";
import { Car } from './car';

@Injectable()
export class Settings {
	/**
	 * Flags the type of MPG measurement being used:
	 *  - true => UK/Metric
	 *  - false => US/Imperial
	 */
	measurement: boolean = true;

	/** Flags whether we're running in debug mode */
	debug: boolean = false;

	/**
	 * Version of the application.
	 */
	appVersion: string = "0.0.1";

	/**
	 * Version of the database.
	 */
	dbVersion: string = "0.0.1";
		
	/**
	 * Derived from Ionic Platform object
	 */
	platforms: Array<string> = new Array<string>();
	
	/**
	 * Flags whether we're on a desktop dev-mode web browser
	 *  - true => dev-mode
	 *  - false => on a device
	 */
	isWeb: boolean = false;

	static getDefaults(): Settings {
		let s = new Settings();
		s.measurement = true/*Metric/UK*/;
		return s;
	}
	
}