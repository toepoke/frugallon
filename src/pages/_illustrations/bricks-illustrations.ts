import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl }  from '@angular/forms'
import { TimeService } from '../../core/services';
import { CoreValidators } from '../../core/validators/'
import { Car, CarMaker } from '../../bricks/models';


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

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.createForms(_formBuilder);
    this.createCars();
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

}
