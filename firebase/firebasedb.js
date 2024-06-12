import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDwnpQadofU3pHGrfzwF34PZ1K44V2oLYA",
  authDomain: "admin-scrape.firebaseapp.com",
  projectId: "admin-scrape",
  storageBucket: "admin-scrape.appspot.com",
  messagingSenderId: "782306289840",
  appId: "1:782306289840:web:4f0ce154a84a461151f375",
  measurementId: "G-FGWL85E0DE",
};

// Initialize Firebase
const firebasedb = initializeApp(firebaseConfig);

export default firebasedb;
