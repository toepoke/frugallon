import { Injectable } from "@angular/core";
import { SQLite } from 'ionic-native';
import { BaseDb, TypedDb, DbTypes, DbCmdFailure, DbCmdSuccess } from "../../../core/db2/";

@Injectable() 
export class YearDb extends TypedDb<number> {
	constructor(
		dbName: string, 
		provider: number 
	) {
		super(YearDb.getSchema(), dbName, 'years', provider);
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'year': DbTypes.INTEGER
		}
	}

	

}