/**
 * When a change of step takes place, this describes the direction
 * the change took.  This may be relevant for the scenario you're capturing
 */
export enum eStepDirection {
	eEmpty = 0,
	eNoChange = -1,	// covers initialisation

	/** Step change went forward multiple steps */
	eForward = 1,
	
	/** Step change went backwards multiple steps */
	eBackward = 2

}

