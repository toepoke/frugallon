import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState, AppActions } from "../../stores";
import * as ACTIONS from "../../stores/actions/actions";
import { BaseDb } from "./base-db";
import { Car } from "../../models/car";
import * as _ from "../../../core/helpers/underscore";
import * as ditto from "../../../core/helpers/ditto";

@Injectable()
export class CarsDb extends BaseDb {
	static LS_KEY_CARS = "cars";
	static LS_KEY_CARS_NEXT_ID = "cars-next-id";
	
	constructor(
		protected _store: Store<IAppState>,
		private _appActions: AppActions	
	) {
		super(_store);
	}

	/**
	 * Allocates a default car reference
	 */
	primeTable(): void {
		let cars: Array<Car> = this.getAllCars();
		
		if (ditto.empty(cars)) {
			// first time in, no car,so add a default one
			let defaultCar: Car = Car.createDefault();
			this.addCar(defaultCar);
		}
	}

	getAllCars(): Array<Car> {
		let json: string = this.ls.getItem(CarsDb.LS_KEY_CARS);
		let cars: Array<Car> = null;
		
		cars = Car.fromJsonList(json);
		
		if (!cars) {
			cars = new Array<Car>();
		}
		
		return cars;
	}
	
	getById(carId: number): Car {
		let foundCar: Car = null;
		 
		foundCar = this.getAllCars().find((c) => c.id === carId);
		
		return foundCar;		
	}

	private saveAllCars(cars: Array<Car>): void {
		let json: string = JSON.stringify(cars);
		
		this.ls.setItem(CarsDb.LS_KEY_CARS, json);
	}
	
	saveCar(car: Car): Car {
		let allCars: Array<Car> = this.getAllCars();
		let tmpCars: Array<Car> = null;
		let currCar: Car = null;
		let isNew: boolean = false;

		currCar = allCars.find((c) => c.id === car.id);
		if (_.isNull(currCar)) {
			// new car, just add to list
			isNew = true;
			car.id = this.getNextId(CarsDb.LS_KEY_CARS_NEXT_ID); 
			tmpCars = ditto.append(allCars, car);

		} else {
			// change affected item in the list
			// ... not valid to update "id" or "isDefault"
			tmpCars = ditto.updateList(allCars, ((c) => c.id == car.id), {
				type: car.type,
				make: car.make,
				model: car.model,
				colour: car.colour,
				mileage: car.mileage
			});
			
		} // isNull(currCar)
				
		// and save back 
		this.saveAllCars(tmpCars);
		
		// and return the saved car
		let savedCar: Car = this.getById(car.id);
		
		if (isNew) {
			this._store.dispatch(this._appActions.CarAdd(savedCar));
		} else {
			this._store.dispatch(this._appActions.CarSave(savedCar));
		}
		
		return savedCar;

	} // saveCar
	
	
	addCar(c: Car): Car {
		return this.saveCar(c);	
	}
	
}