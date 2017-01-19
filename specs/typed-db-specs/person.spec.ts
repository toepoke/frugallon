import { async } from '@angular/core/testing';
import { BaseDb, TypedDb, DbTypes, DbProviders, DbCmdSuccess, DbCmdFailure } from '../';
import * as ditto from '../../helpers/ditto';

/**
 * Used an isolated class so changes in the app don't impact
 * the testing of the fundamentals.
 */
export class Car {
	constructor(make: string, model: string) {
		this.make = make;
		this.model = model;
	}
	make: string = null;
	model: string = null;
}

class Address {
	street: string = null;
	city: string = null;
}

export class Person {
	id: number = null;                 // PRIMARY_KEY
	name: string = null;               // STRING
	age: number = null;                // INTEGER
	isaParent: boolean = null;         // BOOLEAN
	children: Array<string> = null;    // JSON
	car: Car = null;                   // FOREIGN_KEY_OBJECT
	balance: number = null;            // DECIMAL
	address: Address = null;           // JSON
	dob: Date = null;                  // DATE
	creditCard: string = null;         // NO_PERSIST

	toString(): string {
		return `${this.name} (${this.age})`;
	}

	static toTyped(item: Person): Person {
		return ditto.updateItem<Person>(new Person(), item);
	}

	static toTypedList(items: Array<Person>): Array<Person> {
		let newItems: Array<Person> = new Array<Person>();

		items.forEach((value: Person) => Person.toTyped(value) );

		return newItems;
	}

	static FredFlintstone(): Person {
		let p: Person = new Person();

		p.id = null;
		p.name ='Fred Flintstone';
		p.age = 1234;
		p.isaParent = true;
		p.balance = 123.45;
		p.address = { "street": "10 Downing Street", "city": "Bedrock"};
		p.children = 'bam bam,pebbles'.split(',');
		p.car = new Car('ford', 'escort');
		p.dob = new Date("1-AUG-1971");

		return p;
	}

	static HomerSimpson(): Person {
		let p: Person = new Person();

		p.id = null;
		p.name ='Homer Simpson';
		p.age = 55;
		p.isaParent = true;
		p.balance = -69.50;
		p.address = { "street": "11 Windy Walk", "city": "Springfield"};
		p.children = 'bart,lisa,maggie'.split(',');
		p.car = new Car('ford', 'oldsmobile');
		p.dob = new Date("1-AUG-1950");

		return p;
	}

}

export class TypedPersonDb extends TypedDb<Person> {
	constructor(dbName: string, provider: number) {
		super(TypedPersonDb.getSchema(), dbName, 'peeps', provider);
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'name': DbTypes.STRING,
			'age': DbTypes.INTEGER,
			'isaParent': DbTypes.BOOLEAN,
			'children': DbTypes.JSON,
			'car': DbTypes.FOREIGN_KEY_OBJECT,
			'balance': DbTypes.DECIMAL,
			'address': DbTypes.JSON,
			'dob': DbTypes.DATE,
			'creditCard': DbTypes.NO_PERSIST
		};
	}

	public getAll(): Promise<Array<Person>> {
		return super.getAll()
			.then((srcs: Array<Person>) => this.toTypedList(srcs))
		;
	}
	public getById(id: number): Promise<Person> {
		return super.getById(id)
			.then((src: Person) => this.toTyped(src))
		;
	}

	protected toTyped(src: Person): Person {
		return ditto.updateItem(new Person(), src);
	}

	protected toTypedList(srcs: Array<Person>): Array<Person> {
		let newItems: Array<Person> = new Array<Person>();
		srcs.forEach((p: Person) => {
			newItems.push(this.toTyped(p));
		});
		return newItems;
	}

}


describe('Typed method db tests - happy paths', () => {
	let peopleDb: TypedPersonDb = null;


	beforeEach(done => {
		peopleDb = new TypedPersonDb('_TEST_DB_', DbProviders.WEB_SQL);
		peopleDb.createTable()
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
		peopleDb.dropTable()
			.then(() => {
				return done();
			})
			.catch(() => {
				fail(); 
				return done();
			})
		;
	});

	it('should insert an item in the database', done => {
		let p: Person = Person.FredFlintstone();

		peopleDb.save(p)
			.then((saved: Person) => {
				expect(saved).not.toBeNull();
				expect(saved.id).toEqual(1);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				console.error(err);
				fail(err);
				return done();
			})
		; // save

	}); // "should insert an item in the database"


	it('should insert multiple items in the database', done => {
		let p1: Person = Person.HomerSimpson();
		let p2: Person = Person.FredFlintstone();

		peopleDb.bulkInsert([p1,p2])
			.then((numSaved: number) => {
				expect(numSaved).not.toBeNull();
				expect(numSaved).toEqual(2);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(p1)

	}); // "should insert multiple rows in the database"


	it('should save multiple items', done => {
		let fred: Person = Person.FredFlintstone();
		let homer: Person = Person.HomerSimpson();

		peopleDb.saveAll([fred, homer])
			.then((saved: Array<Person>) => {
				expect(saved).not.toBeNull();
				expect(saved.length).toEqual(2);
				expect(saved[0].id).not.toEqual(0);
				expect(saved[1].id).not.toEqual(0);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		;

	}); // should save multiple items


	it('should update an item in the database', done => {
		let p: Person = Person.FredFlintstone();

		peopleDb.save(p)
			.then((saved: Person) => {
				expect(saved).not.toBeNull();
				expect(saved.id).toEqual(1);
			})
			.then(() => {
				p.name = 'Barney Rubble';
				return peopleDb.save(p);
			})
			.then((updated: Person) => {
				expect(updated).not.toBeNull();
				expect(updated.name).toEqual('Barney Rubble');
				return done();
			})
			.catch((err: DbCmdFailure) => {
				console.error(err);
				fail(err);
				return done();
			})
		; // save

	}); // "should insert an item in the database"


	it('should get a typed item from the database', done => {
		let p: Person = Person.FredFlintstone();

		peopleDb.save(p)
			.then((saved: Person) => {
				expect(saved.id).not.toBeNull();
			})
			.then(() => {
				p.name = 'Barney Rubble';

				// then read back to ensure it was saved
				return peopleDb.getById(p.id);
			})
			.then((got: Person) => {
				expect(got.name).toEqual('Fred Flintstone');
				expect(got.address.city).toEqual('Bedrock');
				expect(got.toString()).toEqual('Fred Flintstone (1234)');
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should get an item from the database"


	it('should get an item from the database, based on a filter', done => {
		let p1: Person = Person.HomerSimpson();
		let p2: Person = Person.FredFlintstone();

		peopleDb.save(p1)
			.then((saved: Person) => {
				expect(saved.id).not.toBeNull();
				p1.name = 'Mary Poppins';

				return peopleDb.save(p2);
			})
			.then((savedp2: Person) => {
				savedp2.name = 'Cinderella';

				// then read back to ensure it was saved
				let args: Array<any> = ['Homer Simpson'];
				return peopleDb.getByFilter('SELECT * FROM peeps WHERE name = ?', args);
			})
			.then((got: Array<Person>) => {
				expect(got.length).toEqual(1);
				let first: Person = got[0];
				expect(first.name).toEqual('Homer Simpson');
				expect(first.address.street).toEqual('11 Windy Walk');
				return done();
			})			
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(p1)

	}); // "should get an item from the database, based on a filter"


	it('should get all items from the database', done => {
		let p1: Person = Person.HomerSimpson();
		let p2: Person = Person.FredFlintstone();

		peopleDb.save(p1)
			.then((saved: Person) => {
				expect(saved.id).not.toBeNull();
				p1.name = 'Mary Poppins';

				peopleDb.save(p2)
					.then((savedp2: Person) => {
						savedp2.name = 'Cinderella';

						// then read back to ensure it was saved
						return peopleDb.getAll();
					})
					.then((got: Array<Person>) => {
						expect(got.length).toEqual(2);

						let first: Person = got[0];
						let second: Person = got[1];

						expect(first.name).toEqual('Homer Simpson');
						expect(first.address.street).toEqual('11 Windy Walk');

						expect(second.name).toEqual('Fred Flintstone');
						expect(second.address.city).toEqual('Bedrock');

						return done();
					})
					.catch((err: DbCmdFailure) => {
						fail(err);
						return done();
					})
				; // save(p2)
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(p1)

	}); // "should get all items from the database"


	it('should delete an item from the database', done => {
		let p: Person = Person.FredFlintstone();

		peopleDb.save(p)
			.then((saved: Person) => {
				expect(saved.id).not.toBeNull();
				p.name = 'Fred Flintstone';

				// then read back to ensure it was saved
				return peopleDb.deleteItem(p.id);
			})
			.then((success: DbCmdSuccess) => {
				expect(success.data.rowsAffected).toBe(1);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(insert)

	}); // "should delete an item from the database"


	it('should delete multiple items', done => {
		let fred: Person = Person.FredFlintstone();
		let homer: Person = Person.HomerSimpson();

		peopleDb.saveAll([fred, homer])
			.then((saved: Array<Person>) => {
				expect(saved).not.toBeNull();
				expect(saved.length).toEqual(2);
				return saved;
			})
			.then((toDelete: Array<Person>) => {
				return peopleDb.deleteItems(toDelete);
			})
			.then((deletedSuccess: Array<DbCmdSuccess>) => {
				// verify they were deleted
				return peopleDb.getAll();
			})
			.then((gotItems: Array<Person>) => {
				expect(gotItems).not.toBeNull();
				expect(gotItems.length).toEqual(0);
				return done();
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		;

	}); // should save multiple items


	it('should give a table row count', done => {
		let p1: Person = Person.HomerSimpson();
		let p2: Person = Person.FredFlintstone();

		peopleDb.bulkInsert([p1,p2])
			.then((numSaved: number) => {
				expect(numSaved).not.toBeNull();
				expect(numSaved).toEqual(2);
			})
			.then(() => {
				peopleDb.getRowCount()
					.then((rowCount: number) => {
						expect(rowCount).not.toBeNull();
						expect(rowCount).toBe(2);
						return done();
					})
				;
			})
			.catch((err: DbCmdFailure) => {
				fail(err);
				return done();
			})
		; // save(p1)

	}); // "should insert multiple rows in the database"	


}); // describe


describe('Typed person db tests - unhappy paths', () => {
	let peopleDb: TypedPersonDb = null;

	beforeEach(() => {
		peopleDb = new TypedPersonDb('_TEST_DB_', DbProviders.WEB_SQL);
		peopleDb.createTable();
	});

	afterEach(() => {
		peopleDb.dropTable();
	});


	it('should fail to update an item that does not exist in the database', done => {
		let p: Person = Person.FredFlintstone();
		p.id = 9876;

		peopleDb.save(p)
			.then((saved: Person) => {
				fail('This should have failed in the typedDb layer!');
				return done();
			})
			.catch((err: DbCmdFailure) => {
				// pass
				return done();
			})
		;
	}); // "should fail to update an item that does not exist in the database"

});

