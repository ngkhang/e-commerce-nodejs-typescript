import publicService from 'src/services/public.service';

import type { NextFunction, Request, Response } from 'express';
import type { IShopSignUp } from 'src/types/shop.type';

class PublicController {
  public signUp = async (
    req: Request<Record<string, never>, unknown, IShopSignUp>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const result = await publicService.signUp(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  };
}

const publicController = new PublicController();
export default publicController;
