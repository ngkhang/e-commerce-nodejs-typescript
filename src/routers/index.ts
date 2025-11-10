import express from 'express';

import authMiddleware from 'src/middlewares/auth.middleware';

import publicRouter from './public';

const router = express.Router();

// Check api key and permission
router.use(authMiddleware.validationApiKey, authMiddleware.permission('0000'));

// Public router e.g. Sign up, sign in
router.use('/v1/api', publicRouter);

export default router;
