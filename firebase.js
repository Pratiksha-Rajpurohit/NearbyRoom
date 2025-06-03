// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzXH_2UaDI8eGGpr1I9E_ZOlfYLp5541U",
  authDomain: "nearbyroom.firebaseapp.com",
  projectId: "nearbyroom",
  storageBucket: "nearbyroom.firebasestorage.app",
  messagingSenderId: "243459918396",
  appId: "1:243459918396:web:5fdb55b8865757579c1139",
  measurementId: "G-N35E0FQ93V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(app);

export { auth };
