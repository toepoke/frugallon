import * as _ from "../../core/helpers/underscore";

/**
 * Models a maker of cars, e.g. "Ford" which has a set of models, e.g. Focus, Mondeo, etc.
 */
export class CarMaker {
	id: number = null;
	
	/**
	 * Type of vehicle, "CAR", "BIKE" or "LORRY" 
	 */
	type: string = "";
	
	/**
	 * Maker, e.g. "Ford"
	 */
	manufacturer: string = "";
	
	/**
	 * Models made by the "manufacturer", e.g. "Orion", "Fiesta", "Focus", etc.
	 */	
	models: Array<string> = null;

	/**
	 * Helper method for adding "CarMaker"s into a [singleton] database.
	 */
	static create(type: string, make: string, modelsCsv: string): CarMaker {
		let m: CarMaker = new CarMaker();
		let tmpModels: Array<string> = modelsCsv.split(",");
		
		m.type = type;
		m.manufacturer = make;
		m.models = new Array<string>();
		
		// The spreadsheet "model" generally includes the "make" as well, so we strip those out
		tmpModels.forEach((modelName: string) => {
			if (modelName.indexOf(m.manufacturer) > -1) {
				modelName = modelName.substr(m.manufacturer.length);
			}
			
			// Remove any random whitespace
			modelName = modelName.trim();
			
			m.models.push(modelName);			
		});
		
		return m;
	} 		
}

