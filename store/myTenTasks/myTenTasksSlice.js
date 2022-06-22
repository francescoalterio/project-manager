import { createSlice } from "@reduxjs/toolkit";

export const myTenTasksSlice = createSlice({
  name: "myTenTasks",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementTenTasks: (state) => {
      state.value = state.value + 1;
    },
    resetTenTasks: (state) => {
      state.value = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementTenTasks, resetTenTasks } = myTenTasksSlice.actions;

export default myTenTasksSlice.reducer;
