import { dbFirestore, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: save photo on phone storage
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

import Modal from "react-native-modal";
import { uriToBlob } from "../../utils/uriToBlob";
import { useSelector } from "react-redux";

export default function CreateScreen() {
	const navigation = useNavigation();

	const cameraRef = useRef(null); // reference on camera in DOM
	const [type, setType] = useState(CameraType.back);

	const [permissionLocation, setPermissionLocation] = useState(null);
	const [permissionMediaLibrary, setPermissionMediaLibrary] = useState(null);
	const [permissionCamera, setPermissionCamera] = useState(null);

	const [prevCapturedPhoto, setPrevCapturedPhoto] = useState(null);
	const [capturedPhoto, setCapturedPhoto] = useState(null); // photo link
	const [capturedLocation, setCapturedLocation] = useState(null);

	// modal message
	const [isShowModalMessage, setIsShowModalMessage] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const [imageComment, setImageComment] = useState("");

	const [isBtnSendEnabled, setIsBtnSendEnabled] = useState(false);

	const { userId, nickname } = useSelector((state) => state.auth);
	const isShowModalMessagePopup = (message) => {
		setModalMessage(message);
		setIsShowModalMessage(true);
	};
	const hideMessagePopup = () => {
		setIsShowModalMessage(false);
	};

	const resetState = () => {
		setCapturedPhoto(null);
		setPrevCapturedPhoto(null);
		setIsBtnSendEnabled(false);
	};
	resetState();

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
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();

			if (photo?.uri) {
				setIsBtnSendEnabled(true);
				setPrevCapturedPhoto(capturedPhoto);
				setCapturedPhoto(photo.uri);

				await MediaLibrary.createAssetAsync(photo.uri);

				if (permissionLocation) {
					const newLocation = await Location.getCurrentPositionAsync();
					setCapturedLocation(newLocation);
				}
			}
		}
	};

	const sendPhoto = async () => {
		if (capturedPhoto) {
			if (capturedPhoto !== prevCapturedPhoto) {
				navigation.navigate("DefaultScreenPosts");

				setImageComment("");
				setPrevCapturedPhoto(capturedPhoto);

				await uploadPostToServer();
			} else {
				isShowModalMessagePopup("You already have this photo. Make new one");
			}
		}
	};

	const uploadPostToServer = async () => {
		const photo = await uploadPhotoToServer();
		// send to db
		console.log("uploadPostToServer >> capturedLocation:", capturedLocation);

		if (capturedLocation) {
			await addDoc(collection(dbFirestore, "dcim"), {
				photo,
				imageComment,
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
			const storageRef = ref(storage, `images/${uniqPostId}`);
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
		<View style={styles.container}>
			{permissionCamera === null ? (
				<Text>Очікую доступу до камери...</Text>
			) : !permissionCamera ? (
				<Text>Немає доступу до камери</Text>
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
			)}

			<View style={styles.imageCommentContainer}>
				<TextInput
					style={styles.imageComment}
					value={imageComment}
					onChangeText={(value) => {
						setImageComment(value);
					}}
				/>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
					<Text style={styles.text}>Flip Camera</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={takePhoto}>
					<Text style={styles.text}>SNAP</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, !isBtnSendEnabled && styles.buttonDisabled]}
					onPress={sendPhoto}
					disabled={!isBtnSendEnabled}>
					<Text style={[styles.text, !isBtnSendEnabled && styles.textDisabled]}>
						SEND PHOTO
					</Text>
				</TouchableOpacity>
			</View>

			<Modal isVisible={isShowModalMessage} onBackdropPress={hideMessagePopup}>
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
		justifyContent: "flex-end",
	},

	camera: {
		flex: 1,
	},

	photoImgContainer: {
		flex: 1,
		borderColor: "#fff",
		borderWidth: 3,
		borderWidth: 15,
		borderColor: "#0021f9",
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

	buttonDisabled: {
		borderColor: "#a9a8a87d",
	},

	text: {
		color: "#000",
	},

	textDisabled: {
		color: "#a9a8a87d",
	},

	// Modal styles
	modalContent: {
		backgroundColor: "#fff",
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
		color: "#fff",
		fontWeight: "bold",
	},

	// Image Comment
	imageCommentContainer: {
		marginHorizontal: 10,
		borderWidth: 2,
		borderRadius: 50,
		borderColor: "#007BFF",
		marginVertical: 10,
	},
	imageComment: {
		color: "#000",
	},
});
