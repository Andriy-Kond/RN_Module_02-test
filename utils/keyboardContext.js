import { createContext, useContext, useState } from "react";
import { Keyboard } from "react-native";

const keyboardStateContext = createContext();

export const useKeyboardState = () => {
	return useContext(keyboardStateContext);
};

export const KeyboardStateProvider = ({ children }) => {
	const [isKeyboardShown, setIsKeyboardShown] = useState(false);

	const toggleKeyboardState = (kbState) => {
		setIsKeyboardShown(kbState);
	};

	const hideKB = () => {
		setIsKeyboardShown(false);
		Keyboard.dismiss();
	};

	return (
		<keyboardStateContext.Provider
			value={{
				isKeyboardShown,
				toggleKeyboardState,
				hideKB,
			}}>
			{children}
		</keyboardStateContext.Provider>
	);
};
