// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuPpnmfI-II0Iiv8TaWC11jiShOg7uE6Q",
  authDomain: "syopping-list.firebaseapp.com",
  projectId: "syopping-list",
  storageBucket: "syopping-list.appspot.com",
  messagingSenderId: "647292580768",
  appId: "1:647292580768:web:18c0b2951e365ba1f66ac5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
