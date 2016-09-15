import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control } from '@angular/common';

import { IONIC_DIRECTIVES, Content } from "ionic-angular";
import { Car, CarMaker } from "../../models";
import { AzList, AzSelectedItem } from "../../../core/components";
import * as _ from "../../../core/helpers/underscore";
import { COMPONENT_STRATEGY } from "../../../strategy";

@Component({
	selector: 'car-picker-ion', 
	changeDetection: COMPONENT_STRATEGY,
	styles: [`
		.container {
			height: 500px;
			overflow-y: scroll;
		}
	`],
	directives: [IONIC_DIRECTIVES, AzList],
	template:
`
	<div class="container">
		<div *ngIf="_showMakes">
			<alpha-list [items]="_makes" (onSelect)="onSelectedMake($event)"></alpha-list>
		</div>

		<div *ngIf="!_showMakes">
			<alpha-list [items]="_models" (onSelect)="onSelectedModel($event)"></alpha-list>
		</div>
	</div>
`,
})

				
export class CarPickerIon implements OnInit {
	@ViewChild(Content) content: Content;
	@Input("car-makers") carMakers: Array<CarMaker> = null;
	@Input("curr-car") currCar: Car = new Car();
	@Output("on-change") onChange: EventEmitter<Car> = new EventEmitter<Car>();

	/** Prompt to show for the current pane */
	_title: string = "Make:";
	
	/** Which pane is being shown */
	_showMakes: boolean = true;

	_makes: Array<string> = new Array<string>();
	_models: Array<string> = new Array<string>();
	
	ngOnInit() {
		this._makes = this.carMakers.map((cm) => cm.manufacturer);
		this._resetView();
	}
	
	/**
	 * Resets the view back to how it should when first loaded
	 * ... so we're prepared when showing the view next time
	 */
	_resetView(): void {
		this._toggleView(true/* Make pane */);
	}

	/**
	 * Swaps between the two panes (make and model)
	 */
	_toggleView(showMakes: boolean): void {
		this._showMakes = showMakes;
		this._title = (this._showMakes ? "Make:" : "Model:");
		if (!_.isNull(this.content)) {
			// scroll to top as we've moved panes
			// ... the isNull check covers the first time the view is initialised when the content
			// ... component hasn't been added to the page yet
			this.content.scrollToTop();
		}
	}
	
	onSelectedMake(selected: AzSelectedItem): void {
		// Find the models for the selected car manufacturer
		this._models = this.carMakers
			.find((cm) => cm.manufacturer === selected.selectedValue)
			.models
		;
			
		// And flip the flag to show the next bit
		this._toggleView(false);
		
		// And note what manufacturer was selected
		this.currCar.make = selected.selectedValue;
	}	
	
	onSelectedModel(selected: AzSelectedItem): void {
		// Make & model selected, so we're done!
		this.currCar.model = selected.selectedValue;
		
		this.onChange.emit(this.currCar);
	}
	
	

	
}

