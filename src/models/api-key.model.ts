import { model, Schema } from 'mongoose';

import type { Model } from 'mongoose';
import type { IApiKey } from 'src/types/api-key.type';

const API_KEY_MODEL_NAME = 'ApiKey';
const API_KEY_COLLECTION_NAME = 'ApiKeys';

const apiKeySchema = new Schema<IApiKey, Model<IApiKey>>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      enum: ['0000', '1111', '2222'],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: API_KEY_COLLECTION_NAME,
  },
);

const apiKeyModel = model(API_KEY_MODEL_NAME, apiKeySchema);
export default apiKeyModel;
