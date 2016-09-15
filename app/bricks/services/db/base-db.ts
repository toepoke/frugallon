import { Injectable, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "../../stores/iapp-state";

import * as _ from "../../../core/helpers/underscore";

export class BaseDb {
	private _ls: Storage = null;

	constructor(protected _store: Store<IAppState>) {
		this._ls = window.localStorage;
	}
	
	public get ls(): Storage {
		return this._ls;
	}
	
	protected getNextId(withKey: string): number {
		let nextId: number = null;
		
		nextId = this.ls.getItem(withKey);
		if (_.isNull(nextId)) {
			// for first use
			nextId = 0;
		}
		
		nextId = Number(nextId);
		nextId++;
		this.saveNextId(withKey, nextId);
		
		return nextId;
	}
	
	private saveNextId(withKey: string, nextId: number): void {
		this.ls.setItem(withKey, nextId.toString());
	}
	
}