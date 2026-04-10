// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nep-estate.firebaseapp.com",
  projectId: "nep-estate",
  storageBucket: "nep-estate.firebasestorage.app",
  messagingSenderId: "487384024926",
  appId: "1:487384024926:web:ead30394fe7dd164b871cf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);