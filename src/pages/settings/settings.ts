import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Settings, ePages } from '../../bricks/models';
import { SettingDb, DbCmdFailure } from './../../bricks/db2';
import { AppActions, IAppState } from '../../bricks/stores';
import { BasePage } from '../_base-page/base-page';
import { AppService } from '../../bricks/services';

import { NavController, Alert, AlertController, Toast, ToastController } from 'ionic-angular';

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
export class SettingsPage extends BasePage {
	private _app$: Observable<IAppState> = null;

  constructor(
		store: Store<IAppState>,
    appActions: AppActions,
    protected _navCtrl: NavController,
    protected _alertCtrl: AlertController,
    protected _toastCtrl: ToastController,
    protected _appService: AppService,
    protected _settingDb: SettingDb
  ) {
    super(store, appActions, ePages.Settings);

		this._app$ = <Observable<IAppState>> store.select("appState");
		this._app$.subscribe((data: IAppState) => {
		});
  }

	protected ionViewDidEnter(): void {
		super.onViewDidEnter();
	}

	protected ionViewDidLeave(): void {
		super.onViewPop();
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
        let toast: Toast = this._toastCtrl.create({
          message: 'Setting saved',
          duration: 1500
        });
        toast.present();
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
