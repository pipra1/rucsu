import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAGB77kvX2BVvbXRcpkD4GmxpofxwzUdSk",
  authDomain: "rucsu-f56d8.firebaseapp.com",
  databaseURL: "https://rucsu-f56d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rucsu-f56d8",
  storageBucket: "rucsu-f56d8.firebasestorage.app",
  messagingSenderId: "579119442287",
  appId: "1:579119442287:web:c1891a71a30aece6f0e09a",
  measurementId: "G-S8JY6WXHX4"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export default app;