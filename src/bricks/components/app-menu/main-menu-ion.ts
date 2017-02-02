import { Component } from '@angular/core';

@Component({
	selector: 'main-menu-ion',
	template: 
`
	<ion-content>
		<ion-title>Menu</ion-title>
		<ion-list>
			<button ion-item (click)="openSettings()">Settings</button>
			<button ion-item (click)="openAbout()">About</button>
		</ion-list>
	</ion-content>
`
})

export class MainMenuIon {
	
	protected openSettings(): void {
		console.log("Open settings");
	}

	protected openAbout(): void {
		console.log("Open about");
	}

}