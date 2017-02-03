import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { StepChangeEvent } from "./step-change-event";
import { WizardStep } from "./wizard-step";

@Component({
	selector: 'wizard', 
	// Note: We're not using "OnPush" as the changes between the wizard, steps and the calling
	// UI are too complex - read - I've gave up :-)
	changeDetection: ChangeDetectionStrategy.Default,
	styles: [`
		.toolbar {
			background-color: transparent;
		}
		.fancy1 {
			border: 0;
			height: 3px;
			width: 80%;
			background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #7492EA, rgba(0, 0, 0, 0));						
		}
	`],
	template:`
		<!--<ion-content>-->
			<ng-content></ng-content>
		<!--</ion-content>-->
		
		<hr class="fancy1" />
		
		<!-- 
			TODO: Surround the above ng-content with ion-content to force
			the toolbar to the bottom
			 <ion-toolbar position="bottom">
		-->
		<div class="toolbar" [hidden]="!showNavigation">
			<!-- lhs -->
			<div>
				<button ion-button type="submit" [hidden]="!showCancel()" (click)="onCancel()">
					Cancel
				</button>
			</div>
			
			<!-- rhs -->
			<div>
				<button ion-button type="submit" [hidden]="!showBack()" (click)="goBack()">
					<ion-icon name="arrow-back"></ion-icon>&nbsp;Back
				</button>				

				<button ion-button light type="submit" [hidden]="!showSkip()" (click)="goSkip()">
					Skip
				</button>				
			
				<button ion-button [disabled]="!isStepValid()" type="submit" [hidden]="!showNext()" (click)="goNext()">
					Next&nbsp;<ion-icon name="arrow-forward"></ion-icon>
				</button>				

				<button ion-button secondary type="submit" [disabled]="!isStepValid()" [hidden]="!showFinish()" (click)="onFinish()">
					Finish
				</button>				
			</div>
				
		</div>
		
`,
})

export class WizardIon {
	@ContentChildren(WizardStep) _steps: QueryList<WizardStep>;
	/** Flags user can cancel out of the wizard at any time */
	@Input("allow-cancel") allowCancel: boolean = false;
	
	/** For scenarios where the infrastructure of the wizard is being used, but not necessarily the navigation */
	@Input("show-navigation") showNavigation: boolean = true;
	
	/** Sets the starting step (if you know you need to skip the first step for instance) */
	@Input("initial-step") initialStep: number = 0;
	
	/** Fired when the "Finish" button is clicked */
	@Output() finished: EventEmitter<WizardIon> = new EventEmitter<WizardIon>();

	/** Fired when the "Cancel" button is clicked - "allowCancel" must be true. */
	@Output() cancelled: EventEmitter<WizardIon> = new EventEmitter<WizardIon>();
	
	/** Fired whent the step is changed (e.g. user hits "Next" or "Back"), 
	  * either by the user or programatically. */
	@Output("step-changed") stepChanged: EventEmitter<StepChangeEvent> = new EventEmitter<StepChangeEvent>();
	
	/**  
	 * Fired just before the user skips a wizard-step (allowing the callee to null out any data)
	 * Note: if the are any validation rules against the step, these are ignored 
	*/
	@Output("step-skipped") stepSkipped: EventEmitter<WizardStep> = new EventEmitter<WizardStep>();
	
	/** Flags when the control has finished initialisation */
	private _isReady: boolean = false;
	
	/** Tracks which step we're on */
	private _currentStep: number = 0;


	/**
	 * Initialises the wizard control. 
	 */	
	protected ngAfterContentInit(): void {
		if (this.initialStep && this.initialStep !== this._currentStep) {
			// Wizard consumer wants to skip to a given step in the process
			this._currentStep = this.initialStep;
		}

		// Wire up the step indexes, so we know which step we're in! 
		let activeSteps = null;
		let allSteps = this._steps.filter((step) => true);

		// So we know which step is which!		
		allSteps.forEach((step: WizardStep, index: number) => {
			step.index = index;
		});

		// Initially no steps are the active ones 		
		activeSteps = this._steps.filter((step) => step.active);
		
		// Control fully loaded and primed and so can be used
		this._isReady = true;

		// Finally setup the active step (which may have been overriden by the user - see "initialStep") 		
		this.selectStep(this._currentStep);
	}


	/**
	 * Returns the step in the process we're currently on.
	 */	
	public getCurrentStep(): WizardStep {
		this.readyGuard("getCurrentStep");
		
		return this.getStep(this._currentStep);
	}
	

	/**
	 * Returns the "WizardStep" at the given index. 
	 */	
	protected getStep(atIndex: number): WizardStep {
		this.readyGuard("getStep");

		if (atIndex < 0 || atIndex > this._steps.length-1) {
			// guarding ... shouldn't happen
			throw new Error(`Wizard::getStep - ${atIndex} is invalid when there are ${this._steps.length} steps.`);
		}

		return this._steps.toArray()[atIndex];		
	}


	/**
	 * Allows the callee to change the active step. 
	 */	
	public selectStep(selectedStep: number): void {
		this.readyGuard("selectStep");

		if (selectedStep >= this._steps.length) {
			throw new Error(`${selectedStep} is outside the range of steps [0..${this._steps.length-1}]`);
		}
		if (!this._isReady && this._currentStep == selectedStep) {
			// already selected!
			return;
		}

		let prevStep: WizardStep = this.getCurrentStep();
		let evt: StepChangeEvent = null;

		// deactivate all steps
		this._steps.toArray().forEach(step => {
			step.active = false;
			
			if (step.index == selectedStep) {
				step.active = true;
				this._currentStep = step.index;
				
				evt = new StepChangeEvent(prevStep,this.getCurrentStep());
				this.stepChanged.emit(evt);
			}
		}); // forEach

	} 
	
	/**
	 * HACK: Forces Angular to refresh the view by quickly swapping steps around!
	 */
	public refresh(): void {
		let startingStep: number = this._currentStep;
		if (startingStep > 0) {
			this.selectStep(0);
			this.selectStep(startingStep);
			
		} else if (startingStep < this._steps.length-1) {
			this.selectStep(this._currentStep+1);
			this.selectStep(startingStep);			
		}
	}
	
	
	/**
	 * Ensures methods aren't called until control has been initialised 
	 */	
	protected readyGuard(forMethod: string) {
		if (!this._isReady) {
			// method should not be called until control has been initialised
			throw new Error(`${forMethod} should not be called until the control has initialised.`);
		}
	}

	
	/**
	 * Moves the wizard back a step
	 */
	public goBack(): void {
		this.readyGuard("goBack");

		if (this._currentStep < 1) 
			// shouldn't be able to do this (should be hidde), but just in case 
			return;
		
		let prevIndex: number = this._currentStep - 1;
		this.selectStep(prevIndex);
	}


	/**
	 * User has clicked the "Skip" button, so we skip the current step.
	 */
	public goSkip(): boolean {
		this.readyGuard("goSkip");
		
		this.stepSkipped.emit(this.getCurrentStep());
		
		// Skipping is basically the same as next
		let done: boolean = this.goNext();
		
		return done;
	}


	/**
	 * Moves to the next step. 
	 */
	public goNext(): boolean {
		this.readyGuard("goNext");
		if (this._currentStep > this._steps.length) 
			// shouldn't be able to do this (should be hidde), but just in case	
			return;
			
		let nextIndex: number = this._currentStep + 1;
		this.selectStep(nextIndex);
		
		return true;
	}
	
	
	/**
	 * Instructs the callee the user has cancelled the wizard. 
	 */	
	protected onCancel(): void {
		this.cancelled.emit(this);		
	}
	

	/**
	 * Flags whether the "Back" button should be available.
	 */
	protected showBack(): boolean {
		if (!this._isReady) {
			// Don't take into account until control has initialised
			return false;
		}
		
		return this._currentStep > 0;
	}
	
	
	/**
	 * Flags whether the "Cancel" button should be available. 
	 */
	protected showCancel(): boolean {
		if (!this._isReady) {
			// Don't take into account until control is initialised	
			return false;
		}
		
		return this.allowCancel;
	}


	/**
	 * Flags whether the "Skip" button should be available.
	 */
	protected showSkip(): boolean {
		if (!this._isReady) {
			// Don't take into account until control is initialised
			return false;
		}
		
		return this.getCurrentStep().allowSkip;
	}


	/**
	 * Flags whether the "Next" button should be shown.
	 * (e.g. not appopriate on the final/finish step).
	 */
	protected showNext(): boolean {
		if (!this._isReady) {
			// Don't take into account until control is initialised
			return false;
		}

		let show: boolean = true;

		if (this.showFinish()) {
			// "Next" makes no sense when we're on the "Finish" step
			show = false;
		}
		
		// Note: 
		// We don't check for the step being valid (see "isStepValid") because
		// we only want to disable the next button if we're in an invalid state (rather than hide it completely)

		return show;
	}


	/**
	 * Flags whether the "Finish" button should be shown.
	 * (i.e. the final/finish step is active). 
	 */	
	protected showFinish(): boolean {
		if (!this._isReady) {
			// Don't take into account until control is initialised
			return false;
		}
		
		return this._currentStep === this._steps.length-1;
	}
	
	
	/**
	 * Fired to the callee when the "Finish" button is clicked. 
	 */
	protected onFinish(): void {
		this.readyGuard("onFinish");
		
		this.finished.emit(this);
	}


	/**
	 * Flags whether the current step is considered valid [by the callee].
	 */
	protected isStepValid(): boolean {
		if (!this._isReady) {
			// Don't take into account until control is initialised
			return false;
		}

		let isValid: boolean = false;
		
		isValid = this.getCurrentStep().isValid;
		
		return isValid;
	}
	
}

