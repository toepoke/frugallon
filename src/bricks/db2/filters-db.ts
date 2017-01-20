import { Injectable } from "@angular/core";
import { SQLite } from 'ionic-native';
import { BaseDb, TypedDb, DbTypes, DbCmdFailure, DbCmdSuccess } from "../../core/typed-db/";
import { Filters } from "../models/filters";
import * as ditto from "../../core/helpers/ditto";

@Injectable()
export class FiltersDb extends TypedDb<Filters> {

	constructor(
		dbName: string,
		provider: number
	) {
		super(FiltersDb.getSchema(), dbName, 'filters', provider);
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