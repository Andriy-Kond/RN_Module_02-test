import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
import { authSingUpUser } from "../../redux/auth/authOperations";
import backGroundImage from "../../assets/japan.jpg";

import { useKeyboardState } from "../../utils/keyboardContext";

const initialState = {
	nickname: "",
	email: "",
	password: "",
};

export default function RegisterScreen() {
	const { isKeyboardShown, setIsKeyboardShown, hideKB } = useKeyboardState();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [state, setState] = useState(initialState);

	const submitForm = () => {
		hideKB();
		dispatch(authSingUpUser(state));
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
						<Text style={styles.text}>Register Screen</Text>
						<View
							style={{
								...styles.form,
								marginBottom: isKeyboardShown ? 10 : 100,
							}}>
							<View>
								<Text style={styles.inputTitle}>Login</Text>
								<TextInput
									style={styles.input}
									onSubmitEditing={hideKB}
									onFocus={() => setIsKeyboardShown(true)}
									value={state.nickname}
									onChangeText={(value) => {
										setState((prevState) => {
											return { ...prevState, nickname: value };
										});
									}}
								/>
							</View>

							<View style={{ marginTop: 20 }}>
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
									secureTextEntry
									onSubmitEditing={hideKB}
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
										<Text style={styles.btnText}>SIGN UP</Text>
									</TouchableOpacity>

									<TouchableOpacity
										activeOpacity={0.6}
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "center",
										}}
										onPress={() => {
											navigation.navigate("Login");
										}}>
										<Text
											style={{
												color: "red",
											}}>
											Have login?
										</Text>
										<Text
											style={[
												styles.btnText,
												{ color: "black", marginLeft: 6 },
											]}>
											Go to login
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
		color: "orange",
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
