import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { AppDatabase } from '../bricks/db2/app-database';

@Component({
  template: 
  `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(
    platform: Platform,
    private _appDb: AppDatabase
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.initialiseApp();
    });
  }

  initialiseApp(): void {
    this._appDb.primeDb()
      .then(() => console.log("database primed."))
      .catch((err: any) => console.error(err))
    ;
  }

}
