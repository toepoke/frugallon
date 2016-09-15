/* TESTS */
import { BaseDb, DbCmdSuccess, DbCmdFailure } from './core/db2/';
import { TypedDb, DbTypes, DbProviders } from './core/db2/';
import { CarMakerDb } from './bricks/services/db2/';
import { CarMaker } from './bricks/models';
/* TESTS */

export function run() {
	// personTest();
	carMakerTest();
}

function carMakerTest() {
	let db: CarMakerDb = new CarMakerDb('test-people-database', DbProviders.WEB_SQL);

	db.getRowCount()
			.then((numSaved: number) => {
				debugger;
			})
			.catch((err: DbCmdFailure) => { 
				console.error(err); 
			} )
		; // save	
	

	db.prime()
			.then((numSaved: number) => {
				debugger;
			})
			.catch((err: DbCmdFailure) => { 
				console.error(err); 
			} )
		; // save	



}

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
	address: Address = null;            // JSON
	creditCard: string = null;         // NO_PERSIST
	dob: Date = null;                  // DATE

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
	constructor(provider: number) {
		super(TypedPersonDb.getSchema(), 'test-people-database', 'peeps', provider);
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

}

export function personTest() {
	let peopleDb: TypedPersonDb = null;

	peopleDb = new TypedPersonDb(DbProviders.WEB_SQL);
	peopleDb.createTable()
		.then(() => {

		let p1: Person = Person.FredFlintstone();
		let p2: Person = Person.HomerSimpson();

		peopleDb.bulkInsert([p1, p2])
			.then((numSaved: number) => {
			})
			.catch((err: DbCmdFailure) => { 
				console.error(err); 
			})
		})
		.catch(() => { 
		})
	;
}



