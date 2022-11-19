import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJoJnz1Gb2EnpyI5q3fOCK3Tou8cRys3g",
  authDomain: "snapchat-clone-c2ea3.firebaseapp.com",
  projectId: "snapchat-clone-c2ea3",
  storageBucket: "snapchat-clone-c2ea3.appspot.com",
  messagingSenderId: "600916450388",
  appId: "1:600916450388:web:11929a364a2214572ae1c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };
