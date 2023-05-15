export type Falsy = 0 | '' | false | null | undefined;

export function truthy<T>(x: T): x is Exclude<T, Falsy> {
	// eslint-disable-next-line
	return !!(x as unknown);
}

export function falsy<T>(x: T): x is T & Falsy {
	// eslint-disable-next-line
	return !(x as unknown);
}
