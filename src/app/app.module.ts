import { NgModule, ErrorHandler } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { appStateReducer, AppActions, filterStateReducer, FilterActions } from '../bricks/stores';
import { AppDatabase, DbProviders } from '../bricks/db2';
import { FilterService, FillUpService } from '../bricks/services/';
import { CarMakerDb, CarDb, SettingDb, MpgStatDb, FillUpDb, FiltersDb } from '../bricks/db2';
import { AboutPage, FillUpPage, HistoryPage, RemindersPage, CarListPage, TabsPage } from '../pages';
import { MyApp } from './app.component';


const DB_NAME: string = 'frugallon';
const DB_PROVIDER: number = DbProviders.DETECT;

let carMakerDb: CarMakerDb = new CarMakerDb(DB_NAME, DB_PROVIDER);
let carDb: CarDb = new CarDb(DB_NAME, DB_PROVIDER);
let settingDb: SettingDb = new SettingDb(DB_NAME, DB_PROVIDER);
let mpgStatDb: MpgStatDb = new MpgStatDb(DB_NAME, DB_PROVIDER);
let fillUpDb: FillUpDb = new FillUpDb(DB_NAME, DB_PROVIDER);
let filtersDb: FiltersDb = new FiltersDb(DB_NAME, DB_PROVIDER);

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
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore(
      { appState: appStateReducer },
      { filterState: filterStateReducer }
    )
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
    { provide: CarDb, useValue: carDb },
    { provide: SettingDb, useValue: settingDb },
    { provide: MpgStatDb, useValue: mpgStatDb },
    { provide: FillUpDb, useValue: fillUpDb },
    { provide: FiltersDb, useValue: filtersDb },
    AppDatabase,
    AppActions, FilterActions,
    FilterService, FillUpService    
  ]
})
export class AppModule {

}


