import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { CommafyPipe, FixedPipe, NanPipe, PoundifyPipe } from './pipes';

import { 
	AzListIon, 
	DigitPickerIon, 
	SegmentListIon, 
	WizardIon, WizardStep, 
	ColourPickerIon, 
	InputHintIon 
} from './components/'

const COMPONENTS: any[] = [
	AzListIon,
	DigitPickerIon,
	SegmentListIon,
	WizardIon,
	WizardStep,
	ColourPickerIon,
	InputHintIon
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
