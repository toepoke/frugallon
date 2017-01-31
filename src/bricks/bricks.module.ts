import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { CoreModule } from '../core/core.module';

import { ProductNameIon, CarListIon } from './components';

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		CoreModule
	],
	declarations: [
		ProductNameIon,
		CarListIon
	],
	exports: [
		ProductNameIon,
		CarListIon
	]
})
export class BricksModule {

}
