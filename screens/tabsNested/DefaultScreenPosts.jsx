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
import { collection, query, onSnapshot } from "firebase/firestore";
import { dbFirestore } from "../../firebase/config";

export default function DefaultScreenPosts() {
	const navigation = useNavigation();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getAllPosts();
	}, []);

	const getAllPosts = async () => {
		const dcimCollection = query(collection(dbFirestore, "dcim"));

		onSnapshot(dcimCollection, (snapshot) => {
			const arr = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});
			setPosts(arr);
		});
	};

	return (
		<View style={styles.container}>
			<Text>It is PostScreen</Text>
			<FlatList
				data={posts}
				keyExtractor={(item, indx) => item.id}
				renderItem={({ item }) => {
					const indx = posts.indexOf(item);

					return (
						<View style={styles.imgContainer}>
							<Text Style={styles.imgTitle}>Image #{indx + 1}</Text>
							<Image
								source={{ uri: item.data.photo }}
								style={styles.currentImg}
							/>
							<Text>{item.data.imageTitle}</Text>
							<View style={styles.buttonsWrapper}>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("MapScreen", item.data.location)
									}>
									<Text>Go to MAP</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() =>
										navigation.navigate("CommentsScreen", {
											imageTitle: item.data.imageTitle,
											postId: item.id,
										})
									}>
									<Text>Add COMMENT</Text>
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
		marginBottom: 30,
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
