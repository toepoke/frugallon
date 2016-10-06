import { BaseDb, DbCmdFailure, DbCmdSuccess } from "./";

/**
 * Stores a useful representation of a column in the schema.
 * (easier to interact with this once the schema has been assessed)
 */
export class TypedField {
	constructor(name: string, dbType: string, modelType: string) {
		this.name = name;
		this.dbType = dbType;
		this.modelType = modelType;
	}
	public name: string = "";
	public dbType: string = "";
	public modelType: string = "";
	public isFirst: boolean = false;
	public isLast: boolean = false;

	/**
	 * Flags whether the field is persisted to the database or not.
	 * (useful for flagging FK objects for instance).
	 */
	public get isPersisted() {
		return this.dbType !== null;
	}

	/**
	 * Convenience method for establishing if we're looking at the id
	 * field.
	 * remarks:
	 * This uses the name of the column, not the PRIMARY_KEY definition.
	 */
	public get isId() {
		return this.name === 'id';
	}
 
}

/**
 * Supported types by the TypedDb class.  The following mimics
 * static constants.
 * remarks:
 * See http://stackoverflow.com/questions/22991968/public-static-const-in-typescript
 */
export class DbTypes {
	public static get STRING(): string { return 'STRING'; }
	public static get DECIMAL(): string { return 'DECIMAL'; }
	public static get INTEGER(): string { return 'INTEGER'; }
	public static get BOOLEAN(): string { return 'BOOLEAN'; }
	public static get JSON(): string { return 'JSON'; }
	public static get DATE(): string { return 'DATE'; }
	public static get PRIMARY_KEY(): string { return 'PRIMARY_KEY'; }
	public static get FOREIGN_KEY_ID(): string { return 'FOREIGN_KEY_ID'; }
	public static get FOREIGN_KEY_OBJECT(): string { return 'FOREIGN_KEY_OBJECT'; }
	public static get NO_PERSIST(): string { return 'NO_PERSIST'; }
}

/**
 * Provides a simple generic CRUD table abstraction for a model "T". 
 */
export class TypedDb<T> extends BaseDb {
	protected _tableName: string = null;
	protected _schema: any = null;
	protected _fields: Array<TypedField> = null;
 
	constructor(schema: any, dbName: string, tableName: string, provider: number) {
		super(dbName, provider);

		this._tableName = tableName;
		this._schema = schema;
		this.evaluateSchema();
	}

	public get tableName() {
		return this._tableName;
	}

	/**
	 * Creates a table in the db based on the given schema.
	 */
	public createTable(): Promise<any> {
		let sql: string = 'CREATE TABLE IF NOT EXISTS ' + this._tableName + ' (\n';

		this._fields.forEach((item: TypedField, index: number) => {
			sql += ' ' + this.getColumnName(item.name) + ' ' + item.dbType;
			if (item.name === "id")
				sql += ' PRIMARY KEY';

			if (!item.isLast)
				sql += ',\n';
		});
		sql += '\n);';

		return super.executeAsync(sql, null);
	}


	/**
	 * Drops the table from the Sqlite/WebSql database.
	 */
	public dropTable(): Promise<any> {
		let sql: string = 'DROP TABLE IF EXISTS ' + this._tableName + ';';

		return super.executeAsync(sql, null);
	}


	/**
	 * Gets a model from the table based on a primary key lookup.
	 */
	public getById(id: number): Promise<T> {
		let sql: string = "";
		let args: Array<any> = null;

		sql = 'SELECT * FROM ' + this._tableName + ' WHERE id = ?';
		args = [id];

		return <any>this.getByFilter(sql, args)
			.then((items: Array<T>) => {
				return <T>items[0];
			})
		;
	}


	/**
	 * Gets all models from the table.
	 * remarks: You probably want to use "getByFilter"!!!!
	 */
	public getAll(): Promise<Array<T>> {
		let sql: string = '';
		let args: Array<any> = null;

		sql = 'SELECT * FROM ' + this._tableName + ' ORDER BY id';
		args = [];

		return <any>this.getByFilter(sql, args)
			.then((items: Array<T>) => {
				return <Array<T>>items;
			})
		;		
	}


	/**
	 * Gets the number of rows in the database table.
	 * remarks: Useful to establish if the table has been seeded with any data as yet.
	 */
	public getRowCount(): Promise<number> {
		let sql: string = '';

		sql = 'SELECT COUNT(1) FROM ' + this._tableName;

		return super.queryAsync(sql, null)
			.then((success: DbCmdSuccess) => {
				let recordCount: number = -1;

				if (success.data && success.data.rows && success.data.rows.length > 0) {
					recordCount = success.data.rows[0]["COUNT(1)"];
				}

				return Promise.resolve(recordCount);
			})
			.catch((err: DbCmdFailure) => {
				// just propagate the error
				return Promise.resolve(err);
			})
		;
	}


	/**
	 * Does a get against the table based on the provided sql statement.
	 * The sql should be in full (inc SELECT * ...) rather than just the where clause.
	 */
	public getByFilter(sql: string, args: Array<any>): Promise<Array<T>> {

		return super.queryAsync(sql, args)
			.then((success: DbCmdSuccess) => {
				let models: Array<T> = null;

				models = this.dbRead<T>(success);

				return Promise.resolve(models);
			})
			.catch((err: DbCmdFailure) => {
				// just propagate the error
				return Promise.resolve(err);
			})
		;
	}


	/**
	 * Does a foreign-key lookup against a child table, which may return 1..N rows.
	 * Typically this is a parent table looking up for child rows.
	 */
	public getAllByFkId<FkT>(fkId: number, fkColumn: string, fkTableName: string): Promise<Array<FkT>> {
		let sql: string = 'SELECT * FROM ' + fkTableName + ' WHERE ' + fkColumn + ' == ?';

		return super.queryAsync(sql, [fkId])
			.then((success: DbCmdSuccess) => {
				let fkModels: Array<FkT> = null;

				fkModels = this.dbRead<FkT>(success);

				return Promise.resolve(fkModels);
			})
			.catch((err: DbCmdFailure) => {
				// propagate
				return Promise.resolve(err);
			})
	}


	/**
	 * Does a foreign-key lookup against a parent table, which typically returns 1 row in the relationship.
	 */
	public getByFkId<FkT>(fkId: number, fkColumn: string, fkTableName: string): Promise<FkT> {
		return this.getAllByFkId(fkId, fkColumn, fkTableName)
			.then((fkModels: Array<FkT>) => {
				let found: FkT = null;

				if (fkModels && fkModels.length > 0) {
					found = fkModels[0];
				}

				return Promise.resolve(found);
			})
			.catch((err: DbCmdFailure) => {
				return Promise.resolve(err);
			})
	}


	/**
	 * Saves the model to the database table.
	 * remarks: If ID is null => inserted
	 *          If ID is numeric => update based on the ID primary key
	 */
	public save(obj: T): Promise<T> {
		let id: number = obj["id"];
		let isNew: boolean = this.isNull(id);

		if (isNew) {
			return this.applyInsert(obj);
		} else {
			return this.applyUpdate(obj);
		}
	}


	/**
	 * Saves multiple models to the database table
	 * remarks: If you're INSERTING mutliple items, you may want to use
	 * the "bulkInsert" method as it's more efficient.
	 */
	public saveAll(objs: Array<T>): Promise<Array<T>> {
		let promises: Array<any> = [];
		objs.forEach((obj: T, index: number) => {
			promises.push( this.save(obj) ); 
		});
		return Promise.all(promises);
	} 


	/**
	 * Saves multiple models to the database table.
	 * remarks: Saves are stagged over 100 items in the array 
	 * (if there's more than 100 items!)
	 */
	public bulkInsert(objects: Array<T>): Promise<number> {
		const MAX_ITEMS: number = 100;

		if (objects.length <= MAX_ITEMS) {
			return this.applyBulkInsert(objects);

		} else {
			let partial: Array<T> = new Array<T>();
			let start: number = 0;
			let end: number = 0;
			let total: number = 0;

			while (start < objects.length) {
				end = (start + MAX_ITEMS);
				if (end > objects.length) {
					end = objects.length;
				}

				partial = objects.slice(start, end);

				this.applyBulkInsert(partial);

				start = end;
			} // while

			return Promise.resolve(objects.length);
		}

	} // bulkInsert


	/**
	 * Deletes a model from the table based on the primary key lookup.
	 */
	public deleteItem(id: number): Promise<any> {
		let sql: string = '';
		let args: Array<any> = null;

		sql = 'DELETE FROM ' + this._tableName + ' WHERE id = ?';
		args = [id];
		
		return super.executeAsync(sql, args);
	}


	/**
	 * Deletes multiple items from the database table.
	 */
	public deleteItems(objs: Array<T>): Promise<Array<DbCmdSuccess>> {
		let promises: Array<any> = [];
		objs.forEach((obj: T, index: number) => {
			promises.push( this.deleteItem(obj["id"]) ); 
		});
		return Promise.all(promises);
	} 

	/**
	 * Gets the SQL syntax to use for referring to column names in the database.
	 * This simply surrounds the column name with brackets [] to avoid any 
	 * reserved word clashes.
	 */
	protected getColumnName(columnnName: string): string {
		return '[' + columnnName + ']';
	}


	/**
	 * Inserts an array of items into the database at one time.
	 */
	private applyBulkInsert(objects: Array<T>): Promise<number> {
		let sql: string = "", insertNames: string = "", insertValues: string = "";
		let value: any = null;		
		let args: Array<any> = new Array<any>();
		let sqlInserts: Array<string> = new Array<string>();
		let sqlValues: Array<string> = new Array<string>();

		this._fields.forEach((item: TypedField, index: number) => {
			if (item.isPersisted && !item.isId) {
				sqlInserts.push( this.getColumnName(item.name) );
			}
		});

		insertNames = sqlInserts.join(', ');

		objects.forEach((obj: T, index: number) => {
			sqlValues = new Array<string>();

			this._fields.forEach((item: TypedField) => {

				if (item.isPersisted && !item.isId) {
					value = obj[item.name];
					value = this.fromModel(item, value);

					args.push(value);
					sqlValues.push('?');
				} 

			});

			insertValues += '\n\t( ' + sqlValues.join(', ') + ' )';
			if (index < objects.length-1) {
				insertValues += ',';
			}
		});

		sql = 'INSERT INTO ' + this._tableName + ' ( ' + insertNames + ' )\nVALUES ' + insertValues + '\n';

		return super.executeAsync(sql, args)
			.then((success: DbCmdSuccess) => {
				// Bulk insert only returns the last insertedid, so sadly we
				// can't update the T objects back.  Best we can do is say 
				// how many we inserted :-()
				return success.data.rowsAffected; 
			})
		;
	} // applyBulkInsert


	/**
	 * Ensures the schema provided is valid (i.e. has a ID property for the primary key).
	 * Also builds up an internal representation of the columns in the database that's easier
	 * for us to work with.
	 */
	private evaluateSchema(): void {
		let schemaKeys: Array<string> = Object.keys(this._schema);
		let columns: string = '';
		this._fields = new Array<TypedField>();

		for (let i: number = 0; i < schemaKeys.length; i++) {
			let newField: TypedField = null;
			let key: string = schemaKeys[i];
			let modelType: string = this._schema[key];
			let dbType: string = this.getDbType(modelType);

			newField = new TypedField(key, dbType, modelType);

			this._fields.push(newField);
		}

		// Remove any fields we don't want persisting
		this._fields = this._fields.filter((f: TypedField) => {
			return f.modelType !== DbTypes.NO_PERSIST;
		});

		// Mark out the first and last fields to make life easier later ...
		this._fields[0].isFirst = true;
		this._fields[this._fields.length-1].isLast = true;

		// flag if we have a primary key id or not
		let idField: TypedField = this._fields.find((item: TypedField) => {
			return (item.name === "id" && item.dbType === DbTypes.PRIMARY_KEY) 
		});
		if (idField === null) {
			throw new Error('Table schema _must_ have an "id" property.');
		}

	} // evaluateSchema


	/**
	 * Establishes how the data in a model property should be stored in the
	 * database table.  For example JSON is an object in the model, but is 
	 * stored as TEXT in the database.
	 */
	protected getDbType(modelType: string): string {
		switch (modelType) {
			case DbTypes.STRING: return 'TEXT';
			case DbTypes.DECIMAL: return 'REAL';
			case DbTypes.INTEGER: return 'INTEGER';
			case DbTypes.BOOLEAN: return 'BOOLEAN';
			case DbTypes.JSON: return 'TEXT';
			case DbTypes.DATE: return 'TEXT';
			case DbTypes.PRIMARY_KEY: return 'INTEGER';
			case DbTypes.FOREIGN_KEY_ID: return 'INTEGER';
			case DbTypes.FOREIGN_KEY_OBJECT: return null;
			case DbTypes.NO_PERSIST: return null;
		}
	}


	/**
	 * Helper method for converting a result set from Sqlite/WebSql into a
	 * typed array we can work with.
	 */
	private dbRead<RsT>(dbResult: any): Array<RsT> {
		let models: Array<RsT> = new Array<RsT>();

		if (!dbResult && !dbResult.data && !dbResult.data.rows)
			return models;
		
		let row: T = null;
		let value: any = null;
		let model: any = null;
		for (let i: number = 0; i < dbResult.data.rows.length; i++) {
			row = <T>dbResult.data.rows[i];
			model = {};
			this._fields.forEach((item: TypedField, index: number) => {
				value = this.toModel(item, row[item.name]);
				model[item.name] = value;
			});

			// models.push(row);
			models.push(<RsT>model);
		}

		return models;
	}


	/**
	 * Converts a property from the model into how it's stored in the
	 * database.
	 * item: Type definition for what's being stored.
	 * modelValue: Data to be stored in the db. 
	 */
	private fromModel(item: TypedField, modelValue: any): any {
		try {
			if (this.isNull(modelValue))
				return modelValue;

			switch (item.modelType) {
				case DbTypes.STRING: return <string>modelValue;
				case DbTypes.DECIMAL: return Number(modelValue);
				case DbTypes.INTEGER: return Number(modelValue);
				case DbTypes.BOOLEAN: return(modelValue.toString().toLowerCase() === "true");
				case DbTypes.JSON: return JSON.stringify(modelValue);
				case DbTypes.DATE: return (<Date> modelValue).toISOString();
				case DbTypes.PRIMARY_KEY: return Number(modelValue);
				case DbTypes.FOREIGN_KEY_ID: return Number(modelValue);
				case DbTypes.FOREIGN_KEY_OBJECT: return null;
				case DbTypes.NO_PERSIST: return null;
			}
		}
		catch (e) {
			console.error("fromModel failed with value of:", modelValue, item, e);
		}
	}


	/**
	 * Converts data from the database into the form expected by 
	 * the model.
	 * item: Type definition for what's being stored
	 * dbValue: Value as it's stored in the db 
	 */
	private toModel(item: TypedField, dbValue: any): any {
		try {
			if (this.isNull(dbValue))
				return dbValue;
	
			switch (item.modelType) {
				case DbTypes.STRING: return <string>dbValue;
				case DbTypes.DECIMAL: return Number(dbValue);
				case DbTypes.INTEGER: return Number(dbValue);
				case DbTypes.BOOLEAN: return (dbValue.toString().toLowerCase() === "true");
				case DbTypes.JSON: return this.parse(dbValue);
				case DbTypes.DATE: return new Date(dbValue); 
				case DbTypes.PRIMARY_KEY: return Number(dbValue);
				case DbTypes.FOREIGN_KEY_ID: return Number(dbValue);
				case DbTypes.FOREIGN_KEY_OBJECT: return null;
				case DbTypes.NO_PERSIST: return null;
			}
		}
		catch (e) {
			console.error("toModel failed with value of:", dbValue, item, e);
		}
	}

	/**
	 * When deserialising from the database, an array is deserialised on the first
	 * attempt.  An object takes too.  Easiest bet is to continue until we're no longer
	 * looking at a string.
	 */
	private parse(s: string): any {
		try {
			let parsed: any = JSON.parse(s);

			while (typeof parsed === 'string') {
				parsed = JSON.parse(parsed);
			}

			return parsed;
		}
		catch (e) {
			console.error("Could not parse: ", s);
		}
	}

	/**
	 * Generates an insert request against the database table. 
	 */
	private applyInsert(obj: T): Promise<T> {
		let sql: string = "", insertNames: string = "", insertValues: string = "";
		let value: any = null;		
		let args: Array<any> = new Array<any>();
		let sqlInserts: Array<string> = new Array<string>();
		let sqlValues: Array<string> = new Array<string>();

		this._fields.forEach((item: TypedField, index: number) => {
			
			value = obj[item.name];
			value = this.fromModel(item, value);

			if (item.isPersisted) {

				// Don't insert the ID property on insert
				if (!item.isId) {				
					args.push(value);

					sqlInserts.push( this.getColumnName(item.name) );
					sqlValues.push('?');
				}
			}
		});

		insertNames = sqlInserts.join(', ');
		insertValues = sqlValues.join(', ');

		sql = 
'INSERT INTO ' + this._tableName + ' (' + insertNames + ' )\nVALUES ( ' + insertValues + ' );';
		
		return super.executeAsync(sql, args)
			.then((success: DbCmdSuccess) => {
				obj["id"] = success.data.insertId;
				return obj; 
			})
		;
	}


	/**
	 * Generates an update request against the database table. 
	 */
	private applyUpdate(obj: T): Promise<T> {
		let id: number = obj["id"];
		let sql: string = "", updates: string = "";
		let value: any = null;		
		let args: Array<any> = new Array<any>();
		let sqlInserts: Array<string> = new Array<string>();
		let sqlUpdates: Array<string> = new Array<string>();

		this._fields.forEach((item: TypedField, index: number) => {
			value = obj[item.name];
			value = this.fromModel(item, value);

			// null => we don't save this column
			if (item.isPersisted) {
				
				// We don't update the primary key!
				if (item.name !== "id") {
					args.push(value);
					sqlUpdates.push( this.getColumnName(item.name) );
				}
			}

		});

		args.push(id);	// where clause
		updates = sqlUpdates.join(' = ?,\n\t');
		updates += ' = ?';
		sql = 'UPDATE ' + this._tableName + ' SET\n\t' + updates + ' \nWHERE id == ?;';

		return super.executeAsync(sql, args)
			.then((success: DbCmdSuccess) => {
				if (success.data) {
					if (Number(success.data.rowsAffected) <= 0) {
						// no update took place => invalid PK reference
						let errMsg: string = 'applyUpdate did not find a row with an id of ' + id;
						let err: Error = new Error(errMsg);
						if (this._loggingActive) BaseDb.onSqlError(errMsg, null, sql, args);
						throw err;
					}
				} 

				return obj; 
			})
		;
	}


	/**
	 * Returns ture if "n" is consider a number
	 * Returns false otherwise
	 */
	private isNumeric(n: string): boolean {
		if (n === null || n === undefined)
			return false;
		if (n == '')
			return false;

		let convert: any = Number(n);
		return !isNaN(convert);
	}

	/**
	 * Returns true if string is to be considered a decimal.
	 */
	private isDecimal(n: string): boolean {
		if (!this.isNumeric(n))
			return false;

		// yeah, not really internationally compaible, but hey ho!
		return n.indexOf('.') > -1;
	}

	/**
	 * Helper method to establish if the given object is null or undefined.
	 */
	private isNull(o: any): boolean {
		return o === null || o === undefined; 
	}

}

