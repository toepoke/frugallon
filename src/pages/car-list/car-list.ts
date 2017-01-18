import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-car-list',
  template:
`
<ion-header>
  <ion-navbar>
    <ion-title>
      CAR LIST
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>CAR LIST</p>
</ion-content>
`  
})
export class CarListPage {

  constructor(public navCtrl: NavController) {

  }

}
