import { AppService } from './../../bricks/services/app.service';
import { Component } from '@angular/core';

import { NavController, Alert, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  template:
`
  <ion-header>
    <ion-navbar>
      <ion-title>Settings</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content padding>

    <ion-list>
      <button ion-button color="danger" (click)="shouldNukeDatabase()">Nuke Database</button>
    </ion-list>

  </ion-content>
`  
})
export class SettingsPage {

  constructor(
    protected _navCtrl: NavController,
    protected _alertCtrl: AlertController,
    protected _appService: AppService 
  ) {

  }

  protected shouldNukeDatabase(): void {
    let confirmation: Alert = this._alertCtrl.create({
      title: "Nuke Database?",
      message: "Are you sure you want to start a fresh?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.nukeDatabase();            
          }
        }, {
          text: "No"
        }
      ]
    });

    confirmation.present();

  } // shouldNukeDatabase

  private nukeDatabase(): void {
    this._appService.nukeDb()
      .then(() => this._appService.primeDb() )    
      .then(() => {
        let acknowledge: Alert = this._alertCtrl.create({
          title: "Nuked!",
          message: "Application has been restored to defaults.",
          buttons: [{
            text: "Ok",
            handler: () => this._navCtrl.pop()
          }]
        });
        acknowledge.present();
      })
    ;
  }

}
