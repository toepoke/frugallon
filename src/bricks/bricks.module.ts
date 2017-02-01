import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CoreModule } from '../core/core.module';

import { ProductNameIon, CarListIon, CarPickerIon, FillSummaryIon, FillListIon } from './components';

const COMPONENTS: any[] = [
	ProductNameIon,
	CarListIon,
	CarPickerIon,
	FillSummaryIon,
	FillListIon
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
