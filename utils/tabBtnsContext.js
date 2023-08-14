import { createContext, useContext, useState } from "react";

const ButtonStateContext = createContext();

export const useButtonState = () => {
	return useContext(ButtonStateContext);
};

export const ButtonStateProvider = ({ children }) => {
	const [isButtonsEnabled, setIsButtonsEnabled] = useState(true);

	const toggleButtonsEnabled = () => {
		setIsButtonsEnabled(!isButtonsEnabled);
	};

	return (
		<ButtonStateContext.Provider
			value={{ isButtonsEnabled, toggleButtonsEnabled }}>
			{children}
		</ButtonStateContext.Provider>
	);
};
