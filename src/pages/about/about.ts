import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { NavController, Platform } from 'ionic-angular';

import { IAppState } from '../../bricks/stores';
import { DbProviders, SettingDb } from '../../bricks/db2';
import * as _ from '../../core/helpers/underscore';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
	styles: [`
		.divider-header {
			margin-top: 1rem;
			float: left;
			display: inline-block;
		}
		.divider-icon {
			float: right;
			font-size: 30px;
			color: #AE5190;
			display: inline-block;
		}
		ul.points li {
			margin-left: -2rem;
		}
	`],   
})
export class AboutPage {
	private _app$: Observable<IAppState> = null;
  private _app$subscription: Subscription = null;
	private _dbType: string = '';
	private _platformNames: Array<string> = null;
  
  constructor(
		private _store: Store<IAppState>, 
		private _platform: Platform,
    private _settingDb: SettingDb
  ) {
		this._app$ = <Observable<IAppState>> _store.select("appState");
		this._app$.subscribe((data: IAppState) => {
			if (_.isPresent(data)) {

			}
		});
    this._dbType = DbProviders.getDescription( this._settingDb.getActiveProvider() );
    this._platformNames = this._platform.platforms();
  }

}
