// slice об'єднує в собі actions та reducer
import { createSlice } from "@reduxjs/toolkit";

// експорт authSlice буде експортувати ред'юсери з reducers з іменем "auth", а його початковий стан буде ===	initialState

// Extract the action creators object and the reducer
// const { actions, reducer } = postsSlice
// Extract and export each action creator by name
// export const { createPost, updatePost, deletePost } = actions

const initState = {
	userId: null,
	nickname: null,
	stateChange: false,
};

const actions = {
	updateUserProfile: (state, action) => ({
		...state,
		userId: action.payload.userId,
		nickname: action.payload.nickname,
	}),

	updateStateChange: (state, action) => ({
		...state,
		stateChange: action.payload.stateChange,
	}),

	authSingOut: (state, action) => initState,
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initState,
	reducers: actions,
});
