
export class DbProviders {
	public static get DETECT(): number { return 1; }
	public static get WEB_SQL(): number { return 2; }
	public static get SQLITE(): number { return 3; }

	public static getDescription(provider: number) {
		switch (provider) {
			case DbProviders.DETECT: return 'Detect';
			case DbProviders.WEB_SQL: return 'Web SQL';
			case DbProviders.SQLITE: return 'Sqlite';
			default:
				throw new Error(`DbProviders::getDescription - Unknown provider ${provider}`);
		}
	}	
}
