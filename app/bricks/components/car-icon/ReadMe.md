Don't try and add a common "car-icon". It won't work ..


Well, it _will_ work, but not as you want.

It will render OK, but look funny because now the icon is in a sub-node, so in the DOM, instead of:

	<ion-list>
		<ion-item>
			<ion-icon name="car"></ion-icon>
		<ion-list>
	<ion-item>

You'll actually get:			

	<ion-list>
		<ion-item>
			<my-icon-component>
				<ion-icon name="car"></ion-icon>
			</my-icon-component>
		<ion-list>
	<ion-item>

So now the styles look weird.  I'm guessing because ionic have some styling that looks at _ion-item > ion-icon_ and renders differently :-(
	
	