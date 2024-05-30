// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGC15oiFEWn54bGWqg7DiHZD902Ejqt3E",
  authDomain: "house-marketplace-app-a8ebd.firebaseapp.com",
  projectId: "house-marketplace-app-a8ebd",
  storageBucket: "house-marketplace-app-a8ebd.appspot.com",
  messagingSenderId: "760563531486",
  appId: "1:760563531486:web:50830f92864fcd06658c4f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();