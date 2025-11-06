import { model, Schema } from 'mongoose';

import type { Model } from 'mongoose';
import type { IShop } from 'src/types/shop.type';

export const RoleShop = {
  SHOP: '001',
  WRITE: '002',
};

const MODEL_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

const shopSchema = new Schema<IShop, Model<IShop>>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: [String],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

const shopModel = model(MODEL_NAME, shopSchema);
export default shopModel;
