import express from 'express';

import publicRouter from './public';

const router = express.Router();

// Public router e.g. Sign up, sign in
router.use('/v1/api', publicRouter);

export default router;
