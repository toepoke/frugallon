/**
 * KeyItem defines the data for the segment inputs into the control.
 * Use this if you want a different prompt and value, otherwise just use a string.
 */
export class KeyItem {
	/** 
	 * Prompt that the user should see. 
	 */
	public Prompt: string = "";
	
	/** 
	 * Associated data for the item (typically some kind of unique identifier).
	 * Note: All Values in the segments should be unique.
	 */
	public Value: any = null;
	
	constructor(prompt: string, value: any) {
		this.Prompt = prompt;
		this.Value = value;
	}
}
