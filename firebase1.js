// firebase1.js

// firebase1.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc,setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHw3ksMkoU5-jBqEjM4aPMajSJ7LTOj1c",
  authDomain: "todos-app-8a8b7.firebaseapp.com",
  projectId: "todos-app-8a8b7",
  storageBucket: "todos-app-8a8b7.appspot.com",
  messagingSenderId: "960887715831",
  appId: "1:960887715831:web:26adf746a349492c2da0f2",
  measurementId: "G-5WGTXHXNDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc,setDoc};
