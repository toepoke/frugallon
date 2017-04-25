import { Injectable } from "@angular/core";
import { DbProviders } from './';

@Injectable()
export class DbConfig {
	private _dbName: string = "";
	private _dbProvider: DbProviders = DbProviders.SQLITE;
	private _isLogging: boolean = false;

	public get dbName(): string {
		return this._dbName;
	}
	public set dbName(value: string) {
		this._dbName = value;
	}

	public get dbProvider(): DbProviders {
		return this._dbProvider;
	}

	public set dbProvider(value: DbProviders) {
		this._dbProvider = value;
	}

	public get isLogging(): boolean {
		return this._isLogging;
	}

	public set isLogging(value: boolean) {
		this._isLogging = value;
	}
}