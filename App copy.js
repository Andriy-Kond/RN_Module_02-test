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
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";

import backGroundImage from "./assets/japan.jpg";

// fonts
import { useFonts } from "expo-font";
import regular400 from "./assets/fonts/Roboto-Regular-400.ttf";
import medium500 from "./assets/fonts/Roboto-Medium-500.ttf";
import bold700 from "./assets/fonts/Roboto-Bold-700.ttf";

const initialState = {
	email: "",
	password: "",
};

export default function App() {
	const [fontsLoaded] = useFonts({
		// "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
		regular400,
		medium500,
		bold700,
	});

	// const [dimensions, setDimensions] = useState(
	// 	Dimensions.get("window").width - 20 * 2
	// );

	// useEffect(() => {
	// 	const onChange = () => {
	// 		const windowWidth = Dimensions.get("window").width - 20 * 2;
	// 		// console.log("onChange >> windowWidth:", windowWidth);
	// 		setDimensions(windowWidth);
	// 		const windowHeight = Dimensions.get("window").height;
	// 		// console.log("onChange >> windowHeight:", windowHeight);
	// 	};
	// 	Dimensions.addEventListener("change", onChange);

	// 	return () => {
	// 		// Dimensions.removeEventListener("change", onChange);
	// 	};
	// }, []);

	const [isShownKB, setIsShownKB] = useState(false);
	const [state, setState] = useState(initialState);
	// console.log("App >> state:", state);

	const hideKB = () => {
		setIsShownKB(false);
		Keyboard.dismiss();
		// setState(initialState);
	};

	const submitForm = () => {
		setIsShownKB(false);
		Keyboard.dismiss();
		setState(initialState);
	};

	if (!fontsLoaded) {
		return null;
	}

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				<ImageBackground
					style={styles.imageBackground}
					source={backGroundImage}>
					<KeyboardAvoidingView
						style={styles.keyboardView}
						behavior={Platform.OS === "ios" && "padding"}>
						<Text style={styles.text}>Great work</Text>
						<View
							style={{
								...styles.form,
								marginBottom: isShownKB ? 10 : 100,
								// width: dimensions,
							}}>
							<View>
								<Text style={styles.inputTitle}>Email address</Text>
								<TextInput
									value={state.email}
									style={styles.input}
									onFocus={() => setIsShownKB(true)}
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
									value={state.password}
									style={styles.input}
									secureTextEntry
									onFocus={() => setIsShownKB(true)}
									onChangeText={(value) => {
										setState((prevState) => {
											return { ...prevState, password: value };
										});
									}}
								/>
							</View>
							<TouchableOpacity
								activeOpacity={0.9}
								style={styles.btn}
								onPress={submitForm}>
								<Text style={styles.btnText}>Sign In</Text>
							</TouchableOpacity>
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
		// marginBottom: 100,
		width: "100%",
	},
	inputTitle: {
		// backgroundColor: "yellow",
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

		// width: "100%",
		color: "green",
		textAlign: "center",
		fontSize: 24,
	},
	btn: {
		marginTop: 20,
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
