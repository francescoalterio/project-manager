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
      const taskFiltered = state.value.tasks.filter(
        (task) => task.id !== actions.payload.id
      );
      state.value.tasks = taskFiltered;
    },
    deleteTask: (state, actions) => {
      const tasksFiltered = state.value.tasks.filter(
        (task) => task.id !== actions.payload.taskId
      );
      const completedTasksFiltered = state.value.completedTasks.filter(
        (task) => task.id !== actions.payload.taskId
      );
      state.value = {
        tasks: tasksFiltered,
        completedTasks: completedTasksFiltered,
      };
    },
    editTask: (state, actions) => {
      const taskEdited = state.value.tasks.map((task) => {
        if (task.id === actions.payload.id) {
          return actions.payload;
        } else {
          return task;
        }
      });
      state.value = {
        tasks: taskEdited,
        completedTasks: state.value.completedTasks,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appInitializedMyTasks,
  addTask,
  addCompletedTask,
  deleteTask,
  editTask,
} = myTasksSlice.actions;

export default myTasksSlice.reducer;
