import { Injectable } from "@angular/core";
import { TypedDb, DbTypes } from "../../core/typed-db/";
import { MpgStat } from "../models";
import * as ditto from "../../core/helpers/ditto";

@Injectable()
export class MpgStatDb extends TypedDb<MpgStat> {
	static TABLE_NAME: string = 'mpg_stats';

	constructor(
		dbName: string,
		provider: number
	) {
		super(MpgStatDb.getSchema(), dbName, MpgStatDb.TABLE_NAME, provider);
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'carId': DbTypes.FOREIGN_KEY_ID,
			'min': DbTypes.DECIMAL,
			'avg': DbTypes.DECIMAL,
			'lastAvg': DbTypes.DECIMAL,
			'max': DbTypes.DECIMAL,
			'totalSamples': DbTypes.INTEGER,
			'type': DbTypes.BOOLEAN
		}
	}

	public prime(): Promise<any> {
		return super.createTable();
	}

	public getStatsForCar(forCarId: number): Promise<Array<MpgStat>> {
		let args: Array<number> = [forCarId];

		return this.getByFilter('SELECT * FROM ' + this.tableName + ' WHERE carId = ?', args)
			.then((srcs: Array<MpgStat>) => this.toTypedList(srcs) )
		;
	}

	public getAll(): Promise<Array<MpgStat>> {
		return super.getAll()
			.then((srcs: Array<MpgStat>) => this.toTypedList(srcs))
		;
	}
	public getById(id: number): Promise<MpgStat> {
		return super.getById(id)
			.then((src: MpgStat) => this.toTyped(src))
		;
	}
	public getByFilter(sql: string, args: Array<any>): Promise<Array<MpgStat>> {
		return super.getByFilter(sql, args)
			.then((srcs: Array<MpgStat>) => this.toTypedList(srcs))
		;
	}

	protected toTyped(src: MpgStat): MpgStat {
		return ditto.updateItem(new MpgStat(true), src);
	}

	protected toTypedList(srcs: Array<MpgStat>): Array<MpgStat> {
		let newItems: Array<MpgStat> = new Array<MpgStat>();
		srcs.forEach((p: MpgStat) => {
			newItems.push(this.toTyped(p));
		});
		return newItems;
	}	
	
}