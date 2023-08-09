import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";

export default function ProfileScreen() {
	const dispatch = useDispatch();
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
