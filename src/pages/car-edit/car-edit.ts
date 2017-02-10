import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, Content, NavParams } from 'ionic-angular';

import { CoreValidators } from './../../core/validators';
import { WizardIon, StepChangeEvent, eStepDirection, ColourSet, AzSelectedItem } from '../../core/components';
import { IAppState, AppActions } from '../../bricks/stores';
import { Car, CarMaker, VehicleType, ePages } from '../../bricks/models';
import { BasePage } from '../_base-page/base-page';
import { CarDb, CarMakerDb, DbCmdFailure } from '../../bricks/db2';
import * as _ from '../../core/helpers/underscore';

@Component({
  selector: 'page-car-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "car-edit.html"
})
export class CarEditPage extends BasePage {

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
	
	@ViewChild(WizardIon) _wizard: WizardIon = null;
	@ViewChild(Content) content: Content;

	private _app$: Observable<IAppState> = null;
  private _app$subscription: Subscription = null;

	private _title: string = "";
	private _car: Car = null;
		
	private _showNavigation: boolean = true;

	/**
	 * true => Editing existing car
	 * false => New car being added
	 */
	private _editMode: boolean = false;

	// Type
	private _vehicleTypes: Array<VehicleType> = null;
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
		store: Store<IAppState>, 
		appActions: AppActions,
		private _navParams: NavParams,
		private _nav: NavController,
		private _carMakerDb: CarMakerDb,
		private _carDb: CarDb,
		fb: FormBuilder
	) {		
		super(store, appActions, ePages.EditCar);

		this.createForms();

		this._app$ = <Observable<IAppState>> this._store.select("appState");
		this._app$.subscribe((data: IAppState) => {
			if (_.isPresent(data)) {
				this._colours = data.colours;
				this._vehicleTypes = data.vehicleTypes;
			}
      if (_.isNull(this._car)) {
				this._car = data.editingCar;
				this.loadCar();
			}
		});
		
	} // constructor

	/**
	 * Ensure subscription is destroyed when view is removed from the DOM
	 * (otherwise => memory leaks!)
	 */
	protected ionViewDidUnload(): void {
		this._app$subscription.unsubscribe();
	}	

	protected ionViewDidEnter(): void {
		super.onViewDidEnter();
	}

	protected ionViewDidLeave(): void {
		super.onViewDidLeave();
	}	
	

	protected loadCar(): void {
		
		// update the UI to reflect he selected car
		this._selectedType = this._car.type;
		this._selectedColour = this._car.colour;		
		this._make.setValue(this._car.make);
		this._model.setValue(this._car.model);
		// as we're editing, just let them edit the underlying string
		// ... will be confusing giving the user the wizard at this point
		this._knownMake = this._knownModel = false;
		if (this._car.mileage === 0)
			this._mileage.setValue("");
		else 
			this._mileage.setValue(this._car.mileage);
		
		this._editMode = (this._car.id !== null);
		
	} // _loadCar


	/**
	 * Fired when the wizard step changes.
	 */
	protected onStepChanged(newStep: StepChangeEvent): void {
		this.setTitle(newStep.currStep.name);

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
	protected onFinish(): void {
		this._car.type = this._selectedType;
		this._car.make = this._make.value;
		this._car.model = this._model.value;
		this._car.colour = this._selectedColour;
		this._car.backgroundColour = this._colours.get(this._selectedColour);
		this._car.mileage = Number(this._mileage.value);		

		let isNew: boolean = false;
		isNew = (_.isNull(this._car.id) || this._car.id == 0);

		this._carDb.save(this._car)
			.then((saved: Car) => {
				this._car = saved;
				if (isNew) {
					this._store.dispatch(this._appActions.CarAdd(saved));
				}
				else {
					this._store.dispatch(this._appActions.CarSave(saved));
				}
				this._nav.pop();
			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;
		
	} // onFinish


	/**
	 * Fired when the user cancels the wizard (via the cancel button). 
	 */	
	protected onCancel(): void {
		this._nav.pop();
	
	} // onCancel


	// **************************
	// Wizard Step: Vehicle Type

	/**
	 * Fired when the type of vehicle is selected. 
	 */	
	protected onSelectType(vehicle: VehicleType): void {
		if (this._selectedType === vehicle.type)
			// untoggle
			this._selectedType = "";
		else
			// toggle on 
			this._selectedType = vehicle.type;
		
		this._carMakerDb.getByType(this._selectedType)
			.then((makers: Array<CarMaker>) => {
				this._makes = makers.map((cm: CarMaker) => cm.manufacturer);
				
				// Vehicle type has been changed, so anything entered is no longer valid
				this._selectedColour = "";
				this._knownMake = this._knownModel = true;	// Bring the make/model wizard back
				this._make.setValue("");
				this._model.setValue("");
				this._mileage.setValue(null);

			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;
		
	
	} // onSelectType

	
	// **************************
	// Wizard Step: Vehicle Make

	protected onSelectedMake(selected: AzSelectedItem): void {
		this._make.setValue(selected.selectedValue);
		
		this._carMakerDb.getByMaker(this._selectedType, selected.selectedValue)
			.then((maker: CarMaker) => {
				if (_.isNull(maker)) {
					throw new Error(`EditCarPage::onSelectedMake - Could not find manufacturer for type("${selected.selectedValue}")`);
				}
				this._models = maker.models;
				
				// we have the make, now ask for the model
				this._wizard.goNext();

			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;			
		
	
	} // onSelectedMake	


	protected isMakeStepValid(): boolean {
		if (this._knownMake) 
			return true;
		else 
			return this._make.valid;	
	
	} // isMakeStepValid


	protected showMakePicker(): boolean {
		return this._knownMake;
	
	} // showMakePicker 


	protected onMakerNotListed(): void {
		this._knownMake = false;
		this._showNavigation = true;
		
		// if we don't know the make, we aren't going to know the model!
		this.onModelNotListed();
		// TODO: Nav to past the selection process
		
	} // onMakerNotListed


	// **************************
	// Wizard Step: Vehicle Model

	protected onSelectedModel(selected: AzSelectedItem): void {
		// Make & model selected, so we're done!
		this._model.setValue(selected.selectedValue);
		
		this._wizard.goNext();
		
	} // onSelectedModel
	
	
	protected isModelStepValid(): boolean {
		if (this._knownModel) 
			return true;
		else 
			return this._model.valid;
				
	} // isModelStepValid


	protected showModelPicker(): boolean {
		return this._knownModel;
		
	} // showModelPicker


	protected onModelNotListed(): void {
		this._knownModel = false;
		this._showNavigation = true;
		// TODO: Nav to past the selection process
		
	} // onModelNotListed
	
	
	// ***************************
	// Wizard Step: Vehicle Colour

	protected isColourStepValid(): boolean {
		return this._selectedColour && this._selectedColour.length > 0;
		
	} // isColourStepValid
	
	
	protected onColourSelect(colour: string): void {
		this._selectedColour = colour;
	
	} // _onColourSelect
	
	
	// ***************************
	// Wizard Step: Vehicle Mileage
	protected onMileageChange(value): void {
		// we only use one numeric picker in this wizard
		this._mileage.setValue(value);
		
	} // onMileageChange


	/**
	 * Wires up the validators for the form steps
	 */
	protected createForms(): void {
		// define FormControls separately so we can short-cut references in the component view
		this._make = new FormControl("", [<any>Validators.required]);
		this._model = new FormControl("", [<any>Validators.required]);
		this._mileage = new FormControl("", [
			<any>Validators.required,
			// 1..3,000,000 (world record is 3 million miles!)
			<any>CoreValidators.range(1, 3000000),
			<any>CoreValidators.maxDecimals(2)
		]);

		this._makeForm    = new FormGroup({ _make: this._make });
		this._modelForm   = new FormGroup({ _model: this._model	});
		this._mileageForm = new FormGroup({	_mileage: this._mileage	});

	} // createForms
	

	/**
	 * Sets the toolbar title, appropriate for the step we're on.
	 */
	protected setTitle(forStepName: string): void {
		let make: string = this._make.value;
		
		switch (forStepName) {
			case    "TYPE": this._title = `Type of vehicle?`;                       break;
			case    "MAKE": this._title = `What make of vehicle?`;                  break;
			case   "MODEL": this._title = `What model of ${make} Model?`;           break;
			case  "COLOUR": this._title = `What colour?`;                           break;
			case "MILEAGE": this._title = `Current mileage (optional):`;            break;
		}
		
	} // setTitle
	
} // EditCarPage
