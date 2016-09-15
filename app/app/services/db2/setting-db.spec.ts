import { async } from '@angular/core/testing';
import { BaseDb, TypedDb, DbProviders, DbCmdSuccess, DbCmdFailure } from "../../../core/db2/";
import { SettingDb } from './';
import { Settings } from '../../models';

describe('Settings db tests', () => {
	let settingsDb: SettingDb = null;

	beforeEach(done => {
		settingsDb = new SettingDb('_TEST_DB_', DbProviders.WEB_SQL);
		settingsDb.prime()
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
		settingsDb.dropTable()
			.then(() => {
				return done();
			})
			.catch(() => {
				fail(); 
				return done();
			})
		;
	});


	it('should create defaults where no settings are saved', done => {

		settingsDb.load()
			.then((s: Settings) => {
				expect(s.measurement).toBeTruthy();
				expect(s.dbVersion).toEqual('0.0.1');
				
				return done();
			})		
		;	

	});		

});