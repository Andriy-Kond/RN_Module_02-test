import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function PostScreen() {
	const [posts, setPosts] = useState([]); // array of photo-objects

	const { params: capturedPhoto } = useRoute();

	useEffect(() => {
		if (capturedPhoto) {
			setPosts((prevState) => [...prevState, capturedPhoto]);
		}
	}, [capturedPhoto]);

	return (
		<View style={styles.container}>
			<Text>It is PostScreen</Text>
			<FlatList
				data={posts}
				keyExtractor={(item, indx) => indx.toString()}
				renderItem={({ item }) => {
					const indx = posts.indexOf(item);
					return (
						<View style={styles.imgContainer}>
							<Text Style={styles.imgTitle}>Image number: {indx + 1}</Text>
							<Image source={{ uri: item.uri }} style={styles.currentImg} />
							<View style={styles.btnsWrapper}>
								<TouchableOpacity>
									<Text>Go to MAP</Text>
								</TouchableOpacity>

								<TouchableOpacity>
									<Text>Go to COMMENTS</Text>
								</TouchableOpacity>
							</View>
						</View>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
		paddingVertical: 30,
	},

	imgContainer: {
		alignItems: "center",
		marginBottom: 10,
	},

	imgTitle: {
		marginBottom: 100,
	},

	currentImg: {
		width: "100%",
		height: 200,
		borderRadius: 20,
		borderColor: "#fff",
		marginTop: 10,
		marginBottom: 10,
	},

	btnsWrapper: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
});
