import { StyleSheet, Text, View } from "react-native";

export default function CommentsScreen({ latitude, longitude }) {
	return (
		<View style={styles.container}>
			<Text>It is CommentScreen</Text>
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
