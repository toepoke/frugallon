import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit } from '@angular/core';
import * as _ from "../../helpers/underscore";

@Component({
	selector: 'digit-picker',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
		@media only screen and (orientation : landscape) {
			.container {
				display: none;
			}	
		}
		.container {
			text-align: center;			
		}
		.spacer {
			display: inline-block;
			min-width: 3.9em;
		}
	`],	
	template:`
		<div class="container">
			<div>
				<button ion-button large (click)="onDigitPress('1')">1</button>
				<button ion-button large (click)="onDigitPress('2')">2</button>
				<button ion-button large (click)="onDigitPress('3')">3</button>
				<button ion-button large (click)="onDigitPress('4')">4</button>
			</div>
			<div>
				<button ion-button large (click)="onDigitPress('5')">5</button>
				<button ion-button large (click)="onDigitPress('6')">6</button>
				<button ion-button large (click)="onDigitPress('7')">7</button>
				<button ion-button large (click)="onDigitPress('8')">8</button>
			</div>
			<div>
				<button ion-button large (click)="onDigitPress('9')">9</button>
				<button ion-button large (click)="onDigitPress('0')">0</button>
				<button *ngIf="!wholeNumbersOnly" ion-button large (click)="onDigitPress('.')">&nbsp;.</button>
				<div *ngIf="wholeNumbersOnly" class="spacer" (click)="onDigitPress('.')"></div>				
				<button ion-button large (click)="onDigitPress('bs')">&lt;</button>
			</div>
		</div>
`,
})

export class DigitPickerIon implements OnInit {
	@Input() value: string = "";
	@Input("whole-numbers-only") wholeNumbersOnly: boolean = false;
	@Output() changed: EventEmitter<string> = new EventEmitter<string>();

	constructor() {
	}
	
	ngOnInit() {
		if (this.value == null) {
			this.value = "";
		}
	}
	
	onDigitPress(key: string) {
		if (_.isNull(this.value))
			this.value = "";
			
		switch (key) {
			case "bs":
				if (this.value && this.value.toString().length > 0) {
					this.value = this.value.toString().substr(0, this.value.toString().length-1);
				}
				break;

			case ".":
				if (!this.hasDecimalPoint()) {
					this.value += ".";
				}
				break;

			default:
				// should be a number digit
				this.value += key;
		}		

		// Inform the caller of the new value		
		this.changed.emit(this.value);
	}
	
	hasDecimalPoint(): boolean {
		return this.value.toString().indexOf(".") > -1;
	}
	
}
