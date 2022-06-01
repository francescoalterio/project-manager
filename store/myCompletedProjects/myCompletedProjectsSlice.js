import { createSlice } from "@reduxjs/toolkit";

export const myCompletedProjectsSlice = createSlice({
  name: "myCompletedProjects",
  initialState: {
    value: [],
  },
  reducers: {
    appInitializedMyCompletedProjects: (state, actions) => {
      state.value = actions.payload;
    },
    addCompletedProject: (state, actions) => {
      state.value.push(actions.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { appInitializedMyCompletedProjects, addCompletedProject } =
  myCompletedProjectsSlice.actions;

export default myCompletedProjectsSlice.reducer;
