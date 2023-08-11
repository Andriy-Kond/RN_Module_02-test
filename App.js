import { Provider } from "react-redux";

// fonts
import { useFonts } from "expo-font";
import regular400 from "./assets/fonts/Roboto-Regular-400.ttf";
import medium500 from "./assets/fonts/Roboto-Medium-500.ttf";
import bold700 from "./assets/fonts/Roboto-Bold-700.ttf";

// components
import { store } from "./redux/store";
import Main from "./components/Main";

export default function App() {
	const [fontsLoaded] = useFonts({
		// "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
		regular400,
		medium500,
		bold700,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<Main></Main>
		</Provider>
	);
}
