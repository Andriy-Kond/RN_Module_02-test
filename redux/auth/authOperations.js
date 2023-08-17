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

			dispatch(
				authSlice.actions.updateUserProfile({
					userId: userCredential.user.uid,
					nickname: userCredential.user.displayName,
				})
			);
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
			dispatch(
				authSlice.actions.updateUserProfile({
					userId: user.uid,
					nickname: user.displayName,
				})
			);
			dispatch(authSlice.actions.updateStateChange({ stateChange: true }));
		}
	});
};

export const authSingOutUser = () => async (dispatch, getState) => {
	// await signOut(auth);

	signOut(auth)
		.then(() => {
			// Sign-out successful.
			console.log("Sign-out successful");
		})
		.catch((error) => {
			// An error happened.
			console.log("An error happened :>> ", error);
		});
	await dispatch(authSlice.actions.authSingOut());
};
