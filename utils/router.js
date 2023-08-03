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
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const MainStack = createStackNavigator();
function AuthNavigation() {
	return (
		<MainStack.Navigator screenOptions={{ headerShown: false }}>
			<MainStack.Screen
				// options={{ headerShown: false }}
				name="Register"
				component={RegisterScreen}
			/>
			<MainStack.Screen
				// options={{ headerShown: false }}
				name="Login"
				component={LoginScreen}
			/>
		</MainStack.Navigator>
	);
}

const TabNav = createBottomTabNavigator();
function TabsNavigation() {
	return (
		<TabNav.Navigator
			screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
			{/* <TabNav.Screen name="Home" component={HomeScreen} /> */}
			<TabNav.Screen
				name="PostScreen"
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
			<TabNav.Screen
				name="CreateScreen"
				component={CreateScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5 name="plus" size={35} color={color} />
					),
				}}
			/>
			<TabNav.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<SimpleLineIcons name="user" size={size} color={color} />
					),
				}}
			/>
		</TabNav.Navigator>
	);
}

export const useRoute = (isAuth) => {
	return isAuth ? <AuthNavigation /> : <TabsNavigation />;
};
