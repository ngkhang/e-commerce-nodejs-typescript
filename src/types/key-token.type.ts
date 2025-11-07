import type { Schema } from 'mongoose';

export interface IKeyToken {
  userId: Schema.Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: [string];
}

export interface ICreateKeyTokens extends Omit<IKeyToken, 'refreshToken' | 'userId'> {
  userId: string;
}
export type IKeyTokensRes = Pick<IKeyToken, 'publicKey' | 'privateKey'>;
