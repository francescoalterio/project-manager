import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    value: {},
  },
  reducers: {
    appInitializedSettings: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { appInitializedSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
