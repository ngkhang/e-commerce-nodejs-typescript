import app from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.info(`Server is running in: http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.info('Server closed');
  });
});
