import { AbstractControl } from '@angular/forms';
import * as _ from "../helpers/underscore";

/**
 * @description Set of useful validators (dunno why half of these aren't part of ag2!)
 */
export class CoreValidators {

	/**
	 * @description: Min number validator.
	 */
	static min = function(min: number): any {
		return function(ctl: AbstractControl) {
			if (_.isNullOrEmpty(ctl.value)) {
				// user hasn't entered anything yet, so it's fine
				return null;
			}

			// OK for now
			let result: any = null;
			
			if (ctl.value < min) {
				result = { 
					"min": { 
						"requiredMin": min, 
						"actualMin": ctl.value
					} 
				};
			}
			
			return result;
		}
	}


	/**
	 * @description: Max number validator.
	 */
	static max = function(max: number): any {
		return function(ctl: AbstractControl) {
			if (_.isNullOrEmpty(ctl.value)) {
				// user hasn't entered anything yet, so it's fine
				return null;
			}
			
			// OK for now
			let result: any = null;
			
			if (ctl.value > max) {
				result = { 
					"min": { 
						"requiredMax": max, 
						"actualMax": ctl.value
					} 
				};
			}
			
			return result;
		}
	}
	
	/**
	 * @description: Max decimals
	 */
	static range = function(min: number, max: number): any {
		return function(ctl: AbstractControl) {
			if (_.isNullOrEmpty(ctl.value)) {
				// user hasn't entered anything yet, so it's fine
				return null;
			}
			
			// OK for now
			let result: any = null;
			
			if (ctl.value < min || ctl.value > max) {
				result = {
					"range": {
						"requiredMin": min,
						"requiredMax": max,
						"actual": ctl.value
					}
				}
			}
			
			return result;
		}
	}

	
	/**
	 * @description: Max decimals
	 */
	static maxDecimals = function(maxDecimalPoints: number = 0, point: string = "."): any {
		return function(ctl: AbstractControl) {
			if (_.isNullOrEmpty(ctl.value)) {
				// user hasn't entered anything yet, so it's fine
				return null;
			}

			// OK for now
			let result: any = null;
			let value: number = ctl.value;
			let valueStr: string = value.toString();
			let denominators: string = "";
			
			let pointPos: number = valueStr.indexOf(point); 
			if (pointPos >= 0) {
				denominators = valueStr.substr(pointPos+1);
			}
			
			if (denominators.length > maxDecimalPoints) {
				result = {
					"maxdecimals": {
						"requiredMax": maxDecimalPoints,
						"actualMax":  denominators.length
					}
				}
			}
			
			return result;
		}
	}
	
}
