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
      const taskId = actions.payload.taskId;
      state.value = state.value.map((project) => {
        if (project.id === id) {
          const completedTask = project.tasks.filter(
            (task) => task.id === taskId
          );
          project.completedTasks.push(completedTask[0]);
          const tasks = project.tasks.filter((task) => task.id !== taskId);
          project.tasks = tasks;
        }
        return project;
      });
    },
    deleteProjectTask: (state, actions) => {
      const id = actions.payload.projectId;
      const taskId = actions.payload.taskId;
      state.value = state.value.map((project) => {
        if (project.id === id) {
          const tasks = project.tasks.filter((task) => task.id !== taskId);
          project.tasks = tasks;
        }
        return project;
      });
    },
    deleteCompletedProjectTask: (state, actions) => {
      const id = actions.payload.projectId;
      const taskId = actions.payload.taskId;
      state.value = state.value.map((project) => {
        if (project.id === id) {
          const completedTasks = project.completedTasks.filter((task) => {
            return task.id !== taskId;
          });
          project.completedTasks = completedTasks;
        }
        return project;
      });
    },
    editProjectTask: (state, actions) => {
      const id = actions.payload.projectId;
      const taskId = actions.payload.taskId;
      const newTask = actions.payload.task;
      state.value = state.value.map((project) => {
        if (project.id === id) {
          const tasks = project.tasks.map((task) => {
            if (task.id === taskId) {
              return newTask;
            }
            return task;
          });
          project.tasks = tasks;
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
  deleteProjectTask,
  deleteCompletedProjectTask,
  editProjectTask,
} = myProjectsSlice.actions;

export default myProjectsSlice.reducer;
