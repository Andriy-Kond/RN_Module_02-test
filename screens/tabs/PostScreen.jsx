import { StyleSheet, Text, View } from "react-native";

export default function PostScreen() {
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
