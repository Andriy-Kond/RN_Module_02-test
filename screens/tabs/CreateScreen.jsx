import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import * as Location from "expo-location";

import Modal from "react-native-modal";

export default function CreateScreen() {
	const [permissionCamera, setPermissionCamera] = useState(null);
	// const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions(); //? why don't work
	const cameraRef = useRef(null); // reference on camera in DOM

	const [permissionLocation, setPermissionLocation] = useState(null);

	const [prevCapturedPhoto, setPrevCapturedPhoto] = useState(null);

	const [capturedPhoto, setCapturedPhoto] = useState(null); // photo object
	const [capturedLocation, setCapturedLocation] = useState(null);

	const [showMessage, setShowMessage] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const showMessagePopup = (message) => {
		setModalMessage(message);
		setShowMessage(true);
	};

	const hideMessagePopup = () => {
		setShowMessage(false);
	};

	const [type, setType] = useState(CameraType.back);

	const navigation = useNavigation();

	useEffect(() => {
		(async () => {
			const camera = await Camera.requestCameraPermissionsAsync();
			setPermissionCamera(camera.status === "granted");

			const location = await Location.requestForegroundPermissionsAsync();
			setPermissionLocation(location.status === "granted");
		})();
	}, [permissionCamera, permissionLocation]);

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	const takePhoto = async () => {
		if (cameraRef.current) {
			const options = {
				quality: 1,
				base64: true,
				exif: false,
			};

			setPrevCapturedPhoto(capturedPhoto);

			const photo = await cameraRef.current.takePictureAsync(options);
			setCapturedPhoto(photo);

			const location = await Location.getCurrentPositionAsync();
			console.log("takePhoto >> location:", location);
			setCapturedLocation(location);
		}
	};

	const sendPhoto = () => {
		if (capturedPhoto) {
			if (capturedPhoto.uri !== prevCapturedPhoto?.uri) {
				setPrevCapturedPhoto(capturedPhoto);
				navigation.navigate("DefaultScreenPosts", capturedPhoto);
			} else {
				showMessagePopup(
					"Hey dude, it's the same photo. Make a new one, even better, dude..."
				);
			}
		} else {
			showMessagePopup(
				"Hey dude, I don't have any photo yet... Tap on SNAP button to take one, dude"
			);
		}
	};

	if (permissionCamera === null) {
		return <Text>Очікую доступу до камери...</Text>;
	} else if (!permissionCamera) {
		return <Text>Немає доступу до камери</Text>;
	}

	if (permissionLocation === null) {
		return <Text>Очікую доступу до геолокації...</Text>;
	} else if (!permissionLocation) {
		return <Text>Немає доступу до геолокації</Text>;
	}

	return (
		<View style={styles.container}>
			<Camera ref={cameraRef} style={styles.camera} type={type}>
				{capturedPhoto && (
					<View style={styles.photoImgContainer}>
						<Image
							source={{ uri: capturedPhoto.uri }}
							style={styles.photoImg}></Image>
					</View>
				)}

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={takePhoto}>
						<Text style={styles.text}>SNAP</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={sendPhoto}>
						<Text style={styles.text}>SEND PHOTO</Text>
					</TouchableOpacity>
				</View>
			</Camera>

			<Modal isVisible={showMessage} onBackdropPress={hideMessagePopup}>
				<View style={styles.modalContent}>
					<Text style={styles.modalText}>{modalMessage}</Text>
					<TouchableOpacity
						onPress={hideMessagePopup}
						style={styles.modalButton}>
						<Text style={styles.modalButtonText}>OK</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	camera: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},

	photoImgContainer: {
		position: "absolute",
		top: 50,
		left: 10,
		borderColor: "#fff",
		borderWidth: 3,
	},

	photoImg: {
		height: 200,
		width: 200,
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
		marginBottom: 15,
		padding: 10,
		borderWidth: 2,
		borderRadius: 50,
		borderColor: "rgba(255, 255, 255, 0.5)",
	},

	text: {
		color: "#fff",
	},

	// Modal styles
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 8,
	},
	modalText: {
		fontSize: 18,
		marginBottom: 20,
	},
	modalButton: {
		alignSelf: "flex-end",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 4,
		backgroundColor: "#007BFF",
	},
	modalButtonText: {
		color: "white",
		fontWeight: "bold",
	},
});
