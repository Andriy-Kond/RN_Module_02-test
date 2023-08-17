import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Platform,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSingInUser } from "../../redux/auth/authOperations";
import backGroundImage from "../../assets/japan.jpg";

import { useKeyboardState } from "../../utils/keyboardContext";

const initialState = {
	email: "",
	password: "",
};

export default function LoginScreen() {
	const { isKeyboardShown, setIsKeyboardShown, hideKB } = useKeyboardState();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [state, setState] = useState(initialState);

	const submitForm = () => {
		hideKB();
		dispatch(authSingInUser(state));
		setState(initialState);
	};

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				<ImageBackground
					style={styles.imageBackground}
					source={backGroundImage}>
					<KeyboardAvoidingView
						style={styles.keyboardView}
						behavior={Platform.OS === "ios" && "padding"}>
						<Text style={styles.text}>Login Screen</Text>
						<View
							style={{
								...styles.form,
								marginBottom: isKeyboardShown ? 10 : 100,
							}}>
							<View>
								<Text style={styles.inputTitle}>Email address</Text>
								<TextInput
									style={styles.input}
									onSubmitEditing={hideKB}
									onFocus={() => setIsKeyboardShown(true)}
									value={state.email}
									onChangeText={(value) => {
										setState((prevState) => {
											return { ...prevState, email: value };
										});
									}}
								/>
							</View>

							<View style={{ marginTop: 20 }}>
								<Text style={styles.inputTitle}>Password</Text>
								<TextInput
									style={styles.input}
									onSubmitEditing={hideKB}
									secureTextEntry
									onFocus={() => setIsKeyboardShown(true)}
									value={state.password}
									onChangeText={(value) => {
										setState((prevState) => {
											return { ...prevState, password: value };
										});
									}}
								/>
							</View>

							{!isKeyboardShown && (
								<>
									<TouchableOpacity
										activeOpacity={0.8}
										style={styles.btn}
										onPress={submitForm}>
										<Text style={styles.btnText}>SIGN IN</Text>
									</TouchableOpacity>
									<TouchableOpacity
										activeOpacity={0.6}
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "center",
										}}
										onPress={() => {
											navigation.navigate("Register");
										}}>
										<Text
											style={{
												color: "red",
											}}>
											Not register?
										</Text>
										<Text
											style={[
												styles.btnText,
												{ color: "black", marginLeft: 6 },
											]}>
											Go to Register
										</Text>
									</TouchableOpacity>
								</>
							)}
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
				<StatusBar style="auto" />
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	imageBackground: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
		paddingVertical: 30,
	},
	keyboardView: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
	},
	text: {
		color: "#000",
		fontSize: 30,
	},
	form: {
		padding: 20,
		width: "100%",
	},
	inputTitle: {
		marginBottom: 5,
		fontSize: 18,
		padding: 5,
		fontFamily: "bold700",
		color: "#fe0606",
	},
	input: {
		borderWidth: 2,
		height: 50,
		borderColor: "#000",
		paddingHorizontal: 20,
		borderRadius: 10,
		color: "#fff",
		textAlign: "center",
		fontSize: 24,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	btn: {
		marginVertical: 20,
		backgroundColor: "blue",
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},
	btnText: {
		color: "#fff",
		fontSize: 20,
		fontFamily: "regular400",
	},
});
