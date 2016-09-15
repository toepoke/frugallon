import { Injectable } from "@angular/core";
import { SQLite } from 'ionic-native';
import { BaseDb, TypedDb, DbTypes, DbCmdFailure, DbCmdSuccess } from "../../../core/db2/";
import { FillUp } from "../../models/fill-up";
import * as _ from "../../../core/helpers/underscore";
import * as ditto from "../../../core/helpers/ditto";

@Injectable()
export class FillUpDb extends TypedDb<FillUp> {

	constructor(
		dbName: string,
		provider: number
	) {
		super(FillUpDb.getSchema(), dbName, 'fill_ups', provider);
		// TODO: useWebSql flag needs dep injecting somehow ...
		// TODO: Do we even need the webSql flag?  Doesn't SQLite hide this from us?
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'carId': DbTypes.INTEGER,
			'fillType': DbTypes.INTEGER,
			'metricStats': DbTypes.FOREIGN_KEY_OBJECT,
			'imperialStats': DbTypes.FOREIGN_KEY_OBJECT,
			'miles': DbTypes.DECIMAL,
			'litres': DbTypes.DECIMAL,
			'price': DbTypes.DECIMAL,
			'when': DbTypes.DATE
		}
	}

	getYears(): Promise<Array<number>> {
		return this.queryAsync('SELECT DISTINCT substr([when],1,4) Year FROM ' + this.tableName + ' ORDER BY 1', [])
			.then((success: DbCmdSuccess) => {		
				let years: Array<number> = new Array<number>();
				let year: number = null;

				if (!success && !success.data && !success.data.rows) {
					return Promise.resolve(years);
				}

				// iterate from the bottom up to maintain the ordering
				for (var i=0; i < success.data.rows.length; i++) {
					year = Number(success.data.rows[i]["Year"]);
					years.push(year);
				}

				return Promise.resolve(years);
			})
			.catch((err: DbCmdFailure) => {
				// propagate
				return Promise.resolve(err);
			})
		;
	}

	public getForYear(year: number): Promise<Array<FillUp>> {
		// Note: 
		// As "substr" returns a string we have to convert "year" to a string in the arguments.
		// Otherwise we don't get a match!
		return this.getByFilter('SELECT * FROM ' + this._tableName + ' WHERE substr([when],1,4) = ?', [year.toString()]);
	}

	public getAll(): Promise<Array<FillUp>> {
		return super.getAll()
			.then((srcs: Array<FillUp>) => this.toTypedList(srcs))
		;
	}
	public getById(id: number): Promise<FillUp> {
		return super.getById(id)
			.then((src: FillUp) => this.toTyped(src))
		;
	}
	public getByFilter(sql: string, args: Array<any>): Promise<Array<FillUp>> {
		return super.getByFilter(sql, args)
			.then((srcs: Array<FillUp>) => this.toTypedList(srcs))
		;
	}

	protected toTyped(src: FillUp): FillUp {
		return ditto.updateItem(new FillUp(), src);
	}

	protected toTypedList(srcs: Array<FillUp>): Array<FillUp> {
		let newItems: Array<FillUp> = new Array<FillUp>();
		srcs.forEach((p: FillUp) => {
			newItems.push(this.toTyped(p));
		});
		return newItems;
	}		

}