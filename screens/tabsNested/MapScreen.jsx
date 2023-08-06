import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ latitude, longitude }) {
	return (
		<View style={styles.container}>
			<Text>It is MapScreen</Text>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}>
				<Marker
					coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
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
