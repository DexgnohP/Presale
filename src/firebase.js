// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: "testpresale-483a6.firebaseapp.com",
    projectId: "testpresale-483a6",
    storageBucket: "testpresale-483a6.appspot.com",
    messagingSenderId: "437710382193",
    appId: "1:437710382193:web:22f6f169fff6c6cbb5a7d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const database = getDatabase(app);