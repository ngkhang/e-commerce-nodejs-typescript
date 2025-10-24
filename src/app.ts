import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';

// Initialize database
import './dbs/initial.mongodb';

const app = express();

// Initialize middlewares
app.use(logger('dev'));
app.use(helmet());
app.use(compression());

// Initialize router
app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Initialized Router',
  }),
);

export default app;
