import { createPageRange } from './createPageRange.ts';

export type PaginationSizes = 'small' | 'medium' | 'large';

const Sizes: Record<PaginationSizes, number> = {
	small: 5,
	medium: 7,
	large: 9,
};

interface UserParams {
	/** Total number of items in data set, defaults to 0 */
	totalItems: number;
	/** The currently selected page, defaults to 1 */
	currentPage: number;
	/** Number of items to show per page, defaults to 20 */
	itemsPerPage: number;
	/** Constrain the last page to a maximum depth, defaults to Infinity */
	maxPageDepth: number;
	/** Number of items to return in the pages array, defaults to 7 */
	size: PaginationSizes;
}

interface DynamicParams {
	/** Index of the first item for the current page */
	firstIndex: number;
	/** Index of the last item for the current page */
	lastIndex: number;
	/** The total number of pages */
	totalPages: number;
	/** The number of the first page (always 1) */
	firstPage: number;
	/** The number of the last page, optionally limited to the specified max depth */
	lastPage: number;
	/** The number of the next page or empty if there is no next page */
	nextPage: number | null;
	/** The number of the previous page or empty if there is no previous page */
	previousPage: number | null;
	/** Boolean indicating whether or not there is a next page */
	hasNextPage: boolean;
	/** Boolean indicating whether or not there is a previous page */
	hasPreviousPage: boolean;
	/** Boolean indicating whether or not the current page is the first page */
	isFirstPage: boolean;
	/** Boolean indicating whether or not the current page is the last page */
	isLastPage: boolean;
}

export interface PaginationData extends UserParams, DynamicParams {
	toJSON(): PaginationData;
}

export class Pagination implements PaginationData {
	public totalItems = 0;
	public currentPage = 1;
	public itemsPerPage = 20;
	public maxPageDepth = Infinity;
	public size: PaginationSizes = 'medium';

	constructor(params: Partial<UserParams>) {
		Object.assign(this, params);

		if (this.currentPage < this.firstPage) {
			this.currentPage = this.firstPage;
		}

		if (this.currentPage > this.lastPage) {
			this.currentPage = this.lastPage;
		}

		Object.seal(this);
	}

	get firstIndex() {
		return (this.currentPage - 1) * this.itemsPerPage + 1;
	}

	get lastIndex() {
		return Math.min(
			this.totalItems,
			this.firstIndex + this.itemsPerPage - 1,
		);
	}

	get totalPages() {
		return Math.ceil(this.totalItems / this.itemsPerPage);
	}

	get firstPage() {
		return 1;
	}

	get lastPage() {
		return Math.min(this.totalPages, this.maxPageDepth);
	}

	get isFirstPage() {
		return this.currentPage === this.firstPage;
	}

	get isLastPage() {
		return this.currentPage === this.lastPage;
	}

	get nextPage() {
		return this.hasNextPage ? this.currentPage + 1 : null;
	}

	get previousPage() {
		return this.hasPreviousPage ? this.currentPage - 1 : null;
	}

	get hasNextPage() {
		return this.currentPage < this.lastPage;
	}

	get hasPreviousPage() {
		return this.currentPage > this.firstPage;
	}

	get skipBackTo() {
		return Math.max(this.currentPage - 5, this.firstPage);
	}

	get skipForwardTo() {
		return Math.min(this.currentPage + 5, this.lastPage);
	}

	get showSkipBackTo() {
		return this.currentPage > this.firstPage + Sizes[this.size];
	}

	get showSkipForwardTo() {
		return this.currentPage < this.lastPage - Sizes[this.size];
	}

	get pages() {
		return createPageRange(
			this.lastPage,
			this.currentPage,
			Sizes[this.size],
		);
	}

	toJSON() {
		return {
			...this,
			firstIndex: this.firstIndex,
			lastIndex: this.lastIndex,
			totalPages: this.totalPages,
			firstPage: this.firstPage,
			lastPage: this.lastPage,
			isFirstPage: this.isFirstPage,
			isLastPage: this.isLastPage,
			nextPage: this.nextPage,
			previousPage: this.previousPage,
			hasNextPage: this.hasNextPage,
			hasPreviousPage: this.hasPreviousPage,
			pages: this.pages,
		};
	}
}
