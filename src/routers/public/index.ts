import express from 'express';

import publicController from 'src/controllers/public.controller';

const publicRouter = express.Router();

// Sign Up router
publicRouter.post('/shop/sign-up', publicController.signUp);

export default publicRouter;
