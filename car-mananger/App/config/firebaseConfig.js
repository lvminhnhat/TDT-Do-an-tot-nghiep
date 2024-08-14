// App/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbcLmdVUjdu7gOwlb0VZMyH4NEhjuvJ9E",
  authDomain: "tranducthien-efd22.firebaseapp.com",
  databaseURL: "https://tranducthien-efd22-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tranducthien-efd22",
  storageBucket: "tranducthien-efd22.appspot.com",
  messagingSenderId: "1068558379260",
  appId: "1:1068558379260:web:d0b2d647689a299d564f79",
  measurementId: "G-7X7CKDV4EB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);