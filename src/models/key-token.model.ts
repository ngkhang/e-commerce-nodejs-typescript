import { model, Schema } from 'mongoose';

import { SHOP_MODEL_NAME } from './shop.model';

import type { Model } from 'mongoose';
import type { IKeyToken } from 'src/types/key-token.type';

const KEY_TOKEN_MODEL_NAME = 'KeyToken';
const KEY_TOKEN_COLLECTION_NAME = 'KeyTokens';

const keyTokenSchema = new Schema<IKeyToken, Model<IKeyToken>>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: SHOP_MODEL_NAME,
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: KEY_TOKEN_COLLECTION_NAME,
  },
);

const keyTokenModel = model(KEY_TOKEN_MODEL_NAME, keyTokenSchema);
export default keyTokenModel;
