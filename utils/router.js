// navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegsisterScreen";
import PostScreen from "../screens/tabs/PostScreen";
import CreateScreen from "../screens/tabs/CreateScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";

// icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainStack = createBottomTabNavigator();

function AuthNavigation() {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name="Login" component={LoginScreen} />
			<AuthStack.Screen name="Register" component={RegisterScreen} />
		</AuthStack.Navigator>
	);
}

function TabsNavigation() {
	return (
		<MainStack.Navigator
			screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
			<MainStack.Screen
				name="Post"
				component={PostScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<MaterialCommunityIcons
							name="postage-stamp"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<MainStack.Screen
				name="Create"
				component={CreateScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5 name="plus" size={35} color={color} />
					),
				}}
				// listeners={({ navigation }) => ({
				// 	tabPress: (event) => {
				// 		if (resetState) {
				// 			resetState(); // Викликаємо функцію обнулення стану перед переходом
				// 		}
				// 		navigation.navigate("Create");
				// 	},
				// })}
			/>
			<MainStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<SimpleLineIcons name="user" size={size} color={color} />
					),
				}}
			/>
		</MainStack.Navigator>
	);
}

export const useMyRoutes = (isAuth) => {
	return !isAuth ? <AuthNavigation /> : <TabsNavigation />;
};
