import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBdWbcNrR3WKNTxJU6BJHE_VT07vPYQqvU",
  authDomain: "house-marketplace-app-d9cab.firebaseapp.com",
  projectId: "house-marketplace-app-d9cab",
  storageBucket: "house-marketplace-app-d9cab.appspot.com",
  messagingSenderId: "193020107020",
  appId: "1:193020107020:web:a1748143265dfc8af3d129"
};

export const db = getFirestore()