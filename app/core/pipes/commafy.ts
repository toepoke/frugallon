import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
	name: "commafy"
})

@Injectable()
export class CommafyPipe implements PipeTransform {
	transform(value: number, args: string): string {
		if (value === null)
			return null;
		if (value.toString() === "")
			return "";
		
		let parts = value.toString().split(".");
		let output: string = "";

		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		output = parts.join(".");

		if (args && args.length > 0) {
			output = args.replace("{0}", output);
		}

		return output;
	}
}