import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { AzList, DigitPickerIon, SegmentList, Wizard, WizardStep, ColourPickerIon } from './components/'
import { CommafyPipe, FixedPipe, NanPipe, PoundifyPipe } from './pipes';

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
		WizardStep,
		CommafyPipe,
		FixedPipe,
		NanPipe,
		PoundifyPipe,
		ColourPickerIon
	],
	exports: [
		AzList,
		DigitPickerIon,
		SegmentList,
		Wizard,
		WizardStep,
		CommafyPipe,
		FixedPipe,
		NanPipe,
		PoundifyPipe,
		ColourPickerIon
	]
})
export class CoreModule {
}
