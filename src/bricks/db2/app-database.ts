import { Injectable } from '@angular/core';

import { CarMakerDb } from './car-maker-db';
import { CarDb } from './car-db';
import { SettingDb } from './setting-db';

@Injectable() 
export class AppDatabase {
	constructor(
		private _carMakerDb: CarMakerDb,
		private _carDb: CarDb,
		private _settingDb: SettingDb
	) {

	}

	public primeDb(): Promise<any> {
		return this._carMakerDb.prime()
			.then(() => this._carDb.prime())			
			.then(() => this._settingDb.prime())
			.catch((err: any) => console.error("primeDb::", err))
		;
	}

	public nukeDb(): Promise<any> {
		return this._carMakerDb.dropTable()
			.then(() => this._carDb.dropTable())
			.then(() => this._settingDb.dropTable())
			.catch((err: any) => console.error("nukeDb::", err))
		;
	}


}