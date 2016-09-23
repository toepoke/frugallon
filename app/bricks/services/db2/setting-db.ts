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
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'measurement': DbTypes.BOOLEAN,
			'dbVersion': DbTypes.STRING
		}
	}

	prime(): Promise<Settings> {
		return super.createTable()
			.then(() => this.load())
			.then((loaded: Settings) => {
				if (loaded == null) {
					// first use, so create some sensible defaults
					let defaults: Settings = Settings.getDefaults();
					return super.save(defaults);
				}

				return loaded;
			})
		;
	}

	load(): Promise<Settings> {
		return super.getByFilter('SELECT * FROM settings ORDER BY id DESC LIMIT 1;', [])
			.then((loaded: Array<Settings>) => {
				if (!ditto.any(loaded) ) {
					return null;
				}
				
				return ditto.first(loaded);
			})
		;
	}

}