// it is operations for actions from authReducer

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

// export const authSingUpUser =
// 	({ email, password, nickname }) =>
// 	async (dispatch, getState) => {
// 		try {
// 			const user = await createUserWithEmailAndPassword(auth, email, password);
// 			dispatch(authSlice.actions.updateUserProfile({ userId: user.user.uid }));
// 		} catch (error) {
// 			console.log("authSingUpUser >> error:", error);
// 			console.log("authSingUpUser >> error.message:", error.message);
// 		}
// 	};

export const authSingUpUser =
	({ email, password, nickname }) =>
	async (dispatch) => {
		const state = useSelector((state) => state.auth.nickname);
		console.log("state :>> 01", state);
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = auth.currentUser;
			console.log("user ::", user);
			if (user) {
				await updateProfile(user, {
					displayName: nickname,
				});
			}

			// const credentials = await signInWithEmailAndPassword(
			// 	auth,
			// 	email,
			// 	password
			// );
			console.log("state :>> 02", state);
			dispatch(
				authSlice.actions.updateUserProfile({
					userId: userCredential.user.uid,
					nickname: userCredential.user.displayName,
				})
			);
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log("error ::", error);
			console.log("authSingUpUser > errorCode ::", errorCode);
			console.log("authSingUpUser > errorMessage ::", errorMessage);
		}
	};

export const authSingInUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log("authSingInUser >> error:", error);
			console.log("authSingInUser >> error.message:", error.message);
		}
	};

// export const onAuthStateChanged =
// 	({ email, password, nickname }) =>
// 	async (dispatch, getState) => {
// 		try {
// 			const user = onAuthStateChanged(auth, email, password);
// 			console.log("user ::", user);
// 		} catch (error) {
// 			console.log("authSingUpUser >> error:", error);
// 			console.log("authSingUpUser >> error.message:", error.message);
// 		}
// 	};

// export const authSingOutUser =
// 	({ email, password, nickname }) =>
// 	async (dispatch, getState) => {
// 		try {
// 			const user = await createUserWithEmailAndPassword(auth, email, password);
// 			console.log("user ::", user);
// 		} catch (error) {
// 			console.log("authSingUpUser >> error:", error);
// 			console.log("authSingUpUser >> error.message:", error.message);
// 		}
// 	};

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
