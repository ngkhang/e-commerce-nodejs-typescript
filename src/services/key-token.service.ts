import keyTokenModel from 'src/models/key-token.model';
import { pickFields } from 'src/utils';

import type { ICreateKeyTokens, IKeyTokensRes } from 'src/types/key-token.type';

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
        refreshTokensUsed: [],
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
}

const keyTokenService = new KeyTokenService();
export default keyTokenService;
