import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-car-edit',
  template:
`
<ion-header>
  <ion-navbar>
    <ion-title>
      CAR EDIT
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>CAR EDIT</p>
</ion-content>
`  
})
export class CarEditPage {

  constructor(public navCtrl: NavController) {

  }

}
