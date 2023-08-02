import { View } from "react-native";

// fonts
import { useFonts } from "expo-font";
import regular400 from "./assets/fonts/Roboto-Regular-400.ttf";
import medium500 from "./assets/fonts/Roboto-Medium-500.ttf";
import bold700 from "./assets/fonts/Roboto-Bold-700.ttf";

// navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegsisterScreen";

export default function App() {
	const [fontsLoaded] = useFonts({
		// "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
		regular400,
		medium500,
		bold700,
	});

	const AuthStack = createStackNavigator();

	function MainStack() {
		return (
			<AuthStack.Navigator>
				<AuthStack.Screen
					options={{ headerShown: false }}
					name="Register"
					component={RegisterScreen}
				/>
				<AuthStack.Screen
					options={{ headerShown: false }}
					name="Login"
					component={LoginScreen}
				/>
			</AuthStack.Navigator>
		);
	}

	if (!fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<MainStack />
		</NavigationContainer>
	);
}
