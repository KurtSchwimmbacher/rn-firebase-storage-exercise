import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAkljYbBnbblDNTdQGbS1r0RGh3l6sqG4U",
  authDomain: "safelydv300classproj.firebaseapp.com",
  projectId: "safelydv300classproj",
  storageBucket: "safelydv300classproj.firebasestorage.app", //this is our bucket storage
  messagingSenderId: "130552682344",
  appId: "1:130552682344:web:f4346a2857acb59cc7e8dd"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// TODO: Initialize Cloud Firestore, Cloud Storage and get a reference to the service
export const storage = getStorage(app); // var for out bucket storage
export const db = getFirestore(app);