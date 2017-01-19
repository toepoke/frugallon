import { MpgStat } from './mpg-stat';
import * as _ from "../../core/helpers/underscore";

export class MpgStats {
	/** @description - PK */
	id: number = -1;
	
	/** @description - Car we're holding stats for */
	carId: number = -1;

	metricStats: MpgStat = null;
	imperialStats: MpgStat = null;

	constructor() {
		this.metricStats = new MpgStat(true/*UK/Metric*/);
		this.imperialStats = new MpgStat(false/*US/Imperial*/);
	}


	/**
	 * @description - Gets the MPG statistics for the given type 
	 * of measurement.
	 */
	getStats(forMeasurement: boolean): MpgStat {
		if (forMeasurement) {
			// true => UK/metric
			return this.metricStats;
		} else {
			// false => US/Imperial
			return this.imperialStats;
		}
	}


	static clone(src: MpgStats): MpgStats {
		let ms: MpgStats = new MpgStats();

		ms.id = Number(src.id);		
		ms.carId = Number(src.carId);
		if (!_.isNull(src.metricStats)) {
			ms.metricStats = MpgStat.clone(src.metricStats);
		}
		if (!_.isNull(src.imperialStats)) {
			ms.imperialStats = MpgStat.clone(src.imperialStats);
		}
		
		return ms;
	}
	

	static fromJson(data: string): MpgStats {
		let json: MpgStats = JSON.parse(data);
		let stat: MpgStats = MpgStats.clone(json);
		
		return stat; 
	}
	

	static fromJsonList(data: string): Array<MpgStats> {
		let jsons: Array<MpgStats> = JSON.parse(data);
		let stats: Array<MpgStats> = new Array<MpgStats>();
		
		if (!_.isNull(jsons)) {
			jsons.forEach((ms: MpgStats) => {
				let tmp: MpgStats = MpgStats.fromJson(JSON.stringify(ms));
				stats.push(tmp);
			});
		}
		
		return stats;
	}

}
