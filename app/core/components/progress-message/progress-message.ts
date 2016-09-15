import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { COMPONENT_STRATEGY } from "../../../strategy";

@Component({
	selector: 'progress-message', 
	changeDetection: COMPONENT_STRATEGY,
	directives: [],
	styles: [`
		.modalify {
			position: absolute;
			z-index: 100000;
			width: 100%; height: 100%;
			background-color: #222;
			opacity: 0.9;
		}
		.msg {
			color: red;
			font-size: xx-large;
			margin-top: 40%;
			text-align: center;
		}	
	`],
	template:`
		<div class="modalify" *ngIf="showMe()">
			<p class="msg">{{message}}</p>
		</div>
	`,
})

export class ProgressMessage {
	@Input() message: string = "";

	showMe(): boolean {
		if (this.message === null || this.message === "") {
			return false;
		}
		return true;
	}

	constructor() {
	}

}
