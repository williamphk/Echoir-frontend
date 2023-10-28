import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    createOrUpdateCount: 0,
  },
  reducers: {
    incrementCreateOrUpdateCount: (state) => {
      state.createOrUpdateCount += 1;
    },
  },
});

export const { incrementCreateOrUpdateCount } = postSlice.actions;
export default postSlice.reducer;
