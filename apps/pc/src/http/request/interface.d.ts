interface Result<T = any> {
	message: string;
	data: T;
	result: T;
	code: number;
	resultData: T;
	statusCode?: number
}