import { async } from '@angular/core/testing';
import { BaseDb, TypedDb, DbTypes, DbProviders, DbCmdSuccess, DbCmdFailure, dumpToConsole } from '../';

class Parent {
	id: number = null;
	name: string = null;

	children: Array<Child> = null;
}

class ParentDb extends TypedDb<Parent> {
	constructor(dbName: string, provider: number) {
		super(ParentDb.getSchema(), dbName, 'parents', provider);
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'name': DbTypes.STRING,
			'children': DbTypes.FOREIGN_KEY_OBJECT
		}
	}

	getChildren(childDb: ChildDb, forParent: Parent): Promise<Array<Child>> {
		return super.getAllByFkId<Child>(forParent.id, 'parentId', childDb.tableName);
	}

}

class Child {
	id: number = null;
	parentId: number = null;
	name: string = null;

	parent: Parent = null;
}

class ChildDb extends TypedDb<Child> {
	constructor(dbName: string, provider: number) {
		super(ChildDb.getSchema(), dbName, 'children', provider);
	}

	static getSchema(): any {
		return {
			'id': DbTypes.PRIMARY_KEY,
			'parentId': DbTypes.FOREIGN_KEY_ID,
			'name': DbTypes.STRING,
			'parent': DbTypes.FOREIGN_KEY_OBJECT
		}
	}

	getParent(parentDb: ParentDb, forChild: Child): Promise<Parent> {
		return super.getByFkId<Parent>(forChild.parentId, 'id', parentDb.tableName);
	}

}


describe('Parent child foreign keys', () => {
	let parentDb: ParentDb = null;
	let childDb: ChildDb = null;
	let p: Parent = null;
	let c1: Child, c2: Child, c3: Child;

	function setUpData(parentDb: ParentDb, childDb: ChildDb): Promise<number> {
		p = new Parent();
		c1 = new Child();
		c2 = new Child();
		c3 = new Child();
		
		p.name = 'Marge Simpson';
		
		c1.name = 'Bart Simpson';   c1.parentId = 1;
		c2.name = 'Lisa Simpson';   c2.parentId = 1;
		c3.name = 'Maggie Simpson'; c3.parentId = 1;

		return parentDb.save(p)
			.then((parent: Parent) => {
				c1.parentId = parent.id;
				c2.parentId = parent.id;
				c3.parentId = parent.id;

				return childDb.bulkInsert([c1,c2,c3]);				
			})
		;

	}	


	beforeEach(done => {
		const DB_NAME: string = '_TEST_DB_';
		parentDb = new ParentDb(DB_NAME, DbProviders.WEB_SQL);
		childDb = new ChildDb(DB_NAME, DbProviders.WEB_SQL);

		parentDb.createTable()
			.then(() => {
				childDb.createTable()
					.then(() => {
						return done();
					})
					.catch(() => {
						fail(); 
						return done();
					})
				;
			})
			.catch(() => {
				fail(); 
				return done();
			})
		;
	});

	afterEach(done => {
		childDb.dropTable()
			.then(() => {
				parentDb.dropTable();
				return done();
			})
			.catch(() => {
				fail(); 
				return done();
			})
		;
	});

	it('should get all children', done => {
		let children: Array<Child> = null;
		
		setUpData(parentDb, childDb)
			.then((numSaved: number) => { 
				return parentDb.getChildren(childDb, p)
			})
			.then((children: Array<Child>) => {
				expect(children).not.toBeNull();
				expect(children.length).toEqual(3);
				return done();					
			})
			.catch(() => {
				fail(); 
				return done();
			})			
		;

	});


	it('should find the parent', done => {
		let children: Array<Child> = null;
		
		setUpData(parentDb, childDb)
			.then((numSaved: number) => {

				childDb.getParent(parentDb, c1)
					.then((parent: Parent) => {

						expect(parent.name).toEqual('Marge Simpson');

						return done();					
					})
					.catch((error: DbCmdFailure) => {
						fail(); 
						return done();
					})			
				;

			})
			.catch(() => {
				fail(); 
				return done();
			})			
		;

	});	



});


 