// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import commentReducer from "./slices/commentSlice";
import pageReducer from "./slices/pageSlice";
import friendRequestReducer from "./slices/friendRequestSlice";
import userReducer from "./slices/userSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
    page: pageReducer,
    friendRequest: friendRequestReducer,
    user: userReducer,
    profile: profileReducer,
  },
});
