import { async } from '@angular/core/testing';
import { BaseDb, TypedDb, DbProviders, DbCmdSuccess, DbCmdFailure, dumpToConsole } from "../../../core/db2/";
import { FillUpDb } from './';
import { FillUp } from '../../models';

describe('FillUp db tests', () => {
	let db: FillUpDb = null;

	it('should provide distinct list of years', done => {
		let f1: FillUp = createTestFill(new Date('1970-01-01'));
		let f2: FillUp = createTestFill(new Date('1971-01-01'));
		let f3: FillUp = createTestFill(new Date('1970-04-05'));

		db.bulkInsert([f1,f2,f3])
			.then((numInserted: number) => expect(numInserted).toEqual(3) )
			.then(() => db.getAll() )
			.then((fills: Array<FillUp>) => {
				expect(fills).not.toBeNull();
				expect(fills.length).toEqual(3);
			})
			.then(() => db.getYears())
			.then((uniqueYears: Array<number>) => {
				expect(uniqueYears).not.toBeNull();
				expect(uniqueYears.length).toEqual(2);
				expect(uniqueYears[0]).toEqual(1970);
				expect(uniqueYears[1]).toEqual(1971);
				return done();
			}) 
			.catch(() => {
				fail(); 
				return done();
			})
		;
	});


	beforeEach(done => {
		db = new FillUpDb('_TEST_DB_2', DbProviders.WEB_SQL);
		db.createTable()
			.then(() => {
				return done();
			})
			.catch(() => {
				fail(); 
				return done();
			})
		;
	});
 
	afterEach(done => {
		db.dropTable()
			.then(() => {
				return done();
			})
			.catch(() => {
				fail(); 
				return done();
			})
		;
	});

});

function createTestFill(when: Date): FillUp {
	let f: FillUp = new FillUp();

	f.carId = 1;
	f.fillType = 1;
	f.litres = 33;
	f.miles = 200;
	f.price = 9.99;
	f.when = when;

	return f;
}

