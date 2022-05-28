import { createSlice } from "@reduxjs/toolkit";

export const myProjectsSlice = createSlice({
  name: "myProjects",
  initialState: {
    value: [],
  },
  reducers: {
    appInitializedMyProjects: (state, actions) => {
      state.value = actions.payload;
    },
    deleteProject: (state, actions) => {
      const id = actions.payload;
      state.value = state.value.filter((project) => project.id !== id);
    },
    addProject: (state, actions) => {
      state.value.push(actions.payload);
    },
    editProject: (state, actions) => {
      const id = actions.payload.id;
      const newProject = actions.payload;
      state.value = state.value.map((project) => {
        if (project.id === id) {
          return newProject;
        }
        return project;
      });
    },
    addProjectTask: (state, actions) => {
      const id = actions.payload.projectId;
      const newTask = actions.payload;
      state.value = state.value.map((project) => {
        if (project.id === id) {
          project.tasks.push(newTask);
        }
        return project;
      });
    },
    addProjectCompletedTask: (state, actions) => {
      const id = actions.payload.projectId;
      const newCompletedTask = actions.payload;
      state.value = state.value.map((project) => {
        if (project.id === id) {
          project.completedTasks.push(newCompletedTask);
        }
        return project;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  appInitializedMyProjects,
  deleteProject,
  addProject,
  editProject,
  addProjectTask,
  addProjectCompletedTask,
} = myProjectsSlice.actions;

export default myProjectsSlice.reducer;
