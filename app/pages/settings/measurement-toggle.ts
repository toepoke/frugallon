// Vendor imports
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { IONIC_DIRECTIVES, Toggle } from 'ionic-angular';

// Core imports 

// Application imports
import { COMPONENT_STRATEGY } from "../../strategy";
import { IAppState } from "../../bricks/stores/iapp-state";

@Component({
	selector: 'measurement-toggle', 
	changeDetection: COMPONENT_STRATEGY,
	directives: [IONIC_DIRECTIVES, Toggle],
	template:`
		<ion-list>
			<span ion-item>
				<div item-left>
					<ion-label>{{getLabel(_measurement, _measurementType)}}</ion-label>
				</div>
				<div item-right>
					<ion-toggle #toggle (click)="onToggle($event)" [checked]="_measurement"></ion-toggle>
				</div>
			</span>
		</ion-list>
`,
})

export class MeasurementToggle {
	@ViewChild(Toggle) _toggle: Toggle = null;
	@Input("measurement") _measurement: boolean = true;
	@Input("measurement-type") _measurementType: string = "UK";
	@Output("on-toggle") _onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

	getLabel(measurement: boolean, measurementType: string) {
		if (measurement) {
			return `Metric (${measurementType}) measurement`;
		} else {
			return `Imperial (${measurementType}) measurement`;
		}
	}

	onToggle(evt): void {
		let newValue: boolean = this._toggle.checked;
		this._onToggle.emit(newValue);
	}	

}
