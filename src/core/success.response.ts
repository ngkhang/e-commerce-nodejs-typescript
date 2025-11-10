import httpStatus from 'http-status';

import type { Response } from 'express';

class SuccessResponse<T> {
  public readonly type = 'success';
  public readonly status: number;
  public readonly message: string;
  public readonly data: T;

  constructor({
    data,
    message = httpStatus[httpStatus.OK],
    status = httpStatus.OK,
  }: {
    data: T;
    message?: string;
    status?: number;
  }) {
    this.message = message;
    this.status = status;
    this.data = data;
  }

  public send(res: Response): Response {
    return res.status(this.status).json(this);
  }
}

export class OkResponse<T> extends SuccessResponse<T> {
  constructor({ data, message }: { data: T; message?: string }) {
    super({
      data,
      message,
    });
  }
}

export class CreatedResponse<T> extends SuccessResponse<T> {
  constructor({ data, message }: { data: T; message?: string }) {
    super({
      data,
      message: message ?? httpStatus[httpStatus.CREATED],
      status: httpStatus.CREATED,
    });
  }
}
