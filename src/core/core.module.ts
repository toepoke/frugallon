import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { AzList, DigitPickerIon, SegmentList, Wizard, WizardStep } from './components/'

@NgModule({
	imports: [
		CommonModule,
		IonicModule
	],
	declarations: [
		AzList,
		DigitPickerIon,
		SegmentList,
		Wizard,
		WizardStep
	],
	exports: [
		AzList,
		DigitPickerIon,
		SegmentList,
		Wizard,
		WizardStep
	]
})
export class CoreModule {
}
