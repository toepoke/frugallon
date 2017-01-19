import { Injectable } from '@angular/core';

import { CarMakerDb } from './car-maker-db';

@Injectable() 
export class AppDatabase {
	constructor(
		private _carMakerDb: CarMakerDb
	) {

	}

	public primeDb(): Promise<any> {
		return this._carMakerDb.prime();
	}

	public nukeDb(): Promise<any> {
		return this._carMakerDb.dropTable();
	}


}