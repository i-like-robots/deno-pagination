import { createPageRange } from './createPageRange.ts';

type PageListSizes = 'xs' | 's' | 'm' | 'l' | 'xl';

const Sizes: Record<PageListSizes, number> = {
	xs: 5,
	s: 7,
	m: 9,
	l: 11,
	xl: 15,
};

interface UserParams {
	/** Total number of items in your data set, defaults to 0. */
	totalItems: number;
	/** The currently selected page, defaults to 1. */
	currentPage: number;
	/** Number of items being displayed on each page, defaults to 20. */
	itemsPerPage: number;
	/** Constrain the last page to a maximum depth, defaults to Infinity. */
	maxPageDepth: number;
	/** Size of the `pageList` array, defaults to "m". */
	pageListSize: PageListSizes;
}

interface DynamicParams {
	/** Index of the first item for the current page. */
	firstIndex: number;
	/** Index of the last item for the current page. */
	lastIndex: number;
	/** The total number of pages. */
	totalPages: number;
	/** The number of the first page (always 1.) */
	firstPage: number;
	/** The number of the last page (optionally limited by the max depth.) */
	lastPage: number;
	/** The number of the next page or null if there is no next page. */
	nextPage: number | null;
	/** The number of the previous page or null if there is no previous page. */
	previousPage: number | null;
	/** Whether or not there is a next page. */
	hasNextPage: boolean;
	/** Whether or not there is a previous page. */
	hasPreviousPage: boolean;
	/** Whether or not the current page is the first page. */
	isFirstPage: boolean;
	/** Whether or not the current page is the last page. */
	isLastPage: boolean;
	/** A list of page numbers to display based on the specified size. */
	pageList: Array<number | string>;
}

export interface PaginationData extends UserParams, DynamicParams {}

export class Pagination implements UserParams, Readonly<DynamicParams> {
	public totalItems = 0;
	public currentPage = 1;
	public itemsPerPage = 20;
	public maxPageDepth = Infinity;
	public pageListSize: PageListSizes = 's';

	constructor(params: Partial<UserParams> = {}) {
		Object.assign(this, params);

		if (this.currentPage < this.firstPage) {
			this.currentPage = this.firstPage;
		} else if (this.currentPage > this.lastPage) {
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

	get pageList() {
		return createPageRange(
			this.lastPage,
			this.currentPage,
			Sizes[this.pageListSize],
		);
	}

	toJSON(): PaginationData {
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
			pageList: this.pageList,
		};
	}
}
