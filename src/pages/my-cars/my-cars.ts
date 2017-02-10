import { Car, ePages } from './../../bricks/models';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IAppState } from './../../bricks/stores/iapp.state';
import { AppActions } from './../../bricks/stores/actions/app.actions';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CarEditPage } from '../';
import { BasePage } from '../_base-page/base-page';
import * as _ from '../../core/helpers/underscore';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-my-cars',
	changeDetection: ChangeDetectionStrategy.OnPush,
  template:
`
	<ion-header>
		<ion-navbar>

			<button ion-button text-left [menuToggle]="menu1">
				<ion-icon name="menu"></ion-icon>
			</button>
			
      <ion-title text-center>
				<product-name-ion></product-name-ion>
      </ion-title>
			
			<ion-buttons end>
				<button ion-button text-right menuToggle="menu2" disabled>
					<!-- No icon and disabled so the logo still appears in the middle correctly -->
				</button>
			</ion-buttons>

		</ion-navbar>
	</ion-header>
  
	<ion-content padding class="container content animated fadeIn medium background">
		<car-list-ion
			[cars]="_app?.cars"
			[allow-edit]="true"
			(on-edit)="onEdit($event)">
		</car-list-ion>
		
		<ion-fab bottom right>
			<button ion-fab color="danger" (click)="onAdd()">
				<ion-icon name="add">
			</ion-icon></button>
		</ion-fab>
	</ion-content>
`  
})
export class MyCarsPage extends BasePage {
	private _app$: Observable<IAppState> = null;
	private _app$subscription: Subscription = null;
	protected _app: IAppState = null;

  constructor(
		store: Store<IAppState>,
		appActions: AppActions,
		protected _nav: NavController,
	) {
		super(store, appActions, ePages.MyCars);

		this._app$ = <Observable<IAppState>> store.select("appState");
		this._app$subscription = this._app$.subscribe((appState: IAppState) => {
			if (_.isPresent(appState)) {
				this._app = appState;
			}
		});
  }

	/**
	 * Ensure subscription is destroyed when view is removed from the DOM
	 * (otherwise => memory leaks!)
	 */
	protected ionViewDidUnload(): void {
		this._app$subscription.unsubscribe();
	}	

	protected ionViewDidEnter(): void {
		super.onViewDidEnter();
	}

	protected ionViewDidLeave(): void {
		super.onViewDidLeave();
	}	

	protected onEdit(c: Car): void {
		this._store.dispatch(
			this._appActions.CarEdit(c)
		);

		this._nav.push( CarEditPage );
	}
	
	protected onAdd(): void {
		let c: Car = new Car();
		this._store.dispatch(
			this._appActions.CarEdit(c)
		);
		
		this._nav.push( CarEditPage );
	}

}
