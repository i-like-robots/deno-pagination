import { Pagination } from '../Pagination.ts';
import { describe, it } from 'https://deno.land/std@0.160.0/testing/bdd.ts';
import {
	assertEquals,
	assertObjectMatch,
} from 'https://deno.land/std@0.160.0/testing/asserts.ts';

describe('Pagination', () => {
	it('calculates all values for the first page', () => {
		const result = new Pagination({ totalItems: 100, currentPage: 1 });

		assertObjectMatch(result.toJSON(), {
			firstIndex: 1,
			lastIndex: 20,
			totalPages: 5,
			firstPage: 1,
			lastPage: 5,
			isFirstPage: true,
			isLastPage: false,
			nextPage: 2,
			previousPage: null,
			hasNextPage: true,
			hasPreviousPage: false,
		});
	});

	it('calculates all values for the second', () => {
		const result = new Pagination({ totalItems: 100, currentPage: 2 });

		assertObjectMatch(result.toJSON(), {
			firstIndex: 21,
			lastIndex: 40,
			totalPages: 5,
			firstPage: 1,
			lastPage: 5,
			isFirstPage: false,
			isLastPage: false,
			nextPage: 3,
			previousPage: 1,
			hasNextPage: true,
			hasPreviousPage: true,
		});
	});

	it('calculates all values for the last page', () => {
		const result = new Pagination({ totalItems: 100, currentPage: 5 });

		assertObjectMatch(result.toJSON(), {
			firstIndex: 81,
			lastIndex: 100,
			totalPages: 5,
			firstPage: 1,
			lastPage: 5,
			isFirstPage: false,
			isLastPage: true,
			nextPage: null,
			previousPage: 4,
			hasNextPage: false,
			hasPreviousPage: true,
		});
	});

	it('clamps pages to a maximum depth when specified', () => {
		const result = new Pagination({
			totalItems: 1000,
			currentPage: 10,
			maxPageDepth: 10,
		});

		assertObjectMatch(result.toJSON(), {
			totalPages: 50,
			firstPage: 1,
			lastPage: 10,
			isFirstPage: false,
			isLastPage: true,
			nextPage: null,
			previousPage: 9,
			hasNextPage: false,
			hasPreviousPage: true,
		});

		assertEquals(result.pageList, [1, '…', 6, 7, 8, 9, 10]);
	});

	it('corrects the current page when less than the first page', () => {
		const result = new Pagination({
			totalItems: 1000,
			currentPage: -1,
		});

		assertObjectMatch(result.toJSON(), {
			currentPage: 1,
			isFirstPage: true,
			isLastPage: false,
			nextPage: 2,
			previousPage: null,
			hasNextPage: true,
			hasPreviousPage: false,
		});
	});

	it('corrects the current page when greater than the last page', () => {
		const result = new Pagination({
			totalItems: 1000,
			currentPage: 100,
		});

		assertObjectMatch(result.toJSON(), {
			currentPage: 50,
			isFirstPage: false,
			isLastPage: true,
			nextPage: null,
			previousPage: 49,
			hasNextPage: false,
			hasPreviousPage: true,
		});
	});
});
