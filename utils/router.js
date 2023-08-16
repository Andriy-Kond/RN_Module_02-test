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
import {
	FontAwesome5,
	MaterialCommunityIcons,
	SimpleLineIcons,
} from "@expo/vector-icons";

// components
import { useButtonState } from "../utils/tabBtnsContext";

const MainStack = createBottomTabNavigator();
const AuthStack = createStackNavigator();

function AuthNavigation() {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name="Login" component={LoginScreen} />
			<AuthStack.Screen name="Register" component={RegisterScreen} />
		</AuthStack.Navigator>
	);
}

function TabsNavigation() {
	const { isTabButtonsEnabled } = useButtonState();

	return (
		<MainStack.Navigator
			screenOptions={{
				// tabBarHideOnKeyboard: true, // Встановлюємо властивість для таб-бара
				tabBarShowLabel: false,
				headerShown: false,
			}}>
			<MainStack.Screen
				name="Post"
				component={PostScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<MaterialCommunityIcons
							name="postage-stamp"
							size={size}
							color={isTabButtonsEnabled ? color : "#d7d7d7"}
						/>
					),
				}}
				listeners={{
					tabPress: (e) => {
						if (!isTabButtonsEnabled) {
							e.preventDefault(); // Заборонити перехід на інший екран
							// someFn(); // Викликати функцію перед переходом
						}
					},
				}}
			/>
			<MainStack.Screen
				name="Create"
				component={CreateScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5
							name="plus"
							size={35}
							color={isTabButtonsEnabled ? color : "#d7d7d7"}
						/>
					),
				}}
				unmountOnBlur={true}
				listeners={{
					tabPress: (e) => {
						if (!isTabButtonsEnabled) {
							e.preventDefault();
						}
					},
				}}
			/>
			<MainStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<SimpleLineIcons
							name="user"
							size={size}
							color={isTabButtonsEnabled ? color : "#d7d7d7"}
						/>
					),
				}}
				listeners={{
					tabPress: (e) => {
						if (!isTabButtonsEnabled) {
							e.preventDefault();
						}
					},
				}}
			/>
		</MainStack.Navigator>
	);
}

function CustomProfileButton() {
	return ({ focused, color, size }) => (
		<SimpleLineIcons name="user" size={size} color={color} />
	);
}

export const useMyRoutes = (isAuth) => {
	return !isAuth ? <AuthNavigation /> : <TabsNavigation />;
};
