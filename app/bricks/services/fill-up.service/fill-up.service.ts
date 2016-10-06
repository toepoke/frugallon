import { Injectable } from '@angular/core';
import { Store, Action } from "@ngrx/store";
import { IAppState, AppActions } from "../../stores";
import { FillUp, Car, MpgStat } from "../../models";
import { FillUpDb, CarDb, MpgStatDb } from "../db2/";
import { IFilterState } from '../..';
import { BaseDb, TypedDb, DbTypes, DbCmdFailure, DbCmdSuccess } from "../../../core/db2/";
import * as _ from "../../../core/helpers/underscore";
import * as ditto from "../../../core/helpers/ditto";

@Injectable()
export class FillUpService {

	constructor(
		protected _fillDb: FillUpDb,
		protected _carDb: CarDb,
		protected _statsDb: MpgStatDb,
		protected _store: Store<IAppState>,
		protected _appActions: AppActions
	) {
		
	}

	prime(): Promise<Array<any>> {
		let promises: Array<any> = [];

		promises.push( this._carDb.prime() );
		promises.push( this._statsDb.createTable() );
		promises.push( this._fillDb.createTable() );

		return Promise.all(promises);
	}

	destroy(): Promise<Array<any>> {
		let promises: Array<any> = [];

		promises.push( this._carDb.dropTable() );
		promises.push( this._statsDb.dropTable() );
		promises.push( this._fillDb.dropTable() );

		return Promise.all(promises);
	}

	public addFillUp(fu: FillUp): Promise<FillUp> {
		if (_.isNull(fu))
			throw new Error("FillsDb::addFillUp - fu cannot be null.");
		if (_.isNull(fu.car))
			throw new Error("FillsDb::addFillUp - fu must have an associated car.");
		
		// ensure mpg figures are calculated appropriately
		fu.metricMpg = fu.getMetricMpg();
		fu.imperialMpg = fu.getImperialMpg();

		return this.resolveCarFk(fu)
			.then((withCar: FillUp) => 
				this.resolveCarStats(withCar)
			)
			.then((withStats: FillUp) => {
				this.syncStats(withStats);
				return this._statsDb.saveAll([withStats.metricStats, withStats.imperialStats]);
			})
			.then((savedStats: Array<MpgStat>) => {
				return this._fillDb.save(fu)
					.then((saved: FillUp) => {
						this.initiateAction(this._appActions.AddFillUp(saved));
						return saved;
					});
			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;	
	}

	public getAll(): Promise<Array<FillUp>> {
		return this._fillDb.getAll()
			.then((fills: Array<FillUp>) => {
				let promises: Array<any> = [];
				fills.forEach((fill: FillUp) => {
					promises.push( this.resolveFkObjects(fill) );
				});
				return Promise.all(promises);
			})
		;
	}

	public getFiltered(filters: IFilterState, activeMeasurement: boolean): Promise<Array<FillUp>> {
		// TODO: Get MPG filters working again
		return this._fillDb.getFiltered(filters.filteredYears, filters.filteredJourneyTypes, filters.filteredCarIds, activeMeasurement)
			// .then((fills: Array<FillUp>) => {
			// 	return this.applyMPGFilter(fills, filters.filteredMpgAverages, activeMeasurement);
			// })
			.then((fills: Array<FillUp>) => {
				let promises: Array<any> = [];
				fills.forEach((fill: FillUp) => {
					promises.push( this.resolveFkObjects(fill) );
				});
				return Promise.all(promises);
			})
		;
	}

	private applyMPGFilter(fills: Array<FillUp>, mpgAverage: Array<number>, measurement: boolean): Array<FillUp> {
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
	

	public getYears(): Promise<Array<number>> {
		return this._fillDb.getYears();
	}

	public getForYear(forYear: number): Promise<Array<FillUp>> {
		return this._fillDb.getForYear(forYear)
			.then((fills: Array<FillUp>) => {
				let promises: Array<any> = [];
				fills.forEach((fill: FillUp) => {
					promises.push( this.resolveFkObjects(fill) );
				});
				return Promise.all(promises);
			})
		;
	}

	protected resolveFkObjects(f: FillUp): Promise<FillUp> {
		return this.resolveCarFk(f)
			.then((withCar: FillUp) => this.resolveCarStats(f) )
		;
	}

	private syncStats(fu: FillUp): FillUp {
		fu.metricStats = MpgStat.updateStatistics(fu.metricStats, true, fu.getMpg(true));
		fu.imperialStats = MpgStat.updateStatistics(fu.imperialStats, false, fu.getMpg(false));

		return fu;
	}

	private initiateAction(action: Action): void {
		if (_.isNull(this._store)) {
			// probably testing
			return;
		}

		this._store.dispatch(action);
	}

	private resolveCarFk(fu: FillUp): Promise<FillUp> {
		if (_.isNull(fu)) 
			throw new Error("FillsDb::resolveCarFk - FillUp object cannot be null.");
		if (_.isNull(fu.car) && _.isNull(fu.carId))
			throw new Error("FillsDb::resolveCarFk - FillUp object must have a carId FK.");
		
		if (!_.isNull(fu.car)) {
			// car object already populated, just reflect the FK
			fu.carId = fu.car.id;
			return Promise.resolve(fu);
		} else {
			return this._carDb.getById(fu.carId)
				.then((c: Car) => {
					fu.car = c;
					return fu;
				})
			;
		}

	}

	private resolveCarStats(fu: FillUp): Promise<FillUp> {
		if (_.isNull(fu)) 
			throw new Error("FillsDb::resolveCarFk - FillUp object cannot be null.");
		if (_.isNull(fu.car) && _.isNull(fu.carId))
			throw new Error("FillsDb::resolveCarFk - FillUp object must have a carId FK.");

		let carId: number = (_.isNull(fu.car) ? fu.carId : fu.car.id);

		return this._statsDb.getStatsForCar(carId)
			.then((stats: Array<MpgStat>) => {
				if (!ditto.any(stats)) {
					// no stats, so create placeholders
					fu.metricStats = new MpgStat(true);
					fu.imperialStats = new MpgStat(false);
					fu.metricStats.carId = fu.imperialStats.carId = carId;
				} else {
					// populate the FK references
					stats.forEach((stat: MpgStat) => {
						if (stat.type) {
							fu.metricStats = stat;
						} else { 
							fu.imperialStats = stat;
						}
					});

				}
				return Promise.resolve(fu);
			})
		;
	}

}