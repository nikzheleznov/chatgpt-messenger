import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5XbRZzUmmnVHHXnXh0tASCQmm1adPPMk',
  authDomain: 'chat-gpt-messagner.firebaseapp.com',
  projectId: 'chat-gpt-messagner',
  storageBucket: 'chat-gpt-messagner.appspot.com',
  messagingSenderId: '1011683359818',
  appId: '1:1011683359818:web:1d5d72d9d887a79e8c3ab3',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
