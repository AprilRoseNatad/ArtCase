// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwit9JHUvwH1mwzgfqLWF87Y3fyWpF5Pk",
  authDomain: "artcase-app.firebaseapp.com",
  projectId: "artcase-app",
  storageBucket: "artcase-app.firebasestorage.app",
  messagingSenderId: "604888440624",
  appId: "1:604888440624:web:281e4196789ac9f691f2f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);