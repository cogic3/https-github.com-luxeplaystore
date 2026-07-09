import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC33iSRCaC1HI1doruUlU4yYvOnB6LsABs",
  authDomain: "luxeplay-61982.firebaseapp.com",
  projectId: "luxeplay-61982",
  storageBucket: "luxeplay-61982.firebasestorage.app",
  messagingSenderId: "315965259302",
  appId: "1:315965259302:web:b3d521e363b9310241b0e7",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
