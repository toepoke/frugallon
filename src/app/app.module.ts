import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { FillUpPage } from '../pages/fill-up/fill-up';
import { HistoryPage } from '../pages/history/history';
import { RemindersPage } from '../pages/reminders/reminders';
import { CarListPage } from '../pages/car-list/car-list';
import { TabsPage } from '../pages/tabs/tabs';
import { AppDatabase, DbProviders } from '../bricks/';
import { CarMakerDb } from '../bricks/db2/car-maker-db';


const DB_NAME: string = 'frugallon';
const DB_PROVIDER: number = DbProviders.DETECT;

let carMakerDb: CarMakerDb = new CarMakerDb(DB_NAME, DB_PROVIDER);
 


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    FillUpPage,
    HistoryPage,
    RemindersPage,
    CarListPage,    
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    FillUpPage,
    HistoryPage,
    RemindersPage,
    CarListPage,
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: CarMakerDb, useValue: carMakerDb },
    AppDatabase
  ]
})
export class AppModule {}
