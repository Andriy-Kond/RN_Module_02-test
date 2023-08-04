import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	CameraRoll,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import ImageMarker, { Position, ImageFormat } from "react-native-image-marker";

export default function CreateScreen() {
	// // get permissions
	// const [permission, requestPermission] = Camera.useCameraPermissions();
	// if (!permission) {
	// 	return <View />;
	// }
	// if (!permission.granted) {
	// 	return <Text>Немає доступу до камери</Text>;
	// }

	// choose camera type
	const [type, setType] = useState(CameraType.back);
	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	const cameraRef = useRef(null); // reference on camera in DOM
	const [capturedPhoto, setCapturedPhoto] = useState(null); // photo object

	const takePhoto = async () => {
		if (cameraRef.current) {
			const options = {
				quality: 1,
				base64: true,
				exif: false,
			};

			const photo = await cameraRef.current.takePictureAsync(options);
			setCapturedPhoto(photo);
		}
	};

	// const addDateAndTimeToPhoto = async () => {
	// 	if (capturedPhoto) {
	// 		const currentDate = new Date().toLocaleString();

	// 		const options = {
	// 			backgroundImage: {
	// 				src: { uri: capturedPhoto.uri }, // Конвертуємо URI фото в об'єкт потрібного формату
	// 			},

	// 			watermarkTexts: [
	// 				{
	// 					text: currentDate,
	// 					positionOptions: {
	// 						position: Position.bottomRight,
	// 					},
	// 					style: {
	// 						color: "#FFFFFF",
	// 						fontSize: 20,
	// 						fontName: "Arial",
	// 					},
	// 				},
	// 			],
	// 			scale: 1,
	// 			quality: 100,
	// 			filename: "test",
	// 			saveFormat: ImageFormat.png,
	// 			maxSize: 1000,
	// 		};

	// 		try {
	// 			console.log("addDateAndTimeToPhoto >> options:", options);
	// 			const photoWithText = await ImageMarker.markText(options);

	// 			// Збереження зображення з доданим текстом в галереї пристрою
	// 			// CameraRoll.saveToCameraRoll(photoWithText);

	// 			// Видалення вихідного зображення (при потребі)
	// 			// CameraRoll.deletePhotos([capturedPhoto.uri]);

	// 			// Оновлення стану capturedPhoto на нове зображення
	// 			setCapturedPhoto((prevState) => {
	// 				const newState = { ...prevState, uri: photoWithText };
	// 				return newState;
	// 			});
	// 		} catch (error) {
	// 			console.log("Error:", error);
	// 		}
	// 	}
	// };

	return (
		<View style={styles.container}>
			{/* <Text>It is CreateScreen</Text> */}

			<View style={styles.container}>
				<Camera ref={cameraRef} style={styles.camera} type={type}>
					{capturedPhoto && (
						<View style={styles.photoImgContainer}>
							<Image
								source={{
									uri: "data:image/jpg;base64," + capturedPhoto.base64,
								}}
								style={styles.photoImg}></Image>

							{/* <TouchableOpacity
								onPress={addDateAndTimeToPhoto}
								style={{ marginTop: 20 }}>
								<Text style={{ fontSize: 20, color: "blue" }}>
									Add date to photo
								</Text>
							</TouchableOpacity> */}
						</View>
					)}

					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.button} onPress={takePhoto}>
							<Text style={styles.text}>SNAP</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
							<Text style={styles.text}>Flip Camera</Text>
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
});
