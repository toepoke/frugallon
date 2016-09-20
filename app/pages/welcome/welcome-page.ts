// Vendor imports
import { NavController, Tabs } from 'ionic-angular';
import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core"

// Core imports 

// Application imports
import { COMPONENT_STRATEGY } from "../../strategy";

// Page imports
import { ePages } from "../pages";
import { AppNavigation } from "../pages";

@Component({
	changeDetection: COMPONENT_STRATEGY,
	encapsulation: ViewEncapsulation.None,
	directives: [],
	styles: [`
		body {
			background-color: #31281F;
		}
	`],
	template:`
		<div class="container">			
			<div class="image"> 
				<img src="build/img/splash.png" />
			</div>
		</div>
`,
})

export class WelcomePage {

	constructor(
		private _nav: NavController
		) {

		// TODO: This _may_ become some kind of welcome page - in reality it's probably a spinner
		// of some sort.  It's here so we have this at the root page whilst the UI data gets loaded.
		// Currently the TabsPage is loaded, but we've missed the chance to update the UI so the TabsPage
		// doesn't have the correct data in it.
		// So we give the application time to start-up, THEN navigate to the tabs which will populate with the "primed" data.

		setTimeout(function() {
			AppNavigation.toFillUp(_nav);
		}, 900);
	}

}
