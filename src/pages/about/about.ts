import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  template:
`
<ion-header>
  <ion-navbar>
    <ion-title>
      About
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>ABOUT</p>
</ion-content>
`  
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

}
