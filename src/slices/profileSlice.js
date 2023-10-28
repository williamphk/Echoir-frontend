import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    updatePictureCount: 0,
    updateWorkCount: 0,
    updateEducationCount: 0,
    updateCityCount: 0,
  },
  reducers: {
    incrementUpdatePictureCount: (state) => {
      state.updatePictureCount += 1;
    },
    incrementUpdateWorkCount: (state) => {
      state.updateWorkCount += 1;
    },
    incrementUpdateEducationCount: (state) => {
      state.updateEducationCount += 1;
    },
    incrementUpdateCityCount: (state) => {
      state.updateCityCount += 1;
    },
  },
});

export const {
  incrementUpdatePictureCount,
  incrementUpdateWorkCount,
  incrementUpdateEducationCount,
  incrementUpdateCityCount,
} = profileSlice.actions;
export default profileSlice.reducer;
