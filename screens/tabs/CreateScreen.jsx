import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";

export default function CreateScreen() {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	const takePhoto = async () => {};

	return (
		<View style={styles.container}>
			{/* <Text>It is CreateScreen</Text> */}

			<View style={styles.container}>
				<Camera style={styles.camera} type={type}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
							<Text style={styles.text}>Flip Camera</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
							<Text style={styles.text}>SNAP</Text>
						</TouchableOpacity>
					</View>
				</Camera>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	camera: {
		flex: 1,
		// height: "100%",
		// marginTop: 50,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	buttonContainer: {
		paddingHorizontal: 20,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		// width: 80,
		// height: 80,
		marginBottom: 15,
		padding: 10,
		borderWidth: 2,
		borderRadius: 50,
		borderColor: "rgba(255, 255, 255, 0.5)",
	},

	text: {
		color: "#fff",
	},
});
