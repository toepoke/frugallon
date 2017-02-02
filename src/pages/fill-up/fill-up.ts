import { Component } from '@angular/core';

import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-fill-up',
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


  <ion-content padding>
    <h2>Welcome to Ionic!</h2>
    <p>
      This starter project comes with simple tabs-based layout for apps
      that are going to primarily use a Tabbed UI.
    </p>
    <p>
      Take a look at the <code>src/pages/</code> directory to add or change tabs,
      update any existing page or create new pages.
    </p>
  </ion-content>  
`
})
export class FillUpPage {

  constructor(
    protected menu: MenuController
  ) {
  }

}

