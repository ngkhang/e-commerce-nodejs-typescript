import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';

// Initialize database
import './dbs/initial.mongodb';
import router from './routers';

const app = express();

app.use(express.json());
// Initialize middlewares
app.use(logger('dev'));
app.use(helmet());
app.use(compression());

// Initialize router
app.use(router);

export default app;
