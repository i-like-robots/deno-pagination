export function createRange(start: number, end: number): number[] {
	const length = end - start + 1;
	return Array.from({ length }).map((_, i) => i + start);
}

export function createPageRange(
	totalPages: number,
	currentPage: number,
	size: number,
): Array<number | string> {
	const radius = Math.floor(size / 2);
	const offset = Math.ceil(size / 2);

	if (totalPages <= size) {
		return createRange(1, totalPages);
	}

	if (currentPage <= offset) {
		const start = 1;
		const end = size - 2;

		return [...createRange(start, end), '…', totalPages];
	}

	if (currentPage + offset > totalPages) {
		const start = totalPages - size + 3;
		const end = totalPages;

		return [1, '…', ...createRange(start, end)];
	}

	const start = currentPage - radius + 2;
	const end = currentPage + radius - 2;

	return [1, '…', ...createRange(start, end), '…', totalPages];
}
