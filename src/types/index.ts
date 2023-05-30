export interface Item extends Meal {
	amount?: number;
}

export interface Meal {
	id: string;
	name: string;
	price: number;
	description: string;
}

export interface InputData {
	id: string;
	type: string;
	min: string;
	max: string;
	step: string;
	defaultValue: string;
}

export interface UserData {
	name: string;
	street: string;
	city: string;
	postalCode: string;
}
