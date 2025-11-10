import * as crypto from 'crypto';

import { ConflictRequestError } from 'src/core/error.response';
import shopModel, { RoleShop } from 'src/models/shop.model';
import { pickFields } from 'src/utils';
import { generateTokenPair } from 'src/utils/jwt.util';
import { hashPassword } from 'src/utils/password';

import keyTokenService from './key-token.service';

import type { IShopSignUp, IShopSignUpRes } from 'src/types/shop.type';

class PublicService {
  public async signUp({ name, email, password }: IShopSignUp): Promise<IShopSignUpRes> {
    // Check exist shop
    const holderShop = await shopModel
      .findOne({
        email,
      })
      .lean()
      .exec();

    if (holderShop) throw new ConflictRequestError('Shop already registered!');

    const newShop = await shopModel.create({
      name,
      password: hashPassword(password),
      email,
      roles: [RoleShop.SHOP],
    });

    const publicKey = crypto.randomBytes(64).toString('hex');
    const privateKey = crypto.randomBytes(64).toString('hex');

    const keyStore = await keyTokenService.create({
      userId: newShop._id,
      publicKey,
      privateKey,
    });

    const tokens = generateTokenPair({ userId: newShop._id, email }, keyStore.publicKey, keyStore.privateKey);

    return {
      shop: pickFields(newShop, ['_id', 'name', 'email']),
      ...tokens,
    };
  }
}

const publicService = new PublicService();
export default publicService;
