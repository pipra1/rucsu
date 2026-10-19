import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDk6WE3T7oZCuuTgpPMKy9WLjT4OXKjpBY",
  authDomain: "rucsu-backup.firebaseapp.com",
  databaseURL:
    "https://rucsu-backup-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rucsu-backup",
  storageBucket: "rucsu-backup.firebasestorage.app",
  messagingSenderId: "609111563687",
  appId: "1:609111563687:web:163989dcf94a0ad476aa82",
  measurementId: "G-XW2DLS50TR",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export default app;
