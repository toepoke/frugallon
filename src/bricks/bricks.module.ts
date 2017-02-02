import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CoreModule } from '../core/core.module';

import { 
	ProductNameIon,
	MyCarsIon, 
	CarPickerIon, 
	FillSummaryIon, 
	FillListIon, 
	MainMenuIon, 
	FilterMenuIon
} from './components';

const COMPONENTS: any[] = [
	ProductNameIon,
	MyCarsIon,
	CarPickerIon,
	FillSummaryIon,
	FillListIon,
	MainMenuIon, 
	FilterMenuIon
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		CoreModule
	],
	declarations: [
		COMPONENTS
	],
	exports: [
		COMPONENTS
	]
})
export class BricksModule {

}
