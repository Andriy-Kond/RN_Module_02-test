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
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { dbFirestore } from "../../firebase/config";

export default function PostScreen() {
	// useEffect(() => {
	// 	if (itemParams) {
	// 		setPosts((prevState) => [...prevState, itemParams]);
	// 	}
	// }, [itemParams]);

	const navigation = useNavigation();
	const { params: itemParams } = useRoute(null);

	const [posts, setPosts] = useState([]); // array of objects
	console.log("PostScreen >> posts:", posts);

	useEffect(() => {
		const unsubscribe = getAllPosts();
		return () => {
			unsubscribe();
		};
	}, []);

	const getAllPosts = async () => {
		const postsQuery = query(collection(dbFirestore, "dcim"));

		const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
			const arr = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});
			setPosts(arr);
		});
		return unsubscribe;
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
							<Text Style={styles.imgTitle}>Image number: {indx + 1}</Text>
							<Image
								source={{ uri: item.data.photo }}
								style={styles.currentImg}
							/>
							<View style={styles.buttonsWrapper}>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("MapScreen", item.data.location)
									}>
									<Text>Go to MAP</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() =>
										navigation.navigate(
											"CommentsScreen",
											item.data.imageComment
										)
									}>
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
