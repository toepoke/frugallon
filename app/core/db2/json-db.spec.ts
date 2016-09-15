// import { async } from '@angular/core/testing';
// import { BaseDb, JsonDb, DbTypes, DbProviders, DbCmdSuccess, DbCmdFailure, dumpToConsole } from './';

// class Parent {
// 	name: string = null;

// 	children: Array<Child> = null;

// 	constructor(name: string, children: Array<Child>) {
// 		this.name = name;
// 		this.children = children;
// 	}
// }
 
// class Child {
// 	name: string = null;
// 	constructor(name: string) {
// 		this.name = name;
// 	}
// }

// function mockChildren(): Array<Child> {
// 	let bart: Child = new Child('Bart Simpson');
// 	let lisa: Child = new Child('Lisa Simpson');
// 	let maggie: Child = new Child('Maggie Simpson');

// 	return [bart, lisa, maggie];
// }


// describe('Parent child foreign keys', () => {
// 	const DB_NAME: string = '_TEST_JSON_DB_';
// 	const TABLE_NAME: string = 'family';

// 	let family: JsonDb = null;
// 	let homer: Parent = null;
// 	let marge: Parent = null;
// 	let kids: Array<Child> = null;

// 	it('should save json data', done => {
// 		return done();
		
		

// 	});



// 	beforeEach(done => {
// 		family = new JsonDb(DB_NAME, TABLE_NAME, DbProviders.WEB_SQL);

// 		kids = mockChildren();
// 		homer = new Parent('Homer Simpson', kids);
// 		marge = new Parent('Marge Simpson', kids);

// 		family.createTable()
// 			.then(() => done())
// 			.catch(() => {
// 				fail(); 
// 				return done();
// 			})
// 		;
// 	});

// 	afterEach(done => {
// 		family.dropTable()
// 			.then(() => done())
// 			.catch(() => {
// 				fail(); 
// 				return done();
// 			})
// 		;
// 	});



// });


 