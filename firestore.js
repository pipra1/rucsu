import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAuxZyjKBWdg4Shrdic_oJiR8IcQfkyGjw",
  authDomain: "rucsu-e6a3c.firebaseapp.com",
  databaseURL: "https://rucsu-e6a3c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rucsu-e6a3c",
  storageBucket: "rucsu-e6a3c.firebasestorage.app",
  messagingSenderId: "861765127333",
  appId: "1:861765127333:web:4e46104d3f4eb66173114c",
  measurementId: "G-YPSCR8BGL6"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export default app;