import { async } from '@angular/core/testing';
import { BaseDb, TypedDb, DbProviders, DbCmdSuccess, DbCmdFailure, dumpToConsole } from "../../../core/db2/";
import { MpgStatDb } from './';
import { MpgStat, Car } from '../../models';

describe('MpgStat db tests', () => {
	let db: MpgStatDb = null;

	beforeEach(done => {
		db = new MpgStatDb('_TEST_DB_', DbProviders.WEB_SQL);
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

	it('should find stats for a car', done => {
		let c: Car = createTestCar();
		let uk: MpgStat = createTestStat(true, c.id);
		let us: MpgStat = createTestStat(false, c.id);

		// Note: table is primed as part of setup
		db.bulkInsert([uk, us])
			.then(() => {
				return db.getStatsForCar(c.id);
			})
			.then((stats: Array<MpgStat>) => {
				expect(stats).not.toBeNull();
				expect(stats.length).toEqual(2);
				expect(stats[0].id).not.toBeNull();
				expect(stats[1].id).not.toBeNull();
				return done();
			})
			.catch((err) => {
				fail(err); 
				return done();
			})
		;			

	});

});

function createTestCar(): Car {
	let c: Car = new Car();

	c.id = 237894;
	c.make = 'Ford';
	c.model = 'Focus';
	c.colour = 'blue';
	c.isDefault = false;
	c.type = 'CAR';
	c.mileage = 123456;

	return c;
}

function createTestStat(type: boolean, withCarId: number): MpgStat {
	let ms: MpgStat = new MpgStat(type);

	ms.id = 1;
	ms.carId = withCarId;
	ms.min  = 5; 
	ms.avg = 10;
	ms.max = 15;
	ms.totalSamples = 1;
	ms.lastAvg = 0;

	return ms;
}