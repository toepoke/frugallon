import {AzGroup} from "./az-group";

/**
 * Used for reporting back to the caller what item was selected.
 * "selectedValue" is the item the user _actually_ picked - This could be "Charlie" in the "C" letter group.
 * "group" is the group "C" items "Charlie" belongs in, so all the other "C" options
 */
export class AzSelectedItem {
	constructor(selectedValue: string, fromGroup: AzGroup) {
		this.selectedValue = selectedValue;
		this.group = fromGroup;
	}

	/** 
	 * The group the user was selected from 
	 * - i.e. if they selected "Casper" they implicitly selected the "C" group 
	 */
	group: AzGroup = null;

	/**
	 * The value within the group the user selected
	 * - i.e. They may select "Casper", which is in the "C" group
	 */
	selectedValue: string = "";
}

