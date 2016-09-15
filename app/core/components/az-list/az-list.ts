import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, Control } from '@angular/common';

import { IONIC_DIRECTIVES } from "ionic-angular";
import { COMPONENT_STRATEGY } from "../../../strategy";
import * as _ from "../../helpers/underscore";
import * as ditto from "../../helpers/ditto";

// Internal dependencies
import { AzGroup } from "./az-group";
import { AzSelectedItem } from "./az-selected-item";

@Component({
	selector: 'alpha-list',
	changeDetection: COMPONENT_STRATEGY,
	directives: [IONIC_DIRECTIVES],
	template: `
		<ion-item-group *ngFor="let g of _groups"> 
			<ion-item-divider favorite>{{g.key}}</ion-item-divider>
			
			<ion-item *ngFor="let v of g.values" (click)="_onSelect(g.key, v, g)">
				{{v}}
			</ion-item>
		</ion-item-group>
`,
})


/**
 * AlphaList
 *  Given an array of strings, the component will group them according to their initial letters.
 *  Given list _must_ be sorted appropriately before inputting into the component.
 * 
 * @remarks: Master ionic component:
 *   http://ionicframework.com/docs/v2/components/#list-dividers 
 */
export class AzList implements OnInit {
	@Input() items: Array<string> = null;
	@Output() onSelect: EventEmitter<AzSelectedItem> = new EventEmitter<AzSelectedItem>();

	// Holds the alphabetical grouping data for rendering the view
	_groups: Array<AzGroup>;

	ngOnInit() {
		// Map the items into a set of "A"-"Z" groups
		this._groups = this.calculateDividerPositions(this.items);
	}
	

	/**
	 * Reports back to the caller which item (and group the item belongs to) to the caller 
	 */
	_onSelect(key: string, value: string, group: AzGroup): void {
		let selected: AzSelectedItem = new AzSelectedItem(value, group);

		this.onSelect.emit(selected);
	}

	ngOnChanges(changes: any) {
		// items.items.currentValue
		if (changes && changes.items && changes.items.currentValue ) {
			this._groups = this.calculateDividerPositions(changes.items.currentValue);
		}
	}

	/**
	 * Calculations the groups of alphabetical items, for rendering in the view. 
	 */
	calculateDividerPositions(items: Array<string>): Array<AzGroup> {
		let groups: Array<AzGroup> = new Array<AzGroup>();
		let currGroup: AzGroup = null;
		let lastItem: string = null;
		let addLastGroup: boolean = true;

		if (!ditto.any(items)) {
			// create a single group 
			let currGroup = new AzGroup();
			currGroup.key = "null";
			currGroup.values = new Array<string>();
			groups.push(currGroup);
			return groups;
		}

		// Use a random string to ensure the first entry into the list doesn't
		// ... match the current iterator (basically handles the "first time in scenario")
		lastItem = "_!(*&)";

		for (let i = 0; i < items.length; i++) {
			let item: string = items[i];

			if (_.isNullOrEmpty(item)) {
				throw new Error("calculateDividerPositions - item at position " + i + " is null/empty.");
			}

			if (item[0] !== lastItem[0]) {
				// new group
				currGroup = new AzGroup();
				currGroup.key = item[0];
				currGroup.values = new Array<string>();
				groups.push(currGroup);

				if (ditto.last(items)) {
					// if this is the final item in the list, we don't want it adding AGAIN
					// ... when we exit the loop
					addLastGroup = false;
				}
			}

			currGroup.values.push(item);
			lastItem = item;
		}
		if (addLastGroup) {
			groups.push(currGroup);
		}		

		return groups;
	}
}
