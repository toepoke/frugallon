import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { AzList, DigitPickerIon, SegmentList, Wizard, WizardStep, ColourPickerIon } from './components/'
import { CommafyPipe, FixedPipe, NanPipe, PoundifyPipe } from './pipes';

const COMPONENTS: any[] = [
	AzList,
	DigitPickerIon,
	SegmentList,
	Wizard,
	WizardStep,
	ColourPickerIon
];

const PIPES: any[] = [
	CommafyPipe,
	FixedPipe,
	NanPipe,
	PoundifyPipe
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule
	],
	declarations: [
		COMPONENTS,
		PIPES
	],
	exports: [
		COMPONENTS,
		PIPES
	]
})
export class CoreModule {
}
