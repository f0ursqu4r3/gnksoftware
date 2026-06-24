declare module 'bun:test' {
	type TestCallback = () => void | Promise<void>;

	export function describe(name: string, callback: TestCallback): void;
	export function test(name: string, callback: TestCallback): void;
	export function expect(actual: unknown): {
		toBe(expected: unknown): void;
		toBeGreaterThanOrEqual(expected: number): void;
		toContain(expected: unknown): void;
		toEqual(expected: unknown): void;
		toHaveLength(expected: number): void;
		not: {
			toContain(expected: unknown): void;
		};
	};
}
