import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function PostScreen() {
	const navigation = useNavigation();
	const { params: itemParams } = useRoute(null);
	const [posts, setPosts] = useState([]); // array of photo-objects

	useEffect(() => {
		if (itemParams) {
			setPosts((prevState) => [...prevState, itemParams]);
		}
	}, [itemParams]);

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
							<Image
								source={{ uri: item.capturedPhoto }}
								style={styles.currentImg}
							/>
							<View style={styles.buttonsWrapper}>
								<TouchableOpacity
									onPress={() => navigation.navigate("MapScreen", item)}>
									<Text>Go to MAP</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => navigation.navigate("CommentsScreen")}>
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

	buttonsWrapper: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
});
