import express from 'express';

import publicController from 'src/controllers/public.controller';
import { asyncHandlerError } from 'src/middlewares/handle-error.middleware';

const publicRouter = express.Router();

// Sign Up router
publicRouter.post('/shop/sign-up', asyncHandlerError(publicController.signUp));

export default publicRouter;
