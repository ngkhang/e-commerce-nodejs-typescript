import { CreatedResponse } from 'src/core/success.response';
import publicService from 'src/services/public.service';

import type { NextFunction, Request, Response } from 'express';
import type { IShopSignUp } from 'src/types/shop.type';

class PublicController {
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
}

const publicController = new PublicController();
export default publicController;
