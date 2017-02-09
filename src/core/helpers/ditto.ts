/**
 * Module: "ditto" (coz the module delivers new objects, and uber [kinda used to] sounds cool!)
 * Description: Set of [generic] helper methods for doing [very simple!] immutable type for TypeScript/ES6
 * Tests: See set of noddy tests at ????
 * Source: https://gist.github.com/toepoke/fafa3cbe7f8592d6286237bebe43af19
 * Usage: 
 * 	"import * as ditto from './ditto';"
 *  ...
 *  ditto.updateItem( ... )
 * Revisions:
 *  #1 - Initial version
 *  #2 - Added further methods
 *  #3 - Added Object.assign inline polyfill.
 *     - Added "replaceAll" method 
 *     - "updateItem" now copies methods too 
 *     - Fixed quotes and tabs
 *  #3 - Added revision history (yup, this bit)
 *  #4 - Fix for "updateItem" not handling null current input
 *  #5 - Added "atLeast"
 */

/**
 * Returns a copy of the given item, applying any updates.
 * @param current - Object to return an updated version of
 * @param updates - Set of JSON updates to applies to the object copy
 */
export function updateItem<T>(current: T, updates: any): T {
	let propItems: T = null;

	if (current == null || current == undefined) {
		// just return the updated version
		return updates;
	}

	// This whole __proto__ thang copies over the methods too :-)
	// http://www.2ality.com/2014/01/object-assign.html
	propItems = Object.assign(
		{__proto__: (<any>current).__proto__},
		current,
		updates
	);

	return propItems;
}


/**
 * Returns position in the array of the item found by the predicate.
 * @param items - Array to search
 * @param predicate - function to evaluate which item in the array to find the position of
 */
export function indexOf<T>(items: Array<T>, predicate: (value: T) => boolean) {
	return items.findIndex(predicate);
}


/**
 * Returns true if there are any items in the given list 
 * Returns false if there are none (including if the list is null/undefined)
 * @param items - Array to check 
 */
export function any<T>(items: Array<T>): boolean {
	if (isNull(items))
		// might be null, but there still aren't any items!
		return false;

	return items.length > 0;
}


/**
 * Returns true if there is at least "N" items in the given list
 * Returns false otherwise
 */
export function atLeast<T>(items: Array<T>, n: number): boolean {
	if (!any(items)) {
		return false;
	}

	return items.length >= n;
}


/**
 * Returns true if there are no items in the array (including null/undefined)
 * Returns false if there are items in the array
 */
export function empty<T>(items: Array<T>): boolean {
	if (isNull(items))
		return true;

	return items.length === 0;
}


/**
 * Returns the last item in the array (if there are any items)
 * Returns null if there are no items
 * @param items - Array to check 
 */
export function last<T>(items: Array<T>): T {
	if (any(items)) {
		return items[items.length - 1];
	}

	return null;
}


/**
 * Returns first item in the array (if there are any items)
 * Returns null if there are no items
 * @param items - Array to check 
 */
export function first<T>(items: Array<T>): T {
	if (any(items)) {
		return items[0];
	}

	return null;
}


/**
 * Returns a new copy of the given array of items, replacing the item at "index" with
 * the new item, applying an defined updates.
 * @param items - Array we're updating
 * @param predicate (number) - When "predicate" is a number, the position in the array is used
 * @param predicate (callback) - When "predicate" is a callback, it's executed and the returned item used
 * @param itemUpdates - Changes to the object to apply (i.e. the updates we're making!)  
 */
export function updateList<T>(items: Array<T>, predicate: any, itemUpdates: any = null): Array<T> {
	let newList: Array<T> = new Array<T>();
	let index: number = 0;
	let newItem: T = null;
	let replacement: T = newItem;

	if (typeof predicate === 'number') {
		index = Number(predicate);
	} else {
		index = indexOf(items, predicate);
	}

	newItem = items[index];

	// make a pure copy of the original list
	newList.push(...items);

	if (!isNull(itemUpdates)) {
		replacement = updateItem(newItem, itemUpdates);
	}

	// replace the affected item
	newList.splice(index, 1, replacement);

	return newList;
}


/**
 * Returns a new array copy with "itemToAdd" appended to the end of the array.
 * @param items - Array to add an item to
 * @param itemToAdd - Item to add to the end of the array
 */
export function append<T>(items: Array<T>, itemToAdd: T): Array<T> {
	let newList: Array<T> = new Array<T>();
	newList.push(...items, itemToAdd);
	return newList;
}


/**
 * Returns a new array copy with "itemToInsert" at the start of the array.
 * @param items - Array to insert the item into
 * @param itemToInsert - Item to insert at the start of the array 
 */
export function prepend<T>(items: Array<T>, itemToInsert: T): Array<T> {
	let newList: Array<T> = new Array<T>();
	newList.push(itemToInsert, ...items);
	return newList;
}


/**
 * Returns a new array with 'n' items deleted.
 * @param items - Array to have elements removed from.
 * @param predicate (number) - When "predicate" is a number, the position in the array is used
 * @param predicate (callback) - When "predicate" is a callback, it's executed and the returned item used
 */
export function deleteItems<T>(items: Array<T>, predicate: any): Array<T> {
	let deletedItems: Array<T> = new Array<T>();
	let index: number = 0;

	if (typeof predicate === 'number') {
		index = Number(predicate);
	} else {
		index = indexOf(items, predicate);
	}

	if (index === -1) {
		// no match, no change was made to the list, so send back the original
		// ... this should prevent ui updates (e.g. ag2 OnPush) when no changes have happened
		return items;
	}

	// make a pure copy of the original list
	deletedItems.push(...items);

	// delete the offending index
	deletedItems.splice(index, 1);

	return deletedItems;
}


/** 
 * Returns a new array with all items replaced by newItems
 * @param newItems - Array to replace with
 */
export function replaceAll<T>(newItems: Array<T>): Array<T> {
	let replacedItems: Array<T> = new Array<T>();

	replacedItems.push(...newItems);

	return replacedItems;
}


/** Helpers */

/**
 * Returns true if "o" is null or undefined
 * Returns false otherwise
 */
function isNull(o: any): boolean {
	return !isPresent(o);
}

/**
 * Returns true if object "o" is not null (or undefined), i.e. there's a proper object there 
 * Returns false otherwise
 */
function isPresent(o: any): boolean {
	return o !== undefined && o !== null;
}


interface ObjectConstructor {
	assign(target: any, ...sources: any[]): any;
}

if (typeof Object.assign !== 'function') {
	(function () {
		Object.assign = function (target) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}

			let output = Object(target);
			for (let index = 1; index < arguments.length; index++) {
				let source = arguments[index];
				if (source !== undefined && source !== null) {
					for (let nextKey in source) {
						if (source.hasOwnProperty(nextKey)) {
							output[nextKey] = source[nextKey];
						}
					}
				}
			}
			return output;
		};
	})();
}

