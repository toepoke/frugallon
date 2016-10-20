// Verifies each data-type behaves correctly 

import { async } from '@angular/core/testing';
import { BaseDb, TypedDb, DbTypes, DbProviders, DbCmdSuccess, DbCmdFailure } from '../';


// Demonstrates an object that isn't persisted (and is reserved for Fk lookups)
class aForeignKeyObject {
	ma: string = null;
	pa: string = null;
}

class AllTypes {
	id: number = null;
	aString: string = null;
	aDecimal: number = null;
	aInteger: number = null;
	aBool: boolean = null;
	aJson: any = null;
	aDate: Date = null;
	aFkId: number = null;
	aFkObject: aForeignKeyObject = null;
	aNonPersistedObject: any = null;
}

class TypedAllTypes extends TypedDb<AllTypes> {
	constructor(dbName: string, provider: number) {
		super(TypedAllTypes.getSchema(), dbName, 'all_types', provider);
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'aString': DbTypes.STRING,
			'aDecimal': DbTypes.DECIMAL,
			'aInteger': DbTypes.INTEGER,
			'aBool': DbTypes.BOOLEAN,
			'aJson': DbTypes.JSON,
			'aDate': DbTypes.DATE,
			'aFkId': DbTypes.INTEGER,
			'aFkObject': DbTypes.FOREIGN_KEY_OBJECT,
			'aNonPersistedObject': DbTypes.NO_PERSIST
		}
	}
}
 

describe('All datatype tests', () => {
	let typesDb: TypedAllTypes = null;

	beforeEach(() => {
		typesDb = new TypedAllTypes('_TEST_DB_', DbProviders.WEB_SQL);
		typesDb.createTable();
	});

	afterEach(() => {
		typesDb.dropTable();
	});
 

	it('should save primary-key id', done => {
		let o: AllTypes = new AllTypes();
		o.id = null;	// you don't set the primary key

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id)
			})
			.then((got: AllTypes) => {
				expect(got.id).not.toBeNull();
				expect(got.id).toEqual(1);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should save the id"

	it('should save foreign-key id', done => {
		let o: AllTypes = new AllTypes();
		o.aFkId = 99;

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got.aFkId).not.toBeNull();
				expect(got.aFkId).toEqual(99);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should save the id"


	it('should save strings', done => {
		let o: AllTypes = new AllTypes();
		o.aString = 'Some String';

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aString).toEqual('Some String');
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should save strings"


	it('should save fractions', done => {
		let o: AllTypes = new AllTypes();
		o.aInteger = 69.96;

		typesDb.save(o)
			.then((saved: AllTypes) => {
				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aInteger).toEqual(69.96);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should save fractions"	


	it('should save integers', done => {
		let o: AllTypes = new AllTypes();
		o.aInteger = 69;

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aInteger).toEqual(69);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should save integers"


	it('should save booleans (truthy)', done => {
		let o: AllTypes = new AllTypes();
		o.aBool = true;

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aBool).toEqual(true);
				return done();
			}) 
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should save booleans (truthy)"


	it('should save booleans (falsy)', done => {
		let o: AllTypes = new AllTypes();
		o.aBool = false;

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aBool).toEqual(false);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				console.error(err);
				return done();
			})
		; // save(insert)

	}); // "should save booleans (falsy)"


	it('should save JSON objects', done => {
		let o: AllTypes = new AllTypes();
		o.aJson = {
			ma: 'Marge',
			pa: 'Homer'			
		};

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aJson).not.toBeNull();
				expect(got.aJson.ma).toEqual('Marge');
				expect(got.aJson.pa).toEqual('Homer');
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should save JSON objects"	


	it('should save DATE objects', done => {
		let o: AllTypes = new AllTypes();
		o.aDate = new Date('28-DEC-1971 12:34:54');

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aDate).not.toBeNull();

				expect(got.aDate.getDate()).toEqual(28);
				expect(got.aDate.getMonth()).toEqual(11);
				expect(got.aDate.getFullYear()).toEqual(1971);
					
				expect(got.aDate.getHours()).toEqual(12);
				expect(got.aDate.getMinutes()).toEqual(34);
				expect(got.aDate.getSeconds()).toEqual(54);
				
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should save DATE objects"	


	it('should allow date filtered queries', done => {
		let o: AllTypes = new AllTypes();
		o.aDate = new Date('28-DEC-1971 12:34:54');

		typesDb.save(o)
			.then((saved: AllTypes) => {
				// then read back to ensure it was saved
				return typesDb.getByFilter('SELECT * FROM ' + typesDb.tableName + ' WHERE CAST(substr(aDate, 1, 4) AS INTEGER) = ?', [1971]);
			})
			.then((results: Array<AllTypes>) => {
				expect(results).not.toBeNull();
				expect(results.length).toEqual(1);
				expect(results[0].aDate.getFullYear()).toBe(1971);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should save DATE objects"		


	it('should NOT save foreign key objects', done => {
		let o: AllTypes = new AllTypes();
		o.aFkObject = new aForeignKeyObject();
		o.aFkObject.ma = 'Marge';
		o.aFkObject.pa = 'Homer';

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aFkObject).toBeNull();
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should NOT save foreign key objects"	


	it('should NOT save properties marked for not persisting', done => {
		let o: AllTypes = new AllTypes();
		o.aNonPersistedObject = {
			'ma': 'Marge',
			'pa': 'Homer'
		};
 
		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aNonPersistedObject).toBeUndefined();
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should NOT save properties marked for not persisting"		


	it('should respect null values', done => {
		let o: AllTypes = new AllTypes();

		typesDb.save(o)
			.then((saved: AllTypes) => {

				// then read back to ensure it was saved
				return typesDb.getById(o.id);
			})
			.then((got: AllTypes) => {
				expect(got).not.toBeNull();
				expect(got.aString).toBeNull();
				expect(got.aDecimal).toBeNull();
				expect(got.aInteger).toBeNull();
				expect(got.aBool).toBeNull();
				expect(got.aJson).toBeNull();
				expect(got.aDate).toBeNull();
				expect(got.aFkObject).toBeNull();
				expect(got.aNonPersistedObject).toBeUndefined();
				
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should respect null values"		

});

