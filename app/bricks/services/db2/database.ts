// Vendor imports
import { Injectable } from '@angular/core';

// Application imports
import { CarDb, CarMakerDb, FillUpDb, SettingDb, FiltersDb, MpgStatDb, DbProviders } from './';

@Injectable()
export class AppDatabase {
	constructor(
		public settingsDb: SettingDb,
		public filtersDb: FiltersDb,
		public fillsDb: FillUpDb,
		public carsDb: CarDb,
		public carMakerDb: CarMakerDb,
		public mpgStatDb: MpgStatDb
	) {

	}

	/**  
	 * @description - Loads data from the database that we'll need on first loading the application.
	 */
	public primeDatabase(): Promise<any> {
		// TODO: add a "dbService" that abstracts it all out?
		return this.carsDb.prime()
			.then(() => this.fillsDb.prime())
			.then(() => this.settingsDb.prime())
			.then(() => this.filtersDb.prime())
			.then(() => this.carMakerDb.prime())
			.then(() => this.mpgStatDb.prime())
			.catch((err: any) => console.error("primeDatabase::", err))
		;
	}

	public nukeDatabase(): Promise<any> {
		return this.carsDb.dropTable()
			.then(() => this.fillsDb.dropTable())
			.then(() => this.settingsDb.dropTable())
			.then(() => this.filtersDb.dropTable())
			.then(() => this.carMakerDb.dropTable())
			.then(() => this.mpgStatDb.dropTable())
		;
	}	

}