import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';

// Initialize database
import './dbs/initial.mongodb';

import { NotFoundRequestError, ErrorResponse } from './core/error.response';
import router from './routers';

import type { NextFunction, Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// Initialize middlewares
app.use(logger('dev'));
app.use(helmet());
app.use(compression());

// Initialize router
app.use(router);

// Handle error
app.use((req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
  const errorReq = new NotFoundRequestError();
  next(errorReq);
});

app.use((error: Error, req: Request, res: Response<ErrorResponse>, _next: NextFunction) => {
  if (error instanceof ErrorResponse) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      type: error.type,
      data: error.data,
      name: error.name,
    });
  }

  const errRes = new ErrorResponse(error.message);
  return res.status(errRes.status).json({
    status: errRes.status,
    message: errRes.message,
    type: errRes.type,
    data: errRes.data,
    name: errRes.name,
  });
});

export default app;
