import keyTokenModel from 'src/models/key-token.model';

import type { ApiResult } from 'src/types/api.type';

class KeyTokenService {
  public create = async ({ userId, publicKey }: { userId: string; publicKey: string }): Promise<ApiResult<string>> => {
    try {
      const tokens = await keyTokenModel.create({
        userId,
        publicKey,
      });

      return {
        code: 200,
        status: 'success',
        message: 'Create a new tokens is successful',
        data: tokens.publicKey,
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
