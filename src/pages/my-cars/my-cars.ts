import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-my-cars',
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
    <p>My Cars (CAR LIST)</p>
  </ion-content>
`  
})
export class MyCarsPage {

  constructor(public navCtrl: NavController) {

  }

}
