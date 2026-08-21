// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl2Bw07zg72utoFBWTueZPjbTxu-p7nkc",
  authDomain: "smartattend-k.firebaseapp.com",
  projectId: "smartattend-k",
  storageBucket: "smartattend-k.firebasestorage.app",
  messagingSenderId: "978874777113",
  appId: "1:978874777113:web:7bee9842a75f5d66aeb488"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);