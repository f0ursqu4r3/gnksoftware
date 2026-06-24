import { describe, expect, test } from 'bun:test';
import { getRelatedServices, getServiceBySlug, serviceSlugs, services } from './services';

const expectedSlugs = [
	'product-engineering',
	'backend-systems',
	'data-automation',
	'internal-platforms',
	'modernization',
	'technical-rescue',
];

describe('services data', () => {
	test('defines exactly the approved service routes', () => {
		expect(serviceSlugs).toEqual(expectedSlugs);
	});

	test('keeps slugs unique and lookupable', () => {
		expect(new Set(serviceSlugs).size).toBe(serviceSlugs.length);

		for (const service of services) {
			expect(getServiceBySlug(service.slug)).toBe(service);
			expect(service.homepageBullets).toHaveLength(3);
			expect(service.related.length).toBeGreaterThanOrEqual(2);
		}
	});

	test('uses valid related service references', () => {
		for (const service of services) {
			const related = getRelatedServices(service);

			expect(related.map((item) => item.slug)).toEqual(service.related);
			expect(related).not.toContain(service);
		}
	});
});
