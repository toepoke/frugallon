import { Component, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AzSelectedItem, Wizard } from '../../core/components';

@Component({
  selector: 'page-illustrations',
  
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
  <p>Component illustrations</p>

  <div class="separator">
    <ion-title>AZ List</ion-title>
    <alpha-list [items]="_alphaItems" (onSelect)="onSelectedAlphaItem($event)"></alpha-list>
  </div>

  <div class="separator">
    <ion-title>The Wizard!</ion-title>
    <wizard [allow-cancel]="true" 
      [show-navigation]="true" 
      (step-changed)="onWizardStepChanged($event)"
      (finished)="onWizardFinish($event)"
      (cancelled)="onWizardCancel($event)">

      <wizard-step [name]="'GENDER'" [is-valid]="true">
        <ion-list>
          <ion-item>
            <ion-label>Male?</ion-label>
            <ion-checkbox checked="_step1gender"></ion-checkbox>
          </ion-item>
        </ion-list>      
      </wizard-step>

      <wizard-step [name]="'AGE'" [is-valid]="true">
        <ion-list>
          <ion-item>
            <ion-label>Age</ion-label>
            <ion-input type="number"></ion-input>
          </ion-item>
        </ion-list>       
      </wizard-step>        

    </wizard>
  </div>

  <div class="separator">
    <ion-title>Digit Picker</ion-title>
    <digit-picker [value]="_digitPickerValue" (changed)="onDigitChanged($event)"></digit-picker>
  </div>

  <div class="separator">
    <ion-title>Segment List</ion-title>
    <segment-list 
      [segments]="_years"
      [selected-value]="'2015'"
      (select)="onSegmentList_ChangeYear($event)">
    </segment-list>
  </div>

  <div class="separator">
    <ion-title>???</ion-title>
  </div>

  <div class="separator">
    <ion-title>Pipes!</ion-title>
    <ion-grid>
      <ion-row>
        <ion-col width-25 class="table-header">Value</ion-col>
        <ion-col width-25 class="table-header">Applied</ion-col>
        <ion-col width-50 class="table-header">Scenario</ion-col>
      </ion-row>

      <ion-row>
        <ion-col width-25>123456</ion-col>
        <ion-col width-25>{{123456 | commafy}}</ion-col>
        <ion-col width-50>Commafy</ion-col>
      </ion-row>

      <ion-row>
        <ion-col width-25>123.345</ion-col>
        <ion-col width-25>{{123.345678 | fixed}}</ion-col>
        <ion-col width-33>fixed (default)</ion-col>
      </ion-row>

      <ion-row>
        <ion-col width-25>123.345</ion-col>
        <ion-col width-25>{{123.345678 | fixed:'3'}}</ion-col>
        <ion-col width-50>fixed (3 points)</ion-col>
      </ion-row>

      <ion-row>
        <ion-col width-25>some string</ion-col>
        <ion-col width-25>{{'some string' | nan}}</ion-col>
        <ion-col width-50>nan - gives</ion-col>
      </ion-row>

      <ion-row>
        <ion-col width-25>123</ion-col>
        <ion-col width-25>{{123 | nan}}</ion-col>
        <ion-col width-50>nan - gives 123</ion-col>
      </ion-row>

      <ion-row>
        <ion-col width-25>123.456</ion-col>
        <ion-col width-25>{{123.456 | poundify}}</ion-col>
        <ion-col width-50>poundify gives £123.46</ion-col>
      </ion-row>
      
    </ion-grid>
  </div>  

</ion-content>
`  
})
export class IllustrationsPage {
  @ViewChild(Wizard) _wizard: Wizard = null;

  // For Pipe testing


  constructor(public navCtrl: NavController) {
    
    this._alphaItems = new Array<string>(
      ..."Abba,ACDC,Def Leppard,Deep Blue Sea".split(",")
    );
    this._years = new Array<string>(
      ..."2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020".split(",")
    );
    console.log(this._alphaItems, this._years);
  }

  protected _alphaItems: Array<string> = null;
  public onSelectedAlphaItem(selected: AzSelectedItem): void {
    console.log(`Selected ${selected.selectedValue}`);
  }

  protected _digitPickerValue: number = 0;
  public onDigitChanged(value: any): void {
    console.log(`Selected ${value}`);
  }

  protected _years: Array<string> = null;
  public onSegmentList_ChangeYear(value: string): void {
    console.log(`Selected ${value}`);
  }

  protected _step1gender: boolean = null;
  protected _step2age: number = null;
  public onWizardStepChanged(evt): void {
    console.log(`Wizard::StepChanged ${evt}`);
  }

  public onWizardFinish(evt): void {
    console.log(`Wizard::Finish ${evt}`);
  }

  public onWizardCancel(evt): void {
    console.log(`Wizard::Cancel ${evt}`);
  }

  

}
