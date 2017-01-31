import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { FillUp, eFillUpType, Settings, Car, MpgStat } from "../../models";
import * as _ from "../../../core/helpers/underscore";

// TODO: [style.backgroundColor]="car.backgroundColour()" 

@Component({
	selector: 'fill-summary-ion', 
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
		.stat-value {
			color: #EF0000;	
			font-weight: bold;
		}
	`],
	template:`
		<ion-card *ngIf="car">
			<ion-card-header *ngIf="showHeader">
				You got <span class="stat-value">{{getMpg() | fixed}}</span> 
				<abbr title="miles per gallon">MPG ({{getMeasurementType()}})</abbr> this time.
			</ion-card-header>
			
			<ion-list>
				<ion-item *ngIf="showCar">
					<ion-icon [style.color]="car.colour" name="car" item-left></ion-icon>
					<span class="stat-value">{{car.make}} {{car.model}}</span>
				</ion-item>

				<ion-item *ngIf="showMpg">
					<ion-icon *ngIf="_isUnderAverage" class="mpg-bad"  name="sad"   item-left></ion-icon>
					<ion-icon *ngIf="_isAverage"      class="mpg-ok"   name="happy" item-left></ion-icon>
					<ion-icon *ngIf="_isAboveAverage" class="mpg-good" name="heart" item-left></ion-icon>

					<span class="stat-value">{{getMpg() | fixed}} <abbr title="miles per gallon">MPG ({{getMeasurementType()}})</abbr>
					</span>					
				</ion-item>
				
				<ion-item *ngIf="showMiles">
					<ion-icon name="speedometer" item-left></ion-icon>
					<span class="stat-value">{{fillUp.miles | commafy}}</span> miles travelled
				</ion-item>

				<ion-item *ngIf="showFillType">
					<ion-icon name="car" item-left></ion-icon>
					<span class="stat-value">{{getFillTypeDescription(fillUp.fillType)}}</span>
				</ion-item>
				
				<ion-item *ngIf="showLitres">
					<ion-icon name="color-fill" item-left></ion-icon>
					<span class="stat-value">{{fillUp.litres | commafy}}</span> litres filled
				</ion-item>

				<ion-item *ngIf="showCost">
					<ion-icon name="cash" item-left></ion-icon>
					<span class="stat-value">{{fillUp.price | nan | poundify | commafy}}</span> per litre
					<span *ngIf="fillUp.litres">
						(<span class="stat-value">{{fillUp.getTotal() | poundify | commafy}}</span>)
					</span>
				</ion-item>
				
				<ion-item *ngIf="showTotalMileage">
					<ion-icon name="globe" item-left></ion-icon>
					<span class="stat-value">{{car.mileage | nan | commafy}}</span> vehicle total mileage
				</ion-item>
			</ion-list>
			
		</ion-card>
	`
})

export class FillSummaryIon {
	@Input("fill-up") fillUp: FillUp = new FillUp();
	@Input() car: Car = null;
	@Input() measurement: boolean = true/*UK*/;
	@Input("show-header") showHeader: boolean = true;
	@Input("show-mpg") showMpg: boolean = false;			// header has same info and wins by default
	@Input("show-car") showCar: boolean = true;
	@Input("show-miles") showMiles: boolean = true;
	@Input("show-fill-type") showFillType: boolean = true;
	@Input("show-litres") showLitres: boolean = true;
	@Input("show-cost") showCost: boolean = true;
	@Input("show-total-mileage") showTotalMileage: boolean = true;
	
	_happyRating: number = 0;
	_mpg: number = 0;
	_stats: MpgStat = null;
	_isAboveAverage: boolean = null;
	_isAverage: boolean = null;
	_isUnderAverage: boolean = null;
	
	constructor() {
	}

	ngOnChanges(changes: any) {
		if (_.isNull(this.fillUp) || _.isNull(this.fillUp.id))
			// still initialising
			return;
			
		this._mpg = this.fillUp.getMpg(this.measurement);
		this._stats = this.fillUp.getMpgStats(this.measurement);
		this._happyRating = this._stats.getHappiness(this._mpg);
		this._isUnderAverage = this._stats.isUnderAverage(this._mpg);
		this._isAverage = this._stats.isAverage(this._mpg);
		this._isAboveAverage = this._stats.isAboveAverage(this._mpg);
	}
	
	getFillTypeDescription(ft: eFillUpType): string {
		return FillUp.getFillTypeDescription(ft);
	}

	getMeasurementType(): string {
		let type: string = "not known";
		
		type = (this.measurement ? "UK" : "US");
		
		return type;
	}
	
	getMpg(): number {
		if (_.isNull(this.fillUp)) {
			return 0;
		}
			
		return this.fillUp.getMpg(this.measurement);		
	}

}
