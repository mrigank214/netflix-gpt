// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfCdSgCAC-VWiKuM3vrnVwL8V5ppGC53g",
  authDomain: "netflixgpt-92295.firebaseapp.com",
  projectId: "netflixgpt-92295",
  storageBucket: "netflixgpt-92295.appspot.com",
  messagingSenderId: "165106854636",
  appId: "1:165106854636:web:a96c3f05bcb2bd0a9b53c9",
  measurementId: "G-L1KWHM57QS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();