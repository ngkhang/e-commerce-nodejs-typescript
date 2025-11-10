import keyTokenModel from 'src/models/key-token.model';
import { pickFields } from 'src/utils';

import type { ICreateKeyTokens, IKeyTokensRes } from 'src/types/key-token.type';

class KeyTokenService {
  public create = async ({ userId, publicKey, privateKey }: ICreateKeyTokens): Promise<IKeyTokensRes> => {
    const tokens = await keyTokenModel.create({
      userId,
      publicKey,
      privateKey,
    });
    return pickFields(tokens, ['publicKey', 'privateKey']);
  };
}

const keyTokenService = new KeyTokenService();
export default keyTokenService;
