import { IFilterState } from './../stores/ifilter.state';
import { Injectable } from '@angular/core';
import { Car } from './../models/car';
import { Filters, Settings, FillUp } from './../models';
import { IAppState } from './../stores/';
import { TimeService } from './../../core/services';
import { FillUpService } from '../services';

import { CarMakerDb, CarDb, SettingDb, FillUpDb, MpgStatDb, FiltersDb } from '../db2';
import * as ditto from '../../core/helpers/ditto';

@Injectable() 
export class AppService {
	static APP_VERSION: string = "0.0.1";

	constructor(
		protected _carMakerDb: CarMakerDb,
		protected _carDb: CarDb,
		protected _settingDb: SettingDb,
		protected _fillUpDb: FillUpDb,
		protected _mpgStatDb: MpgStatDb,
		protected _filtersDb: FiltersDb,
		protected _fillUpService: FillUpService,
		protected _timeService: TimeService
	) {
 
	}

	public primeDb(): Promise<any> {
		return this._carMakerDb.prime()
			.then(() => this._carDb.prime())			
			.then(() => this._settingDb.prime())
			.then(() => this._fillUpDb.prime())
			.then(() => this._mpgStatDb.prime())
			.then(() => this._filtersDb.prime())
			.catch((err: any) => console.error("primeDb::", err))
		;
	}

	public nukeDb(): Promise<any> {
		return this._carMakerDb.dropTable()
			.then(() => this._carDb.dropTable())
			.then(() => this._settingDb.dropTable())
			.then(() => this._fillUpDb.dropTable())
			.then(() => this._mpgStatDb.dropTable())
			.then(() => this._filtersDb.dropTable())
			.catch((err: any) => console.error("nukeDb::", err))
		;
	}

	public getInitialUiState(): Promise<any> {
		let initState: any = {};

		return this._fillUpService.getYears()
			.then((years: Array<number>) => {
				initState.years = years;
				return this._carDb.getAll();
			})
			.then((cars: Array<Car>) => {
				initState.cars = cars;
				return this._filtersDb.load();
			})
			.then((filters: Filters) => {
				initState.filters = filters;
				return this._settingDb.load();
			})
			.then((settings: Settings) => {
				// These don't really belong in settings table
				initState.appVersion = AppService.APP_VERSION;
				initState.dbVersion = settings.dbVersion;
				initState.measurement = settings.measurement;
				initState.measurementType = (settings.measurement ? 'UK' : 'US');
				
				let selectedYear: number = this._timeService.getCurrentTime().getFullYear();
				if (!initState.filters.filtersActive && ditto.any(initState.years)) {
					selectedYear = <number> ditto.last(initState.years);
				}
				initState.selectedYear = selectedYear;

				return this._fillUpService.getForYear(selectedYear);
			})
			.then((fills: Array<FillUp>) => {
				initState.fills = fills;
				return initState;
			})
			.then((initState: IAppState) => {
				initState.fillTypes = FillUp.getFillTypes();
				return initState;
			})
			.catch((err: any) => console.error(err))
		;

	} // getInitialState	


	public getInitialFiltersState(): Promise<IFilterState> {
		let startingFilterState: IFilterState = null;

		return this._filtersDb.load()
			.then((filters: Filters) => {
				startingFilterState = filters;
				return startingFilterState;
			})
			.catch((err: any) => {
				// TODO:
				console.error(err);
			})
		;			
	} // getInitialFiltersState

}