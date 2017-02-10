import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { AppActions, IAppState } from './../../bricks/stores';
import { NavController } from 'ionic-angular';
import { ePages } from '../../bricks/models';
import { BasePage } from '../_base-page/base-page';

@Component({
  selector: 'page-reminders',
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

  <ion-content padding class="background">
    <p>REMINDERS</p>
  </ion-content>
`  
})
export class RemindersPage extends BasePage {

  constructor(
		store: Store<IAppState>,
		appActions: AppActions
	) {
		super(store, appActions, ePages.Reminders);
  }

	protected ionViewDidEnter(): void {
		super.onViewDidEnter();
	}

	protected ionViewDidLeave(): void {
		super.onViewDidLeave();
	}	


}
