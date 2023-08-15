import { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useKeyboardState } from "../../utils/keyboardContext";

export default function CommentsScreen() {
	const { isKeyboardShown, hideKB } = useKeyboardState();
	const { params: imageTitle } = useRoute();
	const [imageComment, setImageComment] = useState("");

	const createComment = () => {
		hideKB();
	};

	return (
		<TouchableWithoutFeedback onPress={hideKB}>
			<View style={styles.container}>
				<Text style={styles.screenTitle}>Add comment in area below</Text>
				<Text>{imageTitle}</Text>

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
		// alignItems: "center",
		paddingHorizontal: 20,
		paddingBottom: 20,
	},

	screenTitle: {
		alignSelf: "center",
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
