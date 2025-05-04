import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts.ts";
import { authReducer } from "./slices/auth";
import { teamReducer } from "./slices/teams.ts";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
