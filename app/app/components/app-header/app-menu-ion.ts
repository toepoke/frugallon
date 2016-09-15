import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { IONIC_DIRECTIVES, MenuController, Modal, Nav, App } from 'ionic-angular';
import { COMPONENT_STRATEGY } from "../../../strategy";
import { ProductNameIon } from "../product-name/product-name-ion";
import { SettingsPage, AboutPage, AppNavigation } from "../../../pages/pages";
import { FillUp, eFillUpType, Settings } from "../../models";
import { Store, Action } from "@ngrx/store";
import { IAppState } from "../../../app/stores/iapp-state";
import { IFilterState } from "../../../app/stores/ifilter-state";
import { FilterMenuIon } from "./filter-menu-ion";
import { Observable } from "rxjs/Observable";

import * as ACTIONS from "../../stores/actions/actions";
import * as _ from "../../../core/helpers/underscore";

@Component({
	selector: "app-menu-ion",
	changeDetection: COMPONENT_STRATEGY,
	directives: [IONIC_DIRECTIVES, FilterMenuIon],
	styles: [
`
`
	],
	template:
`
		<ion-menu [content]="content" id="lhsMenu">
			<ion-toolbar>
				<ion-title>Menu</ion-title>
			</ion-toolbar>			
			<ion-content (click)="closeMenu()">
				<ion-list>
					<button ion-item (click)="openSettings()">Settings</button>
					<button ion-item (click)="openAbout()">About</button>
				</ion-list>	
			</ion-content>
		</ion-menu>
		
		<filter-menu-ion
			[content]="content"
			[years]="appState?.years"
			[cars]="appState?.cars"
			[filters-active]="filtersState?.filtersActive"
			[filters]="filtersState"
			(on-toggle-filters)="filtersActive.emit($event)"
			(on-change-filter)="filterChange.emit($event)"
		>
		</filter-menu-ion>
`,
})
 
export class AppMenuIon {
	/**
	 * Links the navigation control to the menu and vice versa
	 * Required so the events to open/close the menu will work.
	 */
	@Input() content: Nav;
	@Input("app-state") appState: IAppState;
	@Input("filters-state") filtersState: IFilterState;
	@Output("on-filters-active") filtersActive: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output("on-change-filter") filterChange: EventEmitter<Action> = new EventEmitter<Action>();

	private _fillTypes: Array<eFillUpType> = null;

	private _mpgOperators: Array<number> = new Array<number>(-1, 0, +1);
	
	constructor(
		private _menu: MenuController,
		private _store: Store<IFilterState>
	) {
		this._fillTypes = FillUp.getFillTypes();		
	}
	
	openSettings(): void {
		this.closeMenu();
		AppNavigation.toSettings(this.content);		
	}
	
	openAbout(): void {
		this.closeMenu();
		AppNavigation.toAbout(this.content);
	}
	
	closeMenu(): void {
		this._menu.close();
	}

}

