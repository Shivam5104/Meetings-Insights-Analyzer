import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize a new app for the server if it doesn't exist
let app: FirebaseApp;
if (getApps().find(app => app.name === 'server')) {
  app = getApp('server');
} else {
  app = initializeApp(firebaseConfig, 'server');
}


const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
