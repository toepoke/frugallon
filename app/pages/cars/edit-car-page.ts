import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Type } from "@angular/core";
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Page, NavController, NavParams, Icon, IONIC_DIRECTIVES, TextInput, Content } from 'ionic-angular';

import { Settings } from "../../bricks/models";
import { Store } from "@ngrx/store";
import { IAppState } from "../../bricks/stores/iapp-state";
import { Observable } from "rxjs/Observable";
import * as ACTIONS from "../../bricks/stores/actions/actions";

import { Car, CarMaker } from "../../bricks/models";
// import { CarMakersDb, CarsDb } from "../../bricks/services/db";
import { DbCmdFailure } from '../../core/db2';
import { CarMakerDb, CarDb } from "../../bricks/services/db2";

import { ColourPickerIon, ColourSet } from "../../bricks/components";
import { COMPONENT_STRATEGY } from "../../strategy";

import { AppValidators } from "../../core/validators";
import { Wizard, WizardStep, eStepDirection, StepChangeEvent, DigitPicker } from "../../core/components";
import { AzList, AzSelectedItem, AzGroup } from "../../core/components";
import * as _ from "../../core/helpers/underscore";
import * as ditto from "../../core/helpers/ditto";

@Component({
	changeDetection: COMPONENT_STRATEGY,
	directives: [IONIC_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ColourPickerIon, DigitPicker, Wizard, WizardStep, AzList, Icon], 
	styles: [`
		.container {
			height: 530px;
			overflow-y: scroll;
		}
	`],
	template:
`
	<ion-content class="container">
		<wizard #wiz 
			[allow-cancel]="true" 
			[show-navigation]="_showNavigation" 
			(step-changed)="onStepChanged($event)"
			(finished)="onFinish($event)"
			(cancelled)="onCancel($event)">

			<wizard-step [name]="'TYPE'" [is-valid]="_selectedType !== ''">
				<ion-label>What type of vehicle?</ion-label>
				<ion-list>
					<ion-item *ngFor="let t of _vehicleTypes" (click)="onSelectType(t)">
						<ion-icon name="{{_getIconName(t)}}" item-left></ion-icon>
						{{_getTypeDescription(t)}}
						<ion-icon *ngIf="t === _selectedType" name="checkmark" item-right></ion-icon>
					</ion-item>
				</ion-list>
			</wizard-step>
		
			<wizard-step [name]="'MAKE'" [is-valid]="isMakeStepValid()">
				<ion-list>
					<ion-item *ngIf="showMakePicker()" (click)="onMakerNotListed()">
						Not Listed
					</ion-item>
				</ion-list>
				<form *ngIf="!showMakePicker()" [formGroup]="_makeForm" novalidate>
					<div class="fru-mandatory">					
						<ion-label [class.error]="!_make.valid">What make is it?</ion-label>
						<ion-input type="text" clearInput formControlName="_make"></ion-input>
						<span class="mandatory">*</span>
						<div class="clr"></div>
					</div>
					<div>					
						<p *ngIf="_make.hasError('required')" class="error-message">
							Make is required.
						</p>
					</div>
				</form>
				<alpha-list *ngIf="showMakePicker()" [items]="_makes" (onSelect)="onSelectedMake($event)"></alpha-list>
			</wizard-step>

			<wizard-step [name]="'MODEL'" [is-valid]="isModelStepValid()">
				<ion-list>
					<ion-item *ngIf="showModelPicker()" (click)="onModelNotListed()">
						Not Listed
					</ion-item>
				</ion-list>
				<form *ngIf="!showModelPicker()" [formGroup]="_modelForm" novalidate>
					<div class="fru-mandatory">
						<ion-label [class.error]="!_model.valid">What model is it?</ion-label>
						<ion-input type="text" clearInput formControlName="_model"></ion-input>
						<span class="mandatory">*</span>
						<div class="clr"></div>
					</div>
					<div>					
						<p *ngIf="_model.hasError('required')" class="error-message">
							Model is required.
						</p>
					</div>
				</form>
				<alpha-list *ngIf="showModelPicker()" [items]="_models" (onSelect)="onSelectedModel($event)"></alpha-list>
			</wizard-step>			

			<wizard-step [name]="'COLOUR'" [is-valid]="isColourStepValid()">
				<ion-label>Pick a colour to identify your {{_selectedType.toLowerCase()}}?</ion-label>
				<colour-picker [colours]="_colours" [selected-colour]="_selectedColour" (on-select)="_onColourSelect($event)"></colour-picker>
			</wizard-step>
			
			<wizard-step [name]="'MILEAGE'" [is-valid]="_mileageForm.valid">
				<form [formGroup]="_mileageForm" novalidate>
					<div>					
						<ion-label>What's the mileage? (optional)</ion-label>
						<ion-input type="tel" class="number" formControlName="_mileage"></ion-input>
					</div>
					<div>
						<digit-picker [value]="_mileage.value" (changed)="onMileageChange($event)"></digit-picker>
					</div>
					<div>					
						<p *ngIf="_mileage.hasError('range')" class="error-message">
							Between <strong>1</strong> and <strong>3,000,000</strong>.
						</p>
						<p *ngIf="_mileage.hasError('maxdecimals')" class="error-message">
							Only to 2 decimal places.
						</p>
					</div>
				</form>
			</wizard-step>
			
		</wizard>	
	</ion-content>		
`,
})

export class EditCarPage {
	// Notes
	//  - Turn Wizard navigation off, but still re-use the capabilities
	//  - This allows the page to take full screen mode when selecting make / model
	//  - Wizard next/back is then in the control of "this page" rather than the wizard
	
	// Car Model: 
	// id: number = null;
	// isDefault: boolean = false;
	// type: string = "";
	// make: string = "";
	// model: string = "";
	// colour: string = "";
	// mileage: number = null;	
	
	@ViewChild(Wizard) _wizard: Wizard = null;
	@ViewChild(Content) content: Content;

	private _app: Observable<IAppState> = null;

	private _title: string = "";
	private _car: Car = null;
		
	private _showNavigation: boolean = true;

	/**
	 * true => Editing existing car
	 * false => New car being added
	 */
	private _editMode: boolean = false;

	// Type
	private _vehicleTypes: Array<string> = null;
	private _selectedType: string = "";
	
	// Make
	private _knownMake: boolean = true;	
	private _makes: Array<string> = new Array<string>();
	private _make: FormControl = null;
	private _makeForm: FormGroup = null;
	
	// Model
	private _knownModel: boolean = true;	
	private _models: Array<string> = new Array<string>();
	private _model: FormControl = null;
	private _modelForm: FormGroup = null;

	// Colour
	private _selectedColour: string = "";
	private _colours: ColourSet = null;
	
	// Mileage
	private _mileage: FormControl = null;
	private _mileageForm: FormGroup = null;


	constructor(
		private _navParams: NavParams,
		private _nav: NavController,
		private _store: Store<IAppState>, 
		private _carMakerDb: CarMakerDb,
		private _carDb: CarDb,
		fb: FormBuilder
	) {
		this._vehicleTypes = Car.getTypes();
		this._colours = Car.getAvailableColours();

		this._createForms();

		this._app = <Observable<IAppState>> _store.select("appState");
		this._app.subscribe((data: IAppState) => {
			if (this._car === null) {
				this._car = data.editingCar;
				this._loadCar();
			}
		});
		
	} // constructor
	
	private _loadCar(): void {
		
		// update the UI to reflect he selected car
		this._selectedType = this._car.type;
		this._selectedColour = this._car.colour;
		this._make.updateValue(this._car.make);
		this._model.updateValue(this._car.model);
		// as we're editing, just let them edit the underlying string
		// ... will be confusing giving the user the wizard at this point
		this._knownMake = this._knownModel = false;
		if (this._car.mileage === 0)
			this._mileage.updateValue("");
		else 
			this._mileage.updateValue(this._car.mileage);
		
		this._editMode = (this._car.id !== null);
		
	} // _loadCar


	/**
	 * Fired when the wizard step changes.
	 */
	private onStepChanged(newStep: StepChangeEvent): void {
		this._setTitle(newStep.currStep.name);

		if (newStep.prevStep.name === "COLOUR" && newStep.direction === eStepDirection.eBackward && this._knownModel) {
			// Show the text-edit version rather than the picker
			this._knownMake = this._knownModel = false;
		}

		this._showNavigation = true;
		if (newStep.currStep.name === "MAKE" && this.showMakePicker()) {
			this._showNavigation = false;
			this.content.scrollToTop();
		}
		if (newStep.currStep.name === "MODEL" && this.showModelPicker()) {
			this._showNavigation = false;
			this.content.scrollToTop();
		}
		
	} // onStepChanged


	/**
	 * Fired when the user finishes the wizard
	 */	
	private onFinish(): void {
		// Pass data back
		let action: string = "";
		
		this._car.type = this._selectedType;
		this._car.make = this._make.value;
		this._car.model = this._model.value;
		this._car.colour = this._selectedColour;
		this._car.mileage = Number(this._mileage.value);		

		// this._car = this._carsDb.saveCar(this._car);
		this._carDb.save(this._car)
			.then((saved: Car) => {
				this._car = saved;
				this._nav.pop();
			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;
		
		// this._nav.pop();
				
	} // onFinish


	/**
	 * Fired when the user cancels the wizard (via the cancel button). 
	 */	
	private onCancel(): void {
		this._nav.pop();
	
	} // onCancel


	// **************************
	// Wizard Step: Vehicle Type

	/**
	 * Fired when the type of vehicle is selected. 
	 */	
	private onSelectType(type: string): void {
		if (this._selectedType === type)
			// untoggle
			this._selectedType = "";
		else
			// toggle on 
			this._selectedType = type;
		
		// filter the manufacturer to the relevant type
		// this._makes = this._carMakersDb
		// 	.getMakers(this._selectedType)
		// 	.map((cm) => cm.manufacturer)
		// ;
		this._carMakerDb.getByType(this._selectedType)
			.then((makers: Array<CarMaker>) => {
				this._makes = makers.map((cm: CarMaker) => cm.manufacturer);
				
				// Vehicle type has been changed, so anything entered is no longer valid
				this._selectedColour = "";
				this._knownMake = this._knownModel = true;	// Bring the make/model wizard back
				this._make.updateValue("");
				this._model.updateValue("");
				this._mileage.updateValue(null);

			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;
		
	
	} // onSelectType

	
	// **************************
	// Wizard Step: Vehicle Make

	private onSelectedMake(selected: AzSelectedItem): void {
		let selectedManufacturer: CarMaker = null;
		
		this._make.updateValue(selected.selectedValue);
		
		// Find the set of models
		// selectedManufacturer = this._carMakersDb.findMaker(this._selectedType, selected.selectedValue);

		this._carMakerDb.getByMaker(this._selectedType, selected.selectedValue)
			.then((maker: CarMaker) => {
				if (_.isNull(selectedManufacturer)) {
					throw new Error(`EditCarPage::onSelectedMake - Could not find manufacturer for type("${this._selectedType}", manufacturer("${selectedManufacturer})")`);
				}
				this._models = selectedManufacturer.models;
				
				// we have the make, now ask for the model
				this._wizard.goNext();

			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;			
		
	
	} // onSelectedMake	


	private isMakeStepValid(): boolean {
		if (this._knownMake) 
			return true;
		else 
			return this._make.valid;	
	
	} // isMakeStepValid


	private showMakePicker(): boolean {
		return this._knownMake;
	
	} // showMakePicker 


	private onMakerNotListed(): void {
		this._knownMake = false;
		this._showNavigation = true;
		
		// if we don't know the make, we aren't going to know the model!
		this.onModelNotListed();
		// TODO: Nav to past the selection process
		
	} // onMakerNotListed


	// **************************
	// Wizard Step: Vehicle Model

	private onSelectedModel(selected: AzSelectedItem): void {
		// Make & model selected, so we're done!
		this._model.updateValue(selected.selectedValue);
		
		this._wizard.goNext();
		
	} // onSelectedModel
	
	
	private isModelStepValid(): boolean {
		if (this._knownModel) 
			return true;
		else 
			return this._model.valid;
				
	} // isModelStepValid


	private showModelPicker(): boolean {
		return this._knownModel;
		
	} // showModelPicker


	private onModelNotListed(): void {
		this._knownModel = false;
		this._showNavigation = true;
		// TODO: Nav to past the selection process
		
	} // onModelNotListed
	
	
	// ***************************
	// Wizard Step: Vehicle Colour

	private isColourStepValid(): boolean {
		return this._selectedColour && this._selectedColour.length > 0;
		
	} // isColourStepValid
	
	
	private _onColourSelect(colour: string): void {
		this._selectedColour = colour;
	
	} // _onColourSelect
	
	
	// ***************************
	// Wizard Step: Vehicle Mileage
	private onMileageChange(value): void {
		// we only use one numeric picker in this wizard
		this._mileage.updateValue(value);
		
	} // onMileageChange


	/**
	 * Wires up the validators for the form steps
	 */
	private _createForms(): void {
		// define FormControls separately so we can short-cut references in the component view
		this._make = new FormControl("", [<any>Validators.required]);
		this._model = new FormControl("", [<any>Validators.required]);
		this._mileage = new FormControl("", [
			<any>Validators.required,
			// 1..3,000,000 (world record is 3 million miles!)
			<any>AppValidators.range(1, 3000000),
			<any>AppValidators.maxDecimals(2)
		]);

		this._makeForm    = new FormGroup({ _make: this._make });
		this._modelForm   = new FormGroup({ _model: this._model	});
		this._mileageForm = new FormGroup({	_mileage: this._mileage	});

	} // _createForms
	

	/**
	 * Sets the toolbar title, appropriate for the step we're on.
	 */
	private _setTitle(forStepName: string): void {
		let vehicleType: string = this._selectedType.toLowerCase();
		
		switch (forStepName) {
			case    "TYPE": this._title = `Type of vehicle?`;                                            break;
			case    "MAKE": this._title = `What make of ${vehicleType}?`;                                break;
			case   "MODEL": this._title = `What model of ${this._make.value} Model?`;                  break;
			case  "COLOUR": this._title = `Pick a colour for your ${this._selectedType.toLowerCase()}:`; break;
			case "MILEAGE": this._title = `Current mileage (optional):`;                                 break;
		}
		
	} // _setTitle
	
	
	private _getIconName(forType: string): string {
		return Car.getIconName(forType);
		
	} // _getIconName
	
	
	private _getTypeDescription(forType: string): string {
		return Car.getTypeDescription(forType);
		
	} // _getTypeDescription

} // EditCarPage
