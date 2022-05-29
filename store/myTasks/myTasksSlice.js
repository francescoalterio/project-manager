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
    deleteTask: (state, actions) => {
      const id = actions.payload;
      state.value = state.value.filter((task) => task.id !== id);
    },
    addTask: (state, actions) => {
      state.value.push(actions.payload);
    },
    editTask: (state, actions) => {
      const id = actions.payload.id;
      const newTask = actions.payload;
      state.value = state.value.map((task) => {
        if (task.id === id) {
          return newTask;
        }
        return task;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { appInitializedMyTasks, deleteTask, addTask, editTask } =
  myTasksSlice.actions;

export default myTasksSlice.reducer;
