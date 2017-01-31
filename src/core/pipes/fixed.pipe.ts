import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
	name: "fixed"
})

@Injectable()
export class FixedPipe implements PipeTransform {
	transform(value: number, args: any[]) {
		let points: number = 2;
		
		if (args && args.length > 0) {
			points = Number(args[0]);	
		}
		
		return (+value).toFixed(points);
	}
}

