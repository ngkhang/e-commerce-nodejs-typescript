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
 * Custom JWT payload
 */
interface UserJwtPayload {
  userId: string;
  email: string;
}

/**
 * Decoded JWT payload including standard JWT claims and custom user data
 */
type VerifiedJwtPayload = Pick<jwt.JwtPayload, 'iat' | 'exp' | 'iss'> & UserJwtPayload;

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
    throw new ErrorResponse(error instanceof Error ? error.message : 'Token generation failed');
  }
};

/**
 * Verifies and decodes a JWT token using the provided public key
 * @param token - The JWT token string to verify
 * @param publicKey - The public key used for signature verification
 * @returns The decoded JWT payload containing user data and standard claims
 * @throws When token verification fails (invalid signature, expired, or malformed)
 *
 * @example
 * ```typescript
 * const payload = verifyToken(authToken, process.env.JWT_PUBLIC_KEY);
 * console.log(payload.userId, payload.email);
 */
export const verifyToken = (token: string, publicKey: string): VerifiedJwtPayload => {
  try {
    return jwt.verify(token, publicKey) as VerifiedJwtPayload;
  } catch (error) {
    throw new ErrorResponse(error instanceof Error ? error.message : 'Token verification failed');
  }
};
