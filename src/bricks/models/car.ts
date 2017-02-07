import * as _ from "../../core/helpers/underscore";

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
	
	/** Colour picked to represent the colour of the car */
	colour: string = "";

	/** Colour to use as a background for this.colour - ensuring white car icon can be seen */
	backgroundColour: string = "";

	/** @description Total mileage of the car when filling up */
	mileage: number = null;
	
	toString(): string {
		return `${this.make} ${this.model}`;
	} 

	static createDefault(): Car {
		let c: Car = new Car();
		c.isDefault = true;
		c.type = "CAR";
		c.make = "My";
		c.model = "Car";
		c.colour = "cadetblue";
		c.backgroundColour = "white";
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
		c.backgroundColour = src.backgroundColour;
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

