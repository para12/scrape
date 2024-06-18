import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: process.env.API_KEY,
  authDomain: "admin-scrape.firebaseapp.com",
  projectId: "admin-scrape",
  storageBucket: "admin-scrape.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const firebasedb = initializeApp(firebaseConfig);

export default firebasedb;
