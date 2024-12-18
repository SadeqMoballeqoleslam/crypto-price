interface IResponse<T> {
	Data: T;
	Error: { [key: string]: string };
}
