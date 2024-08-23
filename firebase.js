// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "flashcardsaas-ae507.firebaseapp.com",
  projectId: "flashcardsaas-ae507",
  storageBucket: "flashcardsaas-ae507.appspot.com",
  messagingSenderId: "465558963762",
  appId: "1:465558963762:web:59ae5a75dc9e02ef849e2b",
  measurementId: "G-E3TJJGSY3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;