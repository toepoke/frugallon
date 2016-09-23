// Vendor imports
import { Component, OnInit, OnChanges, ViewChild, AfterViewInit, ChangeDetectionStrategy, Type } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Page, IONIC_DIRECTIVES, NavController, Tabs } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// Core imports 
import * as _ from '../../core/helpers/underscore';
import * as ditto from '../../core/helpers/ditto';
import { AppValidators, TimeServer, APP_PIPES } from '../../core';
import { DigitPicker, Wizard, WizardStep, StepChangeEvent, eStepDirection } from '../../core/components';

// Application imports
import { COMPONENT_STRATEGY, ORCHESTRATOR_STRATEGY } from '../../strategy';
import { FillUp, eFillUpType, Settings, Car, CarMaker } from '../../bricks/models';
import { DbCmdFailure, CarDb } from "../../bricks/services/db2";
import { FillUpService } from '../../bricks/services';
import { IAppState } from '../../bricks/stores/iapp-state';
import { AppActions } from '../../bricks/stores';
import { ProductNameIon, CarListIon, InputHintIon, AppHeaderIon, FillSummaryIon} from '../../bricks/components';

// Page imports
import { ePages } from '../pages';
import { HistoryPage, TabsPage, AppNavigation } from '../pages';

/**
 * The steps in the wizard, rather than looking at magic numbers.
 */
enum WIZARD_STEP {
	SELECT_CAR = 0,
	MILES      = 1,
	LITRES     = 2,
	PRICE      = 3,
	MILEAGE    = 4,
	FILL_TYPE  = 5,
	SUMMARY    = 6	
}

@Component({
	directives: [ IONIC_DIRECTIVES, Wizard, WizardStep, DigitPicker, FillSummaryIon, CarListIon, InputHintIon, ProductNameIon, AppHeaderIon],
	changeDetection: ORCHESTRATOR_STRATEGY,
	templateUrl: "build/pages/fill-up/fill-up-page.html",
	pipes: [APP_PIPES],
	styles: [`
	`]
})

export class FillUpPage {
	@ViewChild(Wizard) _wizard: Wizard = null;
	_milesForm: FormGroup = null;
	_litresForm: FormGroup = null;
	_priceForm: FormGroup = null;
	_mileageForm: FormGroup = null; 
	_miles: FormControl = null;
	_litres: FormControl = null;
	_price: FormControl = null;
	_mileage: FormControl = null; 
	private _app: Observable<IAppState> = null;
	private _myCars: Array<Car> = null;
	private _fillTypes: Array<eFillUpType> = null;
	private _selectedFillUpType: eFillUpType = null;
	private _currentCar: Car = null;
	private _currentFillUp: FillUp = null;
	private _measurement: boolean = true; 

	constructor(
		private _nav: NavController,
		private _tabs: Tabs,
		private _store: Store<IAppState>,
		private _appActions: AppActions,
		private _fillUpService: FillUpService,
		private _carDb: CarDb,
		private _timeServer: TimeServer,
		fb: FormBuilder 
	) {
		this._fillTypes = FillUp.getFillTypes();

		this.createForm(fb);		 

		this._app = <Observable<IAppState>> _store.select("appState");
		this._app.subscribe((data: IAppState) => {
			this._myCars = data.cars;
			if (_.isNull(this._currentCar)) {
				this._measurement = data.measurement;
				this._currentFillUp = new FillUp();
				if (data.cars.length === 1) {
					this._currentCar = data.cars[0];
				}
			}

		});

	} // constructor


	/**
	 * Moves the wizard onto the next stop, once the user has selected a car. 
	 */
	_onSelectCar(c: Car): void {
		this._currentCar = c;

		this._wizard.goNext();
	}


	/** When user selects the type of fill up (commute, motorway, etc) */
	_onSelectType(fillType: eFillUpType): void {
		this._selectedFillUpType = fillType;
	}

	
	/** Gets the description for the commute/motorway options [can't call a static inline] */
	_getFillTypeDescription(fillType: eFillUpType): string {
		return FillUp.getFillTypeDescription(fillType);
	}
	
	
	/**
	 * Wires up the input forms for the wizard
	 */
	createForm(fb: FormBuilder): void {
		// define FormControls separately so we can short-cut references in the component view
		this._miles = new FormControl("", [
			<any>Validators.required, 
			<any>AppValidators.range(1, 9999), 
			<any>AppValidators.maxDecimals(2)
		]);
		this._litres = new FormControl("", [
			<any>Validators.required, 
			<any>AppValidators.range(1, 9999), 
			<any>AppValidators.maxDecimals(2)		
		]);
		this._price = new FormControl("", [
			// In pence => 1p..999p
			<any> AppValidators.range(1, 999),
			<any>AppValidators.maxDecimals(3)
		]);
		this._mileage = new FormControl("", [
			// 1..3,000,000 (world record is 3 million miles!)
			<any>AppValidators.range(1, 3000000),
			<any>AppValidators.maxDecimals(2)
		]);

		this._milesForm   = fb.group({ _miles: this._miles });
		this._litresForm  = fb.group({ _litres: this._litres });
		this._priceForm   = fb.group({ _price: this._price });
		this._mileageForm = fb.group({ _mileage: this._mileage });

	} // createForm
	
	 
	/**
	 * Fired by "DigitPicker"" when a new value is entered. 
	 */ 
	onChange(newValue) {
		if (_.isNull(this._wizard))
			// not started wizard fully yet
			return;

		let currWizardStep: WizardStep = this._wizard.getCurrentStep();
		if (_.isNull(currWizardStep))
			// not started wizard fully yet
			return;
			
		switch (currWizardStep.index) {
			case WIZARD_STEP.SELECT_CAR: /* Car selector step */; break;
			case WIZARD_STEP.MILES:      this._miles.updateValue(newValue);   break;
			case WIZARD_STEP.LITRES:     this._litres.updateValue(newValue);  break;
			case WIZARD_STEP.PRICE:      this._price.updateValue(newValue);   break;
			case WIZARD_STEP.MILEAGE:    this._mileage.updateValue(newValue); break;
		}
				
	} // onChange
	
	
	/**
	 * Fired when the user hits "Next"/"Back" or is programatically set
	 */
	onStepChange(evt: StepChangeEvent) {
		// Only interested in events where we're moving forwards
		if (evt.direction !== eStepDirection.eForward) {
			return;
		}		
		
		if (evt.prevStep.index === WIZARD_STEP.MILES) {
			// Captured mileage, so apply new mileage calculation
			let newMileage: number = 0;
			if (!_.isNull(this._currentCar.mileage))
				newMileage = this._currentCar.mileage;
			newMileage += Number(this._miles.value);
			this._mileage.updateValue(newMileage);

		} else if (evt.currStep.index === WIZARD_STEP.SUMMARY) {
			let poundsPrice: number = _.toPounds(this._price.value);

			// Populate the model ready to show in the summary view
			this._currentFillUp = ditto.updateItem(this._currentFillUp, {
				carId: this._currentCar.id,
				car: this._currentCar,
				fillType: this._selectedFillUpType,
				miles: Number(this._miles.value),
				litres: Number(this._litres.value),
				price: poundsPrice,
				when: this._timeServer.getCurrentTime()
			});

			// mileage is a "car" thing, not a fill-up thing
			this._currentCar.mileage = this._mileage.value;
			
		}
		
	} // onStepChange
	
	
	/**
	 * Fired when the user skips one of the optional steps. 
	 */
	onStepSkip(step: WizardStep) {
		switch (step.index) {
			case WIZARD_STEP.PRICE: // price per litre (reset)
				this._price.updateValue("");
				break;
			
			case WIZARD_STEP.MILEAGE: // mileage (reset)
				this._mileage.updateValue("");
				break;
		}
	
	} // onStepSkip
	
	
	/**
	 * Called when the user has hit the Finish button.
	 *  - Records the fill-up to the database
	 *  - Instructs the UI to show the new entry on the history page
	 *  - Resets the wizard content for the next time it's used. 
	 */
	onFinish(wiz: Wizard): void {
		let newYears: Array<number> = null;
		let newFills: Array<FillUp> = null;
		let forYear: number = null;

		forYear = this._currentFillUp.when.getFullYear();

		this._fillUpService.addFillUp(this._currentFillUp)
			.then((saved: FillUp) => {
				if (!_.isNull(this._currentCar.mileage)) {
					this._carDb.save(this._currentCar);
				}
				return this._fillUpService.getYears();
			})
			.then((years: Array<number>) => {
				newYears = years;
				return this._fillUpService.getForYear(forYear);
			})
			.then((fills: Array<FillUp>) => {
				newFills = fills;

				this._store.dispatch(this._appActions.ShowYearView(newFills, newYears, forYear));
				this._store.dispatch(this._appActions.ToggleHistoryItem(this._currentFillUp.id));

				// Reset the wizard for next time
				this.onCancel(wiz);

				this._tabs.select(ePages.History);
			})
			.catch((fail: DbCmdFailure) => {
				// TODO: 
			})
		;
		
	} // onFinish 
	
	
	/**
	 * Users has cancelled the wizard, reset the form state and 
	 * go back to the first step.
	 */
	onCancel(wiz: Wizard): void {
		this.reset();
		wiz.selectStep(WIZARD_STEP.SELECT_CAR);
		
	} // onCancel


	/**
	 * Resets the wizard back to it's original state 
	 * ... ready for next usage
	 */
	reset(): void {
		this._miles.updateValue("");
		this._litres.updateValue("");
		this._price.updateValue("");
		this._mileage.updateValue("");

	} // reset


/** HACKY TEST DATA STUFF HERE */

	cheat(w: Wizard) {
		let c: Car = this._myCars[0];

		this._currentCar = c;
		this._miles.updateValue(302);
		this._litres.updateValue(35);
		this._mileage.updateValue(16847);
		this._price.updateValue(102); // £1.02

		w.selectStep(5);

	} // cheat
	

	fillHistory(w: Wizard) {
		let START_YEAR: number = 2013;
		let END_YEAR: number = 2016; 
		let MIN_ENTRIES: number = 5, MAX_ENTRIES: number = 7;
		let carIndex: number = 0;
		
		for (var year=START_YEAR; year <= END_YEAR; year++) {
			
			// random number of entries between 5 and 50
			let numEntries = _.getRandom(MIN_ENTRIES, MAX_ENTRIES);
			for (var i=0; i < numEntries; i++) {
				let month: number = _.getRandom(1, 12);
				let day: number = _.getRandom(1, 28);
				let hour: number = _.getRandom(8, 22);
				let min: number = _.getRandom(0, 59);
				let f: FillUp = new FillUp();
				let c: Car = null;

				// Fills -> Cars FK				
				c = this._myCars[carIndex];
				f.car = c;
				f.carId = c.id;
				
				f.miles = _.getRandom(100, 400);
				f.fillType = _.getRandom(1,3);	// commute/motorway/mix
				if (c.mileage = 0)
					// start with a sensible amount
					c.mileage = 16378; // TODO: Action should find the previous entry and
				else 
					c.mileage += f.miles;
					 
				f.litres = _.getRandom(30, 35);
				f.price = _.toPounds( _.getRandom(50, 120) );	// 50p - £1.20
				f.when = new Date(year, month, day, hour, min);
				
				this._fillUpService.addFillUp(f);

				// use a different car next time if we can
				carIndex++;
				if (carIndex >= this._myCars.length) {
					// start at beginning again
					carIndex = 0;
				}

			} // for i
			
		} // for year

		this._tabs.select(ePages.History);

	} // fillHistory

	fillCars(w: Wizard) {
		let cars: Array<Car> = [
			this.createCar("Ford", "Mondeo", "blueviolet", 12345),
			this.createCar("VW", "Golf", "darkslateblue", 172498),
			this.createCar("Audi", "80", "green", 270666)
		];
		this._carDb.bulkInsert(cars);
		
	} // fillCars
	
	private createCar(make: string, model: string, colour: string, mileage: number = 0): Car {
		let c: Car = new Car();
		c.isDefault = false;
		c.type = "CAR";
		c.make = make;
		c.model = model;
		c.colour = colour;
		c.mileage = mileage;
		return c;		
	}

}

