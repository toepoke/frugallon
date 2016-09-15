export { BaseDb, DbProviders } from './base-db';
export { DbCmdSuccess, DbCmdFailure } from './db-responses';
export { TypedDb, DbTypes } from './typed-db';

// export { JsonDb } from './json-db';

export function dumpToConsole(values: Array<any>): void {
	console.log("Dump START:");
	console["table"](values);
	console.log("Dump END:");

} 
