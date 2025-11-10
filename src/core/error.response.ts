import httpStatus from 'http-status';

export class ErrorResponse extends Error {
  public readonly status: number;
  public readonly type = 'error';
  public readonly data = null;

  constructor(
    message: string = httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
    status: number = httpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.status = status;
    this.name = 'InternalServerError';
  }
}

export class NotFoundRequestError extends ErrorResponse {
  public readonly name = 'NotFoundRequestError';
  constructor(message?: string, status?: number) {
    const statusCode = httpStatus.NOT_FOUND;
    super(message ?? httpStatus[statusCode], status ?? statusCode);
  }
}

export class BadRequestError extends ErrorResponse {
  public readonly name = 'BadRequestError';
  constructor(message?: string, status?: number) {
    const statusCode = httpStatus.BAD_REQUEST;
    super(message ?? httpStatus[statusCode], status ?? statusCode);
  }
}

export class ConflictRequestError extends ErrorResponse {
  public readonly name = 'ConflictRequestError';
  constructor(message?: string, status?: number) {
    const statusCode = httpStatus.CONFLICT;
    super(message ?? httpStatus[statusCode], status ?? statusCode);
  }
}

export class ForbiddenRequestError extends ErrorResponse {
  public readonly name = 'ForbiddenRequestError';
  constructor(message?: string, status?: number) {
    const statusCode = httpStatus.FORBIDDEN;
    super(message ?? httpStatus[statusCode], status ?? statusCode);
  }
}
