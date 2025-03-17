import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_STORAGEBUCKET,
    messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_MESSAINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
