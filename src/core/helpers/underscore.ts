/**
 * Module: underscore
 * Description: Set of helper methods for various tasks
 * Usage: 
 * 	"import * as _ from './underscore';"
 * Source:
 * 	
 */

import * as moment from "moment";
  
/**
 * Set of helper methods
 */

/**
 * Returns true if "o" is null or undefined
 * Returns false otherwise
 */
export function isNull(o: any): boolean {
	return !isPresent(o);
}


/**
 * Returns true if object "o" is not null (or undefined), i.e. there's a proper object there 
 * Returns false otherwise
 */
export function isPresent(o: any): boolean {
	return o !== undefined && o !== null;
}


/**
 * Returns true if "o" is undefined, null or any empty string
 * Returns false otherwise
 */	
export function isNullOrEmpty(o: string): boolean {
	if (isNull(o)) 
		return true;
	if (o === "")
		return true;
		
	return false;
}


/**
 * Returns ture if "n" is consider a number
 * Returns false otherwise
 */
export function isNumeric(n: string): boolean {
	if (isNull(n))
		return false;
	if (n == "")
		return false;

	let convert: any = Number(n);
	return !isNaN(convert);
}


/**
 * Returns true if string is to be considered a decimal.
 */
export function isDecimal(n: string): boolean {
	if (!isNumeric(n))
		return false;

	// yeah, not really internationally compaible, but hey ho!
	return n.indexOf('.') > -1;
}
	

/**
 * Returns a random number between "lower" and "upper" (if defined)
 */	
export function getRandom(lower: number, upper: number = 20000) {
	// Thanks SO!
	// http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript

	return Math.floor(Math.random()*(upper-lower+1)+lower);
}


/**
 * Returns a date object formatted in a pretty way.
 */
export function toPrettyDate(d: Date): string {
	let s: string = "";
	
	s = moment(d).format("ddd Do MMM, YYYY");
	
	return s;
}


/**
 * Calculates a running average (rather than use _all_ data), you just use previous average you 
 * had, the new sample and the total samples.  
 * So for our purposes we'd have something like "getAverage(stats.averageMpg, fillUp.getMpg(), stats.totalTrips)"
 * @remarks:
 *  - formula = New average = old average * (n-1)/n + new value /n
 *  - from SO - http://stackoverflow.com/questions/12636613/how-to-calculate-moving-average-without-keeping-the-count-and-data-total  
 */
export function getAverage(prevAge: number, nextSample: number, totalSamples: number): number {
	let newAvg: number = 0;
	
	// 1 as we only ever add one at a time
	newAvg = prevAge * (totalSamples - 1) / totalSamples + nextSample / totalSamples;
	
	return newAvg;
}


/**
 * Returns @fromString with spaces, carriage returns, line feeds and tabs from the given string.
 */
export function removeWhitespace(fromString: string): string {
	// garbage in => garbage out
	if (fromString === null) return null;
	if (fromString === undefined) return undefined;
	if (fromString === "") return "";
	
	return fromString
		.replace(/ /g, "")
		.replace(/\t/g, "")
		.replace(/\r/g, "")
		.replace(/\n/g, "")
	;		
}

/**
 * Convenience function to convert pence to pounds
 */
export function toPounds(pence: number): number {
	if (isNull(pence))
		return 0;
	if (pence === 0)
		return 0;

	let pounds: number = (pence / 100);

	return pounds;
}
