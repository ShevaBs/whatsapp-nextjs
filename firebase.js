import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDsat8zZpgQ_SabN4gty1_faDnL6KzF40U",
  authDomain: "whatsapp-nextjs-18e33.firebaseapp.com",
  projectId: "whatsapp-nextjs-18e33",
  storageBucket: "whatsapp-nextjs-18e33.appspot.com",
  messagingSenderId: "311756453626",
  appId: "1:311756453626:web:24ac1f3ca85ad5752d7b43",
  measurementId: "G-4MY298EWCP"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider}
