import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";

export default function CreateScreen() {
	// get permissions
	const [permission, setPermission] = useState(null);
	// const [permission, requestPermission] = Camera.useCameraPermissions(); //? why don't work
	const cameraRef = useRef(null); // reference on camera in DOM
	const [capturedPhoto, setCapturedPhoto] = useState(null); // photo object
	const [type, setType] = useState(CameraType.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setPermission(status === "granted");
		})();
	}, [permission]);

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

			const photo = await cameraRef.current.takePictureAsync(options);
			setCapturedPhoto(photo);
		}
	};

	if (permission === null) {
		return <Text>Очікую доступу до камери...</Text>;
	} else if (!permission) {
		return <Text>Немає доступу до камери</Text>;
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
					<TouchableOpacity style={styles.button} onPress={takePhoto}>
						<Text style={styles.text}>SNAP</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>
				</View>
			</Camera>
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
