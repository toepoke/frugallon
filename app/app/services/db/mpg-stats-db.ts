import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "../../stores/iapp-state";
import * as ACTIONS from "../../stores/actions/actions";
import { BaseDb } from "./base-db";
import { MpgStats } from "../../models/mpg-stat";
import { AppActions } from '../../stores';
import * as _ from "../../../core/helpers/underscore";
import * as ditto from "../../../core/helpers/ditto";

@Injectable()
export class MpgStatsDb extends BaseDb {
	static LS_KEY_MPG_STATS: string = "mpg-stats";
	static LS_KEY_MPG_NEXT_ID: string = "mpg-stats-id";
	
	constructor(
		appStore: Store<IAppState>,
		private _appActions: AppActions
	) {
		super(appStore);
	}
	
	getById(id: number): MpgStats {
		let found: MpgStats = null;
		
		found = this.getAllStats().find((ms) => ms.id === id);
		
		return found;
	}
	
	getByCarId(carId: number): MpgStats {
		let found: MpgStats = null;
		
		found = this.getAllStats().find((ms) => ms.carId === carId);
		
		return found;
	}
	
	saveStats(stats: MpgStats): MpgStats {
		if (stats.carId === -1)
			throw new Error("MpgStatsDb::saveStats - carId is not set.");
			
		let allStats: Array<MpgStats> = this.getAllStats();
		let tmpStats: Array<MpgStats> = null;
		let currStats: MpgStats = null;
		let isNew: boolean = false;
		
		currStats = allStats.find((s) => s.id === stats.id);
		if (_.isNull(currStats)) {
			// new stats, just add to the list
			isNew = true;
			stats.id = this.getNextId(MpgStatsDb.LS_KEY_MPG_NEXT_ID);
			tmpStats = ditto.append(allStats, stats);
			
		} else {
			// change affected item in the list
			tmpStats = ditto.updateList(allStats, ((s) => s.id == stats.id), {
				carId: stats.carId,
				metricStats: ditto.updateItem(stats.metricStats, {
					min: stats.metricStats.min,
					avg: stats.metricStats.avg,
					max: stats.metricStats.max
				}),
				imperialStats: ditto.updateItem(stats.imperialStats, {
					min: stats.imperialStats.min,
					avg: stats.imperialStats.avg,
					max: stats.imperialStats.max
				})
			});
			
		} // isNull(currStats)
		
		// and save back
		this.saveAllStats(tmpStats);
		
		// and return the saved stats (with updated PK if new)
		let saved: MpgStats = this.getById(stats.id);
		
		if (isNew) {
			this._store.dispatch(
				this._appActions.AddStats(saved)
			);
		} else {
			this._store.dispatch(
				this._appActions.SaveStats(saved)
			);
		}
		
		return saved;
		
	} // saveStats
	
	private getAllStats(): Array<MpgStats> {
		let json: string = this.ls.getItem(MpgStatsDb.LS_KEY_MPG_STATS);
		let stats: Array<MpgStats> = null;
		
		stats = MpgStats.fromJsonList(json);
		
		if (!stats) {
			stats = new Array<MpgStats>();
		}
		
		return stats;
	}
	
	private saveAllStats(stats: Array<MpgStats>): void {
		let json: string = JSON.stringify(stats);
		
		this.ls.setItem(MpgStatsDb.LS_KEY_MPG_STATS, json);
	}
	
}
