interface BaseResponse<T> {
  code: number;
  status: 'success' | 'error';
  message: string;
  data: T;
}

interface SuccessResponse<T> extends BaseResponse<T> {
  status: 'success';
}

interface ErrorResponse extends BaseResponse<null> {
  status: 'error';
}

export type ApiResult<T> = SuccessResponse<T> | ErrorResponse;
