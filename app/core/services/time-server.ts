import * as _ from "../helpers/underscore";

/**
 * Helper class to abstract away the current date/time on the computer.
 * Allows us to mock it out a little easier should the need arise.
 */
export class TimeServer {
	static _currentDate: Date = null;
	
	getCurrentTime(): Date {
		if (_.isNull(TimeServer._currentDate)) {
			// not being mocked out currently, so return system date/time as normal
			return new Date();
		}
		
		return TimeServer._currentDate;
	}
	
	setCurrentTime(currentTime: Date) {
		TimeServer._currentDate = currentTime;
	}
	
}