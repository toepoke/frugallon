import { Component, Input } from '@angular/core';
import { COMPONENT_STRATEGY } from "../../../strategy";

@Component({
	selector: "product-name-ion",
	changeDetection: COMPONENT_STRATEGY,
	styles: [
`
	.title {
		font-family: "Century Gothic";
	}
	.fru {
		color: #ee0000;
	}	
	.gal {
		color: #D200EF;
	}
	.lon {
		color: #800078;
	}
`
	],
	template:`
		<div [style.fontSize]="size" class="title">
			<span class="fru">fru</span><span class="gal">gal</span><span class="lon">lon</span>
		</div>
`,
})
 
export class ProductNameIon {
	@Input() size: string = "xx-large";

}

