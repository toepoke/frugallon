import { NgModule, ErrorHandler } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// Core
import { TimeService } from '../core/services';

// Components
import { CoreModule } from '../core/core.module';
import { BricksModule } from '../bricks/bricks.module';

import { appStateReducer, AppActions, filterStateReducer, FilterActions } from '../bricks/stores';
import { DbProviders } from '../bricks/db2';
import { AppService, FilterService, FillUpService } from '../bricks/services/';
import { CarMakerDb, CarDb, SettingDb, MpgStatDb, FillUpDb, FiltersDb } from '../bricks/db2';
import { CoreIllustrationsPage, BricksIllustrationsPage, AboutPage, SettingsPage, CarEditPage, FillUpPage, HistoryPage, MyCarsPage, RemindersPage, TabsPage } from '../pages';
import { MyApp } from './app.component';


const DB_NAME: string = 'frugallon';
const DB_PROVIDER: number = DbProviders.DETECT;

let carMakerDb: CarMakerDb = new CarMakerDb(DB_NAME, DB_PROVIDER);
let carDb: CarDb = new CarDb(DB_NAME, DB_PROVIDER);
let settingDb: SettingDb = new SettingDb(DB_NAME, DB_PROVIDER);
let mpgStatDb: MpgStatDb = new MpgStatDb(DB_NAME, DB_PROVIDER);
let fillUpDb: FillUpDb = new FillUpDb(DB_NAME, DB_PROVIDER);
let filtersDb: FiltersDb = new FiltersDb(DB_NAME, DB_PROVIDER);

// carDb.enableLogging();
// carMakerDb.enableLogging();
// fillUpDb.enableLogging();
// settingDb.enableLogging();
// mpgStatDb.enableLogging();
// filtersDb.enableLogging();

const PAGES: any[] = [
  MyApp,
  CoreIllustrationsPage,
  BricksIllustrationsPage,
  AboutPage,
  SettingsPage,
  CarEditPage,
  FillUpPage,
  HistoryPage,
  MyCarsPage,
  RemindersPage,
  TabsPage
];

@NgModule({
  declarations: [
    PAGES
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore({
      appState: appStateReducer,
      filterState: filterStateReducer
    }),
    CoreModule,
    BricksModule
  ],
  exports: [
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PAGES
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: CarMakerDb, useValue: carMakerDb },
    { provide: CarDb, useValue: carDb },
    { provide: SettingDb, useValue: settingDb },
    { provide: MpgStatDb, useValue: mpgStatDb },
    { provide: FillUpDb, useValue: fillUpDb },
    { provide: FiltersDb, useValue: filtersDb },
    AppService,
    AppActions, FilterActions,
    TimeService, FilterService, FillUpService    
  ]
})
export class AppModule {

}


