import { SQLite } from '@ionic-native/sqlite';
import { Injectable } from "@angular/core";
import { TypedDb, DbTypes } from "../../core/typed-db/";
import { DbConfig } from './';
import { Filters } from "../models/filters";
import * as ditto from "../../core/helpers/ditto";

@Injectable()
export class FiltersDb extends TypedDb<Filters> {
	static TABLE_NAME: string = 'filters';

	constructor(
		db: SQLite,
		dbConfig: DbConfig
	) {
		super(db, FiltersDb.getSchema(), dbConfig.dbName, FiltersDb.TABLE_NAME, <number> dbConfig.dbProvider);
		if (dbConfig.isLogging) {
			super.enableLogging();
		}
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'filtersActive': DbTypes.BOOLEAN,
			'filteredYears': DbTypes.JSON,
			'filteredJourneyTypes': DbTypes.JSON,
			'filteredMpgAverages': DbTypes.JSON,
			'filteredCarIds': DbTypes.JSON,
		}
	}

	prime(): Promise<Filters> {
		return super.createTable()
			.then(() => this.load())
			.then((loaded: Filters) => {
				if (loaded == null) {
					// first use, so create some sensible defaults
					let f: Filters = Filters.getDefaults();
					return super.save(f);
				}

				return loaded;
			})
			.then((f: Filters) => f)
		;
	}

	load(): Promise<Filters> {
		return super.getByFilter('SELECT * FROM filters ORDER BY id DESC LIMIT 1;', [])
			.then((loaded: Array<Filters>) => {
				if (!ditto.any(loaded) ) {
					return null;
				}
				
				return ditto.first(loaded);
			})
		;
	}

	save(f: Filters): Promise<Filters> {
		return super.save(f);
	}

}