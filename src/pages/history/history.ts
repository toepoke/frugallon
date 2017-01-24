import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-history',
  template:
`
<ion-header>
  <ion-navbar text-center>
    <product-name-ion></product-name-ion>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>HISTORY</p>
</ion-content>
`  
})
export class HistoryPage {

  constructor(public navCtrl: NavController) {

  }

}
