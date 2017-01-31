import { Component, ViewChild } from '@angular/core';
import { FormBuilder }  from '@angular/forms'
import { Car, CarMaker } from '../../bricks/models';
import { ColourSet } from '../../core/components';

@Component({
  selector: 'page-core-illustrations',
  
  styles: [`
    .separator {
      margin-bottom: 3rem;
      border: solid 1px silver;
    }
    .table-header {
      background-color: #387ef5;
      color: #fff;
    }
  `],
  template:
`
<ion-header>
  <ion-navbar text-center>
    <product-name-ion></product-name-ion>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <p>Bricks illustrations</p>


  <div class="separator">
    <ion-title>Car List</ion-title>
    <car-list-ion 
      [cars]="_cars"
      [allow-select]="true" [allow-edit]="true" [allow-delete]="true" 
      [select-button-text]="'select'" [edit-button-text]="'edit'" [delete-button-text]="'delete'" 
      (on-select)="onCarSelect($event)" (on-edit)="onCarEdit($event)" (on-delete)="onCarDelete($event)"
    ></car-list-ion>
  </div>

  <div class="separator">
    <ion-title>Colour Picker</ion-title>
    <colour-picker-ion
      [colours]="_colours"
      (on-select)="onColourPick($event)"
    ></colour-picker-ion>
  </div>  

  <div class="separator">
    <ion-title>Pipes</ion-title>
    <ion-grid>
      <ion-row>
        <ion-col width-25 class="table-header">Value</ion-col>
        <ion-col width-25 class="table-header">Applied</ion-col>
        <ion-col width-50 class="table-header">Scenario</ion-col>
      </ion-row>

    </ion-grid>
  </div>  

  <div class="separator">
    <ion-title>Car Makers</ion-title>
    <car-picker-ion 
      [car-makers]="_makers"
      (on-change)="onMakerSelect($event)"
    ></car-picker-ion>
  </div>

</ion-content>
`  
})
export class BricksIllustrationsPage {
  protected _cars: Array<Car> = null;
  protected _makers: Array<CarMaker> = null;
  protected _colours: ColourSet = null;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.createForms(_formBuilder);
    this.createCars();
    this.createColours();
  }

  protected createForms(fb: FormBuilder): void {

  }

  protected createCars(): void {
    let c: Car = new Car();
    c.id = 1;
    c.colour = "#bada55";
    c.make = "Vauxhall";
    c.model = "Corsa";
    c.mileage = 23456;
    this._cars = new Array<Car>();
    this._cars.push( c );

    
    this._makers = new Array<CarMaker>();
    this._makers.push( CarMaker.create("CAR", "Ford", "Mondeo,Capri,Focus,Orion"));
    this._makers.push( CarMaker.create("CAR", "Audi", "A1,A2,A3,A4,A5,A6,A7,80"));
    this._makers.push( CarMaker.create("CAR", "Austin", "Montego,Mini"));
  }

  protected createColours(): void {
		let offBlue: string = "#A6AFF7";
		let trans: string = "transparent";

    this._colours = new Map<string,string>([
      [ "black", trans ],
      [ "white", offBlue ],
      [ "grey", trans ],
      [ "blue", trans ],
      [ "red", trans ],
      [ "darkorange", trans ],
      [ "yellow", offBlue ],
      [ "green", trans ],
      [ "brown", trans ],
      [ "blueviolet", trans ],
      [ "firebrick", trans ],
      [ "hotpink", trans ],
      [ "cadetblue", trans ],
      [ "darkslateblue", trans ],
      [ "crimson", trans ],
      [ "darkgoldenrod", trans ],
      [ "gold", trans ],
      [ "lemonchiffon", offBlue ],
      [ "orangered", trans ],
      [ "sienna", trans ]
    ]);
  }

  protected onCarSelect(c: Car): void {
    console.log(`Car selected: ${c}`);
  }

  protected onCarEdit(c: Car): void {
    console.log(`Car Edit: ${c}`);
  }

  protected onCarDelete(c: Car): void {
    console.log(`Car Delete: ${c}`);
  }

  protected onMakerSelect(maker: any): void {
    console.log(`Maker: ${maker}`);
  }

  protected onColourPick(selected: any): void {
    console.log(`Colour: ${selected}`);
  }

}
