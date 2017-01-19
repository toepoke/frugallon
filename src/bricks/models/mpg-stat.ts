import * as _ from "../../core/helpers/underscore";

export class MpgStat {
	id: number = null;
	carId: number = null;

	/** @description - Least mpg this vehicle has acheived (99999 forces min to be applied on first use) */
	min: number = 99999;
	
	/** @description - Average mpg this vehicle has acheived */
	avg: number = 0;
	lastAvg: number = 0;
	
	/** @description - Most mpg this vehicle has achieved */
	max: number = 0;
	
	/** @description - Number of fill-ups we've had basically */
	totalSamples: number = 0;
	
	/** @description - true => UK/metric, false => US/Imperial */
	type: boolean = null;


	/**
	 * @description - Constructor 
	 * @param - measurement: true => UK/metric, false => US/Imperial  
	 */
	constructor(measurement: boolean) {
		this.type = measurement;
	}

	/**
	 * @description - Flags whether the provided mpg figure
	 * is below the average for the car, above or the same.
	 * An equal rating has a +/- 10% range otherwise you'd never 
	 * get exactly the same figure.
	 * @returns
	 * 	-1 => under average
	 *   0 => average (+/- 10%)
	 *  +1 => above average
	 */
	getHappiness(mpg: number): number {
		let lowerMidRange: number = this.avg;
		let upperMidRange: number = this.avg;
		let happiness: number = 0;

		// apply the +/- 10%
		lowerMidRange -= (this.avg * 0.1);
		upperMidRange += (this.avg * 0.1);

		if (mpg >= lowerMidRange && mpg <= upperMidRange) {
			happiness = 0;
		} else if (mpg >= upperMidRange) {
			happiness = +1;
		} else { 
			happiness = -1;
		}

		return happiness;
	}

	isUnderAverage(mpg: number): boolean {
		return (this.getHappiness(mpg) < 0);
	}

	isAverage(mpg: number): boolean {
		return (this.getHappiness(mpg) === 0);
	}

	isAboveAverage(mpg: number): boolean {
		return (this.getHappiness(mpg) > 0);
	}
	

	static clone(src: MpgStat): MpgStat {
		if (_.isNull(src))
			return null;

		let ms: MpgStat = new MpgStat(src.type);
		ms.min = src.min;
		ms.avg = src.avg;
		ms.lastAvg = src.lastAvg;
		ms.max = src.max;
		ms.totalSamples = src.totalSamples;
		return ms;
	}

	public static updateStatistics(stat: MpgStat, calculatedMetric: boolean, latestMpgFigure: number): MpgStat {
		if (_.isNull(stat)) {
			stat = new MpgStat(calculatedMetric);
			// first time in
			stat.min = stat.max = stat.avg = latestMpgFigure;
			stat.lastAvg = 0;
			return stat;
		}

		stat.min = Math.min(stat.min, latestMpgFigure);
		stat.max = Math.max(stat.max, latestMpgFigure);
		stat.lastAvg = stat.avg;
		stat.totalSamples++;
		stat.avg = _.getAverage(stat.lastAvg, latestMpgFigure, stat.totalSamples);

		return stat;		
	}
	
}
