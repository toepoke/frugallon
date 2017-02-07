import { DbCmdFailure } from './../../core/typed-db/db-responses';
import { Settings } from './../../bricks/models/settings';
import { SettingDb } from './../../bricks/db2/setting-db';
import { AppActions } from './../../bricks/stores/actions/app.actions';
import { IAppState } from './../../bricks/stores/iapp.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
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
      <ion-item>
        <ion-label>{{(_app$|async)?.measurementType}} measurement</ion-label>
        <ion-toggle [checked]="(_app$|async)?.measurement" (ionChange)="onMeasureChange($event)"></ion-toggle>
      </ion-item>
      
      <ion-item>
        <ion-label>Nuke Database</ion-label>
        <button item-right ion-button color="danger" (click)="shouldNukeDatabase()">Nuke it!</button>
      </ion-item>
    </ion-list>

  </ion-content>
`  
})
export class SettingsPage {
	private _app$: Observable<IAppState> = null;
  private _app$subscription: Subscription = null;

  constructor(
    protected _navCtrl: NavController,
    protected _alertCtrl: AlertController,
    protected _appService: AppService,
    protected _settingDb: SettingDb,
		protected _store: Store<IAppState>,
    protected _appActions: AppActions
  ) {
		this._app$ = <Observable<IAppState>> _store.select("appState");
		this._app$.subscribe((data: IAppState) => {
		});
  }

  protected onMeasureChange(evt: any): void {
    let newMeasurement: boolean = evt.checked;

    this._settingDb.load()
      .then((current: Settings) => {
        current.measurement = newMeasurement;
        return this._settingDb.save(current);
      })
      .then(() => {
        this._store.dispatch(
          this._appActions.ChangeMeasurement( newMeasurement )
        );
      })
      .catch((fail: DbCmdFailure) => {
        // TODO:
      })
    ;
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

  } // nukeDatabase

}
