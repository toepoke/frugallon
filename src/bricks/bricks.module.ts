import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CoreModule } from '../core/core.module';

import { ProductNameIon, CarListIon, CarPickerIon, FillSummaryIon, FillListIon } from './components';

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		CoreModule
	],
	declarations: [
		ProductNameIon,
		CarListIon,
		CarPickerIon,
		FillSummaryIon,
		FillListIon
	],
	exports: [
		ProductNameIon,
		CarListIon,
		CarPickerIon,
		FillSummaryIon,
		FillListIon
	]
})
export class BricksModule {

}
