import { Type } from "@angular/core";
import { Middleware } from "@ngrx/store";
import 'rxjs/add/operator/do';

export const INITALISE_NGRX: string = "@@ngrx/INIT";
export const INITIALISE_APP: string = "INITIALISE_APP";

export const actionLog: Middleware = action => {
	return action.do(val =>{
		console.warn("DISPATCHED ACTION: ", val); 
	});
};

export const stateLog: Middleware = state => {
	return state.do(val => {
		console.info("NEW STATE: ", val);
	});
}


