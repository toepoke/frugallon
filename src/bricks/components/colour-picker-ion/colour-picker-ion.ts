import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { NavController, Button, List, Item, Content, Toolbar } from "ionic-angular";
import * as _ from "../../../core/helpers/underscore";

@Component({
	selector: 'colour-picker-ion',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
		.colour-name {
			text-transform: lowercase;
		}
		.colour-list {
			margin: 0;
			padding: 0;
			text-align: center;
		}
		.colour-list::after {
			clear: both;
		}
		.colour-list-item {
			list-style: none;
			margin: 0.5rem; padding: 0;
			display: inline-block;
		}
		.colour-name-selector {
			width: 5rem;
    	height: 5rem;
			margin: 0.5rem;
		}
		.selected-colour {
			background-color: #AEB0FF;
		}
	`],	
	template:`
		<div class="container">
			<ul class="colour-list">
				<li *ngFor="let colour of getColours()" (click)="_onSelect(colour)" [class.selected-colour]="isSelectedColour(colour)" class="colour-list-item">
					<button ion-button large [style.background-color]="colour" class="colour-name-selector">
					</button>
				</li>
			</ul>
		</div>
`,
})

export class ColourPickerIon implements OnInit {
	@Input() colours: ColourSet = null;
	@Input("selected-colour") selectedColour: string = "";
	@Output("on-select") onSelect: EventEmitter<string> = new EventEmitter<string>();

	ngOnInit() {
		if (this.selectedColour == null) {
			this.selectedColour = "";
		}
		if (_.isNull(this.colours) || this.colours.size === 0) {
			throw new Error('ColourPickerIon - expected "colours" property which is not supplied.');
		}
	}


	/**
	 * Flags whether we're rendering the currently selected colour
	 * (which adds the background colour to signify which is selected) 
	 */
	isSelectedColour(currColour: string): boolean {
		return this.selectedColour === currColour;
	}


	/**
	 * Converts the CSV of colours into an actually array 
	 * to iterate over.  
	 */	
	getColours(): IterableIterator<string> {
		return this.colours.keys();
	}
	
	
	/**
	 * Fired when the user selects a colour
	 * (fires the selected colour back to the callee)
	 */
	_onSelect(colour: string) {
		this.selectedColour = colour;
		// Inform the caller of the new value		
		this.onSelect.emit(colour);
	}

}


export interface ColourSet extends Map<string, string> {
	
}