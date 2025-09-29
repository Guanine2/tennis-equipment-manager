// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPKl0Eg28-quhcme3laNa3v8LO61UYiPQ",
  authDomain: "tennis-equipment-manager.firebaseapp.com",
  projectId: "tennis-equipment-manager",
  storageBucket: "tennis-equipment-manager.firebasestorage.app",
  messagingSenderId: "1070579548574",
  appId: "1:1070579548574:web:54e12efbbf54f0ec58168f",
  measurementId: "G-F33B7R88K5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
// export const db = getFirestore(app); // If you need Firestore
// export const rtdb = getDatabase(app); // If you need Realtime Database
