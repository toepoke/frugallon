import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-history',
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
				<button ion-button text-right menuToggle="menu2">
					<ion-icon name="funnel"></ion-icon>
				</button>
			</ion-buttons>

		</ion-navbar>
	</ion-header>

  <ion-content padding class="background">
    <p>HISTORY</p>
  </ion-content>
`  
})
export class HistoryPage {

  constructor(public navCtrl: NavController) {

  }

}
