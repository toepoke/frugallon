import { SQLite } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { TypedDb, DbTypes, DbCmdFailure, DbCmdSuccess } from '../../core/typed-db/';
import { DbConfig } from './';
import { FillUp, eFillUpType } from '../models';
import { MpgStatDb } from './mpg-stat-db';
import * as ditto from '../../core/helpers/ditto';

@Injectable()
export class FillUpDb extends TypedDb<FillUp> {
	static TABLE_NAME: string = 'fill_ups';

	constructor(
		db: SQLite,
		dbConfig: DbConfig
	) {
		super(db, FillUpDb.getSchema(), dbConfig.dbName, FillUpDb.TABLE_NAME, <number> dbConfig.dbProvider);
		if (dbConfig.isLogging) {
			super.enableLogging();
		}
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'carId': DbTypes.INTEGER,
			'fillType': DbTypes.INTEGER,
			'metricStats': DbTypes.NO_PERSIST,
			'imperialStats': DbTypes.NO_PERSIST,
			'miles': DbTypes.DECIMAL,
			'litres': DbTypes.DECIMAL,
			'price': DbTypes.DECIMAL,
			'metricMpg': DbTypes.DECIMAL,
			'imperialMpg': DbTypes.DECIMAL,
			'when': DbTypes.DATE
		}
	}

	public prime(): Promise<any> {
		return super.createTable();
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

	/**
	 * yearFilters: Years to show
	 * journeyFilters: Types of journey to show ()
	 * mpgAverages: (-1 = bad, 0 = neutral, 1 = good) (empty => show all)
	 */
	public getFiltered(yearFilters: Array<number>, journeyFilters: Array<eFillUpType>, carFilters: Array<number>, mpgAverages: Array<number>, activeMeasurement: boolean): Promise<Array<FillUp>> {
		let sql: string = '';
		let args: Array<any> = [];
		let showBad: boolean = false, showNeutral: boolean = false, showGood: boolean = false;

		if (ditto.any(mpgAverages)) {
			mpgAverages.forEach((value: number) => {
				if (value < 0) {
					showBad = true;
				} else if (value > 0) {
					showGood = true;
				} else {
					showNeutral = true;
				}
			});
		}

		sql = 
			`SELECT DISTINCT fu.* \n` + 
			`FROM ${this._tableName} fu \n` + 
			`INNER JOIN ${MpgStatDb.TABLE_NAME} ms ON fu.carId = ms.carId \n` + 
			`WHERE \n` + 
			`    ( CAST(substr([when],1,4) AS INTEGER) IN ( ${yearFilters.join(",")} ) ) \n` + 
			`AND ( fu.FillType IN ( ${journeyFilters.join(",")} ) ) \n` + 
			`AND ( fu.carId IN ( ${carFilters.join(",")} ) ) \n`
		;

		sql += 'AND \n';
		sql += '( \n';

		if (!showBad && !showNeutral && !showGood) {
			// SO basically we won't be showing ANY results!
			sql += '   (1 = 2)\n';

		} else {
			let isFirst: boolean = true;
			let measureField: string = (activeMeasurement ? 'metricMpg' : 'imperialMpg');

			if (showBad) {
				sql += `   (fu.${measureField} < ms.avg) /* below average */\n`;
				isFirst = false;
			}
			if (showNeutral) {
				let bottomEnd: string = '(ms.avg - (ms.avg * 0.1))';
				let topEnd: string    = '(ms.avg + (ms.avg * 0.1))'
				if (!isFirst) sql += '   OR ';
				sql += `(fu.${measureField} BETWEEN ${bottomEnd} AND ${topEnd}) /* in average range */\n`
				isFirst = false;
			}
			if (showGood) {
				if (!isFirst) sql += '   OR ';
				sql += `(fu.${measureField} > ms.avg) /* above average */\n`;
				isFirst = false;
			}

			if (showBad || showNeutral || showGood) {
				// If any MPG filters are applied, we'll need this for any of them (no point repeating the same filter 3 times!)
				sql += `   AND (ms.type = "${activeMeasurement}") /* metric/imperial */\n`;
			}

		} // if !showing results

		sql += ') \n';

		return this.getByFilter(sql, args);
	}

	public getForYear(year: number): Promise<Array<FillUp>> {
		return this.getByFilter(
			'SELECT * FROM ' + this._tableName + 
			' WHERE CAST(substr([when],1,4) AS INTEGER) = ?', 
			[year]
		);
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
