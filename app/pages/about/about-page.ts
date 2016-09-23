// Vendor imports
import { Store } from "@ngrx/store";
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IONIC_DIRECTIVES, Page, NavController, ViewController, Platform } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';
import * as moment from "moment";

// Core imports 
import * as _ from "../../core/helpers/underscore";

// Application imports
import { COMPONENT_STRATEGY } from "../../strategy";
import { ProductNameIon, AppHeaderIon } from "../../bricks/components";
import { IAppState } from "../../bricks";
import { DbProviders, SettingDb } from '../../bricks/services/db2';
import * as ACTIONS from "../../bricks/stores/actions/actions";

@Component({
	changeDetection: COMPONENT_STRATEGY,
	directives: [IONIC_DIRECTIVES, ProductNameIon, AppHeaderIon],
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
	template:`
		<app-header-ion 
			[show-main-menu]="false" 
			[show-filter-menu]="false"
			[show-back]="true"	
			(on-back)="onBack()"	
		></app-header-ion>

		<ion-content padding class="container">

			<ion-list>
				<ion-item-group>				
					<ion-item-divider>						
						<div class="divider-header">Frugallon</div>
						<div class="divider-icon">
							<img src="build/img/car-x256.png" width="32px" />					
						</div>
						<div class="clear"></div>
					</ion-item-divider>
					
					<ion-item>
						<div>
							<ul class="points">
								<li>Easily track your MPG.
								<li>Remind you when your service is due.
								<li>Pretty graph stats too.
							</ul>
							<p>
								We've built other things too, like<br/>
								<a href="https://toepoke.co.uk">toepoke.co.uk</a>.
							</p>
						</div>	
					</ion-item>
				</ion-item-group>
			</ion-list>
			
			<ion-list>
				<ion-item-group>				
					<ion-item-divider>
						<div class="divider-header">Info</div>
						<div class="divider-icon">
							<ion-icon name="information-circle"></ion-icon>
						</div>
						<div class="clear"></div>
					</ion-item-divider>
					
					<ion-item>
						<span item-left>Application Version</span>
						<ion-badge item-right class="badge">
							{{(_app|async).appVersion}}
						</ion-badge>					
					</ion-item>
					
					<ion-item>
						<span item-left>Database Version</span>
						<ion-badge item-right class="badge">
							{{(_app|async).dbVersion}}
						</ion-badge>					
					</ion-item>

					<ion-item>
						<span item-left>Database Type</span>
						<ion-badge item-right class="badge">
							{{_dbType}}
						</ion-badge>					
					</ion-item>
					
					<ion-item>
						<span item-left>Platforms</span>
						<div item-right>
							<div text-right *ngFor="let p of _platformNames">
								<ion-badge class="badge">
									{{p}}
								</ion-badge>
							</div>
						</div>
					</ion-item>
					
				</ion-item-group>
			</ion-list>
			
			<button (click)="notify()">Notify in 10 seconds</button>
			
		</ion-content>
`,
})

export class AboutPage {
	private _app: Observable<IAppState> = null;
	private _dbType: string = '';
	private _platformNames: Array<string> = null;

	constructor(
		private _nav: NavController,
		private _platforms: Platform,
		private _store: Store<IAppState>,
		private _settingDb: SettingDb
	) {
		this._app = <Observable<IAppState>> _store.select("appState");
		this._app.subscribe((data: IAppState) => {

		});
		
		this._dbType = DbProviders.getDescription(_settingDb.getActiveProvider());
		this._platformNames = this._platforms.platforms();
	}
	
	onBack(): void {
		this._nav.pop();	
	}
	
	
	/** 
	 * Trying stuff out
	 * See https://github.com/katzer/cordova-plugin-local-notifications/wiki/04.-Scheduling
	 */
	notify(): void {
		
		var notifyDate: Date = moment().add("seconds", 10).toDate();
		
		LocalNotifications.schedule({
			id: 1,
			text: "Hello World!",
			at: notifyDate,
			sound: "file://build/mp3/goat-bells.mp3",
			icon: "file://build/img/car-x32.png",
			smallicon: "file://build/img/car-x32.png",
			data: { 
				secret: "hello there!" 
			}
		});
		
	}

	
}
