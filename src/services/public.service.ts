import * as crypto from 'crypto';

import shopModel, { RoleShop } from 'src/models/shop.model';
import { pickFields } from 'src/utils';
import { generateTokenPair } from 'src/utils/jwt.util';
import { hashPassword } from 'src/utils/password';

import keyTokenService from './key-token.service';

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

      // if (newShop) {
      // Generate token
      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      });

      const publicKeyString = await keyTokenService.create({
        userId: newShop._id,
        publicKey,
      });
      if (publicKeyString.status === 'error') return publicKeyString;

      const payload = { userId: newShop._id, email };

      const tokens = generateTokenPair(payload, publicKeyString.data, privateKey);
      if (tokens.status === 'error') return tokens;

      return {
        code: 201,
        message: 'Created a new shop successfully',
        status: 'success',
        data: {
          shop: pickFields(newShop, ['_id', 'name', 'email']),
          ...tokens.data,
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
