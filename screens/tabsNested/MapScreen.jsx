import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
	const {
		params: { latitude, longitude },
	} = useRoute();

	return (
		<View style={styles.container}>
			<Text>It is MapScreen</Text>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude,
					longitude,
					latitudeDelta: 0.07,
					longitudeDelta: 0.07,
				}}>
				<Marker
					coordinate={{ latitude, longitude }}
					title="MapScreen"
					// image={{ uri: "custom_pin" }}
				/>
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	map: {
		flex: 1,
	},
});
