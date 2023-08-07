import * as firebase from "firebase";
import "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAcgnb4yUEIZfNCblfyEW2l1dil8ZVZWak",
	authDomain: "mn-module-02.firebaseapp.com",
	projectId: "mn-module-02",
	storageBucket: "mn-module-02.appspot.com",
	messagingSenderId: "14936246772",
	appId: "1:14936246772:web:5d19420ad749659f1991a1",
	measurementId: "G-G77JHJX7QD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;
