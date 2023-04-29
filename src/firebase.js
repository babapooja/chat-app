// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqEmhTrPbFEWGSU8Ruzq-cXC-zraCGPOU",
  authDomain: "chat-app-918c3.firebaseapp.com",
  projectId: "chat-app-918c3",
  storageBucket: "chat-app-918c3.appspot.com",
  messagingSenderId: "435624224334",
  appId: "1:435624224334:web:64097656c7e81245ca451f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();