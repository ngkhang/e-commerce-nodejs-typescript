import 'dotenv/config';

interface Environment {
  nodeEnv: string;
  app: {
    host: string;
    port: number;
  };
  db: {
    uri: string;
  };
}

interface EnvConfig {
  dev: Environment;
}

const dev: Environment = {
  nodeEnv: process.env.NODE_ENV || 'dev',
  app: {
    host: process.env.DEV_APP_HOST || 'localhost',
    port: process.env.DEV_APP_PORT ? Number(process.env.DEV_APP_PORT) : 3000,
  },
  db: {
    uri: process.env.DEV_DB_URI || 'mongodb://localhost:27017/shopDev',
  },
};

const envConfig: EnvConfig = {
  dev,
};

const nodeEnv = process.env.NODE_ENV || 'dev';

export default envConfig[nodeEnv as keyof EnvConfig];
