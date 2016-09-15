import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
	name: "poundify"
})

@Injectable()
export class PoundifyPipe implements PipeTransform {
	transform(value: number, args: any[]): string {
		if (value === null) {
			return null;
		}
		if (value.toString() === "") {
			return "";
		}
		if (isNaN(value) ) {
			return value.toString();
		}
		
		return `£${ (+value).toFixed(2) }`;
	}
}
