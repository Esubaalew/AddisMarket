import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCJV4iDjsO_SRNRxAT0qZ6ZcIc4gYzgTaU",
  authDomain: "addis-auth.firebaseapp.com",
  projectId: "addis-auth",
  storageBucket: "addis-auth.appspot.com",
  messagingSenderId: "651454936083",
  appId: "1:651454936083:web:37b647c57f873ca5aafbe6"
};

const app = initializeApp(firebaseConfig);



export { firebaseConfig, app };