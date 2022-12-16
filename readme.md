# Pagination

A tiny package for Deno that calculates pagination values.

## Usage

```js
import { Pagination } from 'https://deno.land/x/pagination@v1.0.0/src/mod.ts';

const pagination = new Pagination({
	totalItems: 1000,
	itemsPerPage: 10,
	currentPage: 1,
});

pagination.totalPages; // 100

pagination.hasNextPage; // true

pagination.nextPage; // 2

pagination.pageList; // [1, 2, 3, 4, 5, "…", 100]
```

## Constructor

### `Pagination()`

Creates and returns a new pagination instance. It accepts optional configuration [parameters](#parameters).

## Parameters

All configuration parameters are optional.

### `totalItems`

Total number of items in your data set, defaults to `0`.

### `currentPage`

The currently selected page, defaults to `1`.

### `itemsPerPage`

Number of items being displayed on each page, defaults to `20`.

### `maxPageDepth`

Constrain the last page to a maximum depth, defaults to `Infinity`.

### `pageListSize`

Size of the `pageList` array, defaults to `"m"`. May be one of `"xs" | "s" | "m" | "l" | "xl"`.

## Instance properties

All properties are read only.

### `firstIndex`

Index of the first item for the current page.

### `lastIndex`

Index of the last item for the current page.

### `totalPages`

The total number of pages.

### `firstPage`

The number of the first page (always 1.)

### `lastPage`

The number of the last page (optionally limited by the max depth.)

### `nextPage`

The number of the next page or null if there is no next page.

### `previousPage`

The number of the previous page or null if there is no previous page.

### `hasNextPage`

Whether or not there is a next page.

### `hasPreviousPage`

Whether or not there is a previous page.

### `isFirstPage`

Whether or not the current page is the first page.

### `isLastPage`

Whether or not the current page is the last page.

### `pageList`

A list of page numbers to display based on the specified size.

## Methods

### `.toJSON()`

Returns all of the configuration [parameters](#parameters) and [properties](#instance-properties) as a single object.
