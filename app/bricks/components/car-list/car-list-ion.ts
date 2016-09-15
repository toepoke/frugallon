import { Component, EventEmitter, ChangeDetectionStrategy, Input, Output, OnInit, ViewChild } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control } from '@angular/common';

import { IONIC_DIRECTIVES, Content } from "ionic-angular";
import { Car, CarMaker } from "../../models";
import { COMPONENT_STRATEGY, ORCHESTRATOR_STRATEGY } from "../../../strategy";
import { APP_PIPES } from "../../../core/pipes";
// import { AzList, AzSelectedItem } from "../../../core/components";
import * as _ from "../../../core/helpers/underscore";

@Component({
	selector: 'car-list-ion', 
	changeDetection: COMPONENT_STRATEGY,
	directives: [IONIC_DIRECTIVES],
	pipes: APP_PIPES, 
	template:
`
	<ion-list>
		<ion-item *ngFor="let c of cars">
			<ion-icon class="large" [style.color]="c.colour" [style.backgroundColor]="c.backgroundColour()" name="car" item-left></ion-icon>
			<ion-label class="no-left-offset">
				{{c.make}} {{c.model}} {{c.mileage | commafy:' - ({0} miles)'}}
			</ion-label>
			<div item-right>
				<button *ngIf="allowEdit"   small           (click)="_onEdit(c)">{{editButtonText}}</button>
				<button *ngIf="allowSelect" small secondary (click)="_onSelect(c)">{{selectButtonText}}</button>
				<button *ngIf="allowDelete" small danger    (click)="_onDelete(c)">{{deleteButtonText}}</button>
			</div>
		</ion-item>	
	</ion-list>
`,
}) 

				
export class CarListIon {
	// When setting the button text, remember to surround the [select-button-text] input with quotes, e.g.
	// 	[select-button-text]="'SELECT'"
	// Otherwise ag2 will think you're referencing a variable called SELECT

	@Input() cars: Array<Car> = null;
	@Input("allow-edit") allowEdit: boolean = false;
	@Input("allow-select") allowSelect: boolean = false;
	@Input("allow-delete") allowDelete: boolean = false;
	@Input("edit-button-text") editButtonText: string = "EDIT";
	@Input("select-button-text") selectButtonText: string = "SELECT";
	@Input("delete-button-text") deleteButtonText: string = "DELETE";
	@Output("on-edit") onEdit: EventEmitter<Car> = new EventEmitter<Car>();
	@Output("on-select") onSelect: EventEmitter<Car> = new EventEmitter<Car>();
	@Output("on-delete") onDelete: EventEmitter<Car> = new EventEmitter<Car>();

	ngOnInit() {
	}

	_onEdit(c: Car): void {
		this.onEdit.emit(c);
	}
	_onDelete(c: Car): void {
		this.onDelete.emit(c);
	}
	_onSelect(c: Car): void {
		this.onSelect.emit(c);
	}

}

