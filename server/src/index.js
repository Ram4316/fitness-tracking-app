require('dotenv').config();

const app = require('./app');
const { connectDb } = require('./config/db');
const { initFirebase } = require('./config/firebase');
const { env, validateEnv } = require('./config/env');

const start = async () => {
  validateEnv();
  await connectDb();
  initFirebase();

  app.listen(env.PORT, () => {
    console.log(`API listening on ${env.PORT}`);
  });
};

start().catch(error => {
  console.error('Failed to start server', error);
  process.exit(1);
});
