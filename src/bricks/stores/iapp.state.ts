import { FillUp, Car, eFillUpType, VehicleType } from "../models";

export interface IAppState {
	appVersion: string;
	dbVersion: string;

	/** @description - Collection of years we have history for */
	years: Array<number>;
	
	/** @description - Collection of fill-ups we've had */
	fills: Array<FillUp>;

	/** @description - Collection of Fill-up identifiers that should be expanded */
	showFills: Array<number>;
	
	/** @description - Cars the user has access to */
	cars: Array<Car>;
	
	/** @description - Currently selected year to view */
	selectedYear: number;	

	/** @description - Car being edited */
	editingCar: Car;

	/** Possible fill-up types (motorway, commute, etc) */
	fillTypes: Array<eFillUpType>;

	measurement: boolean;
	measurementType: string;

	colours: Map<string, string>;

	/** @description - set of supported types of vehicle */
	vehicleTypes: Array<VehicleType>;

	action: string;
}

