import os from 'os';
import process from 'process';

import mongoose from 'mongoose';

const MAX_CONNECTIONS = 5;
const MAX_TIME_CHECKING = 60000; // 1 minute

const countConnectDb = (): number => mongoose.connections.length;

const isOverloadDb = (): void => {
  setInterval(() => {
    const numCpus = os.cpus().length;
    const numConnects = countConnectDb();
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024; // MB

    const systemResourceUsage = `CPUs: ${numCpus} - Memory Usage: ${memoryUsage.toFixed(2)} MB - Connections: ${numConnects}`;

    console.info(systemResourceUsage);

    if (numConnects > MAX_CONNECTIONS) {
      console.info('Database connections overload detected');
    }
  }, MAX_TIME_CHECKING);
};

export { countConnectDb, isOverloadDb };
