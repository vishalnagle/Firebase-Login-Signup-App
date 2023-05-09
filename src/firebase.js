// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB589tGmIMzmEhkwgXF-4T32WPg8ImY2xI",
  authDomain: "login-signup-new.firebaseapp.com",
  projectId: "login-signup-new",
  storageBucket: "login-signup-new.appspot.com",
  messagingSenderId: "358750669830",
  appId: "1:358750669830:web:4028ffae40465a5174c787"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
