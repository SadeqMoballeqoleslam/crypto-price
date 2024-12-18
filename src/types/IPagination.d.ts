interface IPagination<T> {
	LIST: T[];
	STATS: {
		PAGE: number;
		PAGE_SIZE: number;
		TOTAL_ASSETS: number;
	};
}
