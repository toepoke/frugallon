
export enum ePages {
	Empty = -1,

	// Note: Tabs pages are zero indexed
	FillUp = 0,
	History = 1,
	Reminders = 2,
	MyCars = 3,
	// Note: Tabs pages are zero indexed
	
	EditCar = 4,
	About = 5,
	Settings = 6
}

export function ePagesToString(page: ePages): string {
	switch (page) {
		case ePages.Empty: return "Empty";
		case ePages.FillUp: return "FillUp";
		case ePages.History: return "History";
		case ePages.Reminders: return "Reminders";
		case ePages.MyCars: return "My Cars";
		case ePages.EditCar: return "Edit Car";
		case ePages.About: return "About";
		case ePages.Settings: return "Settings";
		default:
			throw new Error(`Unknown page type ${page}.`);
	}
	
}
