import 'dotenv/config';

interface Environment {
  app: {
    host: string;
    port: number;
  };
}

interface EnvConfig {
  dev: Environment;
}

const dev: Environment = {
  app: {
    host: process.env.DEV_APP_HOST || 'localhost',
    port: process.env.DEV_APP_PORT ? Number(process.env.DEV_APP_PORT) : 3000,
  },
};

const envConfig: EnvConfig = {
  dev,
};

const nodeEnv = process.env.NODE_ENV || 'dev';

export default envConfig[nodeEnv as keyof EnvConfig];
