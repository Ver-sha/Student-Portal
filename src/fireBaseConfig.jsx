// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxsZG473d6vJ2BQPbXo5TXAIzUUMkVrpw",
  authDomain: "dashboard-f3ae5.firebaseapp.com",
  projectId: "dashboard-f3ae5",
  storageBucket: "dashboard-f3ae5.appspot.com",
  messagingSenderId: "646287110338",
  appId: "1:646287110338:web:dbf9a6d515f749d56e8b5b",
  measurementId: "G-ZFJYCLWP33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();