import { WizardStep } from "./wizard-step";
import { eStepDirection } from "./step-direction";

/**
 * Custom event for when a step is changed.  Includes what direction
 * caused the change of step - this is useful so the callee can act
 * appropriately depending the direction the wizard is being moved. 
 */
export class StepChangeEvent {
	/** Step we were previously on (this maybe null if we're just starting) */
	prevStep: WizardStep;
	
	/** Step we've navigated "to" */
	currStep: WizardStep;
	
	/** Direction the step change took (back, forward or direct) */
	direction: eStepDirection = eStepDirection.eEmpty;

	
	constructor(prevStep: WizardStep, nextStep: WizardStep) {
		this.prevStep = prevStep;
		this.currStep = nextStep;
		this.setDirection();	
	}


	/**
	 * Evaluates whether the change of step was forwards, backwards, etc.
	 */
	setDirection(): void {
		if (this.prevStep === null || this.currStep === null) {
			this.direction = eStepDirection.eEmpty;
		} else if (this.currStep.index > this.prevStep.index) {
			this.direction = eStepDirection.eForward;
		} else if (this.currStep.index < this.prevStep.index) {
			this.direction = eStepDirection.eBackward;
		} else if (this.currStep.index === this.prevStep.index) {
			this.direction = eStepDirection.eNoChange;
		} else {
			throw new Error(`StepChangeEvent::setDirection - Step change from "${this.prevStep.index}" to "${this.currStep.index}" is not valid.`)
		}
	}
	
}