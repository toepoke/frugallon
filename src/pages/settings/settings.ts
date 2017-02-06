import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  template:
`
  <ion-content padding>
    <ion-header>
      <ion-navbar>
        <ion-title>Settings</ion-title>
      </ion-navbar>
    </ion-header>

    <p>SETTINGS</p>
  </ion-content>
`  
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {

  }

}
