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
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSingInUser } from "../../redux/auth/authOperations";

import backGroundImage from "../../assets/japan.jpg";

const initialState = {
	email: "",
	password: "",
};

export default function LoginScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [isShownKB, setIsShownKB] = useState(false);
	const [state, setState] = useState(initialState);

	const hideKB = () => {
		setIsShownKB(false);
		Keyboard.dismiss();
	};

	const submitForm = () => {
		setIsShownKB(false);
		Keyboard.dismiss();
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
								marginBottom: isShownKB ? 10 : 100,
								// width: dimensions,
							}}>
							<View>
								<Text style={styles.inputTitle}>Email address</Text>
								<TextInput
									style={styles.input}
									onFocus={() => setIsShownKB(true)}
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
									secureTextEntry
									onFocus={() => setIsShownKB(true)}
									value={state.password}
									onChangeText={(value) => {
										setState((prevState) => {
											return { ...prevState, password: value };
										});
									}}
								/>
							</View>
							{!isShownKB && (
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
		color: "black",
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
		color: "magenta",
	},
	input: {
		borderWidth: 1,
		height: 50,
		borderColor: "black",
		paddingHorizontal: 20,
		borderRadius: 10,
		color: "green",
		textAlign: "center",
		fontSize: 24,
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
		color: "white",
		fontSize: 20,
		fontFamily: "regular400",
	},
});
