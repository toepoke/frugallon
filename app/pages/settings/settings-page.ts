// Vendor imports
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { ViewChild, Component, AfterContentInit } from "@angular/core";
import { IONIC_DIRECTIVES, Page, Alert, AlertController, NavController, ViewController, Toggle, Events } from 'ionic-angular';

// Core imports 
import * as _ from "../../core/helpers/underscore"; 
import { DbCmdFailure } from '../../core/db2';

// Application imports
import { ORCHESTRATOR_STRATEGY } from "../../strategy";
import { Settings, FillUp } from "../../bricks/models";
import { AppDatabase } from "../../bricks/services/db2";
import { IAppState } from "../../bricks/stores/iapp-state";
import { ProductNameIon, AppHeaderIon } from "../../bricks/components";
import { AppActions } from '../../bricks/stores';

// Page imports
import { MeasurementToggle } from "./measurement-toggle";

@Component({
	changeDetection: ORCHESTRATOR_STRATEGY,
	directives: [IONIC_DIRECTIVES, ProductNameIon, AppHeaderIon, MeasurementToggle],
	template:
`
	<app-header-ion 
		[show-main-menu]="false" 
		[show-filter-menu]="false"
		[show-back]="true"	
		(on-back)="onBack()"	
	></app-header-ion>
	
	<ion-content padding class="container">
		<measurement-toggle 
			[measurement]="(_app|async)?.measurement" 
			[measurement-type]="(_app|async)?.measurementType" 
			(on-toggle)="_onToggle($event)">
		</measurement-toggle>

		<button full danger (click)="shouldNukeDatabase()">Nuke Database</button>

		<ion-toolbar position="bottom">
			<div text-right>
				<button light type="submit" (click)="onCancel()">Cancel</button>
				<button type="submit" (click)="onSave()">Save</button>
			</div>
		</ion-toolbar>
	</ion-content>
`
})

export class SettingsPage {
	@ViewChild(Toggle) _toggle: Toggle = null;
	private _useMetric: boolean = true;
	private _originalMeasurement: boolean = null;
	private _newMeasurement: boolean = true;

	private _app: Observable<IAppState> = null;
	
	constructor(
		private _nav: NavController,
		private _alerter: AlertController, 
		private _store: Store<IAppState>,
		private _appActions: AppActions,
		private _appDb: AppDatabase,
		private _events: Events
	) {
		this._app = <Observable<IAppState>> _store.select("appState");
		this._app.subscribe((data: IAppState) => {
			if (this._originalMeasurement === null) {
				this._originalMeasurement = data.measurement;
			}

		});
	}

	ngOnInit() {
	}

	_onToggle(newValue: boolean) {
		this._newMeasurement = newValue;
		this._store.dispatch(
			this._appActions.ChangeMeasurement(newValue)
		);
	}

	shouldNukeDatabase(): void {
		let confirm: Alert = this._alerter.create({
			title: "Nuke Database?",
			message: "Are you sure you want to start afresh?",
			buttons: [
				{
					text: "Yes",
					handler: () => {
						this.nukeDatabase();
					}
				}, {
					text: "No"
				}
			]
		});
		confirm.present();
	}

	nukeDatabase(): void {
		this._appDb.nukeDatabase()
			.then(() => this._appDb.primeDatabase())
			.then(() => {
				let acknowledge: Alert = this._alerter.create({
					title: "Nuked",
					message: "Application has been restarted",
					buttons: [{
						text: "Ok",
						handler: () => {
							this._nav.pop();
						}
					}]
				});
				acknowledge.present();
			})
		;
	}
	
	onCancel(): void {
		// Cancelling, so put it back to what it was
		this._store.dispatch(
			this._appActions.ChangeMeasurement(this._originalMeasurement)
		);
				
		this._nav.pop();
	}	
	
	onBack(): void {
		this.onCancel();
	}
	
	onSave(): void {
		this._appDb.settingsDb.load()
			.then((settings: Settings) => {
				settings.measurement = this._newMeasurement;
				return this._nav.pop();
			})
			.then((popResult: any) => {
				this._appActions.ChangeMeasurement(this._newMeasurement);
			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;	
	}
	

}