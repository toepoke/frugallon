import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl }  from '@angular/forms'
import { AzSelectedItem, Wizard } from '../../core/components';
import { TimeService } from '../../core/services';
import { CoreValidators } from '../../core/validators/'

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
    <ion-title>???</ion-title>
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

</ion-content>
`  
})
export class BricksIllustrationsPage {


  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.createForms(_formBuilder);

  }

  protected createForms(fb: FormBuilder): void {

  }

}
