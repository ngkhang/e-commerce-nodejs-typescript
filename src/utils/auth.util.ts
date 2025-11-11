import { HEADER } from 'src/constants';
import { AuthFailureError, NotFoundRequestError } from 'src/core/error.response';
import { asyncHandlerError } from 'src/middlewares/handle-error.middleware';
import keyTokenService from 'src/services/key-token.service';

import { verifyToken } from './jwt.util';

import type { NextFunction, Request, Response } from 'express';
import type { KeyTokenRes } from 'src/types/key-token.type';

export const authentication = asyncHandlerError(
  async (req: Request & { keyStore?: KeyTokenRes }, _res: Response, next: NextFunction) => {
    const userId = req.headers[HEADER.CLIENT_ID]?.toString();

    // Check userId in Headers
    if (!userId) throw new AuthFailureError('Not found userId');

    // Get accessToken
    const keyStore = await keyTokenService.findByUserId(userId);
    if (!keyStore) throw new NotFoundRequestError('Not found keyStore');

    // Check accessToken is exist and verify token
    const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString();
    if (!accessToken) throw new AuthFailureError('Not found access token');

    // Compare userId in Header with jwt payload decoded
    const decodedJwtPayload = verifyToken(accessToken, keyStore.publicKey);
    if (decodedJwtPayload.userId !== userId) throw new AuthFailureError('Invalid UserId');

    req['keyStore'] = keyStore;

    return next();
  },
);
