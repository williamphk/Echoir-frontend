import { createSlice } from "@reduxjs/toolkit";

const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState: {
    acceptOrDeleteCount: 0,
    sendCount: 0,
  },
  reducers: {
    incrementAcceptOrDeleteCount: (state) => {
      state.acceptOrDeleteCount += 1;
    },
    incrementSendCount: (state) => {
      state.sendCount += 1;
    },
  },
});

export const { incrementAcceptOrDeleteCount, incrementSendCount } =
  friendRequestSlice.actions;
export default friendRequestSlice.reducer;
