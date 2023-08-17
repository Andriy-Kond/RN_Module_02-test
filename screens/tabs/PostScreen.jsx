import { createStackNavigator } from "@react-navigation/stack";

const NestedStack = createStackNavigator();

// screens
import DefaultScreenPosts from "../tabsNested/DefaultScreenPosts";
import MapScreen from "../tabsNested/MapScreen";
import CommentsScreen from "../tabsNested/CommentsScreen";

// import { useSelector } from "react-redux";

export default function NestedNavigation() {
	return (
		<NestedStack.Navigator
		// screenOptions={{ headerShown: false }}
		>
			<NestedStack.Screen
				name="DefaultScreenPosts"
				component={DefaultScreenPosts}
				options={{ headerShown: false }}
			/>
			<NestedStack.Screen
				name="MapScreen"
				component={MapScreen}
				options={{ title: "Map" }}
			/>
			<NestedStack.Screen
				name="CommentsScreen"
				component={CommentsScreen}
				options={{ title: "Comments" }}
			/>
		</NestedStack.Navigator>
	);
}
