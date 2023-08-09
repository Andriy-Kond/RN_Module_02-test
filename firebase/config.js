// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCW8lzM62vHdggVzar-ooh6XeVnbCFhS74",
	authDomain: "rn-module.firebaseapp.com",
	projectId: "rn-module",
	storageBucket: "rn-module.appspot.com",
	messagingSenderId: "407439418647",
	appId: "1:407439418647:web:993137c7182d132bb54352",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
