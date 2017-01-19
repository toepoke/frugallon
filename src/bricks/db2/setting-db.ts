import { Injectable } from "@angular/core";
import { SQLite } from 'ionic-native';
import { BaseDb, TypedDb, DbTypes, DbCmdFailure, DbCmdSuccess } from "../../core/typed-db/";
import { Settings } from "../models";
import * as ditto from "../../core/helpers/ditto";

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
		return this.getByFilter('SELECT * FROM settings ORDER BY id DESC LIMIT 1;', [])
			.then((loaded: Array<Settings>) => {
				if (!ditto.any(loaded) ) {
					return null;
				}
				
				return ditto.first(loaded);
			})
		;
	}

	public getByFilter(sql: string, args: Array<any>): Promise<Array<Settings>> {
		return super.getByFilter(sql, args)
			.then((srcs: Array<Settings>) => this.toTypedList(srcs))
		;
	}

	protected toTyped(src: Settings): Settings {
		return ditto.updateItem(new Settings(), src);
	}

	protected toTypedList(srcs: Array<Settings>): Array<Settings> {
		let newItems: Array<Settings> = new Array<Settings>();
		srcs.forEach((i: Settings) => {
			newItems.push(this.toTyped(i));
		});
		return newItems;
	}	

}