import type { Schema } from 'mongoose';

export interface IKeyToken {
  userId: Schema.Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshTokensUsed: string[];
  refreshToken: string;
}

export interface ICreateKeyTokens extends Omit<IKeyToken, 'userId' | 'refreshTokensUsed' | 'refreshToken'> {
  userId: string;
  refreshToken?: string;
}
export type IKeyTokensRes = Pick<IKeyToken, 'publicKey' | 'privateKey'>;
