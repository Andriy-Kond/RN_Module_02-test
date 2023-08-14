import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";

export default function ProfileScreen() {
	const dispatch = useDispatch();

	const navigation = useNavigation();
	console.log("CreateScreen >> navigation:", navigation);
	const route = useRoute();
	console.log("PostScreen >> route:", route.name);

	return (
		<View style={styles.container}>
			<Text>It is ProfileScreen</Text>
			<Button
				title="SIGN OUT"
				onPress={() => {
					dispatch(authSingOutUser());
				}}
			/>
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
