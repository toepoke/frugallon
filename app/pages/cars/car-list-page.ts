// Vendor imports
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { Component, OnInit, OnChanges, ChangeDetectionStrategy, Input } from "@angular/core";
import { Page, NavController, NavParams, IONIC_DIRECTIVES } from 'ionic-angular';

// Core imports 
import * as _ from "../../core/helpers/underscore";
import * as ditto from "../../core/helpers/ditto";

// Application imports
import { COMPONENT_STRATEGY, ORCHESTRATOR_STRATEGY } from "../../strategy";
import { Car, CarMaker, Settings } from "../../bricks/models";
import { IAppState } from "../../bricks/stores";
import { AppActions } from '../../bricks/stores/actions/app-actions';
import { CarListIon, ProductNameIon, AppHeaderIon } from "../../bricks/components";
import * as ACTIONS from "../../bricks/stores/actions/actions";

// Page imports
import { AppNavigation } from "../app-navigation";
import { EditCarPage } from "./edit-car-page";


@Component({
	changeDetection: ORCHESTRATOR_STRATEGY,
	directives: [IONIC_DIRECTIVES, CarListIon, ProductNameIon, AppHeaderIon], 
	template:
`
		<app-header-ion></app-header-ion>

		<ion-content class="container content animated fadeIn medium">
			<car-list-ion
				[cars]="(_app|async).cars"
				[allow-edit]="true"
				(on-edit)="_onEdit($event)">
			</car-list-ion>
			
			<div class="toolbar">
				<!-- lhs -->
				<div>
				</div>
				
				<!-- rhs -->
				<div>		
					<button text-right secondary (click)="_onAdd($event)">Add Car</button>
				</div>
			</div>
		</ion-content>
`,
})

export class CarListPage implements OnChanges {
	private _app: Observable<IAppState> = null;


	constructor(
		private _nav: NavController,
		private _store: Store<IAppState>,
		private _appActions: AppActions
	) {
		this._app = <Observable<IAppState>> _store.select("appState");
		this._app.subscribe((data: IAppState) => {

		});

	}
	
	onSelect(c: Car): void {
	}

	ngOnChanges(changes) {
	}

	_onEdit(c: Car): void {
		this._store.dispatch(
			this._appActions.CarEdit(c)
		);

		AppNavigation.toEditCar(this._nav);
	}
	
	_onAdd(): void {
		let c: Car = new Car();
		this._store.dispatch(
			this._appActions.CarEdit(c)
		);
		
		
		AppNavigation.toEditCar(this._nav);		
	}

}
