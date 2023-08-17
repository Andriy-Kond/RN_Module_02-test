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

			// dispatch(
			// 	updateUserProfile({
			// 		userId: userCredential.user.uid,
			// 		nickname: userCredential.user.displayName,
			// 	})
			// );
			const userUpdateProfile = {
				userId: userCredential.user.uid,
				nickname: userCredential.user.displayName,
			};
			dispatch(updateUserProfile(userUpdateProfil));
		} catch (error) {
			console.log("authSingUpUser >> errorCode:", error.code);
			console.log("authSingUpUser >> errorMessage:", error.message);
		}
	};
};

export const authSingInUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log("authSingInUser >> errorCode:", error.code);
			console.log("authSingInUser >> errorMessage:", error.message);
		}
	};

export const authStateChangeUser = () => async (dispatch, getState) => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			const userUpdateProfile = {
				userId: user.uid,
				nickname: user.displayName,
			};
			dispatch(updateStateChange({ stateChange: true }));
			dispatch(updateUserProfile(userUpdateProfile));
		}
		// dispatch(
		// 	updateUserProfile({
		// 		userId: user.uid,
		// 		nickname: user.displayName,
		// 	})
		// );
	});
};

export const authSingOutUser = () => async (dispatch, getState) => {
	try {
		const outFirebaseResult = await signOut(auth); // exit on firebase
		console.log("authSingOutUser >> outFirebaseResult:", outFirebaseResult);
		const authOutDispatchResult = dispatch(authSingOut()); // clear redux
		console.log(
			"authSingOutUser >> authOutDispatchResult:",
			authOutDispatchResult
		);
	} catch (error) {
		console.log("authSingOutUser >> error:", error);
	}
};
