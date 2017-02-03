import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: "input-hint-ion",
	changeDetection: ChangeDetectionStrategy.Default,
	styles: [
`
		:host {
			display: inline-block;
			width: 100%;
		}
		.input-hint-ion {
			background-color: #5BD0F3;
			padding: 4px 10px;
			border-radius: 5px;
			display: inline-block;
			width: 100%;
		}
		.badge {
			margin-right: 0.3rem;
		}
`
	],
	template:`
		<span class="input-hint-ion">
			<ion-badge class="badge">			
				<ion-icon name="information"></ion-icon>
			</ion-badge>
			<ng-content></ng-content>
		</span>
`,
})

export class InputHintIon {

}

