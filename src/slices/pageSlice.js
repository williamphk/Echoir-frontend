import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    newsfeed: true,
    friends: false,
    profile: false,
    profileFriends: false,
    setting: false,
  },
  reducers: {
    switchComponent: (state, action) => {
      const { payload } = action;
      state.newsfeed = payload === "newsfeed";
      state.friends = payload === "friends";
      state.profile = payload === "profile";
      state.profileFriends = payload === "profileFriends";
      state.setting = payload === "setting";

      (payload === "newsfeed" ||
        payload === "friends" ||
        payload === "setting") &&
        window.scrollTo(0, 0);
    },
  },
});

export const { switchComponent } = pageSlice.actions;
export default pageSlice.reducer;
