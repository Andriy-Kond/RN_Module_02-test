// slice об'єднує в собі actions та reducer
import { createSlice } from "@reduxjs/toolkit";

// експорт authSlice буде експортувати ред'юсери з reducers з іменем "auth", а його початковий стан буде ===	initialState

// Extract the action creators object and the reducer
// const { actions, reducer } = postsSlice
// Extract and export each action creator by name
// export const { createPost, updatePost, deletePost } = actions

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		userId: null,
		nickname: null,
	},
	reducers: {},
});
