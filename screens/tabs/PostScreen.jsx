import { createStackNavigator } from "@react-navigation/stack";

const NestedStack = createStackNavigator();

// screens
import DefaultScreenPosts from "../tabsNested/DefaultScreenPosts";
import MapScreen from "../tabsNested/MapScreen";
import CommentsScreen from "../tabsNested/CommentsScreen";
// import { useSelector } from "react-redux";

export default function NestedNavigation() {
	// const state01 = useSelector((store) => store.auth.nickname);
	// console.log("state01 :>> 01", state01);

	return (
		<NestedStack.Navigator screenOptions={{ headerShown: false }}>
			<NestedStack.Screen
				name="DefaultScreenPosts"
				component={DefaultScreenPosts}
			/>
			<NestedStack.Screen name="MapScreen" component={MapScreen} />
			<NestedStack.Screen name="CommentsScreen" component={CommentsScreen} />
		</NestedStack.Navigator>
	);
}
