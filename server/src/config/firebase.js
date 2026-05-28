const admin = require('firebase-admin');

const { env } = require('./env');

const initFirebase = () => {
  if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
    return null;
  }

  if (admin.apps.length) {
    return admin;
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY,
    }),
  });

  return admin;
};

module.exports = { initFirebase, admin };
