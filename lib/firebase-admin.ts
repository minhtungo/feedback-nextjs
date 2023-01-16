// @ts-nocheck

// import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
// import { getFirestore } from 'firebase-admin/firestore';
// import { getAuth } from 'firebase-admin/auth';
// import firebaseConfig from './firebaseConfig.json';

// let admin = getApps()[0];

// if (!admin) {
//   console.log('hello');
//   admin = initializeApp({
//     credential: applicationDefault(),
//     databaseURL: 'https://fast-feedback-1dd6a.firebaseio.com',
//   });
// }

// export const db = getFirestore(admin);
// export const auth = getAuth(admin);

// export default admin;

// import { initializeApp, applicationDefault } from 'firebase-admin/app';
// import { getFirestore } from 'firebase-admin/firestore';
// import { getAuth } from 'firebase-admin/auth';

// const admin = initializeApp({
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   privateKey: process.env.FIREBASE_PRIVATE_KEY,
// });

// export const db = getFirestore(admin);
// export const auth = getAuth(admin);

// export default admin;

import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\n/gm, '\n'),
    }),
    databaseURL: 'https://fast-feedback-1dd6a.firebaseio.com',
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
