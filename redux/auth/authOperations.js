// it is operations for actions from authReducer
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
	signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, updateStateChange, authSingOut } = authSlice.actions;

export const authSingUpUser = ({ email, password, nickname }) => {
	return async (dispatch) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential?.user) {
				await updateProfile(userCredential.user, {
					displayName: nickname,
				});
			}

			// const credentials = await signInWithEmailAndPassword(
			// 	auth,
			// 	email,
			// 	password
			// );

			const userUpdateProfile = {
				userId: userCredential.user.uid,
				nickname: userCredential.user.displayName,
			};
			dispatch(updateUserProfile(userUpdateProfile));
		} catch (error) {
			console.log("authSingUpUser >> error:", error);
		}
	};
};

export const authSingInUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log("authSingInUser:", error);
		}
	};

export const authStateChangeUser = () => async (dispatch, getState) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			const userUpdateProfile = {
				userId: user.uid,
				nickname: user.displayName,
			};
			dispatch(updateUserProfile(userUpdateProfile));
			dispatch(updateStateChange({ stateChange: true }));
		}
	});
};

export const authSingOutUser = () => async (dispatch, getState) => {
	try {
		await dispatch(authSingOut()); // clear redux
		await signOut(auth); // exit on firebase
	} catch (error) {
		console.log("authSingOutUser >> error:", error);
	}
};
