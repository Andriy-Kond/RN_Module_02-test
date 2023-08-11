import { dbDatabase, dbFirestore, storage } from "../../firebase/config";
import { ref, uploadString } from "firebase/storage";
import { collection, addDoc, uploadBytes } from "firebase/firestore";
// import { ref, set } from "firebase/database";

// TODO: save photo on phone storage
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

import Modal from "react-native-modal";
// import { writeDataToFirestore } from "../../utils/writeDataToFirestore";

export default function CreateScreen() {
	const cameraRef = useRef(null); // reference on camera in DOM

	const [permissionLocation, setPermissionLocation] = useState(null);
	const [permissionMediaLibrary, setPermissionMediaLibrary] = useState(null);
	const [permissionCamera, setPermissionCamera] = useState(null);
	// const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions(); //? why don't work

	const [prevCapturedPhoto, setPrevCapturedPhoto] = useState(null);
	const [capturedPhoto, setCapturedPhoto] = useState(null); // photo object
	const [capturedLocation, setCapturedLocation] = useState(null);

	const [showMessage, setShowMessage] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	// const [file, setFile] = useState(null);

	const showMessagePopup = (message) => {
		setModalMessage(message);
		setShowMessage(true);
	};

	const hideMessagePopup = () => {
		setShowMessage(false);
	};

	const [type, setType] = useState(CameraType.back);

	const navigation = useNavigation();

	// request accesses camera, location, mediaLibrary
	useEffect(() => {
		(async () => {
			const camera = await Camera.requestCameraPermissionsAsync();
			setPermissionCamera(camera.status === "granted");

			const location = await Location.requestForegroundPermissionsAsync();
			setPermissionLocation(location.status === "granted");

			const mediaLibrary = await MediaLibrary.requestPermissionsAsync();
			setPermissionMediaLibrary(mediaLibrary.status === "granted");
		})();
	}, [permissionCamera, permissionLocation, permissionMediaLibrary]);

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	const takePhoto = async () => {
		if (cameraRef.current) {
			// const options = {
			// 	quality: 1,
			// 	base64: true,
			// 	// exif: false,
			// };

			setPrevCapturedPhoto(capturedPhoto);
			const photo = await cameraRef.current.takePictureAsync();
			setCapturedPhoto(photo);

			const newFile = await MediaLibrary.createAssetAsync(photo.uri);
			console.log("takePhoto >> newFile:", newFile);
			// setFile(newFile);

			const location = await Location.getCurrentPositionAsync();
			// console.log("takePhoto >> location:", location);
			setCapturedLocation(location);
		}
	};

	const sendPhoto = () => {
		if (capturedPhoto) {
			if (capturedPhoto.uri !== prevCapturedPhoto?.uri) {
				setPrevCapturedPhoto(capturedPhoto);
				navigation.navigate("DefaultScreenPosts", capturedPhoto);
				uploadPhotoToServer();
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

	const uploadPhotoToServer = async () => {
		// await writeDataToFirestore(capturedPhoto);
		// writeDataToRealtimeDatabase(capturedPhoto);
		// console.log("uploadPhotoToServer >> capturedPhoto:", capturedPhoto);

		//^ for Cloud Firestore
		// const response = await fetch(capturedPhoto);
		// const file = capturedPhoto.uri.blob();
		// console.log("uploadPhotoToServer >> file:", file);

		console.log("uploadPhotoToServer >> capturedPhoto:", capturedPhoto);
		try {
			const docRef = await addDoc(
				collection(dbFirestore, "DCIM"),
				capturedPhoto
			);

			const response = await fetch(capturedPhoto.uri);

			// const uniqPostId = Date.now().toString();

			// const storageRef = ref(storage, "DCIM");
			// console.log("uploadPhotoToServer >> storageRef:", storageRef);
			// const blob = new Blob(capturedPhoto, { type: "application/jpg" });
			// await uploadBytes(storageRef, file);
			// const base64Load = await uploadString(
			// 	storageRef,
			// 	capturedPhoto.base64,
			// 	"base64url"
			// );
			// console.log("uploadPhotoToServer >> base64Load");
		} catch (e) {
			console.error("Error adding data: ", e);
			throw e;
		}

		//^ for Realtime Database:
		// const response = await fetch(capturedPhoto);
		// const file = response.blob();
		// try {
		// 	const uniqPostId = Date.now().toString();
		// 	const data = set(ref(dbDatabase, "DCIM/" + uniqPostId), file);
		// 	console.log("data >> data:", data);
		// } catch (e) {
		// 	console.error("Error adding data: ", e);
		// 	throw e;
		// }
	};

	// // for Cloud Firestore
	// const writeDataToFirestore = async (capturedPhoto) => {
	// 	// console.log("writeDataToFirestore >> capturedPhoto:", capturedPhoto);
	// 	try {
	// 		// addDoc - додає дані в колекцію
	// 		// collection - створює колекцію у базі даних db
	// 		const docRef = await addDoc(collection(dbDatabase, "DCIM"), {
	// 			capturedPhoto,
	// 		});
	// 		// docRef.id - id документа, створеного в колекції
	// 		console.log("Document written with ID: ", docRef.id);
	// 	} catch (e) {
	// 		console.error("Error adding document: ", e);
	// 		throw e;
	// 	}
	// };

	// // for Realtime Database:
	// const writeDataToRealtimeDatabase = async (capturedPhoto) => {
	// 	console.log("writeDataToRealtimeDatabase >> capturedPhoto:", capturedPhoto);
	// 	try {
	// 		// const response = await fetch(capturedPhoto);
	// 		// console.log("uploadPhotoToServer >> response:", response);
	// 		// const file = capturedPhoto.blob();
	// 		// console.log("uploadPhotoToServer >> file:", file);
	// 		const uniqPostId = Date.now().toString();
	// 		console.log("uploadPhotoToServer >> uniqPostId:", uniqPostId);
	// 		const data = set(ref(dbDatabase, "DCIM/" + uniqPostId), {
	// 			capturedPhoto,
	// 		});
	// 		console.log("data >> data:", data);
	// 	} catch (e) {
	// 		console.error("Error adding data: ", e);
	// 		throw e;
	// 	}
	// };

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