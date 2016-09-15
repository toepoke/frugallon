import { Injectable } from "@angular/core";
import { SQLite } from 'ionic-native';
import { BaseDb, TypedDb, DbTypes, DbCmdFailure, DbCmdSuccess } from "../../../core/db2/";
import { Settings } from "../../models/settings";
import * as ditto from "../../../core/helpers/ditto";

@Injectable()
export class SettingDb extends TypedDb<Settings> {

	constructor(
		dbName: string,
		provider: number
	) {
		super(SettingDb.getSchema(), dbName, 'settings', provider);
		// TODO: useWebSql flag needs dep injecting somehow ...
		// TODO: Do we even need the webSql flag?  Doesn't SQLite hide this from us?
	}

	static getSchema(): any {
		// TODO: Once we're finished move out "debug", "appVersion", "platforms", "isWeb"
		//       To some kind of "system" class
		return {
			'id': DbTypes.PRIMARY_KEY,
			'measurement': DbTypes.BOOLEAN,
			'filtersActive': DbTypes.BOOLEAN,
			'filteredYears': DbTypes.JSON,
			'filteredJourneyTypes': DbTypes.JSON,
			'filteredMpgAverages': DbTypes.JSON,
			'filteredCarIds': DbTypes.JSON,
			'debug': DbTypes.BOOLEAN,
			'appVersion': DbTypes.NO_PERSIST,
			'dbVersion': DbTypes.STRING,
			'platforms': DbTypes.NO_PERSIST,
			'isWeb': DbTypes.BOOLEAN
		}
	}

	prime(): Promise<any> {
		return super.createTable();
	}

	load(): Promise<Settings> {
		return super.getByFilter('SELECT * FROM settings ORDER BY id DESC LIMIT 1;', [])
			.then((loaded: Array<Settings>) => {
				if (!ditto.any(loaded) ) {
					// first time use, so make sure we have something to play with
					let s: Settings = Settings.getDefaults();
					return super.save(s);
				} else {
					return ditto.first(loaded);
				}
			})
		;
	}

}