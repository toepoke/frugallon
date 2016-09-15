
# Infrastructure
* Refactor the data-tables to use a single typed class.  I think they all pretty much do the same thing. A couple of interfaces to hand over the "specifics" should sort it?
	- Perhaps revisit this when we look at using SQLLite instead?	
* When we add GetSentry have an "info" item which reports unlisted vehicles to add to our database

# Refactorings ...
* Input hint should be a popup show we can show more detail about what we're asking
* Enhance wizard so "SKIP" can become "FINISH" (with a secondary colour).  Finish only becomes enabled when ALL remaining steps are _skippable_.	
*	The year selector should really be scrollable by your thumb.  Clicking the buttons to go left and right isn’t really what mobile is about.

# History
* Add an ionic slidy menu thing to the history list to bring up an "edit this trip" thing
	- See http://ionicframework.com/docs/v2/components/#sliding-list
* Add a "clear storage" option in settings, include warning dialog about losing all data	

# New data
- On a final [optional] step in the wizard Add "Comment" field so peeps can put in "Filled tyres"
	- Also add a set of radio buttons for journey types, e.g. "Commuting" or "Motorway" or "Combination"
- Add trip number and average mpg when trip was recorded 
	- (so we can show what the average mpg was at the time, and see how we improve over time)

# Reminders
Develop reminders as a separate "entity" so a reminder doesn't _have to be_ for a car.
- MOT test reminders
- Car tax reminder (inc n/a as they're tax exempt)
- Next service reminder (every X months, or every Y miles, whichever comes first)
- Allow custom reminders, with MOT, Tax & services being "templates" 
	- This is so users can add their own
	- Other templates could be:
		+ timing belt
		+ air-con recharge
		+ (see our service book for other examples)
- Change the “Stats” tab to “Reminders”
	- On the history page have two tabs at the top (like the years) that show:
		+ Table view (as is)
		+ Stats view showing pretty graphs
	- Advantage of this being we can inherit the same filters on the same view ! 


# General notes
	- orientationchange event - http://www.quirksmode.org/blog/archives/2013/11/orientationchan.html
	- creating a "for loop" directive in angular2 - http://www.bennadel.com/blog/3076-creating-an-index-loop-structural-directive-in-angular-2-beta-14.htm?utm_campaign=NG-Newsletter&utm_medium=email&utm_source=NG-Newsletter_146
	- Use moment.js for when the last fill up took place rather than the embedded date?

# Plugins
Random notes for getting cordova up and running
	- npm install ionic-native --save
	- ionic plugin add de.appplant.cordova.plugin.local-notification
	- see http://ionicframework.com/docs/v2/native/
	- ionic plugin add cordova-sqlite-storage
	

# Icon usage
icon name="xyz" - These are the icons we're using, and what for
	-	"funnel"                  = Filter (of what the user sees)
	- "car"                     = Car
	- "arrow-dropdown"          = Expand detail (of trip)
	- "arrow-dropup"            = Contract detail (of trip)
	- "happy" / "sad" / "heart" = MPG (under 30 = "sad", over 30 = "happy" - US equivalent of 30 is 24.98
	- "speedometer"             = Miles of trip
	- "color-fill"              = Litres filled
	- "cash"                    = Price of trip / price per litre
	- "globe"                   = Total vehicle mileage
	- "information"             = Tooltips / info hints
	- "backspace"               = Delete entry in UI (digit picker)
	- "arrow-back"              = Segment list previous year
	- "arrow-forward"           = Segment list next year
	- "checkmark"               = Tickmark (used on add car wizard)
	- "beaker"                  = NOT USED
	- "flask"                   = NOT USED
	- "disc"                    = NOT USED
	- "fastforward"             = NOT USED
	- "pulse"                   = NOT USED
	- "ribbon"                  = NOT USED

Credits
=======
Petrol pump - https://www.iconfinder.com/icons/71849/bulk_fuel_gas_petrol_station_icon#size=26
Car - https://www.iconfinder.com/icons/83150/by_car_icon#size=256
Splash screen car - https://stocksnap.io/photo/ST0Y7XFYJU

	