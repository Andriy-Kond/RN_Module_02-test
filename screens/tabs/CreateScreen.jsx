// TODO: використання глаголиці
// todo: кнопка для повторного фото, якщо перше не сподобалось
// todo: додати кнопки наближення і віддалення на мапі
// todo: Об'єднати логінскрін і регітрскрін

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
} from "react-native";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraType } from "expo-camera";

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { dbFirestore, storage } from "../../firebase/config";
import { uriToBlob } from "../../utils/uriToBlob";
import { useButtonState } from "../../utils/tabBtnsContext";

import { useKeyboardState } from "../../utils/keyboardContext";
import { TouchableWithoutFeedback } from "react-native";

export default function CreateScreen() {
	const { hideKB } = useKeyboardState();
	const { toggleButtonsEnabled, isTabButtonsEnabled } = useButtonState();

	// navigation
	const navigation = useNavigation();
	const isFocused = useIsFocused();

	// reference on camera in DOM
	const cameraRef = useRef(null);
	const [type, setType] = useState(CameraType.back);

	// permissions
	const [permissionLocation, setPermissionLocation] = useState(null);
	const [permissionMediaLibrary, setPermissionMediaLibrary] = useState(null);
	const [permissionCamera, setPermissionCamera] = useState(null);

	// local btns
	const [isBtnSendEnabled, setIsBtnSendEnabled] = useState(false);
	const [isRestBtnsSendEnabled, setIsRestBtnsSendEnabled] = useState(true);

	// captured photo, location
	const [capturedPhoto, setCapturedPhoto] = useState(null); // photo link
	const [capturedLocation, setCapturedLocation] = useState(null);

	const [imageTitle, setImageTitle] = useState("");
	const { userId, nickname } = useSelector((state) => state.auth);

	// request accesses to camera, location and mediaLibrary
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
		try {
			if (permissionCamera && cameraRef.current) {
				const photo = await cameraRef.current.takePictureAsync();

				// Обробка фото
				if (photo && photo.uri) {
					setCapturedPhoto(photo.uri);
					await MediaLibrary.createAssetAsync(photo.uri);
					if (permissionLocation) {
						const newLocation = await Location.getCurrentPositionAsync();
						setCapturedLocation(newLocation);
						setIsBtnSendEnabled(true); // unlock SEND-btn
					}
				}
			}
		} catch (error) {
			console.error("Error taking photo:", error);
		}
	};

	const sendPhoto = async () => {
		if (capturedPhoto) {
			setIsBtnSendEnabled(false); // lock SEND-btn
			setIsRestBtnsSendEnabled(false); // lock other btns on this screen
			await toggleButtonsEnabled(false); // lock tab-btns
			setImageTitle("");
			await uploadPostToServer();
			setCapturedPhoto(null);
			navigation.navigate("DefaultScreenPosts");
			await toggleButtonsEnabled(true); // unlock tab-btns
			setIsRestBtnsSendEnabled(true); // unlock other btns on this screen
		}
	};

	const uploadPostToServer = async () => {
		const photo = await uploadPhotoToServer();
		// send to db
		if (capturedLocation) {
			await addDoc(collection(dbFirestore, "dcim"), {
				photo,
				imageTitle,
				location: capturedLocation.coords,
				userId,
				nickname,
			});
		}
	};

	const uploadPhotoToServer = async () => {
		try {
			// to BLOB from uri
			const blobFile = await uriToBlob(capturedPhoto);

			// send to storage
			const uniqPostId = Date.now().toString();
			const storageRef = ref(storage, `${uniqPostId}`);
			await uploadBytes(storageRef, blobFile);
			// take from server
			const url = await getDownloadURL(storageRef);
			return url;
		} catch (e) {
			console.error("Error adding data: ", e);
			throw e;
		}
	};

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				{permissionCamera === null ? (
					<Text>Очікую доступу до камери...</Text>
				) : !permissionCamera ? (
					<Text>Немає доступу до камери. Надайте доступ у налаштуваннях</Text>
				) : (
					isFocused &&
					(!isTabButtonsEnabled ? (
						<View style={styles.sendingMessageContainer}>
							<Text style={styles.sendingMessage}>
								Sending data to the server. {"\n"} Please wait.
							</Text>
						</View>
					) : (
						<Camera ref={cameraRef} style={styles.camera} type={type}>
							{capturedPhoto && (
								<View style={styles.photoImgContainer}>
									<Image
										source={{ uri: capturedPhoto }}
										style={styles.photoImg}></Image>
								</View>
							)}
						</Camera>
					))
				)}

				<View style={styles.imageTitleContainer}>
					<TextInput
						style={styles.imageTitle}
						value={imageTitle}
						onChangeText={(value) => {
							setImageTitle(value);
						}}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[styles.button, !isRestBtnsSendEnabled && styles.disabled]}
						onPress={toggleCameraType}
						disabled={!isRestBtnsSendEnabled}>
						<Text
							style={[styles.text, !isRestBtnsSendEnabled && styles.disabled]}>
							Flip Camera
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, !isRestBtnsSendEnabled && styles.disabled]}
						onPress={takePhoto}
						disabled={!isRestBtnsSendEnabled}>
						<Text
							style={[styles.text, !isRestBtnsSendEnabled && styles.disabled]}>
							SNAP
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, !isBtnSendEnabled && styles.disabled]}
						onPress={sendPhoto}
						disabled={!isBtnSendEnabled}>
						<Text
							style={[styles.text, !isRestBtnsSendEnabled && styles.disabled]}>
							SEND PHOTO
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 10,
	},

	sendingMessageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	sendingMessage: {
		textAlign: "center",
		fontSize: 36,
		lineHeight: 50,
	},

	camera: {
		flex: 1,
	},

	photoImgContainer: {
		flex: 1,
		borderWidth: 3,
		borderWidth: 15,
		borderColor: "#0021f9",
		backgroundColor: "#e5d310",
	},

	photoImg: {
		alignSelf: "center",
		width: 350,
		height: "100%",
		resizeMode: "contain",
		borderWidth: 15,
		borderColor: "#f90000",
	},

	// buttons
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
		borderColor: "#0d0d0d7f",
	},

	disabled: {
		borderColor: "#d7d7d7",
		color: "#d7d7d7",
	},

	text: {
		color: "#000",
	},

	// Image Comment
	imageTitleContainer: {
		marginHorizontal: 10,
		borderWidth: 2,
		borderRadius: 50,
		borderColor: "#007BFF",
		marginVertical: 10,
	},
	imageTitle: {
		color: "#000",
	},
});
