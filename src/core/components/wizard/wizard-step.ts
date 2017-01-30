import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'wizard-step',
	// Note: We're not using "OnPush" as the changes between the wizard, steps and the calling
	// UI are too complex - read I've gave up :-)
	changeDetection: ChangeDetectionStrategy.Default,
	styles: [`
		.pane {
			margin: 2rem 1rem;
		}
	`], 
	template:`
		<div [hidden]="!active" class="pane">
			<ng-content></ng-content>
		</div>
`,
})

export class WizardStep { 
	/** Flags the step is the active one in the wizard process. */
	@Input() active: boolean = false;
	
	/** The wizard step number in the process */
	@Input() index: number = 0;
	
	/** Flags that this step can be skipped by the user */
	@Input("allow-skip") allowSkip: boolean = false;
	
	/** Flags that the content of the step is valid. 
	 *  This is decided by the callee as it understands what's valid for the step.
	*/
	@Input("is-valid") isValid: boolean = true;
	
	/**
	 * Allows a description to be put against a step, mainly to make debugging easier
	 */
	@Input() name: string = "";

}
