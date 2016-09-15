// import { async } from '@angular/core/testing';
// import { BaseDb, TypedDb, DbProviders, DbCmdSuccess, DbCmdFailure, dumpToConsole } from "../../../core/db2/";
// import { CarDb } from './';
// import { Car } from '../../models';

// describe('Car db tests', () => {
// 	let db: CarDb = null;

// 	beforeEach(done => {
// 		db = new CarDb('_TEST_DB_', DbProviders.WEB_SQL);
// 		db.prime()
// 			.then(() => {
// 				return done();
// 			})
// 			.catch(() => {
// 				fail(); 
// 				return done();
// 			})
// 		;
// 	});

// 	afterEach(done => {
// 		db.dropTable()
// 			.then(() => {
// 				return done();
// 			})
// 			.catch(() => {
// 				fail(); 
// 				return done();
// 			})
// 		;
// 	});


// 	it('should not find a default car when requested before priming table', done => {
// 		// Note: "prime" is called via setup for all tests, hence we drop first

// 		db.dropTable()
// 			.then(() => db.createTable())
// 			.then(() => db.getDefaultCar())
// 			.then((defaultCar: Car) => {
// 				expect(defaultCar).toBeNull();
// 				return done();
// 			})
// 			.catch((err) => {
// 				fail(err); 
// 				return done();
// 			})
// 		;			

// 	});

// 	it('should find a default car when table is primed', done => {

// 		// Note: table is primed as part of setup
// 		db.dropTable()
// 			.then(() => db.prime())
// 			.then(() => db.getDefaultCar())		
// 			.then((defaultCar: Car) => {		
// 				expect(defaultCar).not.toBeNull();
// 				expect(defaultCar.isDefault).toBeTruthy();
// 				return done();
// 			})
// 			.catch((err) => {
// 				fail(err); 
// 				return done();
// 			})
// 		;			

// 	});

// });

