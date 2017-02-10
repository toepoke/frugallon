import { Component } from '@angular/core';

import { FillUpPage } from '../fill-up/fill-up';
import { HistoryPage } from '../history/history';
import { RemindersPage } from '../reminders/reminders';
import { MyCarsPage } from '../my-cars/my-cars';

@Component({
  template:
`
<ion-tabs>
  <ion-tab [root]="tab1Root" tabTitle="Fill Up" tabIcon="color-fill"></ion-tab>
  <ion-tab [root]="tab2Root" tabTitle="History" tabIcon="list"></ion-tab>
  <ion-tab [root]="tab3Root" tabTitle="Reminders" tabIcon="clock"></ion-tab>
  <ion-tab [root]="tab4Root" tabTitle="My Cars" tabIcon="car"></ion-tab>
</ion-tabs>
`  
})
// Tabs aren't really pages, hence we don't inherit from "BasePage".
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FillUpPage;
  tab2Root: any = HistoryPage;
  tab3Root: any = RemindersPage;
  tab4Root: any = MyCarsPage;

  constructor() {

  }
}
