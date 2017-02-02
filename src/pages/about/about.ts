import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  template:
`

<ion-content padding>
  <p>ABOUT</p>
</ion-content>
`  
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

}
