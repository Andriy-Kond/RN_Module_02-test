import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
	Button,
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";
import { collection, query, onSnapshot, doc, where } from "firebase/firestore";
import { dbFirestore } from "../../firebase/config";

export default function ProfileScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [currentUserPosts, setCurrentUserPosts] = useState([]);
	const currentUser = useSelector((store) => store.auth.userId);

	useEffect(() => {
		getAllCurrentUserPosts();
	}, []);

	const signOut = () => {
		dispatch(authSingOutUser());
	};

	const getAllCurrentUserPosts = async () => {
		const dcimCurrentUserCollection = query(
			collection(dbFirestore, "dcim"),
			where("userId", "==", currentUser)
		);

		onSnapshot(dcimCurrentUserCollection, (snapshot) => {
			const arr = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});
			setCurrentUserPosts(arr);
		});
	};

	return (
		<View style={styles.container}>
			<Text>It is ProfileScreen</Text>
			<View>
				<Button title="SIGN OUT" onPress={signOut} />

				<FlatList
					data={currentUserPosts}
					keyExtractor={(item, indx) => item.id}
					renderItem={({ item }) => {
						const indx = currentUserPosts.indexOf(item);

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
