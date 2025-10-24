import mongoose from 'mongoose';

import environmentConfig from '@configs/environment.config';

const { db, nodeEnv } = environmentConfig;
const MAX_POOL_SIZE = 50;

class Database {
  private static instance: Database | null = null;

  constructor() {
    this.connect();
  }

  private connect(): void {
    if (nodeEnv === 'dev') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(db.uri, {
        maxPoolSize: MAX_POOL_SIZE,
      })
      .then(() => {
        console.info('Database connected');
      })
      .catch((error: Error) => {
        console.error('Database connect failed:', error);
      });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDb = Database.getInstance();
export default instanceMongoDb;
