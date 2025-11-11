import express from 'express';

import publicController from 'src/controllers/public.controller';
import { asyncHandlerError } from 'src/middlewares/handle-error.middleware';
import { authentication } from 'src/utils/auth.util';

const publicRouter = express.Router();

// Sign Up router
publicRouter.post('/shop/sign-up', asyncHandlerError(publicController.signUp));

// Login router
publicRouter.post('/shop/login', asyncHandlerError(publicController.login));

// Authentication middleware
publicRouter.use(authentication);
// Logout router
publicRouter.post('/shop/logout', asyncHandlerError(publicController.logout));

export default publicRouter;
