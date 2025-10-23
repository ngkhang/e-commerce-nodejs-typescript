import app from './app';
import envConfig from './configs/environment.config';

const { host, port } = envConfig.app;

const server = app.listen(port, () => {
  console.info(`Server is running in: http://${host}:${port}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.info('Server closed');
  });
});
