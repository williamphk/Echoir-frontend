import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    createOrUpdateCount: 0,
  },
  reducers: {
    incrementCreateOrUpdateCount: (state) => {
      state.createOrUpdateCount += 1;
    },
  },
});

export const { incrementCreateOrUpdateCount } = commentSlice.actions;
export default commentSlice.reducer;
