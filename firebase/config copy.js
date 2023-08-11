import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCK1qpTSiTIgVDJxW2EmlR6s2DxrFBCevw",
	authDomain: "rn-2-f8dcb.firebaseapp.com",
	projectId: "rn-2-f8dcb",
	storageBucket: "rn-2-f8dcb.appspot.com",
	messagingSenderId: "467054084436",
	appId: "1:467054084436:web:beacaff9cb967e337288c1",
	measurementId: "G-S3DEJ3WG58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbFirestore = getFirestore(app);
export const dbDatabase = getDatabase(app);
export const storage = getStorage(app);
