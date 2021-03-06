import { SQLite } from '@ionic-native/sqlite';
import { Injectable } from "@angular/core";
import { TypedDb, DbTypes } from "../../core/typed-db/";
import { DbConfig } from './';
import { Car } from "../models";
import * as ditto from "../../core/helpers/ditto";
import * as _ from "../../core/helpers/underscore";

@Injectable() 
export class CarDb extends TypedDb<Car> {
	static TABLE_NAME: string = 'cars';

	constructor(
		db: SQLite,
		dbConfig: DbConfig
	) {
		super(db, CarDb.getSchema(), dbConfig.dbName, CarDb.TABLE_NAME, <number> dbConfig.dbProvider);
		if (dbConfig.isLogging) {
			super.enableLogging();
		}
	}

	/** 
	 * Defines the schema used by a Car model.
	 */
	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'isDefault': DbTypes.BOOLEAN,
			'type': DbTypes.STRING,
			'make': DbTypes.STRING,
			'model': DbTypes.STRING,
			'colour': DbTypes.STRING,
			'backgroundColour': DbTypes.STRING,
			'mileage': DbTypes.DECIMAL
		}		
	}

	prime(): Promise<any> {
		return super.createTable()
			.then(() => this.getDefaultCar())
			.then((defaultCar: Car) => {
				if (_.isNull(defaultCar)) {
					defaultCar = Car.createDefault();
					return this.save(defaultCar);
				} else {
					return defaultCar;
				}
			})
		;
	}

	public getDefaultCar(): Promise<Car> {
		let args: Array<any> = [true];

		return this.getByFilter('SELECT * FROM ' + this.tableName + ' WHERE isDefault = ?', args)
			.then((cars: Array<Car>) => {
				if (ditto.any(cars)) {
					return cars[0];
				} else {
					return null;
				}
			})
		;
	}

	public getAll(): Promise<Array<Car>> {
		return super.getAll()
			.then((srcs: Array<Car>) => this.toTypedList(srcs))
		;
	}
	public getById(id: number): Promise<Car> {
		return super.getById(id)
			.then((src: Car) => this.toTyped(src))
		;
	}
	public getByFilter(sql: string, args: Array<any>): Promise<Array<Car>> {
		return super.getByFilter(sql, args)
			.then((srcs: Array<Car>) => this.toTypedList(srcs))
		;
	}

	protected toTyped(src: Car): Car {
		return ditto.updateItem(new Car(), src);
	}

	protected toTypedList(srcs: Array<Car>): Array<Car> {
		let newItems: Array<Car> = new Array<Car>();
		srcs.forEach((p: Car) => {
			newItems.push(this.toTyped(p));
		});
		return newItems;
	}	

}
