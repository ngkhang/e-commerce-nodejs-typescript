import { ForbiddenRequestError } from 'src/core/error.response';
import apiKeyService from 'src/services/api-key.service';

import type { NextFunction, Request, Response } from 'express';
import type { IApiKey, IPermission } from 'src/types/api-key.type';

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

const validationApiKey = async (
  req: Request & { objKey?: IApiKey },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const key = req.headers[HEADER.API_KEY]?.toString();
  if (!key) throw new ForbiddenRequestError();

  const objKey = await apiKeyService.findById(key);
  req['objKey'] = objKey;

  return next();
};

const permission =
  (permissions: IPermission) =>
  (req: Request & { objKey?: IApiKey }, res: Response, next: NextFunction): void => {
    const reqPermissions = req.objKey?.permissions;

    if (!reqPermissions) throw new ForbiddenRequestError();

    const validPermission = reqPermissions.includes(permissions);

    if (!validPermission) throw new ForbiddenRequestError();

    return next();
  };

const authMiddleware = {
  validationApiKey,
  permission,
};

export default authMiddleware;
