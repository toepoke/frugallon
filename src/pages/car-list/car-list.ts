import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-car-list',
  template:
`
<ion-header>
  <ion-navbar text-center>
    <product-name-ion></product-name-ion>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>My Cars (CAR LIST)</p>
</ion-content>
`  
})
export class CarListPage {

  constructor(public navCtrl: NavController) {

  }

}
