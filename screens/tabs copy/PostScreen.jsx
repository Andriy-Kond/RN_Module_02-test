import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function PostScreen() {
	const [posts, setPosts] = useState([]); // array of photo-objects
	// console.log("PostScreen >> posts:", posts);

	const { params: capturedPhoto } = useRoute();
	// console.log("PostScreen >> capturedPhoto:", capturedPhoto);

	useEffect(() => {
		if (capturedPhoto) {
			setPosts((prevState) => [...prevState, capturedPhoto]);
		}
	}, [capturedPhoto]);

	return (
		<View style={styles.container}>
			<Text>It is PostScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
