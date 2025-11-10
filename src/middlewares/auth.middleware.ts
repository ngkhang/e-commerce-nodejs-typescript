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
): Promise<Response | void> => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
      return res.status(403).json({
        code: 403,
        status: 'error',
        message: 'Forbidden Error',
        data: null,
      });
    }

    const objKey = await apiKeyService.findById(key);
    if (objKey.status === 'error') {
      return res.status(403).json(objKey);
    }

    req['objKey'] = objKey.data;

    return next();
  } catch (error) {
    console.error(error);
  }
};

const permission =
  (permissions: IPermission) => (req: Request & { objKey?: IApiKey }, res: Response, next: NextFunction) => {
    const reqPermissions = req.objKey?.permissions;

    if (!reqPermissions) {
      return res.status(403).json({
        code: 403,
        status: 'error',
        message: 'Permission Denied',
        data: null,
      });
    }

    const validPermission = reqPermissions.includes(permissions);

    if (!validPermission) {
      return res.status(403).json({
        code: 403,
        status: 'error',
        message: 'Permission Denied',
        data: null,
      });
    }

    return next();
  };

const authMiddleware = {
  validationApiKey,
  permission,
};

export default authMiddleware;
