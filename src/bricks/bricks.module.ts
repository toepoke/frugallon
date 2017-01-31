import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CoreModule } from '../core/core.module';

import { ProductNameIon, CarListIon, CarPickerIon, ColourPickerIon } from './components';

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
		ColourPickerIon
	],
	exports: [
		ProductNameIon,
		CarListIon,
		CarPickerIon,
		ColourPickerIon
	]
})
export class BricksModule {

}
