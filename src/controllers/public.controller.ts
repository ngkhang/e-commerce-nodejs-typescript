import { CreatedResponse, OkResponse } from 'src/core/success.response';
import publicService from 'src/services/public.service';

import type { NextFunction, Request, Response } from 'express';
import type { KeyTokenRes } from 'src/types/key-token.type';
import type { IShopLogin, IShopSignUp } from 'src/types/shop.type';

class PublicController {
  public login = async (
    req: Request<Record<string, never>, unknown, IShopLogin>,
    res: Response,
    _next: NextFunction,
  ): Promise<Response> => {
    const shop = await publicService.login(req.body);

    return new CreatedResponse({
      message: 'Login successful',
      data: shop,
    }).send(res);
  };

  public signUp = async (
    req: Request<Record<string, never>, unknown, IShopSignUp>,
    res: Response,
    _next: NextFunction,
  ): Promise<Response> => {
    const createdShop = await publicService.signUp(req.body);
    return new CreatedResponse({
      message: 'Created a new shop successfully',
      data: createdShop,
    }).send(res);
  };

  public logout = async (
    req: Request & { keyStore: KeyTokenRes },
    res: Response,
    _next: NextFunction,
  ): Promise<Response> => {
    await publicService.logout(req.keyStore.userId);
    return new OkResponse({
      message: 'Logout success',
      data: {
        userId: req.keyStore.userId,
      },
    }).send(res);
  };

  public refreshToken = async (
    req: Request<Record<string, never>, unknown, { refreshToken: string }>,
    res: Response,
    _next: NextFunction,
  ): Promise<Response> => {
    const data = await publicService.refreshToken(req.body.refreshToken);
    return new OkResponse({
      message: 'Refresh token is success',
      data,
    }).send(res);
  };
}

const publicController = new PublicController();
export default publicController;
