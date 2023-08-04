import { FlatList, Image, StyleSheet, Text, View } from "react-native";
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
				renderItem={({ item }) => (
					<View style={styles.imgContainer}>
						<Image source={{ uri: item.uri }} style={styles.currentImg} />
					</View>
				)}></FlatList>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
	},
	imgContainer: {
		alignItems: "center",
		marginBottom: 10,
	},
	currentImg: {
		width: 300,
		height: 200,
		borderRadius: 20,
		borderColor: "#fff",
	},
});
