export class DbCmdSuccess {
	constructor(transaction: any, data: any, sql: string) {
		this.transaction = transaction;
		this.data = data;
		this.sql = sql;
	}

	public transaction: any;
	public data: any = null;
	public sql: string = null;
}

export class DbCmdFailure {
	constructor(transaction: any, error: any, sqlError: any, sql: string) {
		this.transaction = transaction;
		this.error = error;
		this.sqlError = sqlError;
		this.sql = sql;
	}

	public transaction: any;
	public sqlError: any = null;
	public error: any = null;
	public sql: string = null;
}

