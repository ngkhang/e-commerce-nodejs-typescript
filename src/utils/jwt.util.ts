import jwt from 'jsonwebtoken';

import { ErrorResponse } from 'src/core/error.response';

import type { SignOptions } from 'jsonwebtoken';

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
  algorithm: 'HS256',
  issuer: 'ngkhang-ecommerce',
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
export const generateTokenPair = (payload: object, publicKey: string, privateKey: string): TokenPair => {
  try {
    const accessToken = jwt.sign(payload, publicKey, {
      ...SIGN_OPTIONS,
      expiresIn: TOKEN_EXPIRY.ACCESS,
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      ...SIGN_OPTIONS,
      expiresIn: TOKEN_EXPIRY.REFRESH,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ErrorResponse(error instanceof Error ? error.message : 'Unknown error');
  }
};
