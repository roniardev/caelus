import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAtniETiXyyj67G6dthP2LCE2Pa9YSaXiM',
  authDomain: 'shutmeeow.firebaseapp.com',
  databaseURL: 'https://shutmeeow.firebaseio.com',
  projectId: 'shutmeeow',
  storageBucket: 'shutmeeow.appspot.com',
  messagingSenderId: '899920014872',
  appId: '1:899920014872:web:443761e68cc91e16fa5d6d',
  measurementId: 'G-B3SBM5FSB0',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
