import { createPageRange } from '../createPageRange.ts';
import { describe, it } from 'https://deno.land/std@0.160.0/testing/bdd.ts';
import { assertEquals } from 'https://deno.land/std@0.160.0/testing/asserts.ts';

describe('.createPageRange()', () => {
	describe('when the number of pages is less than set size', () => {
		it('returns every page number', () => {
			const result = createPageRange(2, 1, 7);
			assertEquals(result, [1, 2]);
		});
	});

	describe('when the number of pages is equal to the set size', () => {
		it('returns every page number', () => {
			const result = createPageRange(7, 1, 7);
			assertEquals(result, [1, 2, 3, 4, 5, 6, 7]);
		});
	});

	describe('when the number of pages is greater than set size', () => {
		describe('and the current page number is at the start', () => {
			it('truncates page numbers to the start', () => {
				const result = createPageRange(100, 1, 7);
				assertEquals(result, [1, 2, 3, 4, 5, '…', 100]);
			});
		});

		describe('and the current page number is at the end', () => {
			it('truncates page numbers to the end', () => {
				const result = createPageRange(100, 97, 7);
				assertEquals(result, [1, '…', 96, 97, 98, 99, 100]);
			});
		});

		describe('and the current page number is in the middle', () => {
			it('truncates the start and end page numbers', () => {
				const result = createPageRange(100, 49, 7);

				assertEquals(result, [
					1,
					'…',
					48,
					49,
					50,
					'…',
					100,
				]);
			});
		});
	});
});
