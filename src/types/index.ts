export interface Item {
	name: string;
	id: string;
	price: number;
	amount?: number;
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
