import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    deleteCount: 0,
  },
  reducers: {
    incrementDeleteCount: (state) => {
      state.deleteCount += 1;
    },
  },
});

export const { incrementDeleteCount } = userSlice.actions;
export default userSlice.reducer;
