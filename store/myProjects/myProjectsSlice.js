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
  },
});

// Action creators are generated for each case reducer function
export const {
  appInitializedMyProjects,
  deleteProject,
  addProject,
  editProject,
} = myProjectsSlice.actions;

export default myProjectsSlice.reducer;
