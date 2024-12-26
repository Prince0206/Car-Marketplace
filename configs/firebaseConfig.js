// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-firebase-chatroom-app.firebaseapp.com",
  projectId: "react-firebase-chatroom-app",
  storageBucket: "react-firebase-chatroom-app.appspot.com",
  messagingSenderId: "600814497491",
  appId: "1:600814497491:web:9ea16bf03ce908908c6e26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);