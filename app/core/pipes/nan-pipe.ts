import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
	name: "nan"
})

@Injectable()
export class NanPipe implements PipeTransform {
	transform(value: number, args: any[]): string {
		if (value == null || value.toString() === "" || isNaN(value) ) {
			return "n/a";
		}
		
		return value.toString();
	}
}
