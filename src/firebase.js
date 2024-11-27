import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyACPQAbWPbYJ8Wgncc7P2WL4wOwA2NAgJE",
  authDomain: "luxefash-1d48c.firebaseapp.com",
  projectId: "luxefash-1d48c",
  storageBucket: "luxefash-1d48c.appspot.com",
  messagingSenderId: "416780766014",
  appId: "1:416780766014:web:a44f8dc76b76b4a6613a6f",
  measurementId: "G-W8FMHCCVMB"
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth();