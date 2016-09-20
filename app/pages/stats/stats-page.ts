// Vendor imports
import { Component } from '@angular/core';
import { NavController, IONIC_DIRECTIVES } from 'ionic-angular';

// Core imports 

// Application imports
import { ORCHESTRATOR_STRATEGY } from "../../strategy";
import { Settings } from "../../bricks/models/settings";
import { ProductNameIon, AppHeaderIon } from "../../bricks/components";

@Component({
	changeDetection: ORCHESTRATOR_STRATEGY,
	directives: [IONIC_DIRECTIVES, ProductNameIon, AppHeaderIon],
	template:
`
		<app-header-ion [show-filter-menu]="true"></app-header-ion>
		
		<ion-content class="content animated fadeIn medium">
			<p>Charts</p>
		
		</ion-content>
`,
})

export class StatsPage {

	constructor() {
	}

}
