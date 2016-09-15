import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IONIC_DIRECTIVES } from "ionic-angular";
import { COMPONENT_STRATEGY, ORCHESTRATOR_STRATEGY } from "../../../strategy";
import { FillUp, Car, MpgStat } from "../../../bricks/models";
import { APP_PIPES } from "../../../core/pipes";
import { SegmentList } from "../../../core/components";
import { FillSummaryIon } from "../fill-summary/fill-summary-ion";
import * as _ from "../../../core/helpers/underscore";
import { IAppState } from "../../../bricks/stores/iapp-state";

@Component({
	selector: "fill-list-ion", 
	changeDetection: COMPONENT_STRATEGY,
	pipes: [APP_PIPES],
	directives: [IONIC_DIRECTIVES, SegmentList, FillSummaryIon],
	styles: [`
		.mpg-badge {
			font-size: 1.6rem;
		}
	`],
	template:`
		<ion-list *ngIf="_history">

			<ion-card *ngFor="let f of _history" (click)="itemTapped($event, f)">
				<ion-item>
					<div item-left>
						<ion-icon class="large" [style.color]="f.car.colour" 
							[style.backgroundColor]="f.car.backgroundColour()" name="car"></ion-icon>	
					</div>
					<div item-center>
						{{getPrettyDate(f.when)}}
					</div>
					<div class="item-note" item-right>
						<ion-badge class="mpg-badge {{getBadgeClass(f, _measurement)}}" item-right>
							{{f.getMpg(_measurement) | fixed}}
						</ion-badge>

						<ion-icon *ngIf="showExpanded(f)" name="arrow-dropup"></ion-icon>
						<ion-icon *ngIf="!showExpanded(f)" name="arrow-dropdown"></ion-icon>
					</div>
				</ion-item>
				<ion-card-content *ngIf="showExpanded(f)">
					<fill-summary-ion 
						[fill-up]="f" 
						[car]="f.car" 
						[measurement]="_measurement"
						[show-header]="false"
						[show-mpg]="true"
						[show-car]="false"></fill-summary-ion>
				</ion-card-content>
			</ion-card>
		</ion-list>
`
})
export class FillListIon {
	@Input("history") _history: Array<FillUp> = new Array<FillUp>();
	@Input("show-fills") _showFills: Array<number> = new Array<number>();
	@Input("measurement") _measurement: boolean = true;

	@Output("on-toggle") _onToggle: EventEmitter<FillUp> = new EventEmitter<FillUp>();

	/**
	 * Can't use "_" directly from the template 
	 * - dunno why, just errors about "_" being undefined :-(
	 */
	getPrettyDate(d: Date): string {
		return _.toPrettyDate(d);		
	}


	/**
	 * Gets the appropriate class for the badge, depending on how
	 * good (or bad) the fill-up MPG is (against the average for the car).
	 */
	getBadgeClass(f: FillUp, measurement: boolean): string {
		let mpg: number = f.getMpg(measurement);
		let stats: MpgStat = f.getMpgStats(measurement);

		if (stats.isAboveAverage(mpg)) {
			return "mpgbadge-good";
		} else if (stats.isAverage(mpg)) {
			return "mpgbadge-ok";
		} else {
			return "mpgbadge-bad";
		}
	}


	/**
	 * Fired when the user hits the card to expand the detail section
	 */
	itemTapped(evt: any, f: FillUp) {
		this._onToggle.emit(f);
	}


	/**
	 * Establishes if the given fill up is in the list of fill-ups that should be expanded 
	 */
	showExpanded(f: FillUp) {
		if (_.isNull(this._showFills))
			return false;

		let expand: boolean = false;

		if (this._showFills.find((item: number) => item == f.id)) {
			expand = true;
		}

		return expand;
	}

}
