import { async } from '@angular/core/testing';
import { BaseDb, TypedDb, DbTypes, DbProviders, DbCmdSuccess, DbCmdFailure } from '../';

// Ensures a primary key id column is defined

class NoId {
	name: string = null;
}

class TypedNoIdDb extends TypedDb<NoId> {

	constructor(dbName: string, provider: number) {
		super(TypedNoIdDb.getSchema(), dbName, "schema_test", provider);
	}

	static getSchema(): any {
		return {
			'name': DbTypes.STRING
		}
	}

}

describe('NoId scenarios', () => {

	it('should fail when no "id" property is in the schema', done => {
		let o: TypedNoIdDb = new TypedNoIdDb('_TEST_DB_', DbProviders.WEB_SQL);

		o.createTable()
			.then((created: DbCmdSuccess) => {
				fail('Exception should be thrown.');
				return done();
			})
			.catch((err: DbCmdFailure) => {
				// pass
				return done();
			})
		;

	}); // "should fail when no "id" property is in the schema"

});


