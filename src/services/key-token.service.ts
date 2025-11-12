import { Types } from 'mongoose';

import keyTokenModel from 'src/models/key-token.model';
import { pickFields } from 'src/utils';

import type { ICreateKeyTokens, IKeyTokensRes, KeyTokenRes } from 'src/types/key-token.type';

class KeyTokenService {
  public create = async ({ userId, publicKey, privateKey, refreshToken }: ICreateKeyTokens): Promise<IKeyTokensRes> => {
    const tokens = await keyTokenModel.findOneAndUpdate(
      // Filter
      {
        userId,
      },
      // Update
      {
        publicKey,
        privateKey,
        // refreshTokensUsed: [],
        refreshToken,
      },
      // Options
      {
        upsert: true,
        new: true,
      },
    );
    return pickFields(tokens, ['publicKey', 'privateKey']);
  };

  public findByUserId = async (userId: string): Promise<KeyTokenRes | null> => {
    const result = await keyTokenModel
      .findOne({
        userId: new Types.ObjectId(userId),
      })
      .lean();

    if (!result) return null;

    return {
      ...result,
      id: result._id.toString(),
      userId: result.userId.toString(),
    };
  };

  public deleteByUserId = async (userId: string): Promise<boolean> => {
    const { acknowledged } = await keyTokenModel.deleteMany({
      userId: new Types.ObjectId(userId),
    });

    return acknowledged;
  };

  public findByRefreshTokenUsed = async (refreshToken: string): Promise<KeyTokenRes | null> => {
    const result = await keyTokenModel
      .findOne({
        refreshTokensUsed: refreshToken,
      })
      .lean();

    if (!result) return null;
    return {
      ...result,
      id: result._id.toString(),
      userId: result.userId.toString(),
    };
  };

  public findByRefreshToken = async (refreshToken: string): Promise<KeyTokenRes | null> => {
    const result = await keyTokenModel
      .findOne({
        refreshToken,
      })
      .lean();

    if (!result) return null;
    return {
      ...result,
      id: result._id.toString(),
      userId: result.userId.toString(),
    };
  };

  public updateRefreshTokenUsed = async (
    userId: string,
    newRefreshToken: string,
    oldRefreshToken: string,
  ): Promise<KeyTokenRes | null> => {
    const result = await keyTokenModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
      },
      { $push: { refreshTokensUsed: oldRefreshToken }, $set: { refreshToken: newRefreshToken } },
    );

    if (!result) return null;

    return {
      ...result,
      id: result._id.toString(),
      userId: result.userId.toString(),
    };
  };
}

const keyTokenService = new KeyTokenService();
export default keyTokenService;
