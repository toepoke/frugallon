
export enum ePages {
	Empty = 0,
	FillUp = 1,
	History = 2,
	Reminders = 3,
	MyCars = 4,
	EditCar = 5,
	About = 6,
	Settings = 7
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
