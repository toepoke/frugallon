import { async } from '@angular/core/testing';
import { BaseDb, TypedDb, DbProviders, DbCmdSuccess, DbCmdFailure } from "../../../core/db2/";
import { Store } from "@ngrx/store";
import { IAppState, AppActions } from "../../stores";
import { FillUpDb, CarDb, MpgStatDb } from '../db2';
import { FillUp, eFillUpType, Car } from '../../models';
import { FillUpService } from './fill-up.service';

describe('Fill Up Tests', () => {
	let dbProvider: number = null;
	let appActions: AppActions = null;
	let store: Store<IAppState> = null;
	let fillsDb: FillUpDb = null;
	let carDb: CarDb = null;
	let statsDb: MpgStatDb = null;
	let fus: FillUpService = null;

	it('should add a fill-up', done => {
		let fu: FillUp = createTestFillUp();

		fus.addFillUp(fu)
			.then((fill: FillUp) => {
				expect(fill).not.toBeNull();
				expect(fill.id).not.toBeNull();

				return done();
			})
			.catch(() => {
				fail(); 
				return done();
			})
		;

	});
 
	beforeEach(done => {
		const DB_NAME: string = '_TEST_DB_';
		dbProvider = DbProviders.WEB_SQL;
		appActions = new AppActions();
		fillsDb = new FillUpDb(DB_NAME, dbProvider);
		carDb = new CarDb(DB_NAME, dbProvider);
		statsDb = new MpgStatDb(DB_NAME, dbProvider);
		fus = new FillUpService(fillsDb, carDb, statsDb, store, appActions);
 
		carDb.prime()
			.then(() => statsDb.createTable())
			.then(() => fillsDb.createTable())
			.then(() => done())
			.catch(() => {
				fail(); 
				return done(); 
			})
		;

	});

	afterEach(done => {
		carDb.dropTable()
			.then(() => statsDb.dropTable())
			.then(() => fillsDb.dropTable())
			.then(() => done())
			.catch(() => {
				fail(); 
				return done(); 
			})
		;
	});
	
});


function createTestCar(): Car {
	let c: Car = new Car();

	c.id = 99;
	c.make = 'Ford';
	c.model = 'Focus';
	c.colour = 'blue';
	c.isDefault = false;
	c.type = 'CAR';
	c.mileage = 123456;

	return c;
}

function createTestFillUp(): FillUp {
	let fu: FillUp = new FillUp();

	fu.car = createTestCar();
	fu.fillType = eFillUpType.Motorway;
	fu.litres = 33;
	fu.miles = 321;
	fu.price = 104.7;
	fu.when = new Date();

	return fu;
}


