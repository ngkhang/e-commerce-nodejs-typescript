import jwt from 'jsonwebtoken';

import type { SignOptions } from 'jsonwebtoken';
import type { ApiResult } from 'src/types/api.type';

/**
 * Token pair returned after generation
 */
interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * JWT signing options
 */
const SIGN_OPTIONS: SignOptions = {
  algorithm: 'RS256',
};

/**
 * Token  expiration duration
 */
const TOKEN_EXPIRY = {
  ACCESS: '2 days',
  REFRESH: '7 days',
} as const;

/**
 * Generates an access and refresh token pair
 * @param payload - The JWT payload data
 * @param privateKey - The private key
 * @returns Token pair object
 * @throws Error if token generation fails
 *
 * @example
 * ```typescript
 * const tokens = generateTokenPair({ userId: '123' }, privateKey);
 * // Returns: { accessToken: '', refreshToken: '' }
 * ```
 */
export const generateTokenPair = (payload: object, publicKey: string, privateKey: string): ApiResult<TokenPair> => {
  try {
    const accessToken = jwt.sign(payload, privateKey, {
      ...SIGN_OPTIONS,
      expiresIn: TOKEN_EXPIRY.ACCESS,
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      ...SIGN_OPTIONS,
      expiresIn: TOKEN_EXPIRY.REFRESH,
    });

    return {
      code: 200,
      status: 'success',
      message: 'Generate token pair successful',
      data: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    return {
      code: 500,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      data: null,
    };
  }
};
