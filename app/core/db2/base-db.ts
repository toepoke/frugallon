import { SQLite } from 'ionic-native';
import { DbCmdSuccess, DbCmdFailure } from './';
import * as ditto from '../helpers/ditto';
import * as _ from '../helpers/underscore';

export class SqlInfo {
	/** Raw representation with "?" and everything */
	raw: string = null;

	/** Parsed replaces the "?" with the values of the query */
	parsed: string = null;

	/** Is a shortened version of "parsed" to earily show in one line */
	short: string = null;

	rs: any = null;
}

export class DbProviders {
	public static get DETECT(): number { return 1; }
	public static get WEB_SQL(): number { return 2; }
	public static get SQLITE(): number { return 3; }	
}


/**
 * Provides building blocks for interacting with a Sqlite/WebSql database
 */
export abstract class BaseDb {
	protected _provider: number = DbProviders.DETECT;
	protected _dbName: string = null;
	public _db: any = null;
	protected _isOpen: boolean = false;
	protected _loggingActive: boolean = false;

	static DB_SIZE: number = 5 * 1024 * 1024;	// 5Mb

	constructor(database: string, provider: number = DbProviders.DETECT) {
		this._dbName = database;
		this._provider = provider;

		if (!this._isOpen) {
			this.openDb();
		}		
	}

	/**
	 * What DbProvider is being used 
	 */
	public get dbProvider(): number {
		return this._provider;
	}


	/**
	 * Database name in use (useful to change for testing purposes). 
	 */
	public get dbName(): string {
		return this._dbName;
	}

	public enableLogging(): void {
		this._loggingActive = true;
	}

	public disableLogged(): void {
		this._loggingActive = false;
	}


	/**
	 * Flags the database has been opened successfully.
	 */
	protected get isOpen(): boolean {
		return this._isOpen;
	}


	/**
	 * Opens in webSql or SqlLite mode, depending on configuration.
	 */
	private openDb(): void {
		if (!_.isNull(this._db)) {
			throw new Error('SQLite database is already opened.');
		}
		// Ensure any other queries don't come in ... yet 
		this._isOpen = true;

		let activeProvider: number = this.getActiveProvider();

		if (activeProvider == DbProviders.WEB_SQL) {
			this.useWebSqlProvider();
		} else {
			this.useSqlLiteProvider();
		}
	}


	/**
	 * Establishes which provider to use (takes care of detect version).
	 */
	private getActiveProvider(): number {
		if (this._provider != DbProviders.DETECT) {
			// use as defined
			return this._provider;
		}

		// Detect based on the presence of the plug-in
		if (window['cordova']) {
			return DbProviders.SQLITE;
		} else {
			return DbProviders.WEB_SQL;
		} 
	}


	/**
	 * Opens database using SQLite configuration. 
	 */
	private useSqlLiteProvider() {
		let db: SQLite = new SQLite();

		db.openDatabase({
			name: this._dbName,
			location: 'default' // location is required
		})
			.then(() => {
				this._isOpen = true;
				this._db = db;
			})
			.catch((err: Error) => {
				this._isOpen = false; 
				throw err; 
			})
		;

	}


	/**
	 * Opens database using webSql configuration. 
	 */
	private useWebSqlProvider() {
		this._db = window['openDatabase'](this._dbName, 1.0, 'Frugallon database', BaseDb.DB_SIZE);

		if (this._db) {
			this._isOpen = true;
		} else {
			this._isOpen = false; 
			throw Error('Failed to open web sql database'); 
		}
	}


	/**
	 * Executes a query against the provider.
	 */
	protected queryAsync(sql: string, parameters: Array<any>): Promise<any> {
		var me = this;
		return new Promise((resolve, reject) => {
			if (_.isNull(parameters)) {
				parameters = [];
			}
			this._db.transaction(function(tx) {
				tx.executeSql(sql, parameters,
					(tx, rs) => {
						if (me._loggingActive) BaseDb.onQuerySuccess(sql, parameters, rs);
						resolve(new DbCmdSuccess(tx, rs, sql));

					}, (err, sqlError) => {
						if (me._loggingActive) BaseDb.onSqlError(err, sqlError, sql, parameters);
						reject(new DbCmdFailure(tx, err, sqlError, sql));
					} // error
					
				) // executeSql
			}); // transaction

		}); // Promise
	} // queryAsync



	/**
	 * Executes a SQL statement against the provider.
	 * This should be limited to Create/Update & Delete.
	 */
	protected executeAsync(sql: string, parameters: Array<any>): Promise<any> {
		let me = this;
		return new Promise((resolve, reject) => {

			if (_.isNull(parameters)) {
				parameters = [];
			}
			this._db.transaction(function(tx) {
				tx.executeSql(sql, parameters,
					(tx, rs) => {
						if (me._loggingActive) BaseDb.onExecSuccess(sql, parameters);
						resolve(new DbCmdSuccess(tx, rs, sql));
					}, (err, sqlError) => {
						if (me._loggingActive) BaseDb.onSqlError(err, sqlError, sql, parameters);
						reject(new DbCmdFailure(tx, err, sqlError, sql));
					} // error
				) // executeSql
			}); // transaction

		}); // Promise
	
	} // executeAsync


	/**
	 * Provides centralised error handling. 
	 * (so we can show errors in the console as well as back to the callee)
	 */
	protected static onSqlError(err, sqlError, sql: string, parameters: Array<any>): SqlInfo {
		// console.error("> SQL:", err, sqlError, sql, parameters);

		let s: SqlInfo = BaseDb.getSqlInfo(sql, parameters);
		BaseDb.reportSqlInfo(s, null, err, sqlError);
		if (console && console.error) {
			console.error(s);
		}
		return s; 
	}

	/**
	 * Centralised reporting of success SQL execution (insert/update/delete operations).
	 */
	protected static onExecSuccess(sql: string, parameters: Array<any>): SqlInfo {
		let s: SqlInfo = BaseDb.getSqlInfo(sql, parameters);
		BaseDb.reportSqlInfo(s, null, null, null);
		return s; 
	}

	/**
	 * Centralised reporting of successful queries against the database.
	 */
	protected static onQuerySuccess(sql: string, parameters: Array<any>, rs): SqlInfo {
		if (_.isNull(sql))
			return;

		let s: SqlInfo = BaseDb.getSqlInfo(sql, parameters, rs);

		BaseDb.reportSqlInfo(s, rs, null, null);

		return s; 
	}


	/**
	 * Helper method to construct debugging info for the console log.
	 */
	private static getSqlInfo(sql: string, parameters: Array<any>, rs?): SqlInfo {
		let shortSql: string = '', paramValue: string = '';
		let parsedSql: string = sql;
		let position: number = null;

		// SQLite commands may have array-type parameters, e.g. "SELECT ... WHERE ID = ?"
		// So this little bit replaces with "?" with the underlying value from the parameters
		// (making it more readable)
		if (ditto.any(parameters)) {
			for (let index: number = parameters.length; index > 0; index--) {
				paramValue = parameters[index - 1];
				if (typeof paramValue === 'string')
					paramValue = `"${paramValue}"`;
				position = parsedSql.lastIndexOf('?');

				parsedSql = parsedSql.substr(0, position) + paramValue + parsedSql.substr(position+'?'.length);
			}
		}

		// We'll use a preview of the SQL to show in the navbar in debtools, but we want this 
		// in-line rather than the pretty format we've coded it in
		shortSql = parsedSql;
		shortSql = shortSql.replace(/\s\s+/g, ' ');	// replace multi whitespace
		shortSql = shortSql.replace('\n', '').replace('\r', '');

		let sqlInfo: SqlInfo = new SqlInfo();
		sqlInfo.raw = sql;
		sqlInfo.parsed = parsedSql;
		sqlInfo.short = shortSql;

		return sqlInfo;
	} // getSqlInfo


	private static reportSqlInfo(s: SqlInfo, rs, err, sqlError): void {
		// Show the "preview" version, inviting the user to expand to the full pretty version if they
		// need to
		if (err) {
			console.error("parsed: ", s.parsed);

			if (err)       console.error("err: ", err);
			if (sqlError)  console.error("sqlError: ", sqlError)
		} else {
			console.log(s.parsed);
		}
		if (!_.isNull(s.rs)) {
			if (s.rs.rows && s.rs.rows.length === 0) {
				console.log("No results");
			} else {
				console.groupCollapsed('> SQL: ' + s.short);
				console["table"](s.rs.rows);
				console.groupEnd();
			}
		}
		
	}

} // BaseDb


