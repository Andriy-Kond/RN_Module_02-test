import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useMyRoutes } from "../utils/router";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
	const dispatch = useDispatch();

	const stateChange = useSelector((state) => state.auth.stateChange);
	const userId = useSelector((state) => state.auth.userId);
	const nickname = useSelector((state) => state.auth.nickname);

	useEffect(() => {
		dispatch(authStateChangeUser());
	}, []);

	const routing = useMyRoutes(stateChange);

	return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
