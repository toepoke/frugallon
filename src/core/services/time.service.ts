import * as _ from "../helpers/underscore";

/**
 * Helper class to abstract away the current date/time on the computer.
 * Allows us to mock it out a little easier should the need arise.
 */
export class TimeService {
	static _currentDate: Date = null;
	
	getCurrentTime(): Date {
		if (_.isNull(TimeService._currentDate)) {
			// not being mocked out currently, so return system date/time as normal
			return new Date();
		}
		
		return TimeService._currentDate;
	}
	
	setCurrentTime(currentTime: Date) {
		TimeService._currentDate = currentTime;
	}
	
}
