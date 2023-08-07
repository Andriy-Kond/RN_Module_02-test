//

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
// import dataBase from "../../firebase/config";
// console.log("dataBase:", dataBase);

// export const authSingInUser = () => async (dispatch, getState) => {};
export const authSingUpUser =
	({ email, password, nickname }) =>
	async (dispatch, getState) => {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			console.log("authSingInUser >> user:", user);
		} catch (error) {
			console.log("authSingInUser >> error:", error);
			console.log("authSingInUser >> error.message:", error.message);
		}
	};
// export const authSingOutUser = () => async (dispatch, getState) => {};

// const registerDB = async ({ email, password }) => {
// 	try {
// 		await createUserWithEmailAndPassword(auth, email, password);
// 	} catch (error) {
// 		throw error;
// 	}
// };

// const registerDB = ({ email, password }) =>
// 	createUserWithEmailAndPassword(auth, email, password);

// const authStateChanged = async (onChange = () => {}) => {
// 	onAuthStateChanged((user) => {
// 		onChange(user);
// 	});
// };

// const loginDB = async ({ email, password }) => {
// 	try {
// 		const credentials = await signInWithEmailAndPassword(auth, email, password);
// 		return credentials.user;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// const updateUserProfile = async (update) => {
// 	const user = auth.currentUser;

// 	// якщо такий користувач знайдений
// 	if (user) {
// 		// оновлюємо його профайл
// 		try {
// 			await updateProfile(user, update);
// 		} catch (error) {
// 			throw error;
// 		}
// 	}
// };
