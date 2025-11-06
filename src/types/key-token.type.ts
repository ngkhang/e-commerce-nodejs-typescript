import type { Schema } from 'mongoose';

export interface IKeyToken {
  userId: Schema.Types.ObjectId;
  publicKey: string;
  refreshToken: [string];
}
