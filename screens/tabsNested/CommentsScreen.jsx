import { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback,
	FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";

// export const getDataFromFirestore = async () => {
// 	try {
// 		// getDocs - отримує дані з колекції
// 		const snapshot = await getDocs(collection(db, "users"));
// 		// Перевіряємо у консолі отримані дані
// 		snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
// 		// Повертаємо масив об'єктів у довільній формі
// 		return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// };
import { dbFirestore } from "../../firebase/config";
import { collection, doc, addDoc, query, onSnapshot } from "firebase/firestore";

import { useKeyboardState } from "../../utils/keyboardContext";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CommentsScreen() {
	const { hideKB } = useKeyboardState();
	const currentUser = useSelector((store) => store.auth.nickname);

	const {
		params: { postId, imageTitle },
	} = useRoute();

	const [imageComment, setImageComment] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		getAllComments();
	}, []);

	const getAllComments = async () => {
		const currentPostRef = doc(dbFirestore, "dcim", postId);
		const commentsCollection = query(collection(currentPostRef, "comments"));

		onSnapshot(commentsCollection, (snapshot) => {
			const arr = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					data: doc.data(),
				};
			});
			setComments(arr);
		});
	};

	const createComment = async () => {
		hideKB();
		setImageComment("");
		const currentPostRef = doc(dbFirestore, "dcim", postId);
		await addDoc(collection(currentPostRef, "comments"), {
			comment: imageComment,
			userNickName: currentUser,
		});
	};

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				<Text style={styles.screenTitle}>Add comment in area below</Text>
				<Text style={styles.imageTitle}>Image title: {imageTitle}</Text>

				<FlatList
					data={comments}
					keyExtractor={(item, indx) => item.id}
					renderItem={({ item }) => {
						const indx = comments.indexOf(item);
						console.log("CommentsScreen >> item:", item);

						return (
							<SafeAreaView style={styles.commentContainer}>
								<Text>Comment #{indx + 1}</Text>
								<Text>User: {item.data.userNickName}</Text>
								<Text>Comment: {item.data.comment}</Text>
							</SafeAreaView>
						);
					}}
				/>

				<View style={styles.imageCommentContainer}>
					<TextInput
						style={styles.imageComment}
						value={imageComment}
						multiline
						onChangeText={(value) => {
							setImageComment(value);
						}}
					/>
				</View>

				<TouchableOpacity
					disabled={!imageComment}
					style={[styles.button, !imageComment && styles.disabled]}
					onPress={createComment}>
					<Text style={[styles.text, !imageComment && styles.disabled]}>
						ADD Comment
					</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 20,
		paddingBottom: 20,
	},

	screenTitle: {
		alignSelf: "center",
		marginVertical: 15,
		fontSize: 20,
	},

	imageTitle: {
		marginBottom: 5,
		fontSize: 16,
	},

	commentContainer: {
		flex: 1,
		borderColor: "#007BFF",
		borderWidth: 2,
		marginBottom: 5,
		padding: 5,
	},

	// Image Comment
	imageCommentContainer: {
		borderWidth: 2,
		borderRadius: 20,
		borderColor: "#007BFF",
		marginVertical: 10,
		padding: 10,
	},
	imageComment: {
		color: "#000",
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

	disabled: {
		borderColor: "#d7d7d7",
		color: "#d7d7d7",
	},

	text: {
		color: "#000",
	},
});
