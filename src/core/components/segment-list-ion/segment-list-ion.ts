import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SegmentButton } from "ionic-angular";
import { KeyItem } from "./key-item";
import * as _ from "../../helpers/underscore";

@Component({
	selector: "segment-list-ion",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ion-segment [hidden]="!showControl()" [(ngModel)]="selectedValue" (click)="onSegmentClick($event)" (ionChange)="onSegmentChanged($event)">
			<button ion-button clear [hidden]="!showNavigation()" [disabled]="!enablePrev()" (click)="goPrev()">
				<ion-icon name="{{prevIcon}}"></ion-icon>
			</button>
			<ion-segment-button [hidden]="!showSegment(i)" *ngFor="let s of segments; let i = index" value="{{getValue(s)}}">
				{{getPrompt(s)}}
			</ion-segment-button>
			<button ion-button clear [hidden]="!showNavigation()" [disabled]="!enableNext()" (click)="goNext()">
				<ion-icon name="{{nextIcon}}"></ion-icon>
			</button>
		</ion-segment>
	`
})

export class SegmentListIon implements OnInit {
	@Input() segments: Array<any> = new Array<any>();
	@Input("selected-value") selectedValue: string = "";	// KeyItem.Value
	@Input("show-when-single") showWhenSingle: boolean = true;
	@Input("max-visible") maxVisible: number = 3;
	@Input("next-icon") nextIcon: string = "arrow-forward";
	@Input("prev-icon") prevIcon: string = "arrow-back";
	@Output() select: EventEmitter<any> = new EventEmitter<any>();

	private windowStart: number = 0;
	private windowFinish: number = 0;
	
	constructor() {
	}

	ngOnInit() {
		if (this.segments && this.segments.length > 0) {
			if (!this.selectedValue || this.selectedValue == "") {
				// gotta start somewhere
				this.selectedValue = this.getValue(this.segments[0]);
			}
		}
		// TODO: have we got duplicate values? (must be unique list)
		this.calcWindow();
	}


	/**
	 * Gets the value associated with a segment.
	 * This is so we can use either a "KeyItem" or just "string"s.  
	 */	
	getValue(input: any): string {
		if (input instanceof KeyItem) {
			return (<KeyItem>input).Value;
		} else {
			return input.toString();
		}
	}
	

	/**
	 * Gets the prompt associated with a segment.
	 * This is so we can use either a "KeyItem" or just "string"s.  
	 */	
	getPrompt(input: any): string {
		if (input instanceof KeyItem) {
			return (<KeyItem>input).Prompt;
		} else {
			return input.toString();
		}
	}
	

	/**
	 * Fired when the user hits one of the segment buttons
	 */
	protected onSegmentChanged(btn: SegmentButton): void {
		if (_.isNull(btn))
			return;
		if (_.isNull(btn.value))
			return;

		let value: any = btn.value;

		this.handleSegmentChange(value);

	}


	/**
	 * HACK: 
	 * The "onSegmentChanged" randomly stops firing, but the "click" seems reliable.
	 * Repurposing the "click" event as a handler :-(
	 */
	onSegmentClick(evt: any) {
		let value: string = evt.target.innerText;

		if (_.isNumeric(value)) {
			this.handleSegmentChange(value);
		}
	}
	

	/**
	 * Handles another segment being selected.
	 */
	protected handleSegmentChange(value: string): void {
		let selected: any = this.segments.find((s: any) => this.getValue(s) == value);

		// And report back ...
		this.select.emit(selected);
	}
	

	/**
	 * Flags whether a given segment is inside the _viewable_ window of segments.
	 */
	protected showSegment(index: number) {
		let show: boolean = false;
		
		if (index >= this.windowStart && index <= this.windowFinish) {
			// inside the viewable area, so yes, show it
			show = true;
		}

		return show;
	}
	
	
	/**
	 * Flags whether the segment-list control should be shown in the UI.
	 * For instance if there are no segments defined it makes no sense to show the control.
	 * If there is only 1 segment, it's arguable whether the control should still be shown
	 * (as we may wish to use it as a title of the section in the ui).
	 * By default 1 is shown, but you can turn this off with the "showWhenSingle" input.
	 */
	protected showControl(): boolean {
		let show: boolean = true;
		
		if (!this.segments || this.segments.length === 0) {
			// no segments, no point showing the control
			show = false;
		} else if (this.segments.length === 1 && !this.showWhenSingle) {
			// there's only one item in the segment list and we're 
			// ... configured not to show when there's only one item
			show = false;
		}
		
		return show;
	}
	
	
	/**
	 * Flags whether the back and forward arrows should be shown in the
	 * segment bar.
	 * This is when there is sufficient space to show all the segments
	 * such that the navigation will never be used (so doesn't make sense to 
	 * show it)
	 */
	protected showNavigation(): boolean {
		let show: boolean = true;
		
		if (this.segments.length <= this.maxVisible) {
			show = false;
		}
		
		return show;
	}
	
	
	/**
	 * Flags whether the back arrow is enabled or disabled.
	 * If the _front_ of the window is already in view, there's nothing to go back to.
	 */
	protected enablePrev(): boolean {
		let show: boolean = true;

		if (this.segments.length <= this.maxVisible) {
			// all segments are viewable in the window
			// ... navigation isn't required
			show = false;
		} else if (this.windowStart === 0) {
			// first segment is also first item in window
			// ... back not appropriate
			show = false;
			 
		}
			
		return show;
	}
	
	
	/**
	 * Flags whether the forward arrow is enabled or disabled.
	 * If the _end_ of the window is already in view, there's nothing to move forward into.
	 */
	protected enableNext(): boolean {
		let show: boolean = true;

		if (this.segments.length <= this.maxVisible) {
			// all segments are viewable in the window
			// ... navigation isn't required
			show = false;
		
		} else if (this.windowFinish === this.segments.length-1) {
			// last segment is also last item in the window 
			// ... forward not appropriate
			show = false;
		}
		
		return show;
	}
	
	
	/**
	 * Moves the viewable _window_ back one step
	 */
	protected goPrev(backBy: number = 1): void {
		if (!this.enablePrev()) {
			// already at start of list and window
			return;
		}
		
		// Just move the window back one position
		this.windowStart -= backBy;
		this.windowFinish -= backBy;
	
	} // goBack
	
	
	/**
	 * Moves the viewable _window_ forward one step
	 */
	protected goNext(forwardBy: number = 1): void {
		if (!this.enableNext()) {
			// already at end of list and window
			return;
		}
		
		// Just move the window on one position
		this.windowStart += forwardBy;
		this.windowFinish += forwardBy;

	} // onNext


	/**
	 * Calculates the _viewable_ window area.  For instance if we have 20 segments, but we
	 * only want to see 3 at a time (see "maxVisible" input) our _viewable_ window
	 * could be items 11..13 or 1..3, etc.
	 */
	protected calcWindow(): void {
		for (let i: number=0; i < this.segments.length; i++) {
			let curr: any = this.segments[i];
			
			if (this.getValue(curr) == this.selectedValue) {
				this.windowStart = i;
				this.windowFinish = (this.windowStart + (this.maxVisible-1));
				// done
				break;
			}
		} // for

		// If the starting "selectedValue" is near the end we can end up with a window of just 1 element
		// ... not much use, so let's fix that
		if (this.windowFinish >= this.segments.length) {
			this.windowFinish = this.segments.length-1;
			this.windowStart = (this.windowFinish - this.maxVisible)+1;
		}

	} // calcWindow
	
}
