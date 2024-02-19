import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBH9EOjMz7uJEawaS8K-BB_VltP18BEtvQ",
  authDomain: "ecomm-76146.firebaseapp.com",
  projectId: "ecomm-76146",
  storageBucket: "ecomm-76146.appspot.com",
  messagingSenderId: "137179507405",
  appId: "1:137179507405:web:56fd5114c415fdbf329784",
  measurementId: "G-CGBQ5QJYGZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
export { app, auth };
