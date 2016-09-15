import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "../../stores/iapp-state";
import * as ACTIONS from "../../stores/actions/actions";
import { BaseDb } from "./base-db";
import { Settings } from "../../models/settings";
import * as _ from "../../../core/helpers/underscore";

@Injectable()
export class SettingsDb extends BaseDb {
	static LS_KEY_SETTINGS: string = "settings";

	constructor(appStore: Store<IAppState>) {
		super(appStore);
	}

	/**
	 * primes the setings table with data (if appropriate)
	 */
	primeTable(): void {
		let s: Settings = this.loadSettings();

		if (_.isNull(s)) {
			// first time use, so make sure we have something to play with
			s = Settings.getDefaults();
			s = this.saveSettings(s);
		}
	}

	/** 
	 * Load settings from local storage.
	 */
	loadSettings(): Settings {
		let s: Settings = null;
		let json: string = "";

		json = this.ls.getItem(SettingsDb.LS_KEY_SETTINGS);
		if (_.isNull(json)) {
			return null;
		}

		let o = JSON.parse(json);
		s = <Settings> o;
		
		return s;
	}

	/**
	 * Saves settings to local storage 
	 */	
	saveSettings(s: Settings): Settings {
		let json: string = JSON.stringify(s);

		this.ls.setItem(SettingsDb.LS_KEY_SETTINGS, json);

		return s;
	}
	
} 