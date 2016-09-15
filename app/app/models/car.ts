import * as _ from "../../core/helpers/underscore";
import { ColourPickerIon, ColourSet } from "../components/colour-picker/colour-picker-ion";

/**
 * Models a car the user wants to record trips against 
 * @remarks: Yes, it's really a Vehicle, but Car is much less typing!
 */
export class Car {
	id: number = null;
	
	/** 
	 * Whether it's the default car _we_ install, or one they've defined 
	 */
	isDefault: boolean = false;
	
	/**
	 * CAR, BIKE or LORRY
	 */
	type: string = "";
	
	/** Ford, Audi, etc. */
	make: string = "";
	
	/** Escort, A4, etc. */
	model: string = "";
	
	/** This is the colour we show in the UI, not the colour of the car! */
	colour: string = "";

	/** @description Total mileage of the car when filling up */
	mileage: number = null;
	
	toString(): string {
		return `${this.make} ${this.model}`;
	} 
	
	/** Gets an appropriate background colour, given the colour of the car */
	backgroundColour(): string {
		return Car.getBackgroundColour(this.colour);
	}
	
	static getIconName(type: string): string {
		switch (type) {
			case "CAR": return "car";
			case "BIKE": return "bicycle";	
			case "LORRY": return "bus";
			default: throw new Error(`Car::getIconName - Unknown vehicle type of "${type}""`);
		}
	}
	
	static getTypeDescription(type: string): string {
		switch (type) {
			case "CAR": return "Car";
			case "BIKE": return "Motorbike";	
			case "LORRY": return "Lorry";
			default: throw new Error(`Car::getTypeDescription - Unknown vehicle type of "${type}""`);
		}		
	}
	
	static getTypes(): Array<string> {
		return new Array<string>(
			"CAR", 
			"BIKE", 
			"LORRY"
		);
	}
	
	// HACK: Sadly static initialisation doesn't seem to work
	private static COLOURS: ColourSet = null;

	/**
	 * Set of colours used by default (can be overriden) 
	 */	
	static getAvailableColours(): ColourSet {
		if (!_.isNull(Car.COLOURS))
			return Car.COLOURS;
			
		let offBlue: string = "#A6AFF7";
		let trans: string = "transparent";
		let cols: ColourSet = new Map<string, string>();

		cols.set( "black", trans );
		cols.set( "white", offBlue );
		cols.set( "grey", trans );
		cols.set( "blue", trans );
		cols.set( "red", trans );
		cols.set( "darkorange", trans );
		cols.set( "yellow", offBlue );
		cols.set( "green", trans );
		cols.set( "brown", trans );
		cols.set( "blueviolet", trans );
		cols.set( "firebrick", trans );
		cols.set( "hotpink", trans );
		cols.set( "cadetblue", trans );
		cols.set( "darkslateblue", trans );
		cols.set( "crimson", trans );
		cols.set( "darkgoldenrod", trans );
		cols.set( "gold", trans );
		cols.set( "lemonchiffon", offBlue );
		cols.set( "orangered", trans );
		cols.set( "sienna", trans );
		
		Car.COLOURS = cols;	
		
		return Car.COLOURS;
	}
	
	static getBackgroundColour(forForegroundColour: string): string {
		let bg: string = "";
		bg = Car.getAvailableColours().get(forForegroundColour);
		return bg;
	}
	
	static createDefault(): Car {
		let c: Car = new Car();
		c.isDefault = true;
		c.type = "CAR";
		c.make = "My";
		c.model = "Car";
		c.colour = "cadetblue";
		c.mileage = 0;
		return c;
	}
	
	static clone(src: Car): Car {
		let c: Car = new Car();
		c.id = Number(src.id);
		c.isDefault = src.isDefault;
		c.type = src.type;
		c.make = src.make;
		c.model = src.model;
		c.colour = src.colour;
		c.mileage = Number(src.mileage);
		return c;
	}

	static fromJson(data: string): Car {
		let json: Car = JSON.parse(data);
		let c: Car = Car.clone(json);
		
		return c;
	}
	
	static fromJsonList(data: string): Array<Car> {
		let jsons: Array<Car> = JSON.parse(data);
		let cars: Array<Car> = new Array<Car>();
		
		if (!_.isNull(jsons)) {
			jsons.forEach((c: Car) => {
				let tmp: Car = Car.fromJson(JSON.stringify(c));
				cars.push(tmp);
			});
		}
		
		return cars;
	}

}

