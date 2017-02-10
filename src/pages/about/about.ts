import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

import { IAppState, AppActions } from '../../bricks/stores';
import { DbProviders, SettingDb } from '../../bricks/db2';
import { ePages } from '../../bricks/models';
import { BasePage } from '../_base-page/base-page';

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
export class AboutPage extends BasePage {
	private _app$: Observable<IAppState> = null;
	private _dbType: string = '';
	private _platformNames: Array<string> = null;
  
  constructor(
		store: Store<IAppState>, 
		appActions: AppActions,
		private _platform: Platform,		
    private _settingDb: SettingDb
  ) {
		super(store, appActions, ePages.About);

		this._app$ = <Observable<IAppState>> this._store.select("appState");
    this._dbType = DbProviders.getDescription( this._settingDb.getActiveProvider() );
    this._platformNames = this._platform.platforms();
  }

	protected ionViewDidEnter(): void {
		super.onViewDidEnter();
	}

	protected ionViewDidLeave(): void {
		super.onViewPop();
	}	


}
