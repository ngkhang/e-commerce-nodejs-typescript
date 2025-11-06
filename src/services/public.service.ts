import shopModel, { RoleShop } from 'src/models/shop.model';
import { hashPassword } from 'src/utils/password';

import type { ApiResult } from 'src/types/api.type';
import type { IShopSignUp, IShopSignUpRes } from 'src/types/shop.type';

class PublicService {
  public async signUp({ name, email, password }: IShopSignUp): Promise<ApiResult<IShopSignUpRes>> {
    try {
      // Check exist shop
      const holderShop = await shopModel
        .findOne({
          email,
        })
        .lean()
        .exec();

      if (holderShop) {
        return {
          code: 409,
          status: 'error',
          message: 'Shop already registered!',
          data: null,
        };
      }

      //  Add new shop
      const newShop = await shopModel.create({
        name,
        password: hashPassword(password),
        email,
        roles: [RoleShop.SHOP],
      });

      // Generate token

      return {
        code: 201,
        message: 'Created a new shop successfully',
        status: 'success',
        data: {
          id: String(newShop._id),
        },
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        code: 500,
        message,
        status: 'error',
        data: null,
      };
    }
  }
}

const publicService = new PublicService();
export default publicService;
