import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-reminders',
  template:
`
<ion-header>
  <ion-navbar text-center>
    <product-name-ion></product-name-ion>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>REMINDERS</p>
</ion-content>
`  
})
export class RemindersPage {

  constructor(public navCtrl: NavController) {

  }

}
