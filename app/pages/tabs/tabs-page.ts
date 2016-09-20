// Vendor imports
import { Component, Type, ViewChild } from "@angular/core";
import { Page, NavParams, NavController, Platform, MenuController, Nav, Tab, Tabs } from 'ionic-angular';

// Core imports 

// Application imports
import { COMPONENT_STRATEGY } from "../../strategy";
import { Settings } from "../../bricks/models/settings";
import { IAppState } from "../../bricks/stores/iapp-state";
import { ProductNameIon } from "../../bricks/components";

// Page imports
import { FillUpPage, HistoryPage, StatsPage, CarListPage} from "../pages";

export enum ePages {
	FillUp = 0,
	History = 1,
	Stats = 2,
	Cars = 3
}


@Component({
	changeDetection: COMPONENT_STRATEGY, 
	directives: [ProductNameIon],
	template:`
		<ion-tabs #appTabs [selectedIndex]="_currIndex" (ionChange)="onChange($event)">
			<ion-tab tabIcon="color-fill" tabTitle="Fill up" [root]="_fillUpPage"></ion-tab>
			<ion-tab tabIcon="list"       tabTitle="History" [root]="_historyPage"></ion-tab>
			<ion-tab tabIcon="stats"      tabTitle="Stats"   [root]="_statsPage"></ion-tab>
			<ion-tab tabIcon="car"        tabTitle="My Cars" [root]="_carsListPage"></ion-tab>
		</ion-tabs>			
`,
})
 
export class TabsPage {
	@ViewChild("appTabs") _appTabs: Tabs;
	private _currIndex: number = 0;
	private _fillUpPage: Type = FillUpPage;
	private _historyPage: Type = HistoryPage;
	private _statsPage: Type = StatsPage;
	private _carsListPage: Type = CarListPage;

	static __tabs: Array<string> = new Array<string>(
		"FillUpPage",
		"HistoryPage",
		"StatsPage",
		"CarListPage"
	);

	constructor(
		private _navParms: NavParams,
		private _menuController: MenuController,
		private _nav: Nav
	) {
		
		this._currIndex = _navParms.data.tabIndex || 0;
	}


	static getTabIndexForPage(p: Type): number {
		return TabsPage.__tabs.indexOf((<any>p).name);
	}


	/**
	 * Captures user changing the active tab, so we can communicate
	 * the change to the rest of the application.
	 */
	onChange(tab: Tab): void {
		// this._appStore.dispatch(
		// 	ACTIONS.PageChange(tab.root, tab.index)
		// );		
		
	}

	onPageDidEnter(): void {
		;
	}



}
