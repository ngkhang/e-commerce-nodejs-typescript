import type { Types } from 'mongoose';

export interface IKeyToken {
  userId: Types.ObjectId;
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

export interface KeyTokenRes {
  id: string;
  userId: string;
  publicKey: string;
  privateKey: string;
  refreshTokensUsed: string[];
  refreshToken: string;
}
