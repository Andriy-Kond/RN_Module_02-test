import { Provider, useDispatch } from "react-redux";

// navigation
import { NavigationContainer } from "@react-navigation/native";

// fonts
import { useFonts } from "expo-font";
import regular400 from "./assets/fonts/Roboto-Regular-400.ttf";
import medium500 from "./assets/fonts/Roboto-Medium-500.ttf";
import bold700 from "./assets/fonts/Roboto-Bold-700.ttf";

// components
import { useMyRoutes } from "./utils/router";
import { store } from "./redux/store";

// import { authStateChangedUser } from "./redux/auth/authOperations";
import { useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import Main from "./components/Main";

export default function App() {
	const [fontsLoaded] = useFonts({
		// "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
		regular400,
		medium500,
		bold700,
	});

	// const dispatch = useDispatch();

	// const [user, setUser] = useState(null);
	// console.log("App >>> user ::", user);

	// onAuthStateChanged(auth, (user) => {
	// 	setUser(user);

	// const uid = user.uid;
	// console.log("user >>> uid ::", uid);
	// });

	// const routing = useMyRoutes(user);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			{/* <NavigationContainer>{routing}</NavigationContainer> */}
			<Main></Main>
		</Provider>
	);
}
