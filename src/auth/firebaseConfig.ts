// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtFlgQwksv7mLqdD9yNsUbOKldBPhPpPM",
  authDomain: "adf-rescue.firebaseapp.com",
  projectId: "adf-rescue",
  storageBucket: "adf-rescue.firebasestorage.app",
  messagingSenderId: "683292587236",
  appId: "1:683292587236:web:090702ba015b9c0af368f1",
  measurementId: "G-NVN00V1RVJ"
};
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
const analytics = getAnalytics(app);