import * as crypto from 'crypto';

import {
  ConflictRequestError,
  AuthFailureError,
  NotFoundRequestError,
  ForbiddenRequestError,
} from 'src/core/error.response';
import shopModel, { RoleShop } from 'src/models/shop.model';
import { pickFields } from 'src/utils';
import { generateTokenPair, verifyToken } from 'src/utils/jwt.util';
import { hashPassword, verifyPassword } from 'src/utils/password';

import keyTokenService from './key-token.service';
import shopService from './shop.service';

import type { IShopLogin, IShopLoginRes, IShopSignUp, IShopSignUpRes } from 'src/types/shop.type';

class PublicService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async login({ email, password, refreshToken = null }: IShopLogin): Promise<IShopLoginRes> {
    // Check shop exist
    const shop = await shopService.findByEmail(email);

    if (!shop) throw new NotFoundRequestError('Shop not registered');

    // Compare password
    const isMatchPassword = verifyPassword(password, shop.password);
    if (!isMatchPassword) throw new AuthFailureError('Password is in-correct');

    // Create AS and RF
    const publicKey = crypto.randomBytes(64).toString('hex');
    const privateKey = crypto.randomBytes(64).toString('hex');

    // Generate tokens
    const { _id: userId } = shop;
    const tokens = generateTokenPair({ userId, email }, publicKey, privateKey);

    await keyTokenService.create({
      userId,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    // Return data login
    return {
      shop: pickFields(shop, ['_id', 'email', 'name']),
      ...tokens,
    };
  }

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

    const { _id: userId } = newShop;
    const publicKey = crypto.randomBytes(64).toString('hex');
    const privateKey = crypto.randomBytes(64).toString('hex');

    const tokens = generateTokenPair({ userId, email }, publicKey, privateKey);

    await keyTokenService.create({
      userId,
      publicKey,
      privateKey,
    });

    return {
      shop: pickFields(newShop, ['_id', 'name', 'email']),
      ...tokens,
    };
  }

  public logout = async (userId: string): Promise<boolean> => await keyTokenService.deleteByUserId(userId);

  public refreshToken = async (refreshToken: string): Promise<IShopLoginRes> => {
    const foundToken = await keyTokenService.findByRefreshTokenUsed(refreshToken);

    if (foundToken) {
      const { userId, email } = verifyToken(refreshToken, foundToken.privateKey);
      console.info({ userId, email });

      await keyTokenService.deleteByUserId(userId);
      throw new ForbiddenRequestError('Something wrong happen! Please re-login');
    }

    const holderShop = await keyTokenService.findByRefreshToken(refreshToken);
    if (!holderShop) throw new AuthFailureError('Shop not registered');

    // Verify tokens
    const { userId, email } = verifyToken(refreshToken, holderShop.privateKey);
    // Check userId
    const foundShop = await shopService.findByEmail(email);
    if (!foundShop) throw new AuthFailureError('Shop not registered');

    // Generate a new token pair
    const tokens = generateTokenPair({ userId, email }, holderShop.publicKey, holderShop.privateKey);

    // Update token pair into DB
    await keyTokenService.updateRefreshTokenUsed(userId, tokens.refreshToken, refreshToken);

    // Return
    return {
      shop: pickFields(foundShop, ['_id', 'name', 'email']),
      ...tokens,
    };
  };
}

const publicService = new PublicService();
export default publicService;
