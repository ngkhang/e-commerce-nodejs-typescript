import * as bcrypt from 'bcrypt';

/**
 * Number of salt rounds for bcrypt hashing.
 * Higher values increase security but slow down hashing.
 */
const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param password - The plain text password to hash
 * @returns The bcrypt hashed password
 *
 * @example
 * ```typescript
 * const hashed = hashPassword('mySecretPassword');
 * // Returns: '$2b$10$...'
 * ```
 */
export const hashPassword = (password: string): string => bcrypt.hashSync(password, SALT_ROUNDS);

/**
 * Verifies a plain text password against a bcrypt hash.
 * @param password - The plain text password to verify
 * @param hash - The bcrypt hash to compare against
 * @returns `true` if the password matches the hash, `false` otherwise
 *
 * @example
 * ```typescript
 * const isValid = verifyPassword('myPassword', hashedPassword);
 * if (isValid) {
 *   // Authentication successful
 * }
 * ```
 */
export const verifyPassword = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash);
