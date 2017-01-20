import { Injectable } from '@angular/core';

import { CarMakerDb } from './car-maker-db';
import { CarDb } from './car-db';
import { SettingDb } from './setting-db';
import { FillUpDb } from './fill-up-db';
import { MpgStatDb } from './mpg-stat-db';
import { FiltersDb } from './filters-db';

@Injectable() 
export class AppDatabase {
	constructor(
		private _carMakerDb: CarMakerDb,
		private _carDb: CarDb,
		private _settingDb: SettingDb,
		private _fillUpDb: FillUpDb,
		private _mpgStatDb: MpgStatDb,
		private _filtersDb: FiltersDb
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

}