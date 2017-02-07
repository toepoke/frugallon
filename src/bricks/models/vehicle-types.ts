
export class VehicleType {

	/**
	 * Unique id of the type, e.g. "CAR".
	 */
	type: string = "";

	/**
	 * Name of the icon to use for the vehicle type.
	 */
	iconName: string = "";

	/**
	 * Description of the vehicle type
	 */
	description: string = "";

	static create(type: string, iconName: string, description: string): VehicleType {
		let item: VehicleType = new VehicleType();

		item.type = type;
		item.iconName = iconName;
		item.description = description;

		return item;
	}

	static getVehicleTypes(): Array<VehicleType> {
		let offBlue: string = "#A6AFF7";
		let trans: string = "transparent";
		let types: Array<VehicleType> = new Array<VehicleType>();

		types.push( VehicleType.create("CAR", "car", "Car") );
		types.push( VehicleType.create("BIKE", "bicycle", "Motorbike") );
		types.push( VehicleType.create("LORRY", "bus", "Lorry") );

		return types;
	}

}

