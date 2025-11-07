import keyTokenModel from 'src/models/key-token.model';
import { pickFields } from 'src/utils';

import type { ApiResult } from 'src/types/api.type';
import type { ICreateKeyTokens, IKeyTokensRes } from 'src/types/key-token.type';

class KeyTokenService {
  public create = async ({ userId, publicKey, privateKey }: ICreateKeyTokens): Promise<ApiResult<IKeyTokensRes>> => {
    try {
      const tokens = await keyTokenModel.create({
        userId,
        publicKey,
        privateKey,
      });

      return {
        code: 200,
        status: 'success',
        message: 'Create a new tokens is successful',
        data: pickFields(tokens, ['publicKey', 'privateKey']),
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        status: 'error',
        message: 'Key Token service fail',
        data: null,
      };
    }
  };
}

const keyTokenService = new KeyTokenService();
export default keyTokenService;
