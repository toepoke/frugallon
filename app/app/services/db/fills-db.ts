import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "../../stores/iapp-state";
import * as ACTIONS from "../../stores/actions/actions";
import * as _ from "../../../core/helpers/underscore";
import * as ditto from "../../../core/helpers/ditto";
import { BaseDb } from "./base-db";
import { CarsDb } from "./car-db";
import { MpgStatsDb } from "./mpg-stats-db";
import { FillUp, Car, MpgStats, MpgStat } from "../../models";
import { AppActions } from '../../stores';

@Injectable()
export class FillsDb extends BaseDb {
	static LS_KEY_FILL_UPS = "fill-ups";
	static LS_KEY_YEARS = "years";
	static LS_KEY_NEXT_FILL_UP_ID = "fill-ups-next-id";

	constructor(
		appStore: Store<IAppState>, 
		protected _carsDb: CarsDb, 
		protected _mpgStatsDb: MpgStatsDb,
		protected _appActions: AppActions
	) {
		super(appStore);
	}


	/**
	 * @description - Gets the list of years we have trips recorded for
	 */	
	getYears(): Array<number> {
		let years: Array<number> = null;
		let json: string = "";
		
		json = this.ls.getItem(FillsDb.LS_KEY_YEARS);
		years = JSON.parse(json);
		
		if (!years) {
			years = new Array<number>();
		}
		
		return years;
	}
	
	
	/**
	 * @description - Gets ALL the fill-ups up from the database.  Callee should filter as appropriate.
	 */
	getFillUps(): Array<FillUp> {
		let key: string = FillsDb.LS_KEY_FILL_UPS;
		let json: string = this.ls.getItem(key);
		let fills: Array<FillUp> = null;
		
		// JSON doesn't return a "real" fillUp object, so we have to convert it to get the methods back
		fills = FillUp.fromJsonList(json);
		
		if (!fills) {
			// first time in 
			fills = new Array<FillUp>();
		}
		
		// Honour the FK (probably better ways of doing this)
		fills.forEach((fu: FillUp) => {
			this.resolveCarFk(fu);
			this.resolveCarStats(fu);
		});
		
		fills = FillUp.sortByDate(fills, false/*descending*/);
		
		return fills;
	}
	
	
	/**
	 * @description - Records a fill-up in the database.
	 */
	addFillUp(fu: FillUp): Array<FillUp> {
		if (_.isNull(fu))
			throw new Error("FillsDb::addFillUp - fu cannot be null.");
		if (_.isNull(fu.car))
			throw new Error("FillsDb::addFillUp - fu must have an associated car.");

		// We want to have the FK relationship avaailable for the action
		this.resolveCarFk(fu);
		this.resolveCarStats(fu);
		
		// Set the PK
		fu.id = this.getNextId(FillsDb.LS_KEY_NEXT_FILL_UP_ID);
			
		this._store.dispatch(
			this._appActions.AddFillUp(fu)
		);
		
		let fillUpYear: number = fu.when.getFullYear();
		this.syncYears(fillUpYear);

		let fills: Array<FillUp> = this.getFillUps();
		fills.push(FillUp.clone(fu));
		this.saveFillUps(fillUpYear, fills);
		
		// Recalulate the averages for the car, based on this fill-up
		this.syncStats(fu);
		
		return fills;
	}
	
	
	/**
	 * @description - Saves fills to the database
	 */
	private saveFillUps(year: number, fills: Array<FillUp>): void {
		// we don't want to save the car child object, just it's key
		if (ditto.any(fills)) {
			fills.forEach((fu) => fu.car = null);
		}
		
		let key: string = FillsDb.LS_KEY_FILL_UPS;
		let json: string = JSON.stringify(fills);
		
		this.ls.setItem(key, json);
	}
	

	/**
	 * @description - Saves years to the database
	 */
	private saveYears(years: Array<number>): void {
		let json: string = JSON.stringify(years);
		this.ls.setItem(FillsDb.LS_KEY_YEARS, json);
	}
	

	/**
	 * @description - Finds car associated with a fill-up and sets it's property accordingly.
	 */
	private resolveCarFk(fu: FillUp): void {
		if (_.isNull(fu)) 
			throw new Error("FillsDb::resolveCarFk - FillUp object cannot be null.");
		if (_.isNull(fu.car) && _.isNull(fu.carId))
			throw new Error("FillsDb::resolveCarFk - FillUp object must have a carId FK.");

		if (!_.isNull(fu.car)) {
			// car object already populated, just reflect the FK
			fu.carId = fu.car.id;
		} else {
			let c: Car = this._carsDb.getById(fu.carId);
			if (c === null)
				throw new Error(`FillsDb::resolveCarFk - Could not find car for carId ${fu.carId}`);
				
			// Cool, we've found one
			fu.car = c;
		}
		
	} // resolveCarFk


	/**
	 * @description - Finds stats associated with a fill-up and sets it's property accordingly
	 */
	private resolveCarStats(fu: FillUp): void {
		if (_.isNull(fu)) 
			throw new Error("FillsDb::resolveCarFk - FillUp object cannot be null.");
		if (_.isNull(fu.car) && _.isNull(fu.carId))
			throw new Error("FillsDb::resolveCarFk - FillUp object must have a carId FK.");

		let stats: MpgStats = this._mpgStatsDb.getByCarId(fu.carId);
		if (_.isPresent(stats)) { 
			// Cool, we've found the stats
			fu.metricStats = stats.metricStats;
			fu.imperialStats = stats.imperialStats;
			// If there are no stats, we prob haven't had a fill-up .. stats will be created then
		}
	}
	
	
	/**
	 * @description - Adds given year into the set of years we have recorded.
	 */
	private syncYears(anotherYear: number): boolean {
		let years: Array<number> = this.getYears();

		if (!years.find((x) => x === anotherYear)) {
			// Year not yet recorded, so add it in
			years.push(anotherYear);
			years = years.sort();
			this.saveYears(years);
			// was added
			return true;
		}
		
		// wasn't added
		return false;
	}
	
	
	/**
	 * Updates the database with the min/max/avg figures with the new fill-up data. 
	 */
	private syncStats(fu: FillUp): boolean {
		let stats: MpgStats = this._mpgStatsDb.getByCarId(fu.carId);
		
		if (_.isNull(stats)) {
			// first time in
			stats = new MpgStats();
			stats.carId = fu.carId;
		}
			
		let metric: number = fu.getMetricMpg();
		let imperial: number = fu.getImperialMpg();
		
		this.applyStats(stats.metricStats, true/*UK/Metric*/, metric);
		this.applyStats(stats.imperialStats, false/*US/Imperial*/, imperial);
		
		this._mpgStatsDb.saveStats(stats);
		
		return true;
	}


	/**
	 * Updates the stats model with the lastest fill-up, recalculating
	 * the min/max/average figures as appropriate.   
	 */	
	private applyStats(stats: MpgStat, measurement: boolean, mpg: number): void {
		if (_.isNull(stats)) {
			stats = new MpgStat(measurement);
			// first time in
			stats.min = stats.max = stats.avg = mpg;
			stats.lastAvg = 0;
			return;
		}

		stats.min = Math.min(stats.min, mpg);
		stats.max = Math.max(stats.max, mpg);
		stats.lastAvg = stats.avg;
		stats.totalSamples++;
		stats.avg = _.getAverage(stats.lastAvg, mpg, stats.totalSamples);
	}
	
}