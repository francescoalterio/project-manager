import { configureStore } from "@reduxjs/toolkit";
import myCompletedProjectsReducer from "./myCompletedProjects/myCompletedProjectsSlice";
import myProjectsReducer from "./myProjects/myProjectsSlice";
import myTasksReducer from "./myTasks/myTasksSlice";
import settingsReducer from "./settings/settingsSlice";

export default configureStore({
  reducer: {
    myProjects: myProjectsReducer,
    myCompletedProjects: myCompletedProjectsReducer,
    myTasks: myTasksReducer,
    settings: settingsReducer,
  },
});
