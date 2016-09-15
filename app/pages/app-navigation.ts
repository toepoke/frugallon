import { Type } from "@angular/core";
import { NavController } from 'ionic-angular';
import * as Pages from "./pages";

/**
 * HACK:
 * In essence this abstracts away the knowledge of navigating to a page (more specifically a tabs page).
 * Sadly I couldn't get the injection working, hence the NavController is passed in.
 */
export class AppNavigation {

	static toFillUp(nav: NavController): void {
		this.toTabPage(nav, Pages.FillUpPage);
	}
	
	static toHistory(nav: NavController): void {
		this.toTabPage(nav, Pages.HistoryPage);
	}
	
	static toStats(nav: NavController): void {
		this.toTabPage(nav, Pages.StatsPage);
	}
	
	static toMyCars(nav: NavController): void {
		nav.push(Pages.CarListPage);
	}
	
	static toAbout(nav: NavController): void {
		nav.push(Pages.AboutPage);
	}
	
	static toSettings(nav: NavController): void {
		nav.push(Pages.SettingsPage);
	}
	
	static toEditCar(nav: NavController): void {
		nav.push(Pages.EditCarPage);		
	}
	
	
	
	
	/**
	 * HACK:
	 * Tried putting this into it's own class, but ran into DI
	 * issues that I couldn't resolve :-()
	 */
	static toTabPage(nav: NavController, page: Type): void {
		let tabIndex: number = Pages.TabsPage.getTabIndexForPage(page);
		//nav.push(Pages.TabsPage, {tabIndex: tabIndex});
		nav.setRoot(Pages.TabsPage, {tabIndex: tabIndex});
	}
	
	
}

