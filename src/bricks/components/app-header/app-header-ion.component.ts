// import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit, ElementRef} from '@angular/core';
// import { COMPONENT_STRATEGY } from "../../../strategy";
// import { ProductNameIon } from "./product-name-ion.component";

// @Component({
// 	selector: "app-header-ion",
// 	changeDetection: COMPONENT_STRATEGY,
// 	styles: [
// `
// 		.hidden {
// 			visibility: hidden;
// 		}
// 		.pseudo-back-button {
// 			position: absolute;
// 			top: 0px;
// 			left: 0px;
// 			width: 7rem;
// 			height: 5rem;			
// 		}
// `
// 	],
// 	template:
// `
// 	<ion-header>
// 		<ion-navbar hideBackButton="showBackButton">
// 			<div class="pseudo-back-button" *ngIf="showBackButton" (click)="_onBack()">
// 			</div>
// 			<button text-left [menuToggle]="lhsMenu" [class.hidden]="!showMainMenu">
// 				<ion-icon name="menu"></ion-icon>
// 			</button>
			
// 			<ion-title text-center>
// 				<product-name-ion></product-name-ion>
// 			</ion-title>
			
// 			<ion-buttons end>
// 				<button text-right menuToggle="rhsMenu" [class.hidden]="!showFilterMenu">
// 					<ion-icon name="funnel"></ion-icon>
// 				</button>
// 			</ion-buttons>
// 		</ion-navbar>
// 	</ion-header>
// `,
// })
 
// // HACK:
// // The back-button provided by Ionic doesn't have a way of capturing the event
// // so you can handle it in a custom manner:
// // https://github.com/driftyco/ionic/issues/6620
// // To work around this I've added a div over the top which gets the click before the 
// // built in one.  So we get the correct appearance, but our behaviour ... YUK! 
 
// export class AppHeaderIon implements OnInit {
// 	/** Shows/hides the main menu - typically this will be shown (hence defaults to true) */
// 	@Input("show-main-menu") showMainMenu: boolean = true;
	
// 	/** Shows/hides the filter menu - typically this won't be shown (hence defaults to false) */
// 	@Input("show-filter-menu") showFilterMenu: boolean = false;
	
// 	@Input("show-back") showBackButton: boolean = false;
	
// 	@Output("on-back") onBack: EventEmitter<void> = new EventEmitter<void>();
	 
// 	ngOnInit() {
// 		if (this.showBackButton && this.showMainMenu) {
// 			console.warn("Only 'show-back' or 'show-main-menu' can be active, 'show-back' has won on this occasion.");
// 			this.showMainMenu = false;
// 		}
// 	}
	
// 	_onBack(): void {
// 		this.onBack.emit(null);
// 	}
	

// }

