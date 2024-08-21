// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3d363.firebaseapp.com",
  projectId: "mern-blog-3d363",
  storageBucket: "mern-blog-3d363.appspot.com",
  messagingSenderId: "343100525421",
  appId: "1:343100525421:web:1e7e049da872dcf1282864"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
