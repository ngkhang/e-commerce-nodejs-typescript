import type { NextFunction, Request, Response } from 'express';

type IAsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * Wraps async Express handlers to automatically catch errors and pass them to error middleware.
 *
 * @param fn  -  The async route handler function
 * @returns Express middleware that handles promise rejections
 * @example
 * ```typescript
 * router.get('/users', asyncHandlerError(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 */
export const asyncHandlerError = (fn: IAsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};
