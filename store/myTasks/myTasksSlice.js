import { createSlice } from "@reduxjs/toolkit";

export const myTasksSlice = createSlice({
  name: "myTasks",
  initialState: {
    value: { tasks: [], completedTasks: [] },
  },
  reducers: {
    appInitializedMyTasks: (state, actions) => {
      state.value = actions.payload;
    },
    addTask: (state, actions) => {
      state.value.tasks.push(actions.payload);
    },
    addCompletedTask: (state, actions) => {
      state.value.completedTasks.push(actions.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { appInitializedMyTasks, addTask, addCompletedTask } =
  myTasksSlice.actions;

export default myTasksSlice.reducer;
