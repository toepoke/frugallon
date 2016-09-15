import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable()
export abstract class BasePage {
	// protected _appStore: Store<MyStore> = null;
	
	// constructor(appStore: Store<MyStore>) {
	// 	this._appStore = appStore;
	// }
	
	// protected get AppState(): AppState {
	// 	return this._appStore.getState().appStateReducer;
	// }
	
	// protected get UiState(): UiState {
	// 	return this._appStore.getState().uiStateReducer;
	// }
	
	// protected get EventState(): EventState {
	// 	return this._appStore.getState().eventStateReducer;
	// }

// IN CASE WE NEED THIS LATER	
		// this._appStore.subscribe((reds: MyStore) => {

		// });
	
	
}