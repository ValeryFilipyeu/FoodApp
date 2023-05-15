import { truthy, falsy } from './index';

describe('truthy', () => {
	it('should return true for truthy values', () => {
		expect(truthy('hello')).toBe(true);
		expect(truthy(1)).toBe(true);
		expect(truthy(true)).toBe(true);
		expect(truthy([])).toBe(true);
		expect(truthy({})).toBe(true);
	});

	it('should return false for falsy values', () => {
		expect(truthy(0)).toBe(false);
		expect(truthy('')).toBe(false);
		expect(truthy(false)).toBe(false);
		expect(truthy(null)).toBe(false);
		expect(truthy(undefined)).toBe(false);
	});
});

describe('falsy', () => {
	it('should return true for falsy values', () => {
		expect(falsy(0)).toBe(true);
		expect(falsy('')).toBe(true);
		expect(falsy(false)).toBe(true);
		expect(falsy(null)).toBe(true);
		expect(falsy(undefined)).toBe(true);
	});

	it('should return false for truthy values', () => {
		expect(falsy('hello')).toBe(false);
		expect(falsy(1)).toBe(false);
		expect(falsy(true)).toBe(false);
		expect(falsy([])).toBe(false);
		expect(falsy({})).toBe(false);
	});
});